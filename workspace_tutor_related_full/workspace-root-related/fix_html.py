from pathlib import Path
html_path = Path("/Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui/index.html")
content = html_path.read_text()

# Find where the footer's last div ends in my broken insertion
target = """          <div class="text-star-silver/40 text-xs font-light tracking-wider">
            &copy; 2026 Aquarius AI Lab. All Rights Reserved.
            <br class="md:hidden"> Powered by Multi-Modal LLM.
          </div>
        </div>"""

replacement = target + """
      </footer>
    </main>
  </div>
  <div class="app">"""

new_content = content.replace(target, replacement)
html_path.write_text(new_content)
