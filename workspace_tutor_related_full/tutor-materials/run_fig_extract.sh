#!/bin/bash
# Run figure extraction in background, output to log file
cd /Users/chenghaoxiang/.openclaw/workspace/tutor-materials
python3 -W ignore extract_fig_coords.py >> /tmp/fig_extract.log 2>&1
echo "DONE at $(date)" >> /tmp/fig_extract.log
