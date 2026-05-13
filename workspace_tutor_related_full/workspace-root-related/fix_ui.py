import re
with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'function renderWebReferences\(.*?\)\s*\{.*?(?=\nfunction)', js, flags=re.DOTALL)
if match:
    print(match.group(0)[:500])
else:
    print("Cannot find renderWebReferences")

