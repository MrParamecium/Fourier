#!/bin/bash
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi
nohup node ws-bridge.js > bridge.log 2>&1 &
