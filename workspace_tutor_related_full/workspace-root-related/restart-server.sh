#!/bin/bash
kill 20741
sleep 1
cd /Users/chenghaoxiang/.openclaw/workspace/tutor-openclaw-ui
nohup node ws-bridge.js > server.log 2>&1 &
echo "Server restarted with PID $!"
