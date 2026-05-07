import re
with open('tutor-openclaw-ui/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will find function renderWebReferences or renderLearnWebSection and prevent it from writing to the static header container.
# Instead, when a message arrives (learn:stream-finished or inside the chat), I inject the references as a chat bubble.
# Wait, if I look at `function addChatMessage`...
js = js.replace("renderLearnWebSection(data.webSources || []);", "")
js = js.replace("renderLearnWebSection(tutorState.learnWebSources);", "")

# Instead we inject it inside the response if it has sources when the stream finishes.
# Let's see updateRecentConversations('learn:stream-finished') event, or where we finish.
# Or better: when we get the `data.webSources`, we render them explicitly as a message that shows up below the initial explanation bubble, OR we insert it at the end of the AI reply.

def repl_references(match):
    return ""

# find `if (data.explanation)` or something similar where first AI response is appended.
# Actually, the user says "web references 不是单独的，而是和下面对问题的解答同一个滚动轴"
# Wait, currently the static web references are IN the `.learn-chat-col` but ABOVE `.learn-chat-scroll`.
# So to put them in the SAME scroll axis, we can just MOVE the DOM element `.learn-web-section` INSIDE `.learn-chat-scroll`'s flow.
