import re
from pathlib import Path

html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# Swap it into the image src of the book
html = html.replace('book-002-preview.png', 'latest_cover.png')

html_path.write_text(html)
