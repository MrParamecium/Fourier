from pathlib import Path

app = Path("tutor-openclaw-ui/app.js").read_text()
for line in app.splitlines():
    if 'welcome-h1' in line or 'welcome-sub' in line or 'welcome-tag' in line or 'YOUR GOOD COMPANION' in line:
        print(line)
