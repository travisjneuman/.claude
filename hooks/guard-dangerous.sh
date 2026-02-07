#!/bin/bash
# PreToolUse hook: Block dangerous bash commands
# Exit 2 to block, exit 0 to allow

COMMAND="$CLAUDE_TOOL_INPUT"

# Check for dangerous patterns
if echo "$COMMAND" | grep -qiE '(rm\s+-rf\s+[/~]|rm\s+-rf\s+\$HOME|rm\s+-rf\s+~/|git\s+push\s+--force|git\s+push\s+-f\b|DROP\s+TABLE|TRUNCATE\s+TABLE|git\s+clean\s+-fd|git\s+reset\s+--hard\s+origin|chmod\s+-R\s+777|curl\s+.*\|\s*sh|curl\s+.*\|\s*bash|wget\s+.*\|\s*sh|wget\s+.*\|\s*bash|npm\s+publish|yarn\s+publish|docker\s+system\s+prune\s+-a|git\s+checkout\s+--\s+\.|git\s+restore\s+\.)'; then
  echo "BLOCKED: Dangerous command detected. Please confirm with user before running." >&2
  exit 2
fi

exit 0
