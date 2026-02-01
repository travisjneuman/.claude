#!/bin/bash
# PostToolUse hook: Auto-format files after Write/Edit
# Only runs on supported file types, handles Windows paths

FILE_PATH="$CLAUDE_FILE_PATH"

# Exit silently if no file path
[ -z "$FILE_PATH" ] && exit 0

# Exit silently if file doesn't exist
[ -f "$FILE_PATH" ] || exit 0

# Get file extension
EXT="${FILE_PATH##*.}"
EXT=$(echo "$EXT" | tr '[:upper:]' '[:lower:]')

case "$EXT" in
  js|jsx|ts|tsx|json|css|scss|html|md|yaml|yml)
    npx prettier --write "$FILE_PATH" 2>/dev/null
    ;;
  py)
    if command -v ruff &>/dev/null; then
      ruff format "$FILE_PATH" 2>/dev/null
    elif command -v black &>/dev/null; then
      black --quiet "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac

exit 0
