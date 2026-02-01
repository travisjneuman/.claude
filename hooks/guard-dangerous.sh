#!/bin/bash
# PreToolUse hook: Block dangerous bash commands
# Exit 2 to block, exit 0 to allow

COMMAND="$CLAUDE_TOOL_INPUT"

# Check for dangerous patterns
if echo "$COMMAND" | grep -qiE '(rm\s+-rf\s+[/~]|git\s+push\s+--force|DROP\s+TABLE|TRUNCATE\s+TABLE|git\s+clean\s+-fd|git\s+reset\s+--hard\s+origin)'; then
  echo "BLOCKED: Dangerous command detected. Please confirm with user before running." >&2
  exit 2
fi

exit 0
