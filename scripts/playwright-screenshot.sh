#!/bin/bash
# Take a screenshot using playwright-cli.
# Usage: playwright-screenshot.sh <url> [output.png]
#
# Opens a browser session, navigates to URL, screenshots, closes session.
# Requires mise to be available (uses 'mise exec' to get npx in PATH).

set -e

URL="${1:?Usage: playwright-screenshot.sh <url> [output.png]}"
OUTPUT="${2:-tmp/screenshot.png}"

mkdir -p "$(dirname "$OUTPUT")"

# Open browser and navigate in background (stays running until closed)
mise exec -- npx playwright-cli open "$URL" &
OPEN_PID=$!

# Give the browser a moment to initialize and navigate
sleep 2

# Take the screenshot
mise exec -- npx playwright-cli screenshot --filename "$OUTPUT" --full-page

# Close the browser session
mise exec -- npx playwright-cli close 2>/dev/null || true

# Wait for open process to finish
wait "$OPEN_PID" 2>/dev/null || true

echo "Screenshot saved: $OUTPUT"
