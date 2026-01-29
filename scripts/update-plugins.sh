#!/usr/bin/env bash
# update-plugins.sh
# Updates all marketplace plugins and applies necessary fixes
# Works on Windows (Git Bash), macOS, and Linux

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="${CLAUDE_DIR:-$HOME/.claude}"
MARKETPLACES_DIR="${CLAUDE_DIR}/plugins/marketplaces"

# Colors
if [[ -t 1 ]]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    CYAN='\033[0;36m'
    NC='\033[0m'
else
    RED='' GREEN='' YELLOW='' BLUE='' CYAN='' NC=''
fi

log_info() { echo -e "${BLUE}[INFO]${NC} $*"; }
log_success() { echo -e "${GREEN}[OK]${NC} $*"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $*"; }
log_error() { echo -e "${RED}[ERROR]${NC} $*" >&2; }
log_header() { echo -e "\n${CYAN}=== $* ===${NC}"; }

# Update a single git repository
update_repo() {
    local repo_path="$1"
    local repo_name="$(basename "$repo_path")"

    if [[ ! -d "$repo_path/.git" ]]; then
        log_warn "Skipping $repo_name (not a git repo)"
        return 0
    fi

    cd "$repo_path"

    # Get current branch
    local branch
    branch=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")

    if [[ "$branch" == "detached" ]]; then
        # Try to checkout main or master
        if git show-ref --verify --quiet refs/heads/main; then
            git checkout main 2>/dev/null
            branch="main"
        elif git show-ref --verify --quiet refs/heads/master; then
            git checkout master 2>/dev/null
            branch="master"
        else
            log_warn "$repo_name: detached HEAD, skipping"
            return 0
        fi
    fi

    # Fetch and pull
    if git fetch origin 2>/dev/null; then
        local local_hash remote_hash
        local_hash=$(git rev-parse HEAD)
        remote_hash=$(git rev-parse "origin/$branch" 2>/dev/null || echo "$local_hash")

        if [[ "$local_hash" != "$remote_hash" ]]; then
            if git pull origin "$branch" 2>/dev/null; then
                log_success "$repo_name: updated"
                return 1  # Signal that update occurred
            else
                log_error "$repo_name: pull failed"
            fi
        else
            log_info "$repo_name: already up to date"
        fi
    else
        log_error "$repo_name: fetch failed"
    fi

    return 0
}

main() {
    log_header "Updating Claude Code Plugins"
    log_info "Marketplaces directory: $MARKETPLACES_DIR"

    local updated=0

    if [[ -d "$MARKETPLACES_DIR" ]]; then
        for repo in "$MARKETPLACES_DIR"/*/; do
            if [[ -d "$repo" ]]; then
                if update_repo "$repo"; then
                    : # No update
                else
                    ((updated++)) || true
                fi
            fi
        done
    else
        log_warn "Marketplaces directory not found"
    fi

    # Always run line ending fix (handles both source and cache)
    log_header "Applying Cross-Platform Fixes"
    if [[ -x "$SCRIPT_DIR/fix-plugin-line-endings.sh" ]]; then
        "$SCRIPT_DIR/fix-plugin-line-endings.sh"
    else
        bash "$SCRIPT_DIR/fix-plugin-line-endings.sh"
    fi

    log_header "Update Complete"
    if [[ $updated -gt 0 ]]; then
        log_success "$updated plugin(s) updated"
    else
        log_info "All plugins already up to date"
    fi
}

main "$@"
