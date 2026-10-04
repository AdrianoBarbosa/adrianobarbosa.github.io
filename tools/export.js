/*
 * Gera as versões legíveis por máquina do currículo a partir de config.js e i18n.js:
 *   - JSON-LD (schema.org ProfilePage + Person) para cada idioma
 *   - currículo em Markdown para cada idioma
 *   - JSON Resume (jsonresume.org) para cada idioma
 *   - llms.txt (índice para agentes de IA)
 *
 * Roda só no build (scripts/build.py abre tools/export.html num Chrome headless e lê o resultado).
 * O telefone não entra em nenhum desses arquivos.
 */
(function () {
  const CFG = window.SITE_CONFIG;
  const I18N = window.I18N;
  const LANGS = ["pt-BR", "en-US"];
  const ROUTES = { "pt-BR": "/", "en-US": "/en/" };
  const abs = (path) => CFG.siteUrl + path;

  function curatedProjects(repos, lang) {
    const byName = new Map(repos.map((r) => [r.name, r]));
    const key = lang === "pt-BR" ? "pt" : "en";
    const curated = I18N.projects
      .filter((p) => byName.has(p.repo))
      .map((p) => ({ ...byName.get(p.repo), desc: p[key], tags: p.tags, demo: p.demo || "", featured: !!p.featured }));
    const known = new Set(I18N.projects.map((p) => p.repo));
    const rest = repos.filter((r) => !known.has(r.name)).map((r) => ({ ...r, desc: r.description || "", tags: r.languages, featured: false }));
    return [...curated, ...rest];
  }

  function allSkills() {
    return [...new Set(I18N.skills.flatMap((g) => g.items))];
  }

  /* ---------- JSON-LD ---------- */

  function jsonLd(lang, repos) {
    const t = I18N[lang];
    const url = abs(ROUTES[lang]);
    const personId = CFG.siteUrl + "/#person";
    const person = {
      "@type": "Person",
      "@id": personId,
      name: CFG.name,
      alternateName: CFG.shortName,
      givenName: "Adriano",
      familyName: "Olivares Barbosa",
      jobTitle: t.hero.role.replace(" · ", ", "),
      description: t.summary,
      image: CFG.avatar,
      url: CFG.siteUrl + "/",
      email: "mailto:" + CFG.email,
      address: { "@type": "PostalAddress", addressLocality: CFG.city, addressRegion: CFG.region, addressCountry: CFG.country },
      nationality: { "@type": "Country", name: "Brazil" },
      sameAs: [CFG.linkedin, CFG.github],
      knowsAbout: allSkills(),
      knowsLanguage: [
        { "@type": "Language", name: "Portuguese", alternateName: "pt-BR" },
        { "@type": "Language", name: "English", alternateName: "en" },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: t.hero.role.split(" · ")[0],
        alternateName: [...new Set([...t.contact.roles, ...CFG.jobTitles])],
        occupationLocation: { "@type": "City", name: CFG.city + ", " + CFG.region + ", Brazil" },
        skills: allSkills().join(", "),
        experienceRequirements: t.stats[0].value + " " + t.stats[0].label,
      },
      alumniOf: [...new Set(t.education.items.map((e) => e.school))].map((name) => ({ "@type": "EducationalOrganization", name })),
      hasCredential: t.education.items.map((e) => ({
        "@type": "EducationalOccupationalCredential",
        name: e.course,
        credentialCategory: "degree",
        recognizedBy: { "@type": "EducationalOrganization", name: e.school },
        dateCreated: e.end,
      })),
      subjectOf: t.articles.items.map((a) => ({ "@type": "Article", headline: a.title, abstract: a.summary, url: CFG.articles, inLanguage: "pt-BR" })),
      owns: curatedProjects(repos, lang).map((r) => ({
        "@type": "SoftwareSourceCode",
        name: r.name,
        description: r.desc,
        codeRepository: r.url,
        programmingLanguage: r.languages,
      })),
    };
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": url + "#page",
          url,
          name: t.meta.title,
          description: t.meta.description,
          inLanguage: lang,
          mainEntity: { "@id": personId },
          dateModified: new Date().toISOString(),
          about: { "@id": personId },
          associatedMedia: LANGS.map((l) => ({
            "@type": "MediaObject",
            name: l === "pt-BR" ? "Currículo (PDF, português)" : "Resume (PDF, English)",
            contentUrl: abs(CFG.cv[l]),
            encodingFormat: "application/pdf",
            inLanguage: l,
          })),
        },
        person,
      ],
    };
  }

  /* ---------- Markdown ---------- */

  function markdown(lang, repos) {
    const t = I18N[lang];
    const pt = lang === "pt-BR";
    const L = pt
      ? { contact: "Contato", summary: "Resumo", roles: "Cargos de interesse", skills: "Competências técnicas", exp: "Experiência profissional",
          edu: "Formação", langs: "Idiomas", projects: "Projetos open source", articles: "Artigos", cv: "Currículo em PDF", site: "Site", location: "Localização" }
      : { contact: "Contact", summary: "Summary", roles: "Target roles", skills: "Technical skills", exp: "Professional experience",
          edu: "Education", langs: "Languages", projects: "Open source projects", articles: "Articles", cv: "PDF resume", site: "Website", location: "Location" };
    const out = [];
    out.push(`# ${CFG.name}`, "", `**${t.hero.role}**`, "");
    out.push(`- ${L.location}: ${t.hero.location}`);
    out.push(`- ${t.contact.availabilityTitle}: ${t.contact.availability}`);
    out.push(`- Email: ${CFG.email}`, `- LinkedIn: ${CFG.linkedin}`, `- GitHub: ${CFG.github}`, `- ${L.site}: ${abs(ROUTES[lang])}`);
    out.push(`- ${L.cv}: ${abs(CFG.cv[lang])}`, "");
    out.push(`## ${L.summary}`, "", t.summary, "");
    out.push(`## ${L.roles}`, "", t.contact.roles.join(" · "), "");
    out.push(`## ${L.skills}`, "");
    I18N.skills.forEach((g) => out.push(`- **${t.skills.groups[g.key]}:** ${g.items.join(", ")}`));
    out.push("", `_${t.skills.studying}_`, "");
    out.push(`## ${L.exp}`, "");
    t.experience.items.forEach((job) => {
      out.push(`### ${job.role} · ${job.company}`, "", job.period, "");
      job.bullets.forEach((b) => out.push(`- ${b}`));
      out.push("", `Stack: ${job.tech.join(", ")}`, "");
    });
    out.push(`## ${L.edu}`, "");
    t.education.items.forEach((e) => out.push(`- **${e.course}**, ${e.school} (${e.period})`));
    out.push("", `## ${L.langs}`, "");
    t.education.languages.forEach((l) => out.push(`- **${l.name}:** ${l.level}`));
    out.push("", `## ${L.projects}`, "");
    curatedProjects(repos, lang).forEach((r) => out.push(`- [${r.name}](${r.url})${r.desc ? ": " + r.desc : ""}`));
    out.push("", `## ${L.articles}`, "", t.articles.intro, "");
    t.articles.items.forEach((a) => out.push(`- **${a.title}**: ${a.summary} (${CFG.github}/${a.repo})`));
    out.push("");
    return out.join("\n");
  }

  /* ---------- JSON Resume ---------- */

  function jsonResume(lang, repos) {
    const t = I18N[lang];
    return {
      $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
      basics: {
        name: CFG.name,
        label: t.hero.role,
        image: CFG.avatar,
        email: CFG.email,
        url: abs(ROUTES[lang]),
        summary: t.summary,
        location: { city: CFG.city, region: CFG.region, countryCode: CFG.country },
        profiles: [
          { network: "LinkedIn", username: "adrianoobarbosa", url: CFG.linkedin },
          { network: "GitHub", username: CFG.githubUser, url: CFG.github },
        ],
      },
      work: t.experience.items.map((j) => ({
        name: j.company, position: j.role, startDate: j.start, ...(j.end ? { endDate: j.end } : {}), highlights: j.bullets, keywords: j.tech,
      })),
      education: t.education.items.map((e) => ({ institution: e.school, studyType: e.course, startDate: e.start, endDate: e.end })),
      skills: I18N.skills.map((g) => ({ name: t.skills.groups[g.key], keywords: g.items })),
      languages: t.education.languages.map((l) => ({ language: l.name, fluency: l.level })),
      projects: curatedProjects(repos, lang).map((r) => ({ name: r.name, description: r.desc, url: r.url, keywords: r.tags })),
      meta: { canonical: abs(lang === "pt-BR" ? "/resume.json" : "/resume.en.json"), lastModified: new Date().toISOString(), version: "v1.0.0" },
    };
  }

  /* ---------- llms.txt ---------- */

  function llmsTxt(repos) {
    const en = I18N["en-US"];
    const out = [];
    out.push(`# ${CFG.name}`, "", `> ${en.hero.role}. ${en.summary}`, "");
    out.push(
      "Key facts for recruiters and AI assistants:",
      "",
      `- Target roles: ${en.contact.roles.join(", ")}`,
      `- Availability: ${en.contact.availability}`,
      `- Core stack: C#/.NET, Node.js/TypeScript (NestJS), Python, Go, SQL Server, MySQL, Redis, Docker, AWS, GitHub Actions`,
      `- Experience: ${en.stats.map((s) => `${s.value} ${s.label}`).join("; ")}`,
      `- Languages: Portuguese (native), English (advanced reading and writing, intermediate conversation)`,
      `- Contact: ${CFG.email} · ${CFG.linkedin}`,
      "",
      "## Resume",
      "",
      `- [Resume in English (Markdown)](${abs("/resume.en-US.md")}): full resume as plain text`,
      `- [Currículo em português (Markdown)](${abs("/resume.pt-BR.md")}): full resume in Brazilian Portuguese`,
      `- [Resume PDF, English](${abs(CFG.cv["en-US"])})`,
      `- [Currículo PDF, português](${abs(CFG.cv["pt-BR"])})`,
      `- [JSON Resume, English](${abs("/resume.en.json")}): structured data following jsonresume.org`,
      `- [JSON Resume, português](${abs("/resume.json")})`,
      "",
      "## Pages",
      "",
      `- [Website in English](${abs("/en/")})`,
      `- [Site em português](${abs("/")})`,
      `- [LinkedIn](${CFG.linkedin})`,
      `- [GitHub](${CFG.github})`,
      "",
      "## Open source projects",
      "",
    );
    curatedProjects(repos, "en-US").forEach((r) => out.push(`- [${r.name}](${r.url})${r.desc ? ": " + r.desc : ""}`));
    out.push("", "## Articles (LinkedIn, in Portuguese)", "");
    en.articles.items.forEach((a) => out.push(`- [${a.title}](${CFG.articles}): ${a.summary} Code: ${CFG.github}/${a.repo}`));
    out.push("");
    return out.join("\n");
  }

  async function run() {
    const data = await fetch("/data/repos.json").then((r) => r.json());
    const repos = data.repos;
    const result = { meta: {}, jsonld: {}, files: {} };
    for (const lang of LANGS) {
      const t = I18N[lang];
      result.meta[lang] = { title: t.meta.title, description: t.meta.description, route: ROUTES[lang] };
      result.jsonld[lang] = jsonLd(lang, repos);
      result.files[`resume.${lang}.md`] = markdown(lang, repos);
    }
    result.files["resume.json"] = JSON.stringify(jsonResume("pt-BR", repos), null, 2) + "\n";
    result.files["resume.en.json"] = JSON.stringify(jsonResume("en-US", repos), null, 2) + "\n";
    result.files["llms.txt"] = llmsTxt(repos);
    document.getElementById("out").textContent = JSON.stringify(result);
  }

  run().catch((err) => { document.getElementById("out").textContent = "ERROR: " + err; });
})();
