from pathlib import Path
import re

html_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/index.html")
html = html_path.read_text()
html = html.replace('<div id="introLanding" class="intro-landing hidden">', '<div id="introLanding" class="intro-landing">')
html_path.write_text(html)

app_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/app.js")
app = app_path.read_text()
app = re.sub(r'function shouldShowIntroLanding\(\)\s*\{[\s\S]*?return true;\s*\}', 'function shouldShowIntroLanding() {\n  return true;\n}', app)
# Just hardcode the localstorage out for now to ensure it always overrides for his demo
app = app.replace("localStorage.getItem(INTRO_LANDING_SEEN_KEY) !== '1'", "true /* forced for demo */")
app_path.write_text(app)
