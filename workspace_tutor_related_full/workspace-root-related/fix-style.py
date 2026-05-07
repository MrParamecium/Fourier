with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make indicator absolutely positioned at bottom-right of the current `.learn-explain-scroll` parent.
css = css.replace('.learn-lecture-page-indicator {\n  position: absolute;\n  right: -24px;\n  top: 10px;', 
                  '.learn-lecture-page-indicator {\n  position: absolute;\n  right: 20px;\n  top: 100%;\n  margin-top: -40px;')
css = css.replace('.learn-lecture-page-indicator {\n  position: fixed;\n  right: 42.4%;\n  bottom: 14px;',
                  '.learn-lecture-page-indicator {\n  position: absolute;\n  right: 20px;\n  bottom: -40px;')

# We should make `.learn-explain-scroll` relative so the page indicator can stick to its bottom. But wait, if text is very long, `bottom: -40px` goes completely to the bottom of the long text.
# The user said "页码要随着我的讲解移动". They mean "when the page is scrolling down (to read the explanation), it should scroll with the text, NOT be fixed".
# For that, we can simply place the indicator AT THE END of `.learn-explain-body`. 
# Or we can just let `learn-explain-bottom-rail` be position:static, taking up space at the end of the text.
with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('tutor-openclaw-ui/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

rail = """                <div class="learn-explain-bottom-rail" id="learnExplainBottomRail">
                  <div class="learn-lecture-page-indicator" id="learnLecturePageIndicator">1 / 1</div>
                </div>"""
html = html.replace(rail, "")
html = html.replace('<!-- Textbook overlay (hidden by default) -->', rail + '\n                <!-- Textbook overlay (hidden by default) -->')

# Now `learnExplainBottomRail` comes AFTER `learnExplainContent`. It scrolls naturally with it.
with open('tutor-openclaw-ui/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
