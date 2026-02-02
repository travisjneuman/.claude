#!/bin/bash
# Pre-push hook for ~/.claude/ configuration repository
# Validates push safety

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}Running pre-push checks...${NC}"

# ============================================
# CHECK 1: Verify pushing to correct remote
# ============================================
REMOTE="$1"
URL="$2"

# Warn if pushing to unexpected remote
if [[ "$URL" != *"travisjneuman"* ]] && [[ "$URL" != *"github.com"* ]]; then
    echo -e "${YELLOW}⚠ Warning: Pushing to unexpected remote: $URL${NC}"
fi

# ============================================
# CHECK 2: Prevent force push to master/main
# ============================================
while read local_ref local_sha remote_ref remote_sha; do
    if [[ "$remote_ref" == *"master"* ]] || [[ "$remote_ref" == *"main"* ]]; then
        # Check if this is a force push (non-fast-forward)
        if ! git merge-base --is-ancestor "$remote_sha" "$local_sha" 2>/dev/null; then
            if [ "$remote_sha" != "0000000000000000000000000000000000000000" ]; then
                echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${RED}  PUSH BLOCKED - Force Push to Protected Branch${NC}"
                echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo ""
                echo -e "${YELLOW}Branch: $remote_ref${NC}"
                echo "Force pushing to master/main is blocked for safety."
                echo ""
                echo -e "${YELLOW}If intentional: git push --force --no-verify${NC}"
                exit 1
            fi
        fi
    fi
done

# ============================================
# CHECK 3: Validate no submodule changes pushed
# ============================================
# Submodules are read-only (external repos)
SUBMODULE_CHANGES=$(git diff --cached --name-only | grep "^plugins/marketplaces/")
if [ -n "$SUBMODULE_CHANGES" ]; then
    echo -e "${YELLOW}⚠ Note: Changes include marketplace submodules${NC}"
    echo "  These are tracked as gitlinks (commit pointers), not content."
fi

# ============================================
# CHECK 4: Remind about version bump
# ============================================
CHANGELOG=$(git diff HEAD~1..HEAD --name-only 2>/dev/null | grep -c "CHANGELOG.md")
if [ "$CHANGELOG" -eq 0 ]; then
    # Check if there were significant changes in this push
    SIGNIFICANT=$(git diff HEAD~1..HEAD --name-only 2>/dev/null | grep -E "^(skills|agents|commands|rules|docs)/" | wc -l)
    if [ "$SIGNIFICANT" -gt 3 ]; then
        echo -e "${RED}✗ BLOCKED: $SIGNIFICANT significant files changed but CHANGELOG.md not updated${NC}"
        echo -e "${YELLOW}  Update CHANGELOG.md, commit, then push again.${NC}"
        echo -e "${YELLOW}  Bypass with: git push --no-verify${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Pre-push checks passed${NC}"
exit 0
