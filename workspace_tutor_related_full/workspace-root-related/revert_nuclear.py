import re
from pathlib import Path

css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# We completely remove the "NUCLEAR DARK MODE & GLASSMORPHISM REFINEMENTS" block recently appended.
if '/* NUCLEAR DARK MODE & GLASSMORPHISM REFINEMENTS' in css:
    css = css.split('/* ========================================================= */\n/* NUCLEAR DARK MODE & GLASSMORPHISM REFINEMENTS')[0]
    css_path.write_text(css)

