import re
from pathlib import Path

html_path = Path("tutor-openclaw-ui/index.html")
html = html_path.read_text()

# We completely rewrite the welcome-inner structure.
# Instead of <div class="welcome-inner">...</div> we build a two-column grid.

old_inner_start = r'<div class="welcome-inner" style="position:relative; z-index:10; max-width:800px; width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center;">(.*?)<div class="search-box" id="searchBox">'
target_search = re.search(old_inner_start, html, flags=re.DOTALL)
if target_search:
    new_inner_start = """<div class="welcome-inner" style="position:relative; z-index:10; max-width:1100px; width:100%; display:flex; flex-direction:row; align-items:center; justify-content:center; gap:64px; padding:40px;">
          <!-- Left: Book Cover -->
          <div style="flex:0 0 350px; display:flex; justify-content:center; perspective:1000px;">
            <div style="background:var(--border); width:100%; aspect-ratio:3/4; border-radius:8px; box-shadow:0 20px 40px rgba(15,23,42,0.1), 0 0 0 1px rgba(15,23,42,0.05); overflow:hidden; position:relative; transform:rotateY(5deg) scale(0.95); transition:transform 0.4s ease;">
              <!-- Book Image Placeholder - Will map to the actual covers -->
              <img src="book-002-preview.png" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.src='')" />
              <!-- Book Spine effect -->
              <div style="position:absolute; top:0; left:0; bottom:0; width:12px; background:linear-gradient(to right, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);"></div>
            </div>
          </div>
          
          <!-- Right: Text & Search Box -->
          <div style="flex:1; display:flex; flex-direction:column; align-items:flex-start; text-align:left;">
          
            <h1 style="font-family:'Inter', sans-serif; font-size:42px; font-weight:700; color:var(--text-primary); letter-spacing:-1px; margin:0 0 16px; line-height:1.2;">
              Linear Systems & Signals
            </h1>
            
            <p style="font-size:16px; color:var(--text-secondary); max-width:500px; margin:0 0 24px; line-height:1.6; font-weight:500;">
              Interactive deep learning book with generative visualizations, code, and dynamic math math.
            </p>
            
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:48px;">
               <span style="font-size:13px; font-weight:600; color:var(--text-secondary); background:var(--border); padding:6px 12px; border-radius:6px; letter-spacing:0.5px;">B.P. LATHI • 3RD EDITION</span>
            </div>

          <div class="search-box" id="searchBox" style="margin:0 !important; max-width:600px !important;">"""
    html = html.replace(target_search.group(0), new_inner_start)

# We need to make sure the app.js or CSS doesn't break this new layout.
html_path.write_text(html)

