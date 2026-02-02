#!/bin/bash
# PreToolUse hook: Auto-update counts before git commit
# Only triggers when the bash command is a git commit

COMMAND="$CLAUDE_TOOL_INPUT"

# Only act on git commit commands
echo "$COMMAND" | grep -qE '^git commit' || exit 0

# Run update-counts (silently)
bash "$HOME/.claude/scripts/update-counts.sh" > /dev/null 2>&1 || true

# Stage any docs that changed
cd "$HOME/.claude"
git add -u README.md CLAUDE.md skills/README.md skills/MASTER_INDEX.md \
  docs/*.md commands/*.md website/src/app/layout.tsx \
  website/src/components/layout/Footer.tsx \
  website/src/components/ConsoleGreeting.tsx 2>/dev/null || true

exit 0
