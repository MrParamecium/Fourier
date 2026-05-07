import re

with open('tutor-openclaw-ui/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Web references move
src = """              <div class="learn-web-section hidden" id="learnWebSection">
                <div class="learn-web-section-title">
                  <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span> Web References <span class="learn-web-section-count" id="learnWebSectionCount"></span>
                </div>
                <div class="learn-web-cards" id="learnWebCards"></div>
              </div>"""
              
if src not in html:
    print("Already moved or missing")
else:
    html = html.replace(src, '')
    html = html.replace('<div class="learn-chat-scroll" id="learnChatScroll">', '<div class="learn-chat-scroll" id="learnChatScroll">\n' + src)

with open('tutor-openclaw-ui/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
