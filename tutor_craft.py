import re
from pathlib import Path

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# We need to rewrite the core theme variables at the top of the file to a beautiful, Apple Notes / Linear / Craft inspired light theme.
light_vars = """  /* Backgrounds */
  --bg-body:   #F8FAFC;     /* Ultra-soft cool slate */
  --bg-sidebar:   #F1F5F9;  /* Slightly deeper sidebar to frame the content */
  --sidebar-text-primary: #0F172A;
  --sidebar-text-secondary: #475569;
  --sidebar-text-muted: #94A3B8;
  --sidebar-border: #E2E8F0;
  --sidebar-hover: rgba(0,0,0,0.03);
  --sidebar-active: #FFFFFF;
  --sidebar-accent: #0F172A; /* Bold primary black/slate for active items */
  --bg-main:   #FFFFFF;      /* The actual reading pane is pure white */
  --bg-panel:  #FFFFFF;
  --bg-input:  #FFFFFF;
  --bg-hover:  rgba(15,23,42,0.03);
  --bg-active: rgba(15,23,42,0.04);

  /* Borders */
  --border:        #E2E8F0;
  --border-strong: #CBD5E1;
  --border-focus:  #2563EB;

  /* Text */
  --text-primary:   #0F172A; /* Deep slate, excellent contrast but softer than pure black */
  --text-secondary: #475569;
  --text-muted:     #64748B;

  /* Brand - Keep the Aquarius blue but in a refined way */
  --accent:      #2563EB;
  --text-accent: #2563EB;
  --success:     #10B981;
  --danger:      #EF4444;
  --purple:      #6366F1;

  /* Shadows - Lift everything to feel weightless */
  --shadow-sm: 0 1px 2px rgba(15,23,42,0.06);
  --shadow-md: 0 4px 6px -1px rgba(15,23,42,0.05), 0 2px 4px -1px rgba(15,23,42,0.03);
  --shadow-input: 0 2px 10px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.05) inset;
  --shadow-card: 0 12px 32px rgba(15,23,42,0.08);"""

css = re.sub(r"/\* Backgrounds \*/.*?--shadow-card:.*?;", light_vars, css, flags=re.DOTALL | re.MULTILINE)

# Override the search-box that was styled for dark mode earlier
glass_search_old = r"""/\* Search/Input Glass Override \*/.*"""
css = re.sub(glass_search_old, "", css, flags=re.DOTALL)

# Add our Craft/Linear style overrides instead
craft_overrides = """
/* ========================================================= */
/* CRAFT / LINEAR INSPIRED LIGHT TUTOR THEME                 */
/* ========================================================= */
body, .app { background: var(--bg-body) !important; }

/* The center pane reading area - crisp, elevated paper feel */
.main, .learn-view {
  background: var(--bg-main) !important;
  box-shadow: 0 0 0 1px var(--border), var(--shadow-card) !important;
  border-radius: 12px;
  margin: 12px;
  overflow: hidden;
}

/* Sidebars - soft frame around the paper */
.sidebar, .toc-sidebar {
  background: var(--bg-sidebar) !important;
  border: none !important;
}

/* Input / Search Box - Float naturally */
.search-box, .followup-bar {
  background: rgba(248, 250, 252, 0.8) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(15,23,42,0.08) !important;
  box-shadow: 0 4px 20px rgba(15,23,42,0.04) !important;
  border-radius: 16px !important;
  padding: 12px 16px !important;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.search-box textarea, .followup-input, .learn-followup-input {
  color: var(--text-primary) !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  background: transparent !important;
}
.search-box textarea::placeholder, .followup-input::placeholder, .learn-followup-input::placeholder {
  color: var(--text-muted) !important;
}

/* The Send Button - Soft blue premium bump */
.search-send, .followup-send, .learn-followup-send {
  background: #2563EB !important;
  color: #fff !important;
  border-radius: 10px !important;
  width: 36px !important;
  height: 36px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3) !important;
  transition: all 0.2s ease !important;
}
.search-send:not(:disabled):hover, .followup-send:not(:disabled):hover, .learn-followup-send:not(:disabled):hover {
  transform: translateY(-1px) !important;
  background: #1D4ED8 !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4) !important;
}
.search-send:disabled, .followup-send:disabled, .learn-followup-send:disabled {
  background: #E2E8F0 !important;
  color: #94A3B8 !important;
  box-shadow: none !important;
}

/* Fix inner learning columns backgrounds */
.learn-explain-col, .learn-chat-col, .learn-book-col {
  background: transparent !important;
  border-color: var(--border) !important;
}

/* The View Selector (Lecture / Textbook) - Clean iOS Segmented Control feel */
#learnViewSelector {
  background: #F1F5F9 !important;
  border: 1px solid #E2E8F0 !important;
  border-radius: 8px !important;
  padding: 4px !important;
}
#btnLectureView, #btnTextbookView {
  color: #64748B !important;
  font-weight: 500 !important;
  background: transparent !important;
  border-radius: 6px !important;
}
#btnLectureView.active, #btnTextbookView.active {
  background: #FFFFFF !important;
  color: #0F172A !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
  font-weight: 600 !important;
}

/* Typography Overrides */
.welcome-h1 p, h1, h2, h3, h4, .learn-title {
  color: var(--text-primary) !important;
  letter-spacing: -0.03em !important;
}
p, .explain-body p, .learn-explain-body p {
  color: #334155 !important;
  line-height: 1.75 !important;
  font-size: 15px !important;
}

/* TOC & Syllabus accents */
.toc-nav a.active {
  color: #2563EB !important;
  font-weight: 600 !important;
  border-left-color: #2563EB !important;
}
.syllabus-chapter.active, .syllabus-section-btn.active {
  background: #FFFFFF !important;
  color: #0F172A !important;
  box-shadow: 0 1px 2px rgba(15,23,42,0.05) !important;
  font-weight: 600 !important;
}

/* Toolbar & Chat separation */
.learn-explain-toolbar {
  background: rgba(255,255,255,0.9) !important;
  backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid var(--border) !important;
}
.learn-followup-bar {
  background: transparent !important;
  border-top: none !important;
}

/* Reset any wild text overrides we made for dark mode */
#userBadge span, .toc-header-label, .syllabus-header {
   color: #0F172A !important;
}
"""
css_path.write_text(css + craft_overrides)
print("CRAFT_OVERRIDE_APPLIED")

html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()
html = html.replace('color: var(--text-primary);', '') # remove forced old colors
html = html.replace('color: var(--text-secondary);', '')
html_path.write_text(html)

app_js = Path("tutor-openclaw-ui/app.js")
app_text = app_js.read_text()
app_text = app_text.replace("card.style.background = 'rgba(255,255,255,0.05)';", "card.style.background = '#F8FAFC';")
app_text = app_text.replace("card.style.background = 'rgba(255,255,255,0.02)';", "card.style.background = '#ffffff';")
# Force text color inside cards to not be white
app_text = app_text.replace("color:#E2E8F0", "color:#0F172A")
app_js.write_text(app_text)
