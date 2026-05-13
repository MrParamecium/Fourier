import re
from pathlib import Path

html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# 1. Fix the centered alignment for welcomeScreen
old_welcome = '<div class="welcome" id="welcomeScreen" style="background:#020617; position:relative; overflow:hidden;">'
new_welcome = '<div class="welcome" id="welcomeScreen" style="background: var(--bg-body); position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; z-index: 5;">'
html = html.replace(old_welcome, new_welcome)

# 2. Strip hardcoded white/light inline styles that make the UI look patchwork
# Sidebar 1: #F8FBFF
html = html.replace('background: #F8FBFF;', 'background: transparent;')
# Sidebar 2: #FFFFFF
html = html.replace('background:#FFFFFF;', 'background: transparent;')
# Learn view backgrounds
html = html.replace('background:#F1F5F9;', 'background: transparent;')
html = html.replace('background:#E2E8F0;', 'background: rgba(255,255,255,0.05);')
html = html.replace('color: #000;', 'color: var(--text-primary);')
html = html.replace('color:#111;', 'color: var(--text-primary);')
html = html.replace('color:#222;', 'color: var(--text-secondary);')
html = html.replace('border-bottom: 1px solid #DBEAFE;', 'border-bottom: 1px solid var(--border);')
html = html.replace('background:#fff;', 'background: transparent;')

html_path.write_text(html)

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# 3. Enhance the Search Box to 2.5x height
search_box_css_old = r"""/\* Search/Input Glass Override \*/.*?\.search-box textarea::placeholder \{"""
search_box_css_new = """/* Search/Input Glass Override */
.search-box {
  background: var(--bg-input) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 24px !important;
  box-shadow: var(--shadow-input) !important;
  padding: 16px 20px !important;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 820px;
  min-height: 120px; /* 2.5x height */
  margin: 0 auto;
  transition: all 0.3s ease;
}
.search-box-row {
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 12px;
}
.search-box textarea {
  flex: 1;
  min-height: 80px;
  padding: 8px 4px !important;
  color: var(--text-primary) !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.6;
  background: transparent !important;
  resize: none;
  border: none;
  outline: none;
}
.search-box textarea::placeholder {"""

css = re.sub(search_box_css_old, search_box_css_new, css, flags=re.DOTALL)

# Soften the disabled send button so it fits dark mode (not pure gray overlay)
btn_old = r"""\.search-send:disabled \{.*?filter: grayscale\(1\) !important;\s*\}"""
btn_new = """.search-send:disabled {
  opacity: 0.3 !important;
  box-shadow: none !important;
  filter: none !important;
  background: rgba(255,255,255,0.15) !important;
  color: rgba(255,255,255,0.4) !important;
}"""
css = re.sub(btn_old, btn_new, css, flags=re.DOTALL)

css_path.write_text(css)

print("FIX_APPLIED")
