#!/bin/bash
# SessionStart hook (async): keep ~/.claude and marketplace clones current.
#
# - Runs in the background; never delays the session and costs zero tokens.
# - At most once per PULL_INTERVAL_HOURS (default 24). Run /pull-repos to
#   force a pull at any time.
# - Fast-forward only. Never commits, pushes, merges, or discards anything.
# - Output goes to ~/.claude/logs/pull-repos.log, not into Claude's context.

CLAUDE_DIR="$HOME/.claude"
LOGDIR="$CLAUDE_DIR/logs"
LOGFILE="$LOGDIR/pull-repos.log"
STAMP="$LOGDIR/.last-pull"
SCRIPT="$CLAUDE_DIR/_pull-all-repos.sh"
# Settings: host file (~/.claude/.env.local) wins over the shared private layer
# (~/.claude/local/shared.env). Both are gitignored.
env_get() { grep -h "^$1=" "$HOME/.claude/.env.local" "$HOME/.claude/local/shared.env" 2>/dev/null | head -1 | cut -d'=' -f2- | sed -e 's/^["'"'"']//' -e 's/["'"'"']$//'; }

[ -f "$SCRIPT" ] || exit 0
mkdir -p "$LOGDIR"

INTERVAL_HOURS=$(env_get PULL_INTERVAL_HOURS)
INTERVAL_HOURS=${INTERVAL_HOURS:-24}
[ "$INTERVAL_HOURS" = "0" ] && exit 0   # 0 disables the automatic pull

NOW=$(date +%s)
LAST=$(cat "$STAMP" 2>/dev/null || echo 0)
[ $((NOW - LAST)) -lt $((INTERVAL_HOURS * 3600)) ] && exit 0
echo "$NOW" > "$STAMP"

# Rotate log past 500KB
if [ -f "$LOGFILE" ] && [ "$(wc -c < "$LOGFILE")" -gt 512000 ]; then
  tail -200 "$LOGFILE" > "$LOGFILE.tmp" && mv "$LOGFILE.tmp" "$LOGFILE"
fi

# The pull script needs Bash 4+ (macOS /bin/bash is 3.2).
BASH4=bash
for b in /opt/homebrew/bin/bash /usr/local/bin/bash; do [ -x "$b" ] && BASH4="$b" && break; done

(
  echo "=== Pull started: $(date) ==="
  "$BASH4" "$SCRIPT" 2>&1 &
  PID=$!
  # Portable 5-minute watchdog (macOS has no `timeout`).
  ( sleep 300 && kill "$PID" 2>/dev/null ) &
  WATCHDOG=$!
  wait "$PID"; RC=$?
  kill "$WATCHDOG" 2>/dev/null
  echo "=== Pull ended (exit $RC): $(date) ==="
) >> "$LOGFILE" 2>&1 &

exit 0
