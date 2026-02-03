#!/bin/bash
# =============================================================================
# Fix Marketplace Paths - Cross-Platform Path Correction
# =============================================================================
#
# Fixes known_marketplaces.json paths when Claude Code writes wrong OS paths.
# This is a workaround for a Claude Code bug where it sometimes uses macOS-style
# paths (/Users/...) on Windows, or vice versa.
#
# Run this after `claude plugins install` or when `claude doctor` shows plugin errors.
#
# Usage:
#   ./scripts/fix-marketplace-paths.sh
#
# =============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"
MARKETPLACES_JSON="$CLAUDE_DIR/plugins/known_marketplaces.json"

# Colors
if [[ -t 1 ]] && [[ "${TERM:-dumb}" != "dumb" ]]; then
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    CYAN='\033[0;36m'
    NC='\033[0m'
else
    GREEN='' YELLOW='' CYAN='' NC=''
fi

if [[ ! -f "$MARKETPLACES_JSON" ]]; then
    echo -e "${YELLOW}No known_marketplaces.json found - nothing to fix${NC}"
    exit 0
fi

echo -e "${CYAN}Checking marketplace paths...${NC}"

# Detect OS and set correct path format
case "$(uname -s)" in
    MINGW*|MSYS*|CYGWIN*)
        # Windows (Git Bash)
        # Get Windows home path
        WIN_HOME=$(cygpath -w "$HOME" 2>/dev/null || echo "$USERPROFILE")
        CORRECT_PREFIX="${WIN_HOME}\\.claude"
        WRONG_PATTERNS=('/Users/[^/]+/\.claude' '/home/[^/]+/\.claude')
        OS_NAME="Windows"
        ;;
    Darwin)
        # macOS
        CORRECT_PREFIX="$HOME/.claude"
        WRONG_PATTERNS=('/c/Users/[^/]+/\.claude' 'C:\\\\Users\\\\[^\\]+\\\\.claude' '/home/[^/]+/\.claude')
        OS_NAME="macOS"
        ;;
    Linux)
        # Linux
        CORRECT_PREFIX="$HOME/.claude"
        WRONG_PATTERNS=('/c/Users/[^/]+/\.claude' 'C:\\\\Users\\\\[^\\]+\\\\.claude' '/Users/[^/]+/\.claude')
        OS_NAME="Linux"
        ;;
    *)
        echo -e "${YELLOW}Unknown OS: $(uname -s)${NC}"
        exit 1
        ;;
esac

echo "  OS detected: $OS_NAME"
echo "  Correct path prefix: $CORRECT_PREFIX"

# Create backup
cp "$MARKETPLACES_JSON" "${MARKETPLACES_JSON}.bak"

# Read current content
CONTENT=$(cat "$MARKETPLACES_JSON")
FIXED=false

# Check for and fix each wrong pattern
for pattern in "${WRONG_PATTERNS[@]}"; do
    if echo "$CONTENT" | grep -qE "$pattern"; then
        echo -e "${YELLOW}  Found wrong path pattern: $pattern${NC}"
        FIXED=true
    fi
done

if [[ "$FIXED" == false ]]; then
    echo -e "${GREEN}  All paths already correct for $OS_NAME${NC}"
    rm "${MARKETPLACES_JSON}.bak"
    exit 0
fi

# Fix paths using node (available on all platforms, handles JSON properly)
if command -v node &> /dev/null; then
    node -e "
const fs = require('fs');
const path = require('path');
const home = process.env.HOME || process.env.USERPROFILE;
const claudeDir = path.join(home, '.claude');
const marketplacesDir = path.join(claudeDir, 'plugins', 'marketplaces');

const data = JSON.parse(fs.readFileSync('$MARKETPLACES_JSON', 'utf8'));

for (const [name, config] of Object.entries(data)) {
    const correctPath = path.join(marketplacesDir, name);
    if (config.installLocation !== correctPath) {
        console.log('  Fixing: ' + name);
        console.log('    Was: ' + config.installLocation);
        console.log('    Now: ' + correctPath);
        config.installLocation = correctPath;
    }
}

fs.writeFileSync('$MARKETPLACES_JSON', JSON.stringify(data, null, 2) + '\n');
console.log('');
console.log('Fixed! Run: claude doctor');
"
else
    echo -e "${YELLOW}Node.js not found - manual fix required${NC}"
    echo "Edit $MARKETPLACES_JSON and update installLocation paths"
    exit 1
fi

echo -e "${GREEN}✓ Paths fixed for $OS_NAME${NC}"
echo "  Backup saved to: ${MARKETPLACES_JSON}.bak"
