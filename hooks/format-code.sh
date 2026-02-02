#!/bin/bash
# PostToolUse hook: Auto-format files after Write/Edit
# Reads file path from stdin JSON (tool_input.file_path)
# Cross-platform: Linux, macOS, Windows (Git Bash)

# Read stdin JSON and extract file path using Node.js (always available)
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | node -e "
  let d='';
  process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>{
    try{
      const j=JSON.parse(d);
      const p=j.tool_input?.file_path||'';
      process.stdout.write(p);
    }catch(e){process.exit(0)}
  });
" 2>/dev/null)

# Exit silently if no file path
[ -z "$FILE_PATH" ] && exit 0

# Exit silently if file doesn't exist
[ -f "$FILE_PATH" ] || exit 0

# Get file extension (lowercase)
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
