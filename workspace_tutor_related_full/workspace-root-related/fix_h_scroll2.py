from pathlib import Path
css = Path("tutor-openclaw-ui/style.css").read_text()
# We also remove any margin-top that might be pushing the internal contents of `.main` down.
css += """
.main {
  margin: 0 !important;
  border-radius: 0 !important; 
  /* the original craft theme had margin: 12px; border-radius: 12px; which causes the pane to be smaller than the screen leaving gaps */
}
"""
Path("tutor-openclaw-ui/style.css").write_text(css)
