#!/bin/bash
# Take a screenshot using playwright-cli.
# Usage: playwright-screenshot.sh <url> [output.png]
#
# Opens a browser session, navigates to URL, screenshots, closes session.
# Requires playwright-cli to be in PATH (node_modules/.bin is added by Makefile).

set -e

URL="${1:?Usage: playwright-screenshot.sh <url> [output.png]}"
OUTPUT="${2:-tmp/screenshot.png}"

mkdir -p "$(dirname "$OUTPUT")"

# Open browser and navigate in background (stays running until closed)
playwright-cli open "$URL" &
OPEN_PID=$!

# Give the browser a moment to initialize and navigate
sleep 2

# Take the screenshot
playwright-cli screenshot --filename "$OUTPUT" --full-page

# Close the browser session
playwright-cli close 2>/dev/null || true

# Wait for open process to finish
wait "$OPEN_PID" 2>/dev/null || true

echo "Screenshot saved: $OUTPUT"
