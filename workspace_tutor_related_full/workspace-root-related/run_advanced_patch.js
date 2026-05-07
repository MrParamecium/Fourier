const fs = require('fs');

let css = fs.readFileSync('tutor-openclaw-ui/style.css', 'utf8');

// Replace the previous ugly patch block with the new ultra-premium minimal block
const startMarker = '/* --- UI Polish & Sidebar Toggle Additions';

let baseCSS = css;
if (css.includes(startMarker)) {
  baseCSS = css.substring(0, css.indexOf(startMarker));
}

const ultraPremiumCSS = `
/* --- ULTRA PREMIUM MINIMALIST VERCEL/LINEAR STYLE --- */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

:root {
  /* Absolute minimal color palette */
  --bg-app: #FAFAFA;       /* Extremely subtle warm off-white for app background */
  --bg-panel: #FFFFFF;     /* Pure white for content areas */
  --bg-hover: #F1F3F5;     /* Delicate ultra-light gray for hovers */
  
  --text-primary: #111827; /* Rich, deep slate (almost black) */
  --text-secondary: #6B7280; /* Elegant medium gray for subtext */
  --text-tertiary: #9CA3AF;
  
  --color-accent: #000000; /* Pure black for intense focus/active states */
  --color-subtle-border: #E5E7EB; /* Razor-thin, barely visible borders */
  
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 24px;
  
  --shadow-float: 0 10px 40px -10px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02);
  --shadow-subtle: 0 2px 8px -2px rgba(0,0,0,0.03);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;
  background-color: var(--bg-app);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

/* Typography refinements */
h1, h2, h3, h4, h5, h6, .welcome-h1, .learn-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em; /* Tighter tracking for modern premium feel */
  color: var(--text-primary);
}

.logo-text {
  font-family: 'Space Grotesk', 'Playfair Display', serif !important;
  font-weight: 700 !important;
  font-style: normal !important;
  letter-spacing: -0.04em !important;
  font-size: 22px !important;
  color: var(--text-primary) !important;
}

/* Layout structural overrides */
.app {
  background-color: var(--bg-app);
}

.main {
  background: var(--bg-panel) !important;
  box-shadow: var(--shadow-float);
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
  margin-top: 8px;
  margin-bottom: 8px;
  border-left: 1px solid rgba(255,255,255,0.5); /* Glass edge */
  border-top: 1px solid rgba(255,255,255,0.5);
  transition: margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s ease;
  position: relative;
  z-index: 20;
}

/* Sidebars - Remove harsh borders, use whitespace */
.sidebar, .toc-sidebar {
  background-color: var(--bg-app) !important;
  border: none !important; /* Kill the ugly lines */
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding-top: 8px;
}

/* TOC specific */
.toc-sidebar {
  background-color: var(--bg-app) !important;
  border: none !important;
}

.toc-header-label {
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  padding-bottom: 12px;
}

/* Collapse behavior */
.app.sidebar-collapsed .sidebar { width: 0 !important; transform: translateX(-100%); }
.app.sidebar-collapsed .toc-sidebar { width: 0 !important; transform: translateX(100%); }
.app.sidebar-collapsed .main { border-radius: var(--radius-lg); margin-right: 8px; }

/* The left syllabus menu items - Vercel style */
.syllabus {
  padding: 0 16px;
}

.syllabus-item {
  border-radius: var(--radius-sm);
  margin: 4px 0;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  border: none;
}

.syllabus-item:hover {
  background-color: var(--bg-hover) !important;
  color: var(--text-primary);
}

.syllabus-item.active {
  background-color: var(--color-accent) !important; /* Pure stark black */
  color: #FFFFFF !important;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

.syllabus-item.active * { color: #FFFFFF !important; }

/* Right TOC links */
.toc-nav a {
  border-left: 2px solid transparent !important;
  padding: 6px 0 6px 14px;
  margin-left: 2px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 400;
  transition: all 0.2s ease;
  position: relative;
}

.toc-nav a:hover {
  color: var(--text-primary);
  border-left-color: var(--text-tertiary) !important;
}

.toc-nav a.active {
  color: var(--text-primary);
  font-weight: 600;
  border-left-color: var(--color-accent) !important; /* Pure black line */
}

/* Inputs and Buttons - Premium tactile feel */
input, textarea, button {
  font-family: inherit;
}

button:focus, input:focus, textarea:focus {
  outline: none;
  box-shadow: none;
}

.search-box, .followup-bar {
  background: var(--bg-panel);
  border: 1px solid var(--color-subtle-border);
  box-shadow: var(--shadow-subtle);
  border-radius: var(--radius-md);
  transition: box-shadow 0.3s, border-color 0.3s;
}

.search-box:focus-within, .followup-bar:focus-within {
  border-color: var(--text-tertiary);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Toggle Buttons */
.menu-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  margin-right: 12px;
  padding: 6px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.menu-toggle:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.sidebar-float-toggle {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 50;
  background: var(--bg-panel);
  border: 1px solid var(--color-subtle-border);
  box-shadow: var(--shadow-float);
  border-radius: var(--radius-sm);
  padding: 8px;
  cursor: pointer;
  color: var(--text-secondary);
  display: none;
  transition: all 0.2s ease;
}
.sidebar-float-toggle:hover {
  color: var(--text-primary);
  transform: translateY(-1px);
  box-shadow: 0 12px 20px -10px rgba(0,0,0,0.08);
}
.app.sidebar-collapsed .sidebar-float-toggle {
  display: flex !important;
}

/* Message Bubbles / Content spacing */
.explain-body, .learn-explain-body {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.7;
}

/* Scrollbars - MacOS style hidden until hover */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.2);
}
`;

fs.writeFileSync('tutor-openclaw-ui/style.css', baseCSS + ultraPremiumCSS);
