#!/bin/bash
# PostToolUse hook: Scan written/edited files for accidental secrets
# Triggers on Write and Edit tool use
# Warns but does not block (exit 0 always)

# Read stdin JSON and extract file path using Node.js
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

# Skip binary files, lock files, and node_modules
case "$FILE_PATH" in
  *.lock|*.min.js|*.min.css|*.map|*.woff*|*.ttf|*.png|*.jpg|*.gif|*.ico|*.svg|*.md)
    exit 0
    ;;
esac
echo "$FILE_PATH" | grep -qE '(node_modules|\.git/|vendor/|dist/)' && exit 0

# Scan for secret patterns
FINDINGS=$(grep -nE '(AKIA[0-9A-Z]{16}|sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{36}|gho_[a-zA-Z0-9]{36}|glpat-[a-zA-Z0-9\-]{20}|xox[bpors]-[a-zA-Z0-9\-]+|-----BEGIN[A-Z ]*PRIVATE KEY|password\s*=\s*['"'"'""][^'"'"'""]{8,})' "$FILE_PATH" 2>/dev/null)

if [ -n "$FINDINGS" ]; then
  echo "" >&2
  echo "WARNING: Potential secrets detected in $FILE_PATH" >&2
  echo "---------------------------------------------------" >&2
  echo "$FINDINGS" | head -5 >&2
  echo "" >&2
  echo "Please verify these are not real credentials before committing." >&2
  echo "If they are real secrets, remove them and use environment variables instead." >&2
  echo "" >&2
fi

# Always allow the write to proceed
exit 0
