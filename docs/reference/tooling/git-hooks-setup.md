# Git Hooks Setup Guide

**When to use:** Setting up automation for any project via git hooks.

---

## Overview

Git hooks enforce workflow compliance automatically. The most common hook is `pre-commit`, which runs before each commit.

---

## Pre-Commit Hook: Task File Enforcement

This hook ensures code changes include corresponding task file updates.

### Setup

**Location:** `.git/hooks/pre-commit`

```bash
#!/bin/bash

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Get staged files
STAGED_FILES=$(git diff --cached --name-only)

# Check for code file changes
# Customize this pattern for your project structure
CODE_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^(src/|lib/|components/|services/|stores/)' | grep -v '\.md$')

# Check for task file changes
TASK_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^tasks/.*\.md$')

# If code files changed but no task file staged, block commit
if [ -n "$CODE_FILES_CHANGED" ] && [ -z "$TASK_FILES_CHANGED" ]; then
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}  COMMIT BLOCKED - Missing Task File${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}Code files were changed, but no task file is staged.${NC}"
    echo ""
    echo "Changed code files:"
    echo "$CODE_FILES_CHANGED" | sed 's/^/  - /'
    echo ""
    echo -e "${YELLOW}Required Action:${NC}"
    echo "  1. Update your task file: tasks/[feature-name].md"
    echo "  2. Stage your task file: git add tasks/[feature-name].md"
    echo "  3. Retry commit"
    echo ""
    echo -e "${YELLOW}Emergency bypass: git commit --no-verify${NC}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Pre-commit check passed${NC}"
exit 0
```

### Installation

```bash
# Navigate to project root
cd /path/to/project

# Create the hook file
cat > .git/hooks/pre-commit << 'EOF'
# (paste script above)
EOF

# Make it executable
chmod +x .git/hooks/pre-commit

# Test it works
echo "// test" >> src/main.tsx
git add src/main.tsx
git commit -m "test"  # Should be blocked
git checkout src/main.tsx  # Cleanup
```

---

## Hook Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Developer runs: git commit                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Pre-commit hook executes (.git/hooks/pre-commit)           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Check: Are any code files staged?                          │
└────────────┬────────────────────────┬───────────────────────┘
             │ YES                    │ NO
             ▼                        ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│ Check: Is tasks/*.md     │  │ Allow commit                 │
│ file staged?             │  │ (doc-only, config, etc.)     │
└──────┬───────────┬───────┘  └──────────────────────────────┘
       │ YES       │ NO
       ▼           ▼
┌────────────┐  ┌─────────────────────────────────────────────┐
│ Allow      │  │ BLOCK commit                                │
│ commit     │  │ Display error message with instructions     │
└────────────┘  └─────────────────────────────────────────────┘
```

---

## Customizing the Hook

### Adding More Directories

Edit the `CODE_FILES_CHANGED` pattern:

```bash
# Default
CODE_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^src/' | grep -v '\.md$')

# Add more directories
CODE_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^(src/|lib/|config/|components/|services/|stores/)' | grep -v '\.md$')
```

### Excluding Specific Files

```bash
# Exclude generated files, type definitions
CODE_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^src/' | grep -v -E '(\.md$|\.generated\.ts$|\.d\.ts$)')
```

### Different Task Directory

```bash
# If using .planning/ instead of tasks/
TASK_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^\.planning/.*\.md$')
```

---

## Other Useful Hooks

### Pre-Push Hook

Run tests before pushing:

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "Running tests before push..."
npm run test

if [ $? -ne 0 ]; then
    echo "Tests failed. Push blocked."
    exit 1
fi

echo "Tests passed. Proceeding with push."
exit 0
```

### Commit-Msg Hook

Enforce commit message format:

```bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG=$(cat "$1")

# Check for conventional commit format
if ! echo "$COMMIT_MSG" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .+'; then
    echo "Commit message must follow conventional format:"
    echo "  feat: add new feature"
    echo "  fix: fix bug"
    echo "  docs: update documentation"
    exit 1
fi

exit 0
```

---

## Windows Considerations

Git hooks run in Git Bash on Windows. Ensure:

1. Script has `#!/bin/bash` shebang
2. Line endings are LF (not CRLF)
3. File is executable (Git Bash respects this)

```bash
# Convert line endings if needed
dos2unix .git/hooks/pre-commit

# Or in PowerShell
(Get-Content .git/hooks/pre-commit -Raw) -replace "`r`n", "`n" | Set-Content .git/hooks/pre-commit -NoNewline
```

---

## Emergency Bypass

Use `--no-verify` ONLY for:

- Hotfixes (site down)
- Reverting broken commits
- Critical security fixes

**NOT for:**

- "I'm lazy"
- "I'll update task file later"
- "It's just a small change"

```bash
# Emergency only
git commit --no-verify -m "hotfix: critical security patch"
```

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core workflow rules
- `~/.claude/templates/task-template.md` - Task file template
- `~/.claude/docs/reference/tooling/troubleshooting.md` - Hook troubleshooting

---

## Sharing Hooks Across Team

Git hooks in `.git/hooks/` are local and not committed. To share:

### Option 1: Husky (npm projects)

```bash
npm install husky --save-dev
npx husky init
# Creates .husky/ directory (committed to repo)
```

### Option 2: Manual Scripts

```bash
# Create scripts/ directory
mkdir scripts
cp .git/hooks/pre-commit scripts/pre-commit.sh

# Add setup script
cat > scripts/setup-hooks.sh << 'EOF'
#!/bin/bash
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo "Hooks installed!"
EOF

# Commit scripts/ directory
git add scripts/
```

---

_Git hooks: enforce workflow automatically, catch mistakes before they happen._
