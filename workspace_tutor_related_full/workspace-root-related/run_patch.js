const fs = require('fs');

// Patch CSS
let css = fs.readFileSync('tutor-openclaw-ui/style.css', 'utf8');
const newCSS = `
/* --- UI Polish & Sidebar Toggle Additions --- */
:root {
  --bg-main: #FFFFFF;
  --bg-sidebar: #F9FAFB;
  --bg-hover: #F3F4F6;
  --color-primary: #1a2b56;
  --border: #F3F4F6;
}
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-sidebar);
}
.main {
  background: var(--bg-main) !important;
  box-shadow: -4px 0 15px -3px rgba(0, 0, 0, 0.05);
  border-radius: 12px 0 0 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}
.sidebar {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-x: hidden;
  background-color: var(--bg-sidebar) !important;
  border-right: none !important;
}
.app.sidebar-collapsed .sidebar {
  width: 0 !important;
  transform: translateX(-100%);
}
.menu-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6B7280;
  margin-right: 8px;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.menu-toggle:hover {
  background: var(--bg-hover);
  color: var(--color-primary);
}
.sidebar-top .logo {
  display: flex;
  align-items: center;
}
.sidebar-float-toggle {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 50;
  background: white;
  border: 1px solid var(--border);
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  color: #6B7280;
  display: none;
}
.app.sidebar-collapsed .sidebar-float-toggle {
  display: flex !important;
}
.toc-sidebar {
  background: var(--bg-main) !important;
  border-left: 1px solid var(--border) !important;
}
.syllabus-part, .syllabus-item {
  border-radius: 6px;
  margin: 2px 8px;
  transition: background-color 0.2s, color 0.2s;
}
.syllabus-item:hover {
  background-color: var(--bg-hover) !important;
}
.syllabus-item.active {
  background-color: var(--color-primary) !important;
  color: white !important;
  font-weight: 500;
  transform: scale(1.01);
  box-shadow: 0 2px 4px rgba(26, 43, 86, 0.2);
}
.syllabus-item.active * {
  color: white !important;
}
button:focus, input:focus, textarea:focus {
  outline: none;
  box-shadow: none;
}
`;
if (!css.includes('--bg-main: #FFFFFF;')) {
  fs.writeFileSync('tutor-openclaw-ui/style.css', css + newCSS);
}

// Patch JS
let js = fs.readFileSync('tutor-openclaw-ui/app.js', 'utf8');
const patchJs = `
// --- Sidebar Toggle Logic ---
setTimeout(() => {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const floatToggleBtn = document.getElementById('floatToggleBtn');
  const appContainer = document.querySelector('.app');

  if (menuToggleBtn && appContainer) {
    menuToggleBtn.addEventListener('click', () => {
      appContainer.classList.add('sidebar-collapsed');
    });
  }
  if (floatToggleBtn && appContainer) {
    floatToggleBtn.addEventListener('click', () => {
      appContainer.classList.remove('sidebar-collapsed');
    });
  }
}, 500);
`;
if (!js.includes('sidebar-collapsed')) {
  fs.appendFileSync('tutor-openclaw-ui/app.js', patchJs);
}
