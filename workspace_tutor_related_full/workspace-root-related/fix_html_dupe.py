with open('tutor-openclaw-ui/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

dupe = """                <!-- Web sources section -->
                  <div class="learn-web-cards" id="learnWebCards"></div>
                </div>
              </div>"""

if dupe in text:
    text = text.replace(dupe, '              </div>')
    with open('tutor-openclaw-ui/index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Fixed HTML dupe.")
else:
    print("Not found exactly.")
