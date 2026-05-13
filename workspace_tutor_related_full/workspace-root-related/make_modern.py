import re
from pathlib import Path

# --- 1. Modify HTML ---
html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# Ensure standard tailwind base can be applied without breaking existing flow.
# We will just inject some modern tailwind classes directly into the welcome screen box.

welcome_original = """      <div class="welcome" id="welcomeScreen">
        <div class="welcome-inner">
          <div class="welcome-tag"></div>
          <h1 class="welcome-h1"></h1>
          <p class="welcome-sub"></p>"""

welcome_new = """      <div class="welcome" id="welcomeScreen" style="background:#020617; position:relative; overflow:hidden;">
        <!-- Aura background effects -->
        <div style="position:absolute; top:-20%; left:20%; width:60vw; height:60vh; background:radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(2,6,23,0) 70%); filter:blur(40px); pointer-events:none;"></div>
        <div style="position:absolute; bottom:-10%; right:10%; width:50vw; height:50vh; background:radial-gradient(circle, rgba(129,140,248,0.15) 0%, rgba(2,6,23,0) 70%); filter:blur(60px); pointer-events:none;"></div>
        
        <div class="welcome-inner" style="position:relative; z-index:10; max-width:800px; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">
          <!-- Using inline overriding to force the new style since ::after content is defined in CSS -->
          <div class="welcome-tag" style="color:#818CF8; font-family:'Space Grotesk', sans-serif; letter-spacing:4px; font-size:12px; margin-bottom:24px; font-weight:600; text-transform:uppercase;"></div>
          <h1 class="welcome-h1 text-gradient-aurora" style="font-family:'Space Grotesk', sans-serif; font-size:56px; font-weight:700; letter-spacing:-1px; text-shadow:0 0 40px rgba(56,189,248,0.3); margin-bottom:12px;"></h1>
          <p class="welcome-sub" style="color:#94A3B8; font-family:'Inter', sans-serif; font-size:16px; margin-bottom:48px; max-width:500px; line-height:1.6;"></p>"""

if welcome_original in html:
    html = html.replace(welcome_original, welcome_new)
html_path.write_text(html)

# --- 2. Modify CSS ---
# To avoid the old textual overrides kicking in, we rewrite the ::after payload in style.css.
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# We look for the "content: 'Your good companion...'"
css = re.sub(r"content:\s*'Your good companion[^']*';", "content: 'A Q U A R I U S   •   A I   T U T O R';", css)

# We adjust the main panel background and sidebars slightly to match the aesthetic if you want the *whole* app dark. 
# But for now, let's keep the app light/clean once you are IN the tool, and just make the "Welcome" screen dark and beautiful? 
# Wait, Harrison said "一进来是这个这页，大白底浅蓝块，高级感掉光了". He wants the main app UI changed. Let's do a fast theme variable override for dark mode.

dark_vars = """  /* Backgrounds */
  --bg-body:   #020617;
  --bg-sidebar:   #0F172A;
  --sidebar-text-primary: #E2E8F0;
  --sidebar-text-secondary: #94A3B8;
  --sidebar-text-muted: #64748B;
  --sidebar-border: rgba(255,255,255,0.05);
  --sidebar-hover: rgba(255,255,255,0.05);
  --sidebar-active: rgba(56,189,248,0.1);
  --sidebar-accent: #38BDF8;
  --bg-main:   #020617;
  --bg-panel:  rgba(15,23,42,0.6); /* Glassmorphism */
  --bg-input:  rgba(15,23,42,0.8);
  --bg-hover:  rgba(255,255,255,0.05);
  --bg-active: rgba(56,189,248,0.1);

  /* Borders */
  --border:        rgba(255,255,255,0.1);
  --border-strong: rgba(255,255,255,0.15);
  --border-focus:  #38BDF8;

  /* Text */
  --text-primary:   #E2E8F0;
  --text-secondary: #94A3B8;
  --text-muted:     #64748B;

  /* Brand */
  --accent:      #38BDF8;
  --text-accent: #38BDF8;
  --success:     #10B981;
  --danger:      #EF4444;
  --purple:      #818CF8;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-input: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05) inset;
  --shadow-card: 0 10px 40px rgba(0, 0, 0, 0.4);"""

css = re.sub(r"/\* Backgrounds \*/.*?--shadow-card:.*?;", dark_vars, css, flags=re.DOTALL | re.MULTILINE)

# And override the search box to be glassy
glass_search = """/* Search/Input Glass Override */
.search-box {
  background: var(--bg-input) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 20px !important;
  box-shadow: var(--shadow-input) !important;
  padding: 8px 12px !important;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 760px; /* Make it wider and more elegant */
  margin: 0 auto;
}
.search-box textarea {
  color: var(--text-primary) !important;
  font-family: 'Inter', sans-serif !important;
  background: transparent !important;
}
.search-box textarea::placeholder {
  color: var(--text-muted) !important;
}
.search-send {
  background: linear-gradient(135deg, #38BDF8, #818CF8) !important;
  color: #fff !important;
  border-radius: 12px !important;
  width: 44px !important;
  height: 44px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4) !important;
  transition: all 0.3s ease !important;
}
.search-send:not(:disabled):hover {
  transform: translateY(-2px) scale(1.05) !important;
  box-shadow: 0 8px 25px rgba(129, 140, 248, 0.6) !important;
}
.search-send:disabled {
  opacity: 0.5 !important;
  box-shadow: none !important;
  filter: grayscale(1) !important;
}

/* Ensure Sidebars have right background */
.sidebar, .toc-sidebar {
  background: var(--bg-sidebar) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255,255,255,0.05) !important;
  border-left: 1px solid rgba(255,255,255,0.05) !important;
}

.main {
  background: var(--bg-body) !important;
  border-left: none !important;
  border-top: none !important;
  box-shadow: none !important;
}
"""
css += "\n" + glass_search

css_path.write_text(css)
