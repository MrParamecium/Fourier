import re
with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    js = f.read()
# Let's forcibly disable cache on load by appending version to script/css? The CSS layout is definitely not updated in Harrison's browser.
# But for the API Key, ws-bridge.js needs it. Since we are in the workspace we can check if we have one. If we don't, I will tell him he has to add it to .env.
