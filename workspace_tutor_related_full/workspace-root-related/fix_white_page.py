from pathlib import Path
html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# We need to make sure we closed the two new divs we opened:
# <div style="flex:1; display:flex; flex-direction:column; align-items:flex-start; text-align:left;">
# ...
#   <div class="search-box" id="searchBox" style="...">

# Let's cleanly replace the tail of the welcome screen up to "chips"
# Find the exact string we injected and ensure it plays nice with the end.
old_tail = """          <div class="chips" id="quickChips"></div>
        </div>
      </div>"""

new_tail = """          <div class="chips" id="quickChips" style="margin-top: 16px;"></div>
          </div> <!-- Close Text & Search Box column -->
        </div> <!-- Close welcome-inner -->
      </div> <!-- Close welcomeScreen -->"""

if old_tail in html:
    html = html.replace(old_tail, new_tail)

# In case the issue is that clicking on a section chapter does nothing: 
# The user said "我现在点进章节空白了" (When I click into a chapter, it's blank). 
# This means the `learnView` is probably breaking, or `askHaikuAboutCurrent` / `genLesson` is failing,
# or the display logic when switching from `welcomeScreen` to `learnView` leaves it transparent/hidden.
html_path.write_text(html)

