#!/usr/bin/env python3
"""
Inject new-book-previews.json into app.js as SECTION_PREVIEWS_NEW constant.
"""
import json, os, re

PREVIEWS_FILE = "tutor-materials/new-book-previews.json"
APP_JS = "tutor-openclaw-ui/app.js"
MARKER_START = "// ── SECTION_PREVIEWS_NEW (auto-generated) ──"
MARKER_END = "// ── END SECTION_PREVIEWS_NEW ──"

with open(PREVIEWS_FILE) as f:
    previews = json.load(f)

# Build JS constant
lines = [MARKER_START]
lines.append("const SECTION_PREVIEWS_NEW = " + json.dumps(previews, ensure_ascii=False, indent=2) + ";")
lines.append(MARKER_END)
new_block = "\n".join(lines)

with open(APP_JS) as f:
    content = f.read()

# Replace existing block or insert before SECTION_PREVIEWS_OLD definition
if MARKER_START in content:
    content = re.sub(
        re.escape(MARKER_START) + r'.*?' + re.escape(MARKER_END),
        new_block,
        content,
        flags=re.DOTALL
    )
else:
    # Insert before syllabusDataOld
    content = content.replace(
        "// ── Syllabus: OLD book",
        new_block + "\n\n// ── Syllabus: OLD book"
    )

with open(APP_JS, 'w') as f:
    f.write(content)

print(f"✅ Injected {len(previews)} entries into app.js as SECTION_PREVIEWS_NEW")
