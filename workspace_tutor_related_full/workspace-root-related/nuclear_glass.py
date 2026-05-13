import re
from pathlib import Path

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# Append nuclear dark mode refinements
css += """
/* ========================================================= */
/* NUCLEAR DARK MODE & GLASSMORPHISM REFINEMENTS             */
/* ========================================================= */
:root {
  --bg-body: #020617 !important;
  --bg-main: #020617 !important;
  --bg-sidebar: #020617 !important;
  --bg-panel: rgba(15,23,42,0.4) !important;
  --bg-active: rgba(56,189,248,0.1) !important;
  --sidebar-active: rgba(56,189,248,0.1) !important;
  --sidebar-hover: rgba(255,255,255,0.03) !important;
  --sidebar-accent: #38BDF8 !important;
  --border: rgba(255,255,255,0.06) !important;
  --border-strong: rgba(255,255,255,0.12) !important;
  --text-primary: #E2E8F0 !important;
  --text-secondary: #94A3B8 !important;
  --text-muted: #475569 !important;
  --accent: #38BDF8 !important;
}

/* Force all major backgrounds to zero out the mismatched dark blues */
body, .app, .main, .sidebar, .toc-sidebar, .learn-view, .learn-explain-col, .learn-chat-col, .learn-book-col, .learn-explain-scroll, .learn-chat-scroll {
  background: var(--bg-body) !important;
}

/* The View Selector (Lecture / Textbook) - Floating Glass */
#learnViewSelector {
  background: rgba(255,255,255,0.03) !important;
  border: 1px solid rgba(255,255,255,0.05) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}
#btnLectureView, #btnTextbookView {
  color: var(--text-secondary) !important;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  transition: all 0.3s ease;
}
#btnLectureView.active, #btnTextbookView.active {
  background: rgba(255,255,255,0.1) !important;
  color: #E2E8F0 !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
  border-radius: 4px !important;
}

/* Topbar / Mode Badge */
.learn-topbar {
  background: rgba(2,6,23, 0.8) !important;
  backdrop-filter: blur(12px) !important;
  border-bottom: 1px solid var(--border) !important;
}
.learn-badge {
  background: rgba(56,189,248,0.1) !important;
  color: #38BDF8 !important;
  border: 1px solid rgba(56,189,248,0.2) !important;
  border-radius: 4px !important;
}

/* Sidebar active / hover items */
.syllabus-chapter.active, .syllabus-section-btn.active, .toc-item.active {
  background: var(--sidebar-active) !important;
  color: var(--sidebar-accent) !important;
}

.toc-nav a.active {
  color: var(--sidebar-accent) !important;
  border-left-color: var(--sidebar-accent) !important;
  background: transparent !important; /* prevent ugly background block */
}

/* General Border Color override for layout elements */
.sidebar, .toc-sidebar, .learn-explain-col, .learn-chat-col, .learn-book-col, 
.learn-topbar, .learn-explain-toolbar, .toc-header, .sidebar-top {
  border-color: var(--border) !important;
  border-style: solid;
}

/* Remove the weird white background on Recent Conversations items */
#recentConversationsNav div[style*="background:#FFFFFF"], #recentConversationsNav div[style*="background: rgb(255, 255, 255)"] {
  background: rgba(255,255,255,0.02) !important;
  color: #E2E8F0 !important;
  border: 1px solid var(--border) !important;
  box-shadow: none !important;
}
/* text color override inside cards */
div[style*="color:#000"], span[style*="color:#000"], div[style*="color: rgb(0, 0, 0)"], span[style*="color:#334155"], span[style*="color: rgb(51, 65, 85)"] {
  color: #E2E8F0 !important;
}

/* user badge text override */
#userBadge span, .toc-header-label, .syllabus-header {
   color: #E2E8F0 !important;
}

/* Follow-up / Toolbar backgrounds */
.learn-explain-toolbar, .learn-followup-bar {
  background: rgba(2,6,23,0.85) !important;
  backdrop-filter: blur(20px) !important;
}
.learn-followup-bar {
  border-top: 1px solid var(--border) !important;
}

/* Fix right TOC empty message */
.toc-empty p {
  color: var(--text-muted) !important;
}
"""
css_path.write_text(css)
print("CSS OVERRIDES APPLIED")

app_js = Path("tutor-openclaw-ui/app.js")
app_text = app_js.read_text()
app_text = app_text.replace("card.style.background = '#EFF6FF';", "card.style.background = 'rgba(255,255,255,0.05)';")
app_text = app_text.replace("card.style.background = '#FFFFFF';", "card.style.background = 'rgba(255,255,255,0.02)';")
app_js.write_text(app_text)

