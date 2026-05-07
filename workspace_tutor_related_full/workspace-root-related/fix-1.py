import re
with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix 1: Make chat panel expand and remove fixed max-width.
css = re.sub(
    r'\.learn-chat-col\s*\{[^}]*max-width:\s*420px;[^}]*\}',
    '.learn-chat-col {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  background: var(--bg-body);\n  position: relative;\n  overflow: hidden;\n}',
    css
)

# And clear out the ".learn-chat-col" definition with max-width a bit lower down if it exists
css = css.replace('max-width: 420px;', 'max-width: none;')
css = css.replace('flex: 0 0 420px;', 'flex: 1;')

# Fix 2: Move the 1/6 indicator from `position: fixed` or `position: absolute` at the bottom of the screen
# to flow with the content. Harrison: "1/6这个页码要随着我的讲解移动，而不是固定在那里".
# In HTML it is in `<div class="learn-explain-bottom-rail" id="learnExplainBottomRail">`
# We should change position to absolute inside the relative container of the current text point?
# Or just put it at the bottom of the `.learn-explain-col` in normal flow? 
# Currently it's fixed near 42.4% right bottom.
css = re.sub(
    r'\.learn-lecture-page-indicator\s*\{.*?(?=\})',
    '.learn-lecture-page-indicator {\n  position: absolute;\n  right: 20px;\n  bottom: 0px;\n  padding: 7px 12px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.52);\n  border: 1px solid rgba(219, 234, 254, 0.74);\n  color: #2563EB;\n  font-family: \'DM Mono\', monospace;\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1;\n  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);\n  backdrop-filter: blur(8px);\n',
    css,
    flags=re.DOTALL
)

with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

