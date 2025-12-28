#!/bin/bash
# Commit message validation hook for ~/.claude/
# Enforces conventional commit format

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Skip merge commits
if echo "$COMMIT_MSG" | grep -q "^Merge"; then
    exit 0
fi

# Check for conventional commit format
# Format: type(scope): description
# Types: feat, fix, docs, style, refactor, perf, test, chore, build, ci
if ! echo "$COMMIT_MSG" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|chore|build|ci)(\(.+\))?: .+'; then
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}  COMMIT BLOCKED - Invalid Commit Message Format${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}Your message:${NC} $COMMIT_MSG"
    echo ""
    echo -e "${YELLOW}Required format:${NC} type(scope): description"
    echo ""
    echo "Valid types:"
    echo "  feat     - New feature or skill"
    echo "  fix      - Bug fix"
    echo "  docs     - Documentation changes"
    echo "  style    - Formatting, whitespace"
    echo "  refactor - Code restructuring"
    echo "  perf     - Performance improvement"
    echo "  test     - Adding tests"
    echo "  chore    - Maintenance, deps, config"
    echo "  build    - Build system changes"
    echo "  ci       - CI/CD changes"
    echo ""
    echo "Examples:"
    echo "  feat: add iOS development skill"
    echo "  fix: resolve hook path issue on Windows"
    echo "  docs: update marketplace guide"
    echo "  chore: clean up .gitignore"
    echo ""
    echo -e "${YELLOW}Bypass: git commit --no-verify${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Commit message format valid${NC}"
exit 0
