export const themes = [
  { id: "neon-blue", name: "Neon Blue", color: "#3b82f6", secondary: "#1d4ed8", desc: "Original Command Center vibe." },
  { id: "cyber-green", name: "Matrix Green", color: "#10b981", secondary: "#047857", desc: "Classic terminal aesthetics." },
  { id: "lava-red", name: "Volcano Ember", color: "#ef4444", secondary: "#b91c1c", desc: "High-alert performance mode." },
  { id: "amethyst", name: "Deep Space", color: "#8b5cf6", secondary: "#6d28d9", desc: "Mystical galaxy exploration." },
  { id: "rose-quartz", name: "Rose Quartz", color: "#ec4899", secondary: "#be185d", desc: "Elegant aesthetics for soft UI." },
  { id: "phantom", name: "Phantom Onyx", color: "#475569", secondary: "#1e293b", desc: "Ultra-dark obsidian stealth." },
  { id: "emerald", name: "Forest Emerald", color: "#059669", secondary: "#064e3b", desc: "Nature-inspired growth node." },
];

export const fonts = [
  { id: "sans", name: "Modern Sans", family: "'Plus Jakarta Sans', sans-serif" },
  { id: "serif", name: "Elegant Serif", family: "'Playfair Display', serif" },
  { id: "mono", name: "Cyber Mono", family: "'JetBrains Mono', monospace" },
];

export const applyTheme = (themeId) => {
  const root = document.documentElement;
  const theme = themes.find(t => t.id === themeId) || themes[0];
  
  root.style.setProperty('--primary-color', theme.color);
  root.style.setProperty('--primary-glow', `${theme.color}33`);
  localStorage.setItem("portal-theme", theme.id);
};

export const applyFontSize = (size) => {
  const root = document.documentElement;
  const sizeMap = { small: '0.875rem', medium: '1rem', large: '1.125rem' };
  root.style.setProperty('--base-font-size', sizeMap[size] || '1rem');
  localStorage.setItem("portal-font-size", size);
};

export const applyFontFamily = (fontId) => {
  const root = document.documentElement;
  const font = fonts.find(f => f.id === fontId) || fonts[0];
  root.style.setProperty('--base-font-family', font.family);
  localStorage.setItem("portal-font-family", font.id);
};

export const applyMode = (mode) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  localStorage.setItem("portal-mode", mode);
};

export const resetToDefaults = () => {
    localStorage.removeItem("portal-theme");
    localStorage.removeItem("portal-font-size");
    localStorage.removeItem("portal-font-family");
    localStorage.removeItem("portal-mode");
    initializeTheme();
};

export const initializeTheme = () => {
  const savedTheme = localStorage.getItem("portal-theme") || "neon-blue";
  const savedFontSize = localStorage.getItem("portal-font-size") || "medium";
  const savedFontFamily = localStorage.getItem("portal-font-family") || "sans";
  const savedMode = localStorage.getItem("portal-mode") || "dark";
  
  applyTheme(savedTheme);
  applyFontSize(savedFontSize);
  applyFontFamily(savedFontFamily);
  applyMode(savedMode);
};
