#!/bin/bash
# PreToolUse hook: Auto-update counts before git commit
# Only triggers when committing inside the ~/.claude repo

COMMAND="$CLAUDE_TOOL_INPUT"

# Only act on git commit commands
echo "$COMMAND" | grep -qE '^git commit' || exit 0

# Only run when working directory is inside ~/.claude repo
CLAUDE_REPO="$HOME/.claude"
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
[ "$REPO_ROOT" = "$CLAUDE_REPO" ] || exit 0

# Run update-counts (silently)
bash "$CLAUDE_REPO/scripts/update-counts.sh" > /dev/null 2>&1 || true

# Stage any docs that changed
cd "$CLAUDE_REPO"
git add -u README.md CLAUDE.md skills/README.md skills/MASTER_INDEX.md \
  docs/*.md commands/*.md plugin.json counts.json \
  website/src/app/layout.tsx \
  website/src/components/layout/Footer.tsx \
  website/src/components/ConsoleGreeting.tsx \
  website/src/lib/data/marketplace-counts.json 2>/dev/null || true

exit 0
