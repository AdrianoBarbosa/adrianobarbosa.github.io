#!/usr/bin/env python3
"""Monta o site publicável em _site/.

1. Gera, a partir de assets/js/i18n.js, o JSON-LD, os currículos em Markdown,
   o JSON Resume e o llms.txt (tools/export.html rodando num Chrome headless).
2. Cria as rotas "/" (pt-BR) e "/en/" (en-US) com título, descrição, canonical e JSON-LD de cada idioma.
3. Pré-renderiza as duas rotas: o HTML publicado já traz todo o conteúdo,
   legível por buscadores, ATS e agentes de IA que não executam JavaScript.
4. Gera o sitemap.xml.

Uso: python3 scripts/build.py   (depois: python3 -m http.server -d _site 8000)
Requer Google Chrome ou Chromium (variável CHROME para indicar o binário).
"""
import datetime
import html
import json
import os
import re
import shutil
import subprocess
import tempfile
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"
SITE = "https://adrianobarbosa.github.io"
COPY = ["index.html", "favicon.svg", ".nojekyll", "robots.txt", "assets", "data", "cv"]
OG_LOCALE = {"pt-BR": ("pt_BR", "en_US"), "en-US": ("en_US", "pt_BR")}


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def find_chrome():
    candidates = [os.environ.get("CHROME"), "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]
    for name in filter(None, candidates):
        path = shutil.which(name)
        if path:
            return path
    raise SystemExit("Chrome/Chromium não encontrado. Defina a variável CHROME.")


def serve(directory):
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(directory)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{server.server_address[1]}"


def dump_dom(chrome, url):
    with tempfile.TemporaryDirectory() as profile:
        result = subprocess.run(
            [chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
             f"--user-data-dir={profile}", "--window-size=1366,900", "--virtual-time-budget=20000",
             "--dump-dom", url],
            capture_output=True, text=True, timeout=180, check=True,
        )
    return result.stdout


def set_attr(doc, tag_pattern, attr, value):
    """Troca o valor de um atributo na primeira tag que casa com tag_pattern."""
    escaped = html.escape(value, quote=True)
    new, count = re.subn(rf'({tag_pattern}[^>]*?\b{attr}=")[^"]*(")', lambda m: m.group(1) + escaped + m.group(2), doc, count=1)
    if count != 1:
        raise SystemExit(f"Tag não encontrada no index.html: {tag_pattern}")
    return new


def localize(template, lang, meta, jsonld):
    url = SITE + meta["route"]
    title, desc = meta["title"], meta["description"]
    doc = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang}">', template, count=1)
    doc = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", doc, count=1, flags=re.S)
    doc = set_attr(doc, r'<meta name="description"', "content", desc)
    doc = set_attr(doc, r'<meta property="og:title"', "content", title)
    doc = set_attr(doc, r'<meta property="og:description"', "content", desc)
    doc = set_attr(doc, r'<meta property="og:url"', "content", url)
    doc = set_attr(doc, r'<meta property="og:locale"', "content", OG_LOCALE[lang][0])
    doc = set_attr(doc, r'<meta property="og:locale:alternate"', "content", OG_LOCALE[lang][1])
    doc = set_attr(doc, r'<link rel="canonical"', "href", url)
    ld = json.dumps(jsonld, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    return doc.replace("<!-- JSON-LD -->", f'<script type="application/ld+json">{ld}</script>', 1)


def finalize(dom, lang, expect):
    """Limpa o HTML pré-renderizado: remove estado de tema e a classe js deixados pelo Chrome."""
    for text in expect:
        if text not in dom:
            raise SystemExit(f"Pré-renderização de {lang} incompleta: '{text}' não apareceu no HTML")
    dom = re.sub(r"^\s*<!doctype html>\s*", "", dom, flags=re.I)
    dom = re.sub(r"<html\b[^>]*>", f'<html lang="{lang}">', dom, count=1)
    return "<!doctype html>\n" + dom


def sitemap(today):
    alt = "".join(
        f'\n    <xhtml:link rel="alternate" hreflang="{lang}" href="{SITE}{route}"/>'
        for lang, route in (("pt-BR", "/"), ("en-US", "/en/"), ("x-default", "/"))
    )
    urls = "".join(f"\n  <url>\n    <loc>{SITE}{route}</loc>\n    <lastmod>{today}</lastmod>{alt}\n  </url>" for route in ("/", "/en/"))
    files = ["/cv/Adriano-Olivares-Barbosa-CV-pt-BR.pdf", "/cv/Adriano-Olivares-Barbosa-CV-en-US.pdf", "/resume.pt-BR.md", "/resume.en-US.md", "/llms.txt"]
    urls += "".join(f"\n  <url>\n    <loc>{SITE}{f}</loc>\n    <lastmod>{today}</lastmod>\n  </url>" for f in files)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
            f"{urls}\n</urlset>\n")


def main():
    chrome = find_chrome()
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for name in COPY:
        src = ROOT / name
        (shutil.copytree if src.is_dir() else shutil.copy2)(src, OUT / name)

    # 1. arquivos legíveis por máquina
    server, base = serve(ROOT)
    try:
        raw = dump_dom(chrome, f"{base}/tools/export.html")
    finally:
        server.shutdown()
    match = re.search(r'<pre id="out">(.*?)</pre>', raw, re.S)
    if not match or match.group(1).startswith("ERROR"):
        raise SystemExit(f"Falha ao gerar os dados: {match.group(1) if match else raw[:300]}")
    data = json.loads(html.unescape(match.group(1)))
    for name, content in data["files"].items():
        (OUT / name).write_text(content, encoding="utf-8")

    # 2. rotas por idioma
    template = (ROOT / "index.html").read_text(encoding="utf-8")
    pages = {"pt-BR": OUT / "index.html", "en-US": OUT / "en" / "index.html"}
    for lang, path in pages.items():
        path.parent.mkdir(exist_ok=True)
        path.write_text(localize(template, lang, data["meta"][lang], data["jsonld"][lang]), encoding="utf-8")

    # 3. pré-renderização
    expect = {"pt-BR": ["Experiência", "event-loop-async-goroutines", "Baixar currículo"],
              "en-US": ["Experience", "event-loop-async-goroutines", "Download resume"]}
    server, base = serve(OUT)
    try:
        doms = {lang: dump_dom(chrome, base + data["meta"][lang]["route"]) for lang in pages}
    finally:
        server.shutdown()
    for lang, path in pages.items():
        path.write_text(finalize(doms[lang], lang, expect[lang]), encoding="utf-8")

    # 4. sitemap
    today = datetime.date.today().isoformat()
    (OUT / "sitemap.xml").write_text(sitemap(today), encoding="utf-8")

    print("Site montado em _site/:")
    for path in sorted(p for p in OUT.rglob("*") if p.is_file() and "assets" not in p.parts):
        print(f"  {path.relative_to(OUT)}  ({path.stat().st_size // 1024 or 1} KB)")


if __name__ == "__main__":
    main()
