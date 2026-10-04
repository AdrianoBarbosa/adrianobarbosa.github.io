#!/usr/bin/env python3
"""Copia os currículos em PDF para cv/ e preenche os metadados (título, autor, assunto, palavras-chave).

Os metadados ajudam parsers de ATS, buscadores e IAs a identificar o documento.
Uso: python3 scripts/sync-cv.py [pasta-dos-curriculos]
"""
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent.parent / "resumes"
KEYWORDS = "Senior Backend Developer, Full Stack, Software Engineer, C#, .NET, ASP.NET Core, Node.js, TypeScript, NestJS, Python, Go, REST APIs, Distributed Systems, SQL Server, MySQL, Redis, Docker, AWS, GitHub Actions"

FILES = [
    ("Adriano Olivares Barbosa.pdf", "Adriano-Olivares-Barbosa-CV-pt-BR.pdf",
     "Adriano Olivares Barbosa | Currículo | Desenvolvedor Backend Sênior", "Currículo de Desenvolvedor Backend e Full Stack Sênior"),
    ("Adriano.Olivares Barbosa_EN.pdf", "Adriano-Olivares-Barbosa-CV-en-US.pdf",
     "Adriano Olivares Barbosa | Resume | Senior Backend Developer", "Senior Backend and Full Stack Developer resume"),
]

for src_name, out_name, title, subject in FILES:
    reader = PdfReader(SRC / src_name)
    writer = PdfWriter(clone_from=reader)
    writer.add_metadata({
        "/Title": title,
        "/Author": "Adriano Olivares Barbosa",
        "/Subject": subject,
        "/Keywords": KEYWORDS,
    })
    out = ROOT / "cv" / out_name
    with open(out, "wb") as fh:
        writer.write(fh)
    print(f"{src_name} -> cv/{out_name}")
