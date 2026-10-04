/*
 * Paletas de cores do site. Cada paleta tem uma variante "dark" e uma "light",
 * e o modo (claro, escuro ou sistema) escolhe qual delas aplicar.
 *
 * A paleta ativa é definida em assets/js/config.js (SITE_CONFIG.palette).
 * Não existe seletor de paleta na interface: a troca é só por configuração.
 *
 * Tokens:
 *   bg, surface, surface2, border  fundo e camadas
 *   text, heading, muted           textos
 *   accent, accent2, onAccent      destaque e texto sobre o destaque
 *   keyword, string, func, number, type, comment   cores de sintaxe
 */
(function () {
  const PALETTES = {
    monokai: {
      label: "Monokai",
      dark: {
        bg: "#272822", surface: "#2e2f29", surface2: "#3e3d32", border: "#49483e",
        text: "#e6e6dc", heading: "#f8f8f2", muted: "#a59f85",
        accent: "#a6e22e", accent2: "#f92672", onAccent: "#1e1f1a",
        keyword: "#f92672", string: "#e6db74", func: "#a6e22e", number: "#ae81ff", type: "#66d9ef", comment: "#88846f",
      },
      light: {
        bg: "#faf4f2", surface: "#ffffff", surface2: "#f1e8e5", border: "#e2d6d2",
        text: "#3b3539", heading: "#29242a", muted: "#6e6669",
        accent: "#c0306a", accent2: "#269d69", onAccent: "#ffffff",
        keyword: "#e14775", string: "#b0690a", func: "#1f8a5b", number: "#7058be", type: "#1c8ca8", comment: "#918c8e",
      },
    },
    dracula: {
      label: "Dracula",
      dark: {
        bg: "#282a36", surface: "#2f3242", surface2: "#383a4c", border: "#44475a",
        text: "#e4e4de", heading: "#f8f8f2", muted: "#a2abd2",
        accent: "#bd93f9", accent2: "#ff79c6", onAccent: "#1e1f29",
        keyword: "#ff79c6", string: "#f1fa8c", func: "#50fa7b", number: "#bd93f9", type: "#8be9fd", comment: "#7a88b8",
      },
      light: {
        bg: "#fffbeb", surface: "#ffffff", surface2: "#f4efdc", border: "#e3dcc2",
        text: "#2b2b2b", heading: "#1f1f1f", muted: "#635d97",
        accent: "#644ac9", accent2: "#a3144d", onAccent: "#ffffff",
        keyword: "#a3144d", string: "#846e15", func: "#14710a", number: "#644ac9", type: "#036a96", comment: "#6c664b",
      },
    },
    solarized: {
      label: "Solarized",
      dark: {
        bg: "#002b36", surface: "#06323e", surface2: "#073642", border: "#11505e",
        text: "#93a1a1", heading: "#eee8d5", muted: "#839496",
        accent: "#2aa198", accent2: "#b58900", onAccent: "#002b36",
        keyword: "#859900", string: "#2aa198", func: "#268bd2", number: "#d33682", type: "#b58900", comment: "#6c8389",
      },
      light: {
        bg: "#fdf6e3", surface: "#fffcf2", surface2: "#eee8d5", border: "#ddd6c1",
        text: "#4f6168", heading: "#073642", muted: "#657b83",
        accent: "#1f7f78", accent2: "#cb4b16", onAccent: "#fdf6e3",
        keyword: "#728200", string: "#1f7f78", func: "#1f6fae", number: "#c02f75", type: "#946f00", comment: "#7f8f8f",
      },
    },
    nord: {
      label: "Nord",
      dark: {
        bg: "#2e3440", surface: "#353c4a", surface2: "#3b4252", border: "#4c566a",
        text: "#d8dee9", heading: "#eceff4", muted: "#a5afc2",
        accent: "#88c0d0", accent2: "#b48ead", onAccent: "#2e3440",
        keyword: "#81a1c1", string: "#a3be8c", func: "#88c0d0", number: "#b48ead", type: "#8fbcbb", comment: "#7b88a1",
      },
      light: {
        bg: "#eceff4", surface: "#f8f9fb", surface2: "#e5e9f0", border: "#d8dee9",
        text: "#3b4252", heading: "#2e3440", muted: "#566176",
        accent: "#4c6f9c", accent2: "#a1587f", onAccent: "#ffffff",
        keyword: "#4c6f9c", string: "#4d7a35", func: "#2f7a8f", number: "#8e5a85", type: "#3b7f7c", comment: "#7b879c",
      },
    },
    gruvbox: {
      label: "Gruvbox",
      dark: {
        bg: "#282828", surface: "#2f2d2c", surface2: "#3c3836", border: "#504945",
        text: "#ebdbb2", heading: "#fbf1c7", muted: "#bdae93",
        accent: "#fe8019", accent2: "#b8bb26", onAccent: "#282828",
        keyword: "#fb4934", string: "#b8bb26", func: "#8ec07c", number: "#d3869b", type: "#fabd2f", comment: "#928374",
      },
      light: {
        bg: "#fbf1c7", surface: "#fdf6dc", surface2: "#f2e5bc", border: "#d5c4a1",
        text: "#3c3836", heading: "#282828", muted: "#665c54",
        accent: "#af3a03", accent2: "#79740e", onAccent: "#fbf1c7",
        keyword: "#9d0006", string: "#79740e", func: "#427b58", number: "#8f3f71", type: "#b57614", comment: "#7c6f64",
      },
    },
    one: {
      label: "One Dark / One Light",
      dark: {
        bg: "#282c34", surface: "#2c313a", surface2: "#333842", border: "#3e4451",
        text: "#bcc2cd", heading: "#e6e6e6", muted: "#8b919c",
        accent: "#61afef", accent2: "#c678dd", onAccent: "#1e2127",
        keyword: "#c678dd", string: "#98c379", func: "#61afef", number: "#d19a66", type: "#e5c07b", comment: "#7f848e",
      },
      light: {
        bg: "#fafafa", surface: "#ffffff", surface2: "#f0f0f1", border: "#dcdcde",
        text: "#383a42", heading: "#202227", muted: "#62656f",
        accent: "#3168d8", accent2: "#a626a4", onAccent: "#ffffff",
        keyword: "#a626a4", string: "#3f8a3e", func: "#3168d8", number: "#986801", type: "#a16f00", comment: "#8a8b92",
      },
    },
    tokyonight: {
      label: "Tokyo Night",
      dark: {
        bg: "#1a1b26", surface: "#1f2130", surface2: "#24283b", border: "#2f3549",
        text: "#c0caf5", heading: "#dfe5ff", muted: "#9aa5ce",
        accent: "#7aa2f7", accent2: "#bb9af7", onAccent: "#16161e",
        keyword: "#bb9af7", string: "#9ece6a", func: "#7aa2f7", number: "#ff9e64", type: "#2ac3de", comment: "#6b74a3",
      },
      light: {
        bg: "#e1e2e7", surface: "#eceef3", surface2: "#d5d6db", border: "#c4c6cf",
        text: "#3760bf", heading: "#273e7a", muted: "#5a68a0",
        accent: "#2e6bd0", accent2: "#8a44e0", onAccent: "#ffffff",
        keyword: "#8a44e0", string: "#4f6a33", func: "#2e6bd0", number: "#a25400", type: "#006a8e", comment: "#7179a0",
      },
    },
    catppuccin: {
      label: "Catppuccin",
      dark: {
        bg: "#1e1e2e", surface: "#24243a", surface2: "#313244", border: "#45475a",
        text: "#cdd6f4", heading: "#e6ebff", muted: "#a6adc8",
        accent: "#cba6f7", accent2: "#f5c2e7", onAccent: "#1e1e2e",
        keyword: "#cba6f7", string: "#a6e3a1", func: "#89b4fa", number: "#fab387", type: "#f9e2af", comment: "#7f849c",
      },
      light: {
        bg: "#eff1f5", surface: "#ffffff", surface2: "#e6e9ef", border: "#ccd0da",
        text: "#4c4f69", heading: "#303244", muted: "#5c5f77",
        accent: "#8839ef", accent2: "#d20f39", onAccent: "#ffffff",
        keyword: "#8839ef", string: "#2f7d1f", func: "#1e66f5", number: "#c94f06", type: "#a86a12", comment: "#8c8fa1",
      },
    },
    github: {
      label: "GitHub",
      dark: {
        bg: "#0d1117", surface: "#141a22", surface2: "#1c232c", border: "#30363d",
        text: "#d1d9e0", heading: "#f0f6fc", muted: "#9198a1",
        accent: "#58a6ff", accent2: "#ff7b72", onAccent: "#0d1117",
        keyword: "#ff7b72", string: "#a5d6ff", func: "#d2a8ff", number: "#79c0ff", type: "#ffa657", comment: "#8b949e",
      },
      light: {
        bg: "#ffffff", surface: "#f6f8fa", surface2: "#eef1f4", border: "#d1d9e0",
        text: "#1f2328", heading: "#0d1117", muted: "#59636e",
        accent: "#0969da", accent2: "#cf222e", onAccent: "#ffffff",
        keyword: "#cf222e", string: "#0a3069", func: "#8250df", number: "#0550ae", type: "#953800", comment: "#6e7781",
      },
    },
  };

  const DEFAULT_PALETTE = "monokai";

  function resolveMode(mode) {
    if (mode === "light" || mode === "dark") return mode;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  // Aplica a paleta como variáveis CSS no <html>. Devolve o modo efetivo ("dark" ou "light").
  function applyTheme(paletteName, mode) {
    const palette = PALETTES[paletteName] || PALETTES[DEFAULT_PALETTE];
    const resolved = resolveMode(mode);
    const tokens = palette[resolved];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(tokens)) {
      root.style.setProperty("--" + key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()), value);
    }
    root.dataset.theme = resolved;
    root.dataset.palette = paletteName in PALETTES ? paletteName : DEFAULT_PALETTE;
    root.style.colorScheme = resolved;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", tokens.bg);
    return resolved;
  }

  window.THEMES = { PALETTES, DEFAULT_PALETTE, resolveMode, applyTheme };
})();
