import re
from pathlib import Path
html = Path("tutor-openclaw-ui/index.html").read_text()
# Ensure the parent app container doesn't scroll wildly when on welcome screen.
# The issue is likely that `.main` div has `margin-top: 8px` and the welcomeScreen is inside it, 
# making the main content stretch or the absolute positioning breaks because `.main` has a relative height/overflow.

# In the original structure, welcomeScreen was inside `.main`. Let's give `.welcome` an explicit lock and prevent scrolling.
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

css += """
.welcome {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  overflow: hidden !important; 
  height: 100% !important;
  width: 100% !important;
  z-index: 5 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: var(--bg-main) !important;
}

.main {
  position: relative; /* this allows .welcome to anchor strictly to .main boundaries */
  height: 100vh; /* Actually, main might be stretching if not contained */
}

/* Ensure the app shell doesn't scroll inside the main area if text is short */
body, html {
  overflow: hidden !important; /* Force overall window not to scroll */
}
"""

css_path.write_text(css)
