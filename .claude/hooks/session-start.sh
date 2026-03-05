#!/bin/bash
# SessionStart hook: install mise + project dependencies in remote Claude Code sessions.
# Idempotent — safe to re-run; skips already-installed tools.
set -euo pipefail

# Only run in remote Claude Code on the web environments.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  echo "Not a remote session, skipping setup."
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR"

# ── mise ──────────────────────────────────────────────────────────────────────
MISE_BIN="$HOME/.local/bin/mise"

if ! command -v mise &>/dev/null && [ ! -x "$MISE_BIN" ]; then
  echo "Installing mise..."
  curl -fsSL https://mise.run | sh
fi

# Ensure mise is on PATH for the rest of this script.
export PATH="$HOME/.local/bin:$PATH"

# Install runtimes declared in mise.toml (Node, Python, Hugo).
# mise install is idempotent — already-installed versions are skipped.
echo "Running mise install..."
mise install

# Export mise shims into the session environment so tools are available
# in subsequent Claude Code commands without needing shell activation.
MISE_SHIMS="$(mise shims dir 2>/dev/null || echo "$HOME/.local/share/mise/shims")"
if [ -d "$MISE_SHIMS" ]; then
  echo "export PATH=\"$MISE_SHIMS:\$PATH\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"
fi

# Also add node_modules/.bin so Makefile targets resolve npx binaries.
echo "export PATH=\"$PROJECT_DIR/node_modules/.bin:\$PATH\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"

# ── Node dependencies ─────────────────────────────────────────────────────────
echo "Running npm install..."
npm install

echo "Setup complete."
