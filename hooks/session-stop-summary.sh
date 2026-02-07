#!/bin/bash
# Stop hook: Write session summary for continuity
# Captures last session context so next session can pick up where we left off

OUTFILE="$HOME/.claude/last-session.md"
LOGDIR="$HOME/.claude/session-summaries"
mkdir -p "$LOGDIR"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# Detect the actual working directory from environment or fallback to pwd
WORK_DIR="${CLAUDE_WORKING_DIR:-$(pwd)}"

# Get branch from the actual working directory, not ~/.claude
BRANCH="unknown"
if git -C "$WORK_DIR" rev-parse --is-inside-work-tree &>/dev/null 2>&1; then
  BRANCH=$(git -C "$WORK_DIR" branch --show-current 2>/dev/null || echo "detached")
fi

# Get recent git activity from the working directory
RECENT_COMMITS=""
if git -C "$WORK_DIR" rev-parse --is-inside-work-tree &>/dev/null 2>&1; then
  RECENT_COMMITS=$(git -C "$WORK_DIR" log --oneline -5 2>/dev/null || echo "none")
fi

# Capture active task context if tasks directory exists
ACTIVE_TASKS=""
if [ -d "$WORK_DIR/tasks" ]; then
  ACTIVE_TASKS=$(ls -1t "$WORK_DIR/tasks/"*.md 2>/dev/null | head -5 | while read -r f; do
    basename "$f" .md
  done)
fi

# Capture any TodoWrite todos if available
PENDING_TODOS=""
if [ -f "$WORK_DIR/.claude/todos.json" ]; then
  PENDING_TODOS=$(cat "$WORK_DIR/.claude/todos.json" 2>/dev/null | node -e "
    let d='';
    process.stdin.on('data',c=>d+=c);
    process.stdin.on('end',()=>{
      try{
        const todos=JSON.parse(d);
        const pending=todos.filter(t=>t.status!=='completed');
        pending.forEach(t=>console.log('- '+t.content));
      }catch(e){}
    });
  " 2>/dev/null)
fi

cat > "$OUTFILE" << EOF
# Last Session -- $TIMESTAMP

**Working directory:** $WORK_DIR
**Branch:** $BRANCH

## Recent commits
$RECENT_COMMITS

## Active tasks
${ACTIVE_TASKS:-No task files found}

## Pending todos
${PENDING_TODOS:-No pending todos found}

## Session context
This file was auto-generated at session end. Check TodoWrite tasks and git log for detailed state.
EOF

# Also archive a copy with timestamp
cp "$OUTFILE" "$LOGDIR/session-$(date '+%Y%m%d-%H%M%S').md" 2>/dev/null

# Cleanup old session summaries (>90 days)
find "$LOGDIR" -name "session-*.md" -mtime +90 -delete 2>/dev/null

exit 0
