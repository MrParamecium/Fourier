import re
with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make indicator flow with page 
css = re.sub(
    r'\.learn-lecture-page-indicator\s*\{.*?(?=\})',
    '.learn-lecture-page-indicator {\n  position: absolute;\n  right: -24px;\n  top: 10px;\n  padding: 7px 12px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.52);\n  border: 1px solid rgba(219, 234, 254, 0.74);\n  color: #2563EB;\n  font-family: \'DM Mono\', monospace;\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1;\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);\n  backdrop-filter: blur(8px);\n',
    css,
    flags=re.DOTALL
)

with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

