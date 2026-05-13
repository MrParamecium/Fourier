from pathlib import Path

html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# Problem: The parent container (.main) might be rendering above or below the sidebars and the user can just swipe down to it.
# If .welcome is `position: absolute; inset: 0`, and the user is scrolling down to see the real .main or it is detached.
# Wait, look at the second screenshot! The UI looks PERFECT in the second snapshot!
# The problem is that the user's browser page is STILL letting them scroll vertically to see a huge white space ABOVE or BELOW the welcomeScreen! 
# Let's cleanly fix the container of main.
# .main class naturally stretches or overflows. 
# We need to make sure the `.app` class in CSS restricts overflow properly.
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# We add back the overflow prevention to `main` and `welcome` but NOT to html/body globally to avoid breaking the sidebars.
css += """
.app {
  height: 100vh !important;
  width: 100vw !important;
  overflow: hidden !important;
  display: flex;
}
.main {
  flex: 1; /* take remaining space */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden !important; /* prevent main column from growing a scroll bar */
}
"""
css_path.write_text(css)
