import re
with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Make sure renderWebReferences doesn't duplicate them in UI every single message update if we moved it inside scroll. Wait, it replaces `learnWebCards.innerHTML` completely! It doesn't duplicate them, it just overrides.
# Let's check `learnWebSection.classList.remove('hidden')`

with open('tutor-openclaw-ui/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

