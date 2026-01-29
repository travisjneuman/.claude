#!/usr/bin/env bash
# fix-plugin-line-endings.sh
# Converts CRLF to LF in plugin scripts to ensure cross-platform compatibility
# Works on Windows (Git Bash), macOS, and Linux

set -euo pipefail

CLAUDE_DIR="${CLAUDE_DIR:-$HOME/.claude}"
PLUGIN_CACHE="${CLAUDE_DIR}/plugins/cache"
PLUGIN_MARKETPLACES="${CLAUDE_DIR}/plugins/marketplaces"

# Global counters
TOTAL_FILES=0
TOTAL_FIXED=0

# Colors (disabled if not a terminal)
if [[ -t 1 ]]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    NC='\033[0m'
else
    RED='' GREEN='' YELLOW='' BLUE='' NC=''
fi

log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_success() { echo -e "${GREEN}[OK]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }

# Convert CRLF to LF in a file
# Returns 0 if fixed, 1 if no fix needed
fix_line_endings() {
    local file="$1"

    # Check if file has CRLF
    if grep -q $'\r' "$file" 2>/dev/null; then
        # Use sed to remove carriage returns
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed requires different syntax
            sed -i '' 's/\r$//' "$file"
        else
            # Linux and Git Bash (Windows)
            sed -i 's/\r$//' "$file"
        fi
        return 0  # Fixed
    fi

    return 1  # No fix needed
}

# Process all script files in a directory
process_directory() {
    local dir="$1"

    if [[ ! -d "$dir" ]]; then
        return 0
    fi

    # Find all shell scripts and batch files
    while IFS= read -r -d '' file; do
        ((TOTAL_FILES++)) || true
        if fix_line_endings "$file"; then
            ((TOTAL_FIXED++)) || true
            log_success "Fixed: ${file#$CLAUDE_DIR/}"
        fi
    done < <(find "$dir" -type f \( -name "*.sh" -o -name "*.cmd" -o -name "*.bash" \) -print0 2>/dev/null)
}

main() {
    log_info "Fixing plugin line endings for cross-platform compatibility..."
    log_info "CLAUDE_DIR: $CLAUDE_DIR"

    # Process plugin cache
    if [[ -d "$PLUGIN_CACHE" ]]; then
        log_info "Processing plugin cache..."
        process_directory "$PLUGIN_CACHE"
    fi

    # Process marketplace plugins (source repos)
    if [[ -d "$PLUGIN_MARKETPLACES" ]]; then
        log_info "Processing marketplace plugins..."
        process_directory "$PLUGIN_MARKETPLACES"
    fi

    echo ""
    if [[ $TOTAL_FIXED -gt 0 ]]; then
        log_success "Fixed $TOTAL_FIXED of $TOTAL_FILES script files"
    else
        log_info "Checked $TOTAL_FILES script files - no fixes needed"
    fi
}

main "$@"
