#!/bin/bash
# PostToolUse hook (Write|Edit): scan the file Claude just wrote for things that
# look like real credentials. Never blocks. When something matches, it tells
# Claude (via additionalContext) so Claude can remove it before committing.
# Silent and zero-token when nothing matches.

INPUT=$(cat)
FILE_PATH=$(printf '%s' "$INPUT" | node -e '
  let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
    try{const j=JSON.parse(d);process.stdout.write(j.tool_input?.file_path||j.tool_input?.notebook_path||"")}catch(e){}
  });' 2>/dev/null)

[ -z "$FILE_PATH" ] && exit 0
[ -f "$FILE_PATH" ] || exit 0

case "$FILE_PATH" in
  *.lock|*.min.js|*.min.css|*.map|*.woff*|*.ttf|*.png|*.jpg|*.jpeg|*.gif|*.ico|*.pdf|*.zip) exit 0 ;;
esac
printf '%s' "$FILE_PATH" | grep -qE '(node_modules|\.git/|vendor/|dist/)' && exit 0

FINDINGS=$(grep -nE '(AKIA[0-9A-Z]{16}|sk-(ant-|proj-)?[a-zA-Z0-9_-]{20,}|gh[pousr]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{40,}|glpat-[a-zA-Z0-9_-]{20}|xox[bpors]-[a-zA-Z0-9-]{10,}|-----BEGIN[A-Z ]*PRIVATE KEY)' "$FILE_PATH" 2>/dev/null | head -5 | cut -c1-120)

[ -z "$FINDINGS" ] && exit 0

MSG="Possible secret written to $FILE_PATH (first matches, truncated):
$FINDINGS
If any of these are real credentials, remove them and use an environment variable or an ignored local file instead."

printf '%s' "$MSG" | node -e '
  let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{
    process.stdout.write(JSON.stringify({hookSpecificOutput:{hookEventName:"PostToolUse",additionalContext:d}})+"\n");
  });'
exit 0
