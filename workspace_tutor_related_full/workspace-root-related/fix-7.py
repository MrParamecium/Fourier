import re
with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Instead of hiding `learnWebSection` entirely, let's inject its HTML exactly AT THE END OF THE learn:stream-finished or inside the chat message rendering
# Since there is `.learn-web-section` STILL existing but we just put it inside `.learn-chat-scroll`, right now `renderLearnWebSection()` manipulates inner cards and unhides it. Because it is INSIDE `.learn-chat-scroll` (ABOVE `.learn-chat-content`), it will scroll naturally.

# Wait, if we put it ABOVE `.learn-chat-content` in `.learn-chat-scroll`, it might overlap or show above everything. But chat scrolling normally has `append()` down below. 
# We should probably put it inside `.learn-chat-content` BEFORE the first chat bubble. Or simply `.prepend()`.
# Wait, currently `index.html` has `<div class="learn-web-section hidden" id="learnWebSection">...</div>` just inside `<div class="learn-chat-scroll">`.
# `learnChatContent` comes NEXT. So when scroll happens, references are at the top, and chat history follows under it.
# This solves the duplicate issue AND the scrolling axis issue instantly. 
# Is `renderWebReferences()` mutating it? Yes, we saw `renderLearnWebSection` takes `webSources` and populates `learnWebCards`. 
# So no JS changes are strictly needed if we just move it in DOM correctly. Let me verify index.html has it moved inside scroll.

