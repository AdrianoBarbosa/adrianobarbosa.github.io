/*
 * Textos do site em pt-BR e en-US.
 * Para editar o conteúdo (resumo, experiência, projetos), altere apenas este arquivo.
 */
(function () {
  const years = new Date().getFullYear() - window.SITE_CONFIG.careerStart;

  // Descrições curadas dos repositórios. Os marcados como featured aparecem em destaque,
  // na ordem desta lista. Os demais repositórios públicos entram em "Mais repositórios".
  const projects = [
    {
      repo: "event-loop-async-goroutines",
      featured: true,
      tags: ["Go", ".NET", "Node.js"],
      pt: "Exemplos de concorrência lado a lado em Node.js, .NET e Go: event loop, async/await e goroutines. Código do artigo \"Três jeitos de esperar\", com CI rodando nas três plataformas.",
      en: "Side-by-side concurrency examples in Node.js, .NET and Go: event loop, async/await and goroutines. Companion code for the \"Three ways to wait\" article, with CI on all three platforms.",
    },
    {
      repo: "abortsignal-cancellationtoken-context",
      featured: true,
      tags: ["Go", ".NET", "Node.js"],
      pt: "Cancelamento em Node.js, .NET e Go: AbortSignal, CancellationToken e context.Context. Cinco cenários (timeout, propagação, cascata e mais), com mock server e testes nas versões mínima e atual de cada plataforma.",
      en: "Cancellation in Node.js, .NET and Go: AbortSignal, CancellationToken and context.Context. Five scenarios (timeout, propagation, cascading and more), with a mock server and tests on the minimum and latest version of each platform.",
    },
    {
      repo: "jaspion-dotnet",
      featured: true,
      tags: [".NET", "C#"],
      pt: "Boilerplate de estudos em .NET Core, com Web API e camada de domínio separadas.",
      en: "A .NET Core study boilerplate, with separate Web API and domain layers.",
    },
    {
      repo: "nextLevelWeek-ecoleta",
      featured: true,
      tags: ["TypeScript", "Node.js", "React", "React Native"],
      pt: "Ecoleta: encontra pontos de coleta de resíduos. API em Node.js com Express 5, JWT e SQLite, web em React 19 com Vite, app em React Native com Expo e testes com Vitest e Supertest.",
      en: "Ecoleta: finds waste collection points. Node.js API with Express 5, JWT and SQLite, React 19 web app with Vite, React Native app with Expo, and tests with Vitest and Supertest.",
    },
    {
      repo: "be-the-hero",
      tags: ["Node.js", "React"],
      pt: "Plataforma que conecta ONGs a pessoas dispostas a ajudar, com API Node.js e frontend React.",
      en: "Platform connecting NGOs to people willing to help, with a Node.js API and a React frontend.",
    },
    {
      repo: "nlw3-happy",
      tags: ["TypeScript", "React", "React Native"],
      pt: "Happy: cadastra orfanatos e mostra no mapa para agendar visitas, com backend, web e mobile em TypeScript.",
      en: "Happy: registers orphanages and shows them on a map so people can schedule visits, with backend, web and mobile in TypeScript.",
    },
    {
      repo: "setup",
      tags: ["Shell", "Linux"],
      pt: "Scripts de pós-instalação para distros baseadas em Ubuntu e Raspberry Pi.",
      en: "Post-install scripts for Ubuntu-based distros and Raspberry Pi.",
    },
    {
      repo: "site-suelen-gomes-psicologa",
      tags: ["HTML", "CSS"],
      demo: "https://suelengomes.com.br/",
      pt: "Site institucional para uma psicóloga, feito sob demanda.",
      en: "Business website for a psychologist, built as a freelance project.",
    },
    {
      repo: "site-cleusa-moda-fashion",
      tags: ["HTML", "CSS"],
      demo: "http://cleusamf.com.br/",
      pt: "Site institucional para uma loja de moda, feito sob demanda.",
      en: "Business website for a fashion store, built as a freelance project.",
    },
    {
      repo: "codenation-react",
      tags: ["React"],
      pt: "Exercícios do programa de aceleração em React da Codenation.",
      en: "Exercises from Codenation's React acceleration program.",
    },
  ];

  const skills = [
    { key: "languages", items: ["C#", "TypeScript", "JavaScript", "Python", "Go", "Perl", "SQL"] },
    { key: "dotnet", items: [".NET 10 / 8 / 6", "ASP.NET Core", "ASP.NET MVC", "Web API", "Entity Framework Core", "Dapper", "ADO.NET", "WPF", "WCF", "Hangfire"] },
    { key: "node", items: ["Node.js", "NestJS", "TypeORM", "Express"] },
    { key: "data", items: ["SQL Server", "MySQL", "Redis", "Firebird"] },
    { key: "infra", items: ["Docker", "Podman", "GitHub Actions", "AWS", "Azure", "Linux", "Git"] },
    { key: "observability", items: ["Datadog", "Grafana"] },
    { key: "architecture", items: ["REST APIs", "Microservices", "Distributed Systems", "Async Processing", "Multi-tenant", "SOLID", "Clean Architecture"] },
    { key: "frontend", items: ["Angular", "React", "HTML", "CSS"] },
    { key: "ai", items: ["Claude Code", "Gemini", "Spec-Driven Development", "Skills & Tools"] },
    { key: "testing", items: ["NUnit", "Moq", "Regression Tests", "Scrum", "Kanban"] },
  ];

  const pt = {
    htmlLang: "pt-BR",
    meta: {
      title: "Adriano Barbosa | Desenvolvedor Backend Sênior",
      description: "Desenvolvedor Backend Sênior e Fullstack com " + years + " anos de carreira em .NET, Node.js, Python e Go. Currículo, portfólio e contato.",
    },
    nav: { about: "Sobre", skills: "Stack", experience: "Experiência", projects: "Projetos", articles: "Artigos", contact: "Contato" },
    controls: {
      language: "Idioma",
      theme: "Tema",
      modes: { light: "Claro", dark: "Escuro", system: "Sistema" },
      skip: "Pular para o conteúdo",
      menu: "Abrir menu",
    },
    hero: {
      status: "Disponível para novas oportunidades",
      greeting: "Olá, eu sou",
      role: "Desenvolvedor Backend Sênior · Fullstack",
      tagline: years + " anos construindo APIs, sistemas distribuídos e processamento assíncrono com .NET, Node.js e Python. Hoje mergulhado em Go e escrevendo sobre o que aprendo.",
      ctaContact: "Vamos conversar",
      ctaProjects: "Ver projetos",
      location: "Limeira, SP, Brasil · Remoto ou híbrido",
      codeRole: "Backend Sênior",
      codeFocus: ["APIs REST", "Sistemas distribuídos", "Mensageria"],
    },
    stats: [
      { value: years + "+", label: "anos de carreira" },
      { value: "9", label: "anos com .NET, do desktop à web" },
      { value: "5+", label: "anos em e-commerce de alto volume" },
    ],
    about: {
      title: "Sobre mim",
      kicker: "whoami",
      paragraphs: [
        "Sou desenvolvedor desde " + window.SITE_CONFIG.careerStart + ". Comecei com Delphi no varejo, passei quase nove anos evoluindo um ERP em .NET (desktop, serviços e web) e, nos últimos anos, atuei como fullstack num e-commerce de alto volume, com Node.js, NestJS, Python, MySQL e Redis.",
        "Gosto de backend que aguenta tráfego: APIs bem desenhadas, comunicação assíncrona entre serviços, observabilidade com Datadog e Grafana e deploy automatizado. Trabalho orientado a SOLID e Clean Architecture, buscando código limpo, testável e fácil de evoluir.",
        "Uso IA no dia a dia (Claude Code, Spec-Driven Development, criação de skills) com revisão crítica de tudo o que é gerado. E publico no LinkedIn uma série comparando Go, .NET e Node.js, sempre com repositório de código aberto.",
      ],
    },
    skills: {
      title: "Stack e competências",
      kicker: "stack",
      groups: {
        languages: "Linguagens", dotnet: ".NET", node: "Node.js", data: "Dados", infra: "Infra e DevOps",
        observability: "Observabilidade", architecture: "Arquitetura", frontend: "Frontend",
        ai: "IA no desenvolvimento", testing: "Testes e processos",
      },
      studying: "Estudando agora: Go, mensageria com Kafka e RabbitMQ, NoSQL",
    },
    experience: {
      title: "Experiência",
      kicker: "git log --career",
      present: "Atual",
      items: [
        {
          role: "Desenvolvedor Backend .NET",
          company: "Projeto independente (autônomo)",
          period: "mar. 2026 · Atual",
          bullets: [
            "Backend de uma plataforma SaaS de gestão de haras (plantel, reprodução, estoque, leilões, faturamento e cobrança) com APIs REST em C#, ASP.NET Core (.NET 10), Entity Framework Core e SQL Server.",
            "Arquitetura multi-tenant em que cada cliente tem seu próprio banco de dados.",
            "Entregas nos módulos de reprodução, estoque e financeiro, como listagem paginada de ciclos, relatório de estoque, cancelamento de boletos em faturas e filtro por período na gestão de cobranças.",
            "Correção de bugs em produção com foco em integridade de dados (operações atômicas, consistência de estoque), sempre com testes de regressão em NUnit e Moq.",
          ],
          tech: ["C#", ".NET 10", "ASP.NET Core", "EF Core", "SQL Server", "NUnit"],
        },
        {
          role: "Desenvolvedor Full Stack Sênior",
          company: "KaBuM!",
          period: "fev. 2021 · set. 2026",
          bullets: [
            "APIs e serviços internos em Python, Node.js com TypeScript, NestJS e TypeORM, integrados a MySQL e Redis, num e-commerce com alto volume de requisições.",
            "Estabilidade e disponibilidade das aplicações, com monitoramento e investigação de incidentes via Datadog e Grafana.",
            "Comunicação assíncrona entre serviços com fila persistida em banco (padrão queue table), cobrindo enfileiramento, consumo e controle de estado das mensagens.",
            "Manutenção evolutiva de sistemas legados em Perl, mantendo operações críticas em funcionamento.",
            "Containerização com Docker e automação de build e deploy com GitHub Actions; interfaces web em Angular.",
            "Adoção de Claude Code e Gemini no fluxo de desenvolvimento, sempre com validação e revisão humana antes do merge.",
          ],
          tech: ["Node.js", "TypeScript", "NestJS", "Python", "MySQL", "Redis", "Docker", "Datadog", "Angular"],
        },
        {
          role: "Desenvolvedor Full Stack .NET",
          company: "Data System",
          period: "abr. 2012 · jan. 2021",
          bullets: [
            "Evolução dos módulos de vendas, PDV, estoque, financeiro, fiscal e relatórios do SIAC/USE, ERP para varejo e atacado de calçados e confecções, em C# com .NET Framework e WPF.",
            "Serviços WCF e migração de serviços legados para APIs REST com ASP.NET Web API; aplicações web com ASP.NET MVC.",
            "Acesso a dados em SQL Server com Dapper, ADO.NET e Entity Framework, incluindo otimização de consultas.",
            "Participação na migração do sistema legado em Delphi e Firebird para .NET e SQL Server.",
            "Rotinas fiscais do varejo, com emissão de NF-e, NFC-e e SAT.",
          ],
          tech: ["C#", ".NET Framework", "WPF", "WCF", "ASP.NET MVC", "SQL Server", "Dapper"],
        },
        {
          role: "Analista de Sistemas / Suporte Técnico",
          company: "BrainSoft Informática",
          period: "out. 2009 · nov. 2011",
          bullets: [
            "Sistemas para varejo em Delphi: PDV, controle de estoque, administração financeira e controle de frota, incluindo importação e exportação de dados fiscais.",
          ],
          tech: ["Delphi", "SQL"],
        },
      ],
    },
    education: {
      title: "Formação",
      items: [
        { course: "Pós-graduação em Desenvolvimento de Aplicações Mobile", school: "Anhanguera Educacional", period: "2020 · 2021" },
        { course: "Bacharelado em Ciência da Computação", school: "Anhanguera Educacional", period: "2012 · 2015" },
        { course: "Técnico em Informática", school: "COTIL / UNICAMP", period: "2008 · 2009" },
      ],
      languagesTitle: "Idiomas",
      languages: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Leitura e escrita avançadas, conversação intermediária" },
      ],
    },
    projects: {
      title: "Portfólio no GitHub",
      kicker: "gh repo list",
      intro: "Repositórios públicos, sincronizados automaticamente com o GitHub.",
      all: "Todos",
      more: "Mais repositórios",
      viewAll: "Ver perfil completo no GitHub",
      updated: "Atualizado em",
      loading: "Carregando repositórios...",
      error: "Não foi possível carregar os repositórios agora.",
      stars: "estrelas",
      demo: "Demo",
      code: "Código",
    },
    articles: {
      title: "Artigos",
      kicker: "cat articles/*.md",
      intro: "Uma série no LinkedIn sobre o que um dev sênior de .NET e Node.js aprende ao estudar Go. Cada artigo compara as três plataformas e tem código aberto no GitHub.",
      items: [
        {
          title: "Três jeitos de esperar: event loop, async/await e goroutines",
          summary: "Como Node.js, .NET e Go lidam com concorrência, e o que muda na cabeça de quem vem do async/await.",
          repo: "event-loop-async-goroutines",
        },
        {
          title: "context.Context vs CancellationToken: quem avisa que já pode parar",
          summary: "Cancelamento em Node.js, .NET e Go: timeout, propagação, cascata e as armadilhas de cada modelo.",
          repo: "abortsignal-cancellationtoken-context",
        },
      ],
      read: "Ler no LinkedIn",
      code: "Ver código",
      all: "Todos os artigos",
    },
    contact: {
      title: "Vamos conversar?",
      kicker: "contato",
      text: "Estou aberto a oportunidades como Desenvolvedor Backend ou Fullstack Sênior, remoto ou híbrido. Mande um e-mail ou me chame no LinkedIn.",
      email: "E-mail",
      copy: "Copiar e-mail",
      copied: "Copiado!",
    },
    footer: {
      built: "Feito com React via CDN, sem build. Hospedado no GitHub Pages.",
      source: "Código-fonte",
    },
  };

  const en = {
    htmlLang: "en-US",
    meta: {
      title: "Adriano Barbosa | Senior Backend Developer",
      description: "Senior Backend and Fullstack Developer with " + years + " years of experience in .NET, Node.js, Python and Go. Resume, portfolio and contact.",
    },
    nav: { about: "About", skills: "Stack", experience: "Experience", projects: "Projects", articles: "Articles", contact: "Contact" },
    controls: {
      language: "Language",
      theme: "Theme",
      modes: { light: "Light", dark: "Dark", system: "System" },
      skip: "Skip to content",
      menu: "Open menu",
    },
    hero: {
      status: "Open to new opportunities",
      greeting: "Hi, I'm",
      role: "Senior Backend Developer · Fullstack",
      tagline: years + " years building APIs, distributed systems and asynchronous processing with .NET, Node.js and Python. Now diving deep into Go and writing about what I learn.",
      ctaContact: "Let's talk",
      ctaProjects: "See projects",
      location: "Limeira, SP, Brazil · Remote or hybrid",
      codeRole: "Senior Backend",
      codeFocus: ["REST APIs", "Distributed systems", "Messaging"],
    },
    stats: [
      { value: years + "+", label: "years of experience" },
      { value: "9", label: "years with .NET, from desktop to web" },
      { value: "5+", label: "years in high-volume e-commerce" },
    ],
    about: {
      title: "About me",
      kicker: "whoami",
      paragraphs: [
        "I've been a developer since " + window.SITE_CONFIG.careerStart + ". I started with Delphi in retail, spent almost nine years evolving a .NET ERP (desktop, services and web) and, more recently, worked as a fullstack developer at a high-volume e-commerce company with Node.js, NestJS, Python, MySQL and Redis.",
        "I enjoy backends that handle real traffic: well-designed APIs, asynchronous communication between services, observability with Datadog and Grafana, and automated deployments. My work is guided by SOLID and Clean Architecture, aiming for clean, testable code that is easy to evolve.",
        "I use AI every day (Claude Code, Spec-Driven Development, building skills) and critically review everything it generates. I also publish a LinkedIn series comparing Go, .NET and Node.js, always with open source code.",
      ],
    },
    skills: {
      title: "Stack and skills",
      kicker: "stack",
      groups: {
        languages: "Languages", dotnet: ".NET", node: "Node.js", data: "Data", infra: "Infra and DevOps",
        observability: "Observability", architecture: "Architecture", frontend: "Frontend",
        ai: "AI in development", testing: "Testing and process",
      },
      studying: "Currently studying: Go, messaging with Kafka and RabbitMQ, NoSQL",
    },
    experience: {
      title: "Experience",
      kicker: "git log --career",
      present: "Present",
      items: [
        {
          role: ".NET Backend Developer",
          company: "Independent project (freelance)",
          period: "Mar 2026 · Present",
          bullets: [
            "Backend for a SaaS platform for horse breeding farm management (herd, breeding, inventory, auctions, invoicing and billing) with REST APIs in C#, ASP.NET Core (.NET 10), Entity Framework Core and SQL Server.",
            "Multi-tenant architecture in which each customer has its own database.",
            "Features in the breeding, inventory and financial modules, such as paginated cycle listings, the inventory report, cancellation of bank slips on invoices and date-range filters in billing.",
            "Production bug fixing focused on data integrity (atomic operations, inventory consistency), always backed by regression tests with NUnit and Moq.",
          ],
          tech: ["C#", ".NET 10", "ASP.NET Core", "EF Core", "SQL Server", "NUnit"],
        },
        {
          role: "Senior Full Stack Developer",
          company: "KaBuM!",
          period: "Feb 2021 · Sep 2026",
          bullets: [
            "Internal APIs and services in Python, Node.js with TypeScript, NestJS and TypeORM, integrated with MySQL and Redis, in a high-traffic e-commerce environment.",
            "Application stability and availability, with monitoring and incident investigation through Datadog and Grafana.",
            "Asynchronous communication between services using a database-persisted queue (queue table pattern), covering enqueueing, consumption and message state control.",
            "Evolutionary maintenance of legacy Perl systems, keeping critical operations running.",
            "Containerization with Docker and build and deploy automation with GitHub Actions; web interfaces in Angular.",
            "Adoption of Claude Code and Gemini in the development workflow, always with human validation and review before merging.",
          ],
          tech: ["Node.js", "TypeScript", "NestJS", "Python", "MySQL", "Redis", "Docker", "Datadog", "Angular"],
        },
        {
          role: "Full Stack .NET Developer",
          company: "Data System",
          period: "Apr 2012 · Jan 2021",
          bullets: [
            "Evolution of the sales, POS, inventory, financial, tax and reporting modules of SIAC/USE, an ERP for footwear and clothing retail and wholesale, in C# with .NET Framework and WPF.",
            "WCF services and migration of legacy services to REST APIs with ASP.NET Web API; web applications with ASP.NET MVC.",
            "Data access on SQL Server with Dapper, ADO.NET and Entity Framework, including query optimization.",
            "Took part in migrating the legacy Delphi and Firebird system to .NET and SQL Server.",
            "Retail tax routines, issuing Brazilian electronic tax documents (NF-e, NFC-e and SAT).",
          ],
          tech: ["C#", ".NET Framework", "WPF", "WCF", "ASP.NET MVC", "SQL Server", "Dapper"],
        },
        {
          role: "Systems Analyst / Technical Support",
          company: "BrainSoft Informática",
          period: "Oct 2009 · Nov 2011",
          bullets: [
            "Retail systems in Delphi: POS, inventory control, financial administration and fleet management, including import and export of tax data.",
          ],
          tech: ["Delphi", "SQL"],
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        { course: "Postgraduate Degree in Mobile Application Development", school: "Anhanguera Educacional", period: "2020 · 2021" },
        { course: "Bachelor's Degree in Computer Science", school: "Anhanguera Educacional", period: "2012 · 2015" },
        { course: "Technical Degree in Information Technology", school: "COTIL / UNICAMP", period: "2008 · 2009" },
      ],
      languagesTitle: "Languages",
      languages: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Advanced reading and writing, intermediate conversation" },
      ],
    },
    projects: {
      title: "GitHub portfolio",
      kicker: "gh repo list",
      intro: "Public repositories, automatically synced from GitHub.",
      all: "All",
      more: "More repositories",
      viewAll: "See full GitHub profile",
      updated: "Updated",
      loading: "Loading repositories...",
      error: "Couldn't load the repositories right now.",
      stars: "stars",
      demo: "Demo",
      code: "Code",
    },
    articles: {
      title: "Articles",
      kicker: "cat articles/*.md",
      intro: "A LinkedIn series (in Portuguese) about what a senior .NET and Node.js developer learns while studying Go. Each article compares the three platforms and comes with open source code.",
      items: [
        {
          title: "Three ways to wait: event loop, async/await and goroutines",
          summary: "How Node.js, .NET and Go handle concurrency, and what changes for someone coming from async/await.",
          repo: "event-loop-async-goroutines",
        },
        {
          title: "context.Context vs CancellationToken: who says it's time to stop",
          summary: "Cancellation in Node.js, .NET and Go: timeouts, propagation, cascading and the pitfalls of each model.",
          repo: "abortsignal-cancellationtoken-context",
        },
      ],
      read: "Read on LinkedIn",
      code: "See code",
      all: "All articles",
    },
    contact: {
      title: "Let's talk?",
      kicker: "contact",
      text: "I'm open to Senior Backend or Fullstack Developer roles, remote or hybrid. Send me an email or reach out on LinkedIn.",
      email: "Email",
      copy: "Copy email",
      copied: "Copied!",
    },
    footer: {
      built: "Built with React via CDN, no build step. Hosted on GitHub Pages.",
      source: "Source code",
    },
  };

  window.I18N = { "pt-BR": pt, "en-US": en, projects, skills };
})();
