import re
from pathlib import Path
html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()
html = html.replace('.welcome-h1 {', '.welcome-h1 { margin-top: auto; flex:1;')
html_path.write_text(html)

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()
css += """
.welcome-inner {
  height: 100%;
  padding-top: 15vh !important;
  justify-content: flex-start !important;
}
.welcome-h1 { margin: 12px 0 !important; font-size: 48px !important; }
.search-box {
  margin-top: 40px !important;
}"""
css_path.write_text(css)
