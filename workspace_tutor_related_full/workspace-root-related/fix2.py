import re
from pathlib import Path
html_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/index.html")
content = html_path.read_text()
# Ensure we actually fix the break.
# Let's count unclosed tags or just force closing.
content = content.replace('<div class="app"></div>', '<div class="app">')
html_path.write_text(content)
