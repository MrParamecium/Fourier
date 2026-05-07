import re
from pathlib import Path
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()
# We stripped backgrounds too hard, check learn-body etc.
# Also my script earlier stripped "hidden" classes accidentally from index potentially?
# Let's verify the display states.
css += """
.learn-view {
  background: var(--bg-main) !important;
  color: var(--text-primary) !important;
  display: flex;
  flex-direction: column;
}
"""
css_path.write_text(css)
