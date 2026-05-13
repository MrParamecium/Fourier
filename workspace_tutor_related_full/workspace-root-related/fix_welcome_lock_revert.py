import re
from pathlib import Path
css_path = Path("tutor-openclaw-ui/style.css")
css = css_path.read_text()

# I set `body, html { overflow: hidden !important; }` globally which means EVERYTHING hides outside the current unscrollable box,
# and if `main` or `app` relies on body scrolling or flex centering, then fixing `welcome` to absolute top/left 0 
# when it is *inside* a container that might be shifted, hides it entirely out of view.
# Actually, the user's screenshot has ZERO UI (no sidebar even!).
# Wait, why did the sidebar disappear??? Because I put `body, html { overflow: hidden !important; }` but the `.app` uses `height: 100vh; overflow: hidden;` anyway!
# Hmm, maybe I broke an entire CSS block.

# Let's cleanly rollback the mess I just added:
css = css.replace("""
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
""", "")

css = css.replace("""
.welcome {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 100%; 
}
""", "")

# Let's fix `.welcome` safely instead of `absolute` which can be tricky if the parent has hidden overflows that clip it.
# The original `.welcome` rule: `position: absolute; inset: 0; display: flex; ...`
# Let's just rewrite the `.welcome` styles explicitly and safely to be a flex container that fills its parent.
css += """
.welcome {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: var(--bg-main) !important;
  z-index: 50 !important;
}

/* We also need to fix the "welcome-inner-override" */
.welcome-inner-override {
  width: 100%;
  max-width: 1100px;
  padding: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 64px;
}
"""

css_path.write_text(css)
