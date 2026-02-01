#!/bin/bash
# SessionStart hook: Pull all repos in background
# Non-blocking — runs async so session startup isn't delayed

LOGDIR="$HOME/.claude/logs"
LOGFILE="$LOGDIR/pull-repos.log"
SCRIPT="$HOME/.claude/_pull-all-repos.sh"

# Create log directory if needed
mkdir -p "$LOGDIR"

# Only run if script exists
[ -f "$SCRIPT" ] || exit 0

# Run in background with timeout (60s), redirect output to log
{
  echo "=== Pull started: $(date) ==="
  timeout 60 bash "$SCRIPT" 2>&1 || echo "Pull finished with exit code $?"
  echo "=== Pull ended: $(date) ==="
} >> "$LOGFILE" 2>&1 &

# Exit immediately so session isn't blocked
exit 0
