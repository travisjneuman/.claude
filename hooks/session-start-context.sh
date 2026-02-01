#!/bin/bash
# SessionStart hook: Inject last session context if recent (<24h)
# Outputs to stdout which gets injected into Claude's context

SESSIONFILE="$HOME/.claude/last-session.md"

# Exit if no session file
[ -f "$SESSIONFILE" ] || exit 0

# Check if file is less than 24 hours old
if [ "$(uname)" = "Darwin" ]; then
  FILE_AGE=$(( $(date +%s) - $(stat -f%m "$SESSIONFILE") ))
else
  FILE_AGE=$(( $(date +%s) - $(stat -c%Y "$SESSIONFILE" 2>/dev/null || echo 0) ))
fi

# 86400 seconds = 24 hours
if [ "$FILE_AGE" -lt 86400 ] 2>/dev/null; then
  echo "=== Previous Session Context ==="
  cat "$SESSIONFILE"
  echo "=== End Previous Session ==="
fi

exit 0
