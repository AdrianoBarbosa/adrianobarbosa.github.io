import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";

const html = htm.bind(React.createElement);
const CFG = window.SITE_CONFIG;
const { applyTheme } = window.THEMES;
const I18N = window.I18N;

const LANGS = ["pt-BR", "en-US"];
const ROUTES = { "pt-BR": "/", "en-US": "/en/" };
const MODES = ["light", "dark", "system"];

const LANGUAGE_COLORS = {
  "C#": "#178600", TypeScript: "#3178c6", JavaScript: "#f1e05a", Go: "#00add8", Python: "#3572a5",
  HTML: "#e34c26", CSS: "#663399", Shell: "#89e051", Dockerfile: "#384d54", GDScript: "#355570", Dart: "#00b4ab",
};

/* ---------- utilitários ---------- */

function readStorage(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => readStorage(key, initial));
  useEffect(() => {
    try { localStorage.setItem(key, value); } catch { /* armazenamento indisponível */ }
  }, [key, value]);
  return [value, setValue];
}

// O idioma vem da rota: o build gera "/" em pt-BR e "/en/" em en-US.
function routeLang() {
  return document.documentElement.lang === "en-US" ? "en-US" : "pt-BR";
}

function rememberLang(lang) {
  try { localStorage.setItem("lang", lang); } catch { /* armazenamento indisponível */ }
}

function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(lang, { month: "short", year: "numeric" }).format(new Date(iso));
}

/* ---------- ícones (traço 24x24) ---------- */

const ICONS = {
  sun: html`<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />`,
  moon: html`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />`,
  monitor: html`<rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />`,
  mail: html`<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />`,
  copy: html`<rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,
  check: html`<path d="M20 6 9 17l-5-5" />`,
  star: html`<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />`,
  fork: html`<circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" />`,
  external: html`<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />`,
  arrowRight: html`<path d="M5 12h14M12 5l7 7-7 7" />`,
  arrowDown: html`<path d="M12 5v14M19 12l-7 7-7-7" />`,
  pin: html`<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />`,
  book: html`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" /><path d="M20 17v5H6.5A2.5 2.5 0 0 1 4 19.5" />`,
  code: html`<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />`,
  menu: html`<path d="M4 6h16M4 12h16M4 18h16" />`,
  close: html`<path d="M18 6 6 18M6 6l12 12" />`,
  globe: html`<circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`,
  download: html`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />`,
  file: html`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />`,
  briefcase: html`<rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />`,
  clock: html`<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />`,
  grad: html`<path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />`,
};

const BRANDS = {
  github: "M12 .5C5.65.5.5 5.65.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.65 18.35.5 12 .5z",
  linkedin: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
};

function Icon({ name, size = 18 }) {
  if (BRANDS[name]) {
    return html`<svg class="icon" width=${size} height=${size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d=${BRANDS[name]} /></svg>`;
  }
  return html`<svg class="icon" width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${React.Children.toArray(ICONS[name])}</svg>`;
}

/* ---------- animação ao rolar ---------- */

