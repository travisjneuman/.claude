#!/bin/bash
# PreToolUse hook: Guard dangerous commands + auto-update counts before commit
# Merges guard-dangerous.sh + pre-commit-counts.sh into single process
# Exit 2 = block, exit 0 = allow

COMMAND="$CLAUDE_TOOL_INPUT"

# --- GUARD: Block dangerous patterns ---
if echo "$COMMAND" | grep -qiE '(rm\s+-rf\s+[/~]|rm\s+-rf\s+\$HOME|git\s+push\s+--force|git\s+push\s+-f\b|DROP\s+TABLE|TRUNCATE\s+TABLE|git\s+clean\s+-fd|git\s+reset\s+--hard\s+origin|chmod\s+-R\s+777|curl\s+.*\|\s*sh|curl\s+.*\|\s*bash|wget\s+.*\|\s*sh|wget\s+.*\|\s*bash|npm\s+publish|yarn\s+publish|docker\s+system\s+prune\s+-a|git\s+checkout\s+--\s+\.|git\s+restore\s+\.)'; then
  echo "BLOCKED: Dangerous command detected. Please confirm with user." >&2
  exit 2
fi

# --- PRE-COMMIT: Auto-update counts before git commit in ~/.claude ---
if echo "$COMMAND" | grep -qE '^git commit'; then
  CLAUDE_REPO="$HOME/.claude"
  REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
  if [ "$REPO_ROOT" = "$CLAUDE_REPO" ]; then
    bash "$CLAUDE_REPO/scripts/update-counts.sh" > /dev/null 2>&1 || true
    cd "$CLAUDE_REPO"
    git add -u README.md CLAUDE.md skills/README.md skills/MASTER_INDEX.md \
      docs/*.md commands/*.md plugin.json counts.json \
      website/src/app/layout.tsx \
      website/src/components/layout/Footer.tsx \
      website/src/components/ConsoleGreeting.tsx \
      website/src/lib/data/marketplace-counts.json 2>/dev/null || true
  fi
fi

exit 0
