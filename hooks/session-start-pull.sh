#!/bin/bash
# SessionStart hook: Pull all repos in background
# Non-blocking — runs async so session startup isn't delayed

LOGDIR="$HOME/.claude/logs"
LOGFILE="$LOGDIR/pull-repos.log"
SCRIPT="$HOME/.claude/_pull-all-repos.sh"

# Create log directory if needed
mkdir -p "$LOGDIR"

# Rotate log if over 500KB
if [ -f "$LOGFILE" ] && [ "$(wc -c < "$LOGFILE" 2>/dev/null || echo 0)" -gt 512000 ]; then
  tail -100 "$LOGFILE" > "$LOGFILE.tmp" && mv "$LOGFILE.tmp" "$LOGFILE"
fi

# Only run if script exists
[ -f "$SCRIPT" ] || exit 0

# Run in background with timeout (60s), redirect output to log
{
  echo "=== Pull started: $(date) ==="
  timeout 60 bash "$SCRIPT" 2>&1 || echo "Pull finished with exit code $?"
  echo "=== Pull ended: $(date) ==="
  # Fix marketplace paths (cross-platform compatibility)
  [ -f "$HOME/.claude/scripts/fix-marketplace-paths.sh" ] && bash "$HOME/.claude/scripts/fix-marketplace-paths.sh" 2>&1 || true
  # Counts are updated on-demand via /update-counts or pre-commit hook (not on session start)
} >> "$LOGFILE" 2>&1 &

# Exit immediately so session isn't blocked
exit 0
