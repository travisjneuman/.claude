#!/bin/bash
# Pre-commit hook for ~/.claude/ configuration repository
# Validates commits follow best practices

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}Running pre-commit checks...${NC}"

# Get staged files
STAGED_FILES=$(git diff --cached --name-only)

# ============================================
# CHECK 1: No secrets or credentials
# ============================================
SECRETS_PATTERN='(api[_-]?key|secret|password|token|credential|private[_-]?key)[\s]*[:=][\s]*["\047][^"\047]+'

# Check for potential secrets in staged files (excluding gitignore patterns)
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        # Skip binary files and certain extensions
        if [[ "$file" =~ \.(json|md|yaml|yml|txt|sh|ps1)$ ]]; then
            if grep -iE "$SECRETS_PATTERN" "$file" 2>/dev/null | grep -v "# " | grep -v "<!--" > /dev/null; then
                echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo -e "${RED}  COMMIT BLOCKED - Potential Secret Detected${NC}"
                echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
                echo ""
                echo -e "${YELLOW}File: $file${NC}"
                echo "Please remove secrets before committing."
                echo ""
                echo -e "${YELLOW}Bypass (if false positive): git commit --no-verify${NC}"
                exit 1
            fi
        fi
    fi
done
echo -e "${GREEN}✓ No secrets detected${NC}"

# ============================================
# CHECK 2: Remind about CHANGELOG for significant changes
# ============================================
SIGNIFICANT_DIRS="skills agents commands rules docs plugins"
SIGNIFICANT_CHANGE=false

for dir in $SIGNIFICANT_DIRS; do
    if echo "$STAGED_FILES" | grep -q "^$dir/"; then
        SIGNIFICANT_CHANGE=true
        break
    fi
done

# Check if CHANGELOG is being updated
CHANGELOG_UPDATED=$(echo "$STAGED_FILES" | grep -c "CHANGELOG.md")

if [ "$SIGNIFICANT_CHANGE" = true ] && [ "$CHANGELOG_UPDATED" -eq 0 ]; then
    echo -e "${YELLOW}⚠ Reminder: Consider updating CHANGELOG.md for significant changes${NC}"
    echo -e "${YELLOW}  Changed directories: $(echo "$STAGED_FILES" | grep -E "^($SIGNIFICANT_DIRS)/" | cut -d'/' -f1 | sort -u | tr '\n' ' ')${NC}"
    # Note: This is a reminder, not a blocker
fi

# ============================================
# CHECK 3: Validate SKILL.md files have required sections
# ============================================
SKILL_FILES=$(echo "$STAGED_FILES" | grep "SKILL.md$")

for skill_file in $SKILL_FILES; do
    if [ -f "$skill_file" ]; then
        # Check for required frontmatter or sections
        if ! grep -q "^#" "$skill_file"; then
            echo -e "${YELLOW}⚠ Warning: $skill_file may be missing header${NC}"
        fi
    fi
done

# ============================================
# CHECK 4: Ensure .gitignore patterns are respected
# ============================================
# Check if any ignored files are being committed
IGNORED_PATTERNS=".credentials.json credentials.json history.jsonl .mcp.json"
for pattern in $IGNORED_PATTERNS; do
    if echo "$STAGED_FILES" | grep -q "$pattern"; then
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${RED}  COMMIT BLOCKED - Attempting to commit ignored file${NC}"
        echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo -e "${YELLOW}File: $pattern${NC}"
        echo "This file should not be committed. Check .gitignore."
        exit 1
    fi
done

echo -e "${GREEN}✓ Pre-commit checks passed${NC}"
exit 0
