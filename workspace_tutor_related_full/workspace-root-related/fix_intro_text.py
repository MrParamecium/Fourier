import re
from pathlib import Path

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# Replace the generic global typography overrides with scoped ones
css = css.replace('.welcome-h1 p, h1, h2, h3, h4, .learn-title {', '.app h1, .app h2, .app h3, .app h4, .learn-title {')
css = css.replace('p, .explain-body p, .learn-explain-body p {', '.app p, .explain-body p, .learn-explain-body p {')

css_path.write_text(css)
print("FIXED")
