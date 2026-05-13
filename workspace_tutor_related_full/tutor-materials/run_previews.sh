#!/bin/zsh
: "${OPENROUTER_API_KEY:?OPENROUTER_API_KEY is required}"
cd /Users/chenghaoxiang/.openclaw/workspace
python3 tutor-materials/generate_previews.py > tutor-materials/previews.log 2>&1
echo "exit: $?"
