from pathlib import Path
html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()
# Remove old CSS logic that breaks the new layout flex-direction
html = html.replace('max-width:800px; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;', 'max-width:1100px; width:100%; display:flex; flex-direction:row; align-items:center; justify-content:center; gap:64px; padding:40px;')
html_path.write_text(html)

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()
css = css.replace('.welcome-inner {', '.welcome-inner-override {')
css_path.write_text(css)
print('OK')
