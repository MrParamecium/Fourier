with open('tutor-openclaw-ui/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We need to move <div class="learn-web-section hidden" ...>...</div> into `<div class="learn-chat-scroll"...>` ABOVE `<div class="learn-chat-history">`. That way it scrolls with the chat.

web_section = """              <div class="learn-web-section hidden" id="learnWebSection">
                <div class="learn-web-section-title">
                  <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span> Web References <span class="learn-web-section-count" id="learnWebSectionCount"></span>
                </div>
                <div class="learn-web-cards" id="learnWebCards"></div>
              </div>"""

html = html.replace(web_section, "")
html = html.replace('<div class="learn-chat-scroll" id="learnChatScroll">', '<div class="learn-chat-scroll" id="learnChatScroll">\n' + web_section)

with open('tutor-openclaw-ui/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
