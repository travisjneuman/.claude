#!/bin/bash
# Stop hook: Write session summary for continuity
# Captures last session context so next session can pick up where we left off

OUTFILE="$HOME/.claude/last-session.md"
LOGDIR="$HOME/.claude/session-summaries"
mkdir -p "$LOGDIR"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
BRANCH=$(git -C "$HOME/.claude" branch --show-current 2>/dev/null || echo "unknown")

# Get recent git activity in the working directory (if it's a git repo)
RECENT_COMMITS=""
if git rev-parse --is-inside-work-tree &>/dev/null 2>&1; then
  RECENT_COMMITS=$(git log --oneline -5 2>/dev/null || echo "none")
  WORK_DIR=$(pwd)
else
  WORK_DIR=$(pwd)
fi

cat > "$OUTFILE" << EOF
# Last Session — $TIMESTAMP

**Working directory:** $WORK_DIR
**Branch:** $BRANCH

## Recent commits
$RECENT_COMMITS

## Session context
This file was auto-generated at session end. Check TodoWrite tasks and git log for detailed state.
EOF

# Also archive a copy with timestamp
cp "$OUTFILE" "$LOGDIR/session-$(date '+%Y%m%d-%H%M%S').md" 2>/dev/null

exit 0
