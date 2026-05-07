import re
from pathlib import Path
html = Path("tutor-openclaw-ui/index.html").read_text()
html = html.replace('padding:40px; margin-top:-8vh;', 'padding:40px;')
# We need to make sure the app shell is visible. In the photo, even the left sidebar is gone.
# If sidebar is missing, `.app` is totally off screen or empty. Why?
# "彻底没了" Means the DOM is not rendering or my `height: 100vh` on `.main` somehow broke flexbox of `.app`.
# Let's fix .main height override we did in style.css
css = Path("tutor-openclaw-ui/style.css").read_text()
if '.main {\n  position: relative;' in css:
     css = re.sub(r'\.main \{\s*position: relative;\s*/\*.*?\*/\s*height: 100vh;\s*/\*.*?\*/\s*\}', '', css)
Path("tutor-openclaw-ui/style.css").write_text(css)
Path("tutor-openclaw-ui/index.html").write_text(html)
