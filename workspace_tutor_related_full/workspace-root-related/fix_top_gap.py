import re
from pathlib import Path
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# Problem 1: Earlier I set `margin-top: 40px !important;` on `.search-box` which pushed it, 
# But the HUGE gap on top is likely due to the welcome-inner style setting from earlier being left over or conflicting flex-alignments.
# Or wait, .main has "margin-top: 8px;".
# Ah, earlier in "finish_style.py" I added:
# .welcome-inner { height: 100%; padding-top: 15vh !important; justify-content: flex-start !important; }
# This was for the centered version, and it's shoving the left-right layout 15vh down!

css = css.replace('padding-top: 15vh !important;', 'padding-top: 0 !important;')
css = css.replace('justify-content: flex-start !important;', 'justify-content: center !important;')

# In index.html, welcomeScreen has "position: absolute; inset: 0;"
# BUT! The `.main` container or the main wrapper might be stretching due to flex issues, or we lost `.app`'s layout.
# Let's ensure `.welcome` fills it cleanly without a massive overhead gap.
css += """
.welcome {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100%; 
}
"""

css_path.write_text(css)
