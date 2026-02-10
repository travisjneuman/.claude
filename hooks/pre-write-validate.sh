#!/bin/bash
# PreToolUse hook: Validate file paths before Write/Edit operations
# Blocks writes to protected paths (.env, credentials, node_modules, etc.)
# Matcher: Write|Edit
# Exit 0 = allow, Exit 2 = block

# Get the tool input from environment variable
TOOL_INPUT="$CLAUDE_TOOL_INPUT"

# Extract file_path from JSON using Node.js
FILE_PATH=$(echo "$TOOL_INPUT" | node -e "
  let d='';
  process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>{
    try{
      const j=JSON.parse(d);
      const p=j.file_path||'';
      process.stdout.write(p);
    }catch(e){process.exit(0)}
  });
" 2>/dev/null)

# Exit silently if no file path extracted
[ -z "$FILE_PATH" ] && exit 0

# Normalize path separators for cross-platform
NORMALIZED=$(echo "$FILE_PATH" | tr '\\' '/')

# Block writes to sensitive files
case "$NORMALIZED" in
  */.env|*/.env.local|*/.env.production|*/.env.staging)
    echo "BLOCKED: Cannot write to environment file: $FILE_PATH" >&2
    echo "Environment files contain secrets and should be edited manually." >&2
    exit 2
    ;;
  */credentials.json|*/service-account*.json|*/*-credentials.json)
    echo "BLOCKED: Cannot write to credentials file: $FILE_PATH" >&2
    echo "Credential files should never be modified by automation." >&2
    exit 2
    ;;
  */node_modules/*|*/.git/*)
    echo "BLOCKED: Cannot write to protected directory: $FILE_PATH" >&2
    echo "This directory is managed by external tools." >&2
    exit 2
    ;;
  */.ssh/*|*/.gnupg/*)
    echo "BLOCKED: Cannot write to security directory: $FILE_PATH" >&2
    echo "SSH and GPG directories should be managed manually." >&2
    exit 2
    ;;
  */id_rsa*|*/id_ed25519*|*/*.pem|*/*.key)
    echo "BLOCKED: Cannot write to key file: $FILE_PATH" >&2
    echo "Private key files should never be modified by automation." >&2
    exit 2
    ;;
esac

# Allow all other writes
exit 0
