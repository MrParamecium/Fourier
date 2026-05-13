import re
from pathlib import Path

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# We need to modify the Search Box to be huge in the Craft overrides
search_css_old = r"""/\* Input / Search Box - Float naturally \*/.*?transition: all 0\.3s ease;\s*\}"""

search_css_new = """/* Input / Search Box - Float naturally */
.search-box {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(15,23,42,0.06) !important;
  box-shadow: 0 4px 20px rgba(15,23,42,0.04), 0 0 0 1px rgba(255,255,255,0.5) inset !important;
  border-radius: 20px !important;
  padding: 16px 20px !important;
  width: 100%;
  max-width: 820px;
  min-height: 140px; /* Forces 2.5x original height */
  margin: 0 auto;
  display: flex;
  align-items: flex-end; /* push icons and buttons to bottom naturally */
  flex-direction: column;
  transition: all 0.3s ease;
}
.search-box-row {
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 12px;
  flex: 1; /* Stretch to fill the parent */
}
.search-box textarea {
  flex: 1;
  min-height: 90px; /* Big textarea */
  padding: 8px 4px !important;
  color: var(--text-primary) !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.6;
  background: transparent !important;
  resize: none;
  border: none;
  outline: none;
}"""

css = re.sub(search_css_old, search_css_new, css, flags=re.DOTALL)

css_path.write_text(css)
print("HEIGHT_FIXED")
