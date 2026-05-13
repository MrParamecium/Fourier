const fs = require('fs');
const path = '/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/index.html';
let html = fs.readFileSync(path, 'utf8');

// Fonts
html = html.replace(
  /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Inter:wght@400;500;600;700&family=Source\+Serif\+4:ital,opsz,wght@0,8\.\.60,400;0,8\.\.60,600;1,8\.\.60,400&display=swap" rel="stylesheet">/,
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">'
);

// Logo
html = html.replace(
  /<div class="logo-icon"><\/div>\s*<div class="logo-text"><\/div>/,
  '<div class="logo-icon" style="border:none;background:transparent;"></div>\n          <div class="logo-text" style="font-family:\'Playfair Display\',Georgia,serif;font-style:italic;font-size:24px;font-weight:700;">Tutor</div>'
);

// stages
html = html.replace(/<div class="lss-item" id="lss-1"><span class="lss-icon"><\/span>/, '<div class="lss-item" id="lss-1"><span class="lss-icon" style="font-family:\'DM Mono\'">01</span>');
html = html.replace(/<div class="lss-item" id="lss-2"><span class="lss-icon">🧠<\/span>/, '<div class="lss-item" id="lss-2"><span class="lss-icon" style="font-family:\'DM Mono\'">02</span>');
html = html.replace(/<div class="lss-item" id="lss-3"><span class="lss-icon">✍️<\/span>/, '<div class="lss-item" id="lss-3"><span class="lss-icon" style="font-family:\'DM Mono\'">03</span>');
html = html.replace(/<div class="lss-item" id="lss-4"><span class="lss-icon">📊<\/span>/, '<div class="lss-item" id="lss-4"><span class="lss-icon" style="font-family:\'DM Mono\'">04</span>');

// other emojis
html = html.replace(/🌐/g, '<span style="font-family:\'DM Mono\'">#</span>');

fs.writeFileSync(path, html);

const stylePath = '/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/style.css';
let css = fs.readFileSync(stylePath, 'utf8');

// Base scheme edits
css = css.replace(/--bg-body: #fffbf5;/g, '--bg-body: #f8f8f6;');
css = css.replace(/--bg-hover: #fff3e0;/g, '--bg-hover: #f3f3f3;');
css = css.replace(/--bg-active: #ffe4c4;/g, '--bg-active: #ebebeb;');
css = css.replace(/--border: #f8eee2;/g, '--border: #e8e8e8;');
css = css.replace(/--border-strong: #eaddcc;/g, '--border-strong: #d0d0d0;');
css = css.replace(/--border-focus: #f59e0b;/g, '--border-focus: #1a1a1a;');
css = css.replace(/--text-primary: #332922;/g, '--text-primary: #111111;');
css = css.replace(/--text-secondary: #5e5045;/g, '--text-secondary: #444444;');
css = css.replace(/--text-muted: #9c8b7c;/g, '--text-muted: #888888;');
css = css.replace(/--accent: #f59e0b;/g, '--accent: #1a1a1a;');
css = css.replace(/--text-accent: #d97706;/g, '--text-accent: #1a1a1a;');

css += `
/* HIGH-END ACADEMIC OVERRIDES */
.welcome-h1, .learn-title, .logo-text {
  font-family: 'Playfair Display', Georgia, serif;
}
.welcome-tag, .toc-header-label, .learn-badge, .step-label, code, pre {
  font-family: 'DM Mono', monospace;
}
.welcome-tag, .toc-header-label, .learn-badge {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.learn-start-btn {
  background: #111111 !important;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: none;
  font-family: 'Inter', sans-serif;
}
.learn-start-btn:hover {
  background: #333333 !important;
  transform: none;
  box-shadow: none;
}
.search-box {
  border-radius: 4px;
}
.search-send {
  background: #111111;
  border-radius: 4px;
}
.search-send:not([disabled]):hover {
  background: #333333;
  box-shadow: none;
  transform: none;
}
.chip {
  border-radius: 4px;
  border: 1px solid #1a1a1a;
  background: transparent;
}
.chip:hover {
  background: #1a1a1a;
  color: white;
}
/* Override any remaining ambers */
:root {
  --bg-body: #f8f8f6 !important;
  --bg-sidebar: #ffffff !important;
  --bg-main: #ffffff !important;
  --bg-hover: #f3f3f3 !important;
  --bg-active: #ebebeb !important;
  --border: #e8e8e8 !important;
  --border-strong: #d0d0d0 !important;
  --border-focus: #1a1a1a !important;
  --text-primary: #111111 !important;
  --text-secondary: #444444 !important;
  --text-muted: #888888 !important;
  --accent: #1a1a1a !important;
  --text-accent: #1a1a1a !important;
}
.syllabus-section.active {
  border-left: 2px solid #111111 !important;
  background: #f3f3f3 !important;
  color: #111111 !important;
}
.lss-item.active {
  border-color: #111111 !important;
  box-shadow: none !important;
  background: #f3f3f3 !important;
}
`;

fs.writeFileSync(stylePath, css);
console.log('done');
