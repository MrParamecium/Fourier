#!/bin/bash
source .env
nohup node ws-bridge.js > bridge.log 2>&1 &
