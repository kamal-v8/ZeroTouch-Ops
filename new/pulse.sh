#!/bin/bash

# --- Color Codes for UI ---
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "--- DevOps Pulse: Brew & Blooom Check ---"

# 1. Docker Status (System Level)
echo -n "Checking Docker Service: "
if sudo systemctl is-active --quiet docker; then
  echo -e "${GREEN}[RUNNING]${NC}"
else
  echo -e "${RED}[NOT RUNNING]${NC}"
fi

# 2. Connectivity Checks (Networking Level)
echo -n "Checking Frontend (Port 80): "
if curl -s --head --request GET http://localhost:80 | grep "200" >/dev/null; then
  echo -e "${GREEN}[UP]${NC}"
else
  echo -e "${RED}[DOWN]${NC}"
fi

echo -n "Checking Backend (Port 3000): "
if curl -s --head --request GET http://localhost:3000 | grep "200 OK" >/dev/null; then
  echo -e "${GREEN}[UP]${NC}"
else
  echo -e "${RED}[DOWN]${NC}"
fi

# 3. Disk Usage (Architecture Level)
size="$(du -sh brewandblooomv2/ | awk '{print $1}')"
echo "Project Directory Size (brewandblooomv2): ${size}"

# 4. Process Count (Process Management Level)
proc_count=$(ps aux | grep "node\|nginx" | grep -v grep | wc -l)
echo "Active Application Processes: ${proc_count}"

echo "----------------------------------------"