function Reveal({ as = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return React.createElement(as, {
    ref, className: `reveal ${visible ? "in" : ""} ${className}`, style: { transitionDelay: `${delay}ms` }, ...rest,
  }, children);
}

/* ---------- cabeçalho ---------- */

function Header({ t, lang, mode, setMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["about", "skills", "experience", "projects", "articles", "contact"];
  const modeIcon = { light: "sun", dark: "moon", system: "monitor" };

  return html`
    <header class=${`header ${scrolled ? "scrolled" : ""}`}>
      <div class="container header-inner">
        <a href="#top" class="brand" aria-label=${CFG.shortName}>
          <span class="brand-bracket">${"<"}</span>AB<span class="brand-bracket">${" />"}</span>
        </a>

        <nav id="main-nav" class=${`nav ${open ? "open" : ""}`} aria-label=${t.controls.menu}>
          ${links.map((id) => html`<a key=${id} href=${"#" + id} onClick=${() => setOpen(false)}>${t.nav[id]}</a>`)}
        </nav>

        <div class="controls">
          <div class="segmented" role="group" aria-label=${t.controls.language}>
            ${LANGS.map((l) => html`
              <a key=${l} href=${ROUTES[l]} hrefLang=${l} lang=${l} aria-current=${lang === l ? "page" : undefined} title=${l}
                onClick=${(e) => { rememberLang(l); if (lang !== l) { e.preventDefault(); location.href = ROUTES[l] + location.hash; } }}>
                ${l.slice(0, 2).toUpperCase()}
              </a>`)}
          </div>
          <div class="segmented" role="group" aria-label=${t.controls.theme}>
            ${MODES.map((m) => html`
              <button key=${m} type="button" class="icon-btn" aria-pressed=${mode === m} onClick=${() => setMode(m)}
                title=${t.controls.modes[m]} aria-label=${t.controls.modes[m]}>
                <${Icon} name=${modeIcon[m]} size=${16} />
              </button>`)}
          </div>
          <button type="button" class="menu-btn" aria-expanded=${open} aria-controls="main-nav"
            aria-label=${t.controls.menu} onClick=${() => setOpen(!open)}>
            <${Icon} name=${open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>`;
}

/* ---------- hero ---------- */

function CodeWindow({ t }) {
  // Cada linha é uma lista de [classe, texto]. As classes mapeiam para as cores de sintaxe da paleta.
  const k = (s) => ["tk-keyword", s], s = (v) => ["tk-string", `"${v}"`], n = (v) => ["tk-number", String(v)];
  const f = (v) => ["tk-func", v], ty = (v) => ["tk-type", v], c = (v) => ["tk-comment", v], p = (v) => ["", v];
  const field = (name, pad) => [p("\t"), ["tk-field", name], p(":" + " ".repeat(pad))];

  const lines = [
    [c("// adriano.go")],
    [k("package"), p(" dev")],
    [],
    [k("var"), p(" "), f("Adriano"), p(" = "), ty("Developer"), p("{")],
    [...field("Name", 6), s("Adriano Barbosa"), p(",")],
    [...field("Role", 6), s(t.hero.codeRole), p(",")],
    [...field("Since", 5), n(CFG.careerStart), p(",")],
    [...field("Stack", 5), p("[]"), ty("string"), p("{"), s("C#"), p(", "), s("NodeJS"), p(", "), s("Python"), p(", "), s("Go"), p("},")],
    [...field("Focus", 5), p("[]"), ty("string"), p("{")],
    ...t.hero.codeFocus.map((x) => [p("\t\t"), s(x), p(",")]),
    [p("\t},")],
    [...field("OpenToWork", 1), k("true"), p(",")],
    [p("}")],
  ];

  return html`
    <div class="code-window" aria-hidden="true">
      <div class="code-titlebar">
        <span class="dot dot-r"></span><span class="dot dot-y"></span><span class="dot dot-g"></span>
        <span class="code-filename">adriano.go</span>
      </div>
      <pre class="code-body"><code>${lines.map((line, i) => html`<span key=${i} class="code-line"><span class="ln">${i + 1}</span>${line.map(([cls, text], j) => html`<span key=${j} class=${cls}>${text}</span>`)}${"\n"}</span>`)}</code></pre>
    </div>`;
}

function Hero({ t, lang }) {
  return html`
    <section id="top" class="hero">
      <div class="hero-glow" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-text">
          <${Reveal} className="hero-id">
            <img class="avatar" src=${CFG.avatar} alt=${CFG.name} width="72" height="72" />
            <span class="status"><span class="pulse"></span>${t.hero.status}</span>
          <//>
          <${Reveal} delay=${60}>
            <p class="greeting mono">${t.hero.greeting}</p>
            <h1 class="hero-name">${CFG.shortName}</h1>
            <p class="hero-role mono">${t.hero.role}</p>
          <//>
          <${Reveal} delay=${120}>
            <p class="hero-tagline">${t.hero.tagline}</p>
            <div class="hero-cta">
              <a class="btn btn-primary" href="#contact"><${Icon} name="mail" />${t.hero.ctaContact}</a>
              <a class="btn btn-ghost" href=${CFG.cv[lang]} download type="application/pdf"><${Icon} name="download" />${t.hero.ctaCv}</a>
              <a class="btn btn-icon" href=${CFG.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><${Icon} name="linkedin" /></a>
              <a class="btn btn-icon" href=${CFG.github} target="_blank" rel="noopener" aria-label="GitHub"><${Icon} name="github" /></a>
            </div>
            <p class="hero-location"><${Icon} name="pin" size=${15} />${t.hero.location}</p>
          <//>
        </div>
        <${Reveal} delay=${180} className="hero-code">
          <${CodeWindow} t=${t} />
        <//>
      </div>
      <div class="container">
        <ul class="stats">
          ${t.stats.map((st, i) => html`
            <${Reveal} as="li" key=${i} delay=${i * 80} className="stat">
              <span class="stat-value">${st.value}</span>
              <span class="stat-label">${st.label}</span>
            <//>`)}
        </ul>
      </div>
    </section>`;
}

/* ---------- seções ---------- */

function Section({ id, kicker, title, intro, children, alt }) {
  return html`
    <section id=${id} class=${`section ${alt ? "section-alt" : ""}`}>
      <div class="container">
        <${Reveal} className="section-head">
          <p class="kicker mono"><span class="prompt">$</span> ${kicker}</p>
          <h2>${title}</h2>
          ${intro && html`<p class="section-intro">${intro}</p>`}
        <//>
        ${children}
      </div>
    </section>`;
}

function About({ t }) {
  return html`
    <${Section} id="about" kicker=${t.about.kicker} title=${t.about.title}>
      <div class="about-grid">
        <${Reveal} className="about-text">
          ${t.about.paragraphs.map((para, i) => html`<p key=${i}>${para}</p>`)}
        <//>
        <${Reveal} delay=${100} className="card about-card">
          <h3><${Icon} name="grad" />${t.education.title}</h3>
          <ul class="edu-list">
            ${t.education.items.map((e, i) => html`
              <li key=${i}>
                <strong>${e.course}</strong>
                <span>${e.school}</span>
                <span class="mono muted small">${e.period}</span>
              </li>`)}
          </ul>
          <h3><${Icon} name="globe" />${t.education.languagesTitle}</h3>
          <ul class="lang-list">
            ${t.education.languages.map((l, i) => html`<li key=${i}><strong>${l.name}</strong><span>${l.level}</span></li>`)}
          </ul>
        <//>
      </div>
    <//>`;
}

function Skills({ t }) {
  return html`
    <${Section} id="skills" kicker=${t.skills.kicker} title=${t.skills.title} alt>
      <div class="skills-grid">
        ${I18N.skills.map((g, i) => html`
          <${Reveal} key=${g.key} delay=${(i % 4) * 60} className="card skill-card">
            <h3>${t.skills.groups[g.key]}</h3>
            <ul class="chips">${g.items.map((it) => html`<li key=${it} class="chip">${it}</li>`)}</ul>
          <//>`)}
      </div>
      <${Reveal} className="studying mono"><span class="pulse"></span>${t.skills.studying}<//>
    <//>`;
}

function Experience({ t }) {
  return html`
    <${Section} id="experience" kicker=${t.experience.kicker} title=${t.experience.title}>
      <ol class="timeline">
        ${t.experience.items.map((job, i) => html`
          <${Reveal} as="li" key=${i} className="timeline-item">
            <span class="timeline-dot" aria-hidden="true"></span>
            <article class="card job">
              <div class="job-head">
                <div>
                  <h3>${job.role}</h3>
                  <p class="job-company">${job.company}</p>
                </div>
                <span class="job-period mono">
                  <time dateTime=${job.start}>${job.period.split(" · ")[0]}</time>${" · "}${job.end ? html`<time dateTime=${job.end}>${job.period.split(" · ")[1]}</time>` : job.period.split(" · ")[1]}
                </span>
              </div>
              <ul class="job-bullets">${job.bullets.map((b, j) => html`<li key=${j}>${b}</li>`)}</ul>
              <ul class="chips chips-sm">${job.tech.map((x) => html`<li key=${x} class="chip">${x}</li>`)}</ul>
            </article>
          <//>`)}
      </ol>
    <//>`;
}

function LangDot({ name }) {
  if (!name) return null;
  return html`<span class="lang"><span class="lang-dot" style=${{ background: LANGUAGE_COLORS[name] || "var(--muted)" }}></span>${name}</span>`;
}

function RepoCard({ repo, t, lang, featured }) {
  return html`
    <article class=${`card repo ${featured ? "repo-featured" : ""}`}>
      <div class="repo-head">
        <${Icon} name="book" size=${16} />
        <a class="repo-name mono" href=${repo.url} target="_blank" rel="noopener">${repo.name}</a>
      </div>
      ${repo.desc && html`<p class="repo-desc">${repo.desc}</p>`}
      ${featured && repo.tags?.length > 0 && html`<ul class="chips chips-sm">${repo.tags.map((x) => html`<li key=${x} class="chip">${x}</li>`)}</ul>`}
      <div class="repo-meta">
        <${LangDot} name=${repo.language} />
        ${repo.stars > 0 && html`<span title=${t.projects.stars}><${Icon} name="star" size=${14} />${repo.stars}</span>`}
        ${repo.forks > 0 && html`<span><${Icon} name="fork" size=${14} />${repo.forks}</span>`}
        <span class="muted">${t.projects.updated} ${formatDate(repo.pushedAt, lang)}</span>
      </div>
      <div class="repo-links">
        <a href=${repo.url} target="_blank" rel="noopener"><${Icon} name="github" size=${15} />${t.projects.code}</a>
        ${repo.demo && html`<a href=${repo.demo} target="_blank" rel="noopener"><${Icon} name="external" size=${15} />${t.projects.demo}</a>`}
      </div>
    </article>`;
}

function Projects({ t, lang }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/data/repos.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const repos = useMemo(() => {
    if (!data) return [];
    const curated = new Map(I18N.projects.map((p, i) => [p.repo, { ...p, order: i }]));
    return data.repos.map((r) => {
      const c = curated.get(r.name);
      return {
        ...r,
        desc: c ? c[lang === "pt-BR" ? "pt" : "en"] : r.description,
        tags: c?.tags || [],
        demo: c?.demo || r.homepage || "",
        featured: !!c?.featured,
        order: c ? c.order : 999,
      };
    });
  }, [data, lang]);

  const languages = useMemo(() => {
    const count = {};
    repos.forEach((r) => r.languages.forEach((l) => { count[l] = (count[l] || 0) + 1; }));
    return Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, 8);
  }, [repos]);

  const visible = repos.filter((r) => filter === "all" || r.languages.includes(filter));
  const featured = visible.filter((r) => r.featured).sort((a, b) => a.order - b.order);
  const others = visible.filter((r) => !r.featured).sort((a, b) => a.order - b.order || b.pushedAt.localeCompare(a.pushedAt));

  return html`
    <${Section} id="projects" kicker=${t.projects.kicker} title=${t.projects.title} intro=${t.projects.intro} alt>
      ${error && html`<p class="notice">${t.projects.error} <a href=${CFG.github} target="_blank" rel="noopener">${t.projects.viewAll}</a></p>`}
      ${!data && !error && html`<p class="notice mono">${t.projects.loading}</p>`}
      ${data && html`
        <${Reveal} className="filters" role="group" aria-label="Filtro">
          ${["all", ...languages].map((l) => html`
            <button key=${l} type="button" class="filter" aria-pressed=${filter === l} onClick=${() => setFilter(l)}>
              ${l === "all" ? t.projects.all : html`<${LangDot} name=${l} />`}
            </button>`)}
        <//>
        ${featured.length > 0 && html`
          <div class="repo-grid featured-grid">
            ${featured.map((r, i) => html`<${Reveal} key=${r.name} delay=${(i % 2) * 80}><${RepoCard} repo=${r} t=${t} lang=${lang} featured /><//>`)}
          </div>`}
        ${others.length > 0 && html`
          <h3 class="subhead mono">${t.projects.more}</h3>
          <div class="repo-grid">
            ${others.map((r, i) => html`<${Reveal} key=${r.name} delay=${(i % 3) * 60}><${RepoCard} repo=${r} t=${t} lang=${lang} /><//>`)}
          </div>`}
        <div class="center">
          <a class="btn btn-ghost" href=${CFG.github} target="_blank" rel="noopener"><${Icon} name="github" />${t.projects.viewAll}</a>
        </div>`}
    <//>`;
}

function Articles({ t }) {
  return html`
    <${Section} id="articles" kicker=${t.articles.kicker} title=${t.articles.title} intro=${t.articles.intro}>
      <div class="articles-grid">
        ${t.articles.items.map((a, i) => html`
          <${Reveal} as="article" key=${i} delay=${i * 80} className="card article">
            <span class="article-num mono">#${String(i + 1).padStart(2, "0")}</span>
            <h3>${a.title}</h3>
            <p>${a.summary}</p>
            <div class="repo-links">
              <a href=${CFG.articles} target="_blank" rel="noopener"><${Icon} name="linkedin" size=${15} />${t.articles.read}</a>
              <a href=${`${CFG.github}/${a.repo}`} target="_blank" rel="noopener"><${Icon} name="github" size=${15} />${t.articles.code}</a>
            </div>
          <//>`)}
      </div>
      <div class="center">
        <a class="btn btn-ghost" href=${CFG.articles} target="_blank" rel="noopener">${t.articles.all}<${Icon} name="arrowRight" /></a>
      </div>
    <//>`;
}

function Contact({ t, lang }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CFG.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { window.location.href = `mailto:${CFG.email}`; }
  };

  return html`
    <${Section} id="contact" kicker=${t.contact.kicker} title=${t.contact.title} alt>
      <${Reveal} className="card contact-card">
        <p class="contact-text">${t.contact.text}</p>
        <div class="contact-email">
          <a class="email-link mono" href=${`mailto:${CFG.email}`}><${Icon} name="mail" size=${20} />${CFG.email}</a>
          <button type="button" class="btn btn-ghost btn-sm" onClick=${copy} aria-live="polite">
            <${Icon} name=${copied ? "check" : "copy"} size=${16} />${copied ? t.contact.copied : t.contact.copy}
          </button>
        </div>
        <div class="contact-links">
          <a class="btn btn-primary" href=${CFG.linkedin} target="_blank" rel="noopener me"><${Icon} name="linkedin" />linkedin.com/in/adrianoobarbosa</a>
          <a class="btn btn-ghost" href=${CFG.github} target="_blank" rel="noopener me"><${Icon} name="github" />github.com/${CFG.githubUser}</a>
        </div>
        <dl class="contact-facts">
          <div>
            <dt><${Icon} name="briefcase" size=${16} />${t.contact.rolesTitle}</dt>
            <dd><ul class="chips">${t.contact.roles.map((r) => html`<li key=${r} class="chip">${r}</li>`)}</ul></dd>
          </div>
          <div>
            <dt><${Icon} name="clock" size=${16} />${t.contact.availabilityTitle}</dt>
            <dd>${t.contact.availability}</dd>
          </div>
          <div>
            <dt><${Icon} name="file" size=${16} />${t.contact.cvTitle}</dt>
            <dd class="cv-links">
              ${LANGS.map((l) => html`
                <a key=${l} class=${`btn btn-sm ${l === lang ? "btn-primary" : "btn-ghost"}`} href=${CFG.cv[l]} download type="application/pdf" hrefLang=${l}>
                  <${Icon} name="download" size=${16} />${l === "pt-BR" ? t.contact.cvPt : t.contact.cvEn}
                </a>`)}
            </dd>
          </div>
        </dl>
      <//>
    <//>`;
}

function Footer({ t }) {
  return html`
    <footer class="footer">
      <div class="container footer-inner">
        <p>© ${new Date().getFullYear()} ${CFG.name}</p>
        <p class="muted">${t.footer.built} <a href=${`${CFG.github}/${CFG.githubUser.toLowerCase()}.github.io`} target="_blank" rel="noopener">${t.footer.source}</a></p>
      </div>
    </footer>`;
}

/* ---------- app ---------- */

function App() {
  const lang = routeLang();
  const [mode, setMode] = useStoredState("mode", "system");
  const t = I18N[lang] || I18N["pt-BR"];

  useEffect(() => {
    applyTheme(CFG.palette, mode);
    if (mode !== "system" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => applyTheme(CFG.palette, "system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  return html`
    <a class="skip" href="#about">${t.controls.skip}</a>
    <${Header} t=${t} lang=${lang} mode=${mode} setMode=${setMode} />
    <main>
      <${Hero} t=${t} lang=${lang} />
      <${About} t=${t} />
      <${Skills} t=${t} />
      <${Experience} t=${t} />
      <${Projects} t=${t} lang=${lang} />
      <${Articles} t=${t} />
      <${Contact} t=${t} lang=${lang} />
    </main>
    <${Footer} t=${t} />`;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
