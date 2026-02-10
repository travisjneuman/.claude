#!/bin/bash
# PostToolUse hook: Run quick lint check on modified files after Write/Edit
# Warns but does not block (exit 0 always)
# Matcher: Write|Edit

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

# Determine file extension
EXT="${FILE_PATH##*.}"

# Run appropriate linter based on extension (warn only, never block)
case "$EXT" in
  js|jsx|ts|tsx)
    # Try ESLint, then Biome — warn only
    if command -v npx &>/dev/null; then
      LINT_OUTPUT=$(npx --no-install eslint --no-eslintrc --rule '{"no-unused-vars":"warn","no-undef":"warn"}' "$FILE_PATH" 2>/dev/null)
      if [ -n "$LINT_OUTPUT" ] && [ $? -ne 0 ]; then
        echo "" >&2
        echo "LINT WARNING: Issues found in $FILE_PATH" >&2
        echo "$LINT_OUTPUT" | head -5 >&2
        echo "" >&2
      fi
    fi
    ;;
  py)
    # Try ruff, then flake8 — warn only
    if command -v ruff &>/dev/null; then
      LINT_OUTPUT=$(ruff check "$FILE_PATH" 2>/dev/null)
      if [ -n "$LINT_OUTPUT" ]; then
        echo "" >&2
        echo "LINT WARNING: Issues found in $FILE_PATH" >&2
        echo "$LINT_OUTPUT" | head -5 >&2
        echo "" >&2
      fi
    elif command -v flake8 &>/dev/null; then
      LINT_OUTPUT=$(flake8 --max-line-length=99 "$FILE_PATH" 2>/dev/null)
      if [ -n "$LINT_OUTPUT" ]; then
        echo "" >&2
        echo "LINT WARNING: Issues found in $FILE_PATH" >&2
        echo "$LINT_OUTPUT" | head -5 >&2
        echo "" >&2
      fi
    fi
    ;;
  rs)
    # Rust — clippy warn only
    if command -v cargo &>/dev/null; then
      # Only run if in a cargo project
      DIR=$(dirname "$FILE_PATH")
      while [ "$DIR" != "/" ] && [ "$DIR" != "." ]; do
        if [ -f "$DIR/Cargo.toml" ]; then
          LINT_OUTPUT=$(cd "$DIR" && cargo clippy --quiet --message-format=short 2>&1 | head -5)
          if [ -n "$LINT_OUTPUT" ]; then
            echo "" >&2
            echo "LINT WARNING: Clippy issues in $FILE_PATH" >&2
            echo "$LINT_OUTPUT" >&2
            echo "" >&2
          fi
          break
        fi
        DIR=$(dirname "$DIR")
      done
    fi
    ;;
  go)
    # Go vet — warn only
    if command -v go &>/dev/null; then
      DIR=$(dirname "$FILE_PATH")
      LINT_OUTPUT=$(cd "$DIR" && go vet ./... 2>&1 | head -5)
      if [ -n "$LINT_OUTPUT" ]; then
        echo "" >&2
        echo "LINT WARNING: go vet issues in $FILE_PATH" >&2
        echo "$LINT_OUTPUT" >&2
        echo "" >&2
      fi
    fi
    ;;
esac

# Always allow — this hook only warns
exit 0
