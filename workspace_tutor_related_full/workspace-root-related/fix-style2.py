with open('tutor-openclaw-ui/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Make the rail relative, padding-top: 20px, text-align: center so the indicator looks like pagination
fix_rail = """
.learn-explain-bottom-rail {
  position: relative;
  height: auto;
  z-index: 17;
  pointer-events: none;
  padding: 40px 0;
  display: flex;
  justify-content: flex-end;
}
.learn-lecture-page-indicator {
  position: relative;
  display: inline-block;
  padding: 7px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(219, 234, 254, 0.74);
  color: #2563EB;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
  pointer-events: auto;
}
"""

css = css.replace(""".learn-explain-bottom-rail {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 0;
  z-index: 17;
  pointer-events: none;
}""", "")

css = css.replace(""".learn-lecture-page-indicator {
  position: absolute;
  right: -24px;
  top: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
  border: 1px solid rgba(219, 234, 254, 0.74);
  color: #2563EB;
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}""", fix_rail)

with open('tutor-openclaw-ui/style.css', 'w', encoding='utf-8') as f:
    f.write(css + fix_rail)
