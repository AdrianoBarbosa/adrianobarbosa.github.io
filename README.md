# adrianobarbosa.github.io

Página pessoal de Adriano Olivares Barbosa, Desenvolvedor Backend Sênior e Fullstack (.NET, Node.js, Python, Go).

**Site:** https://adrianobarbosa.github.io

*[English below](#english)*

## Como funciona

- React 19 carregado via CDN ([esm.sh](https://esm.sh)) com import map e [htm](https://github.com/developit/htm) no lugar do JSX. Não tem Node.js, bundler nem etapa de build: é só HTML, CSS e JavaScript estático.
- Modo claro, escuro ou sistema, escolhido pelo visitante e salvo no navegador.
- Português (pt-BR) e inglês (en-US), detectados pelo idioma do navegador e alternáveis no cabeçalho.
- Portfólio lido de `data/repos.json`, gerado com o GitHub CLI a partir dos repositórios públicos.

## Estrutura

```
index.html              página, import map e aplicação do tema antes do primeiro paint
assets/css/styles.css   estilos, todos baseados nas variáveis da paleta
assets/js/config.js     configuração interna: paleta ativa, links e dados de contato
assets/js/themes.js     paletas de cores (variantes claro e escuro)
assets/js/i18n.js       todo o conteúdo em pt-BR e en-US, incluindo descrições dos projetos
assets/js/app.js        componentes React
data/repos.json         repositórios públicos (gerado)
scripts/update-repos.sh gera o repos.json com o gh
```

## Paletas

A paleta ativa fica em `assets/js/config.js`, na chave `palette`. Não há seletor na interface. Opções:

`monokai` (padrão), `dracula`, `solarized`, `nord`, `gruvbox`, `one`, `tokyonight`, `catppuccin`, `github`

Cada paleta tem variante clara e escura, e o modo escolhido pelo visitante decide qual delas é aplicada.

## Rodando localmente

Qualquer servidor estático serve, por exemplo:

```bash
python3 -m http.server 8000
```

Para atualizar a lista de repositórios:

```bash
./scripts/update-repos.sh
```

## Deploy

O workflow `.github/workflows/pages.yml` publica no GitHub Pages a cada push na `main`, toda segunda-feira e sob demanda. Antes de publicar, ele regenera o `repos.json` com o `gh`, então novos repositórios públicos aparecem sozinhos. Para destacar um projeto ou trocar a descrição dele, edite a lista `projects` em `assets/js/i18n.js`.

---

## English

Personal page of Adriano Olivares Barbosa, Senior Backend and Fullstack Developer.

- React 19 via CDN (esm.sh) with an import map and htm instead of JSX. No Node.js, no bundler, no build step.
- Light, dark or system mode, plus Portuguese and English.
- The portfolio comes from `data/repos.json`, generated with the GitHub CLI and refreshed on every deploy.
- The color palette is set internally in `assets/js/config.js` (`monokai` by default; also `dracula`, `solarized`, `nord`, `gruvbox`, `one`, `tokyonight`, `catppuccin`, `github`).

Run locally with any static server, such as `python3 -m http.server 8000`.
