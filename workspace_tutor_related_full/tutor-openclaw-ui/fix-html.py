with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
import time
t = str(int(time.time()))
html = html.replace('href="style.css"', f'href="style.css?v={t}"')
html = html.replace('src="app.js"', f'src="app.js?v={t}"')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
