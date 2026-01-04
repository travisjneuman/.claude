#!/bin/bash
# =============================================================================
# Force Sync All Git Repositories to Remote State
# =============================================================================
#
# PULL-ONLY: Syncs ALL local repos to match remote. NEVER pushes anything.
#
# Features:
#   - Auto-discovers all repos in configured directories
#   - Pulls ALL repos (including marketplace/external repos)
#   - NEVER pushes - this is strictly a "make local match remote" script
#   - Gracefully skips repos that don't exist
#   - Handles submodules properly
#
# Usage:
#   ./force-sync-repos.sh              # Normal mode (with confirmation)
#   ./force-sync-repos.sh --force      # Skip confirmation prompts
#   ./force-sync-repos.sh --dry-run    # Show what would happen
#   ./force-sync-repos.sh --list       # Just list discovered repos
#
# =============================================================================

set -e

# =============================================================================
# CONFIGURATION - Edit these to match your setup
# =============================================================================

# Directories to scan for git repos
SCAN_DIRS=(
    "$HOME/web-dev"
    "$HOME/.claude"
)

# How deep to scan (3 = finds repos 3 levels deep)
SCAN_DEPTH=4

# Patterns to exclude (minimal - only things that are never repos)
EXCLUDE_PATTERNS=(
    "node_modules"
    "\.Trash"
    "/vendor/"
    "/\.cache/"
)

# =============================================================================
# END CONFIGURATION
# =============================================================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

# Log file
LOG_DIR="${HOME}/.claude/logs"
LOG_FILE="${LOG_DIR}/sync-$(date +%Y%m%d-%H%M%S).log"

# Flags
FORCE_MODE=false
DRY_RUN=false
LIST_ONLY=false

# Stats
TOTAL_FOUND=0
TOTAL_SYNCED=0
TOTAL_SKIPPED=0
TOTAL_FAILED=0

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --force|-f)
            FORCE_MODE=true
            shift
            ;;
        --dry-run|-n)
            DRY_RUN=true
            shift
            ;;
        --list|-l)
            LIST_ONLY=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "PULL-ONLY script - syncs local to match remote. Never pushes."
            echo ""
            echo "Options:"
            echo "  --force, -f     Skip confirmation prompts"
            echo "  --dry-run, -n   Show what would happen without making changes"
            echo "  --list, -l      Just list discovered repos (no sync)"
            echo "  --help, -h      Show this help message"
            echo ""
            echo "Scan directories:"
            for dir in "${SCAN_DIRS[@]}"; do
                echo "  - $dir"
            done
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Print functions
print_header() {
    echo ""
    echo -e "${BOLD}${BLUE}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${BLUE}  $1${NC}"
    echo -e "${BOLD}${BLUE}═══════════════════════════════════════════════════════════════${NC}"
}

print_repo() {
    echo -e "${CYAN}▶ $1${NC}"
}

print_success() {
    echo -e "  ${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "  ${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "  ${RED}✗ $1${NC}"
}

print_info() {
    echo -e "  ${BLUE}ℹ $1${NC}"
}

print_dim() {
    echo -e "  ${DIM}$1${NC}"
}

# Check if path should be excluded
should_exclude() {
    local path="$1"
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        if echo "$path" | grep -qE "$pattern"; then
            return 0
        fi
    done
    return 1
}

# Discover all git repos
discover_repos() {
    local all_repos=()

    for scan_dir in "${SCAN_DIRS[@]}"; do
        local expanded_dir="${scan_dir/#\~/$HOME}"

        if [[ ! -d "$expanded_dir" ]]; then
            continue
        fi

        while IFS= read -r -d '' gitdir; do
            local repo_path
            repo_path="$(dirname "$gitdir")"

            if should_exclude "$repo_path"; then
                continue
            fi

            all_repos+=("$repo_path")
        done < <(find "$expanded_dir" -maxdepth "$SCAN_DEPTH" -name ".git" -type d -print0 2>/dev/null)
    done

    # Sort and deduplicate
    printf '%s\n' "${all_repos[@]}" | sort -u
}

# Check if repo is a submodule (nested inside another repo with .gitmodules)
is_submodule_of() {
    local repo_path="$1"
    local all_repos="$2"

    while IFS= read -r other_repo; do
        [[ -z "$other_repo" ]] && continue
        if [[ "$repo_path" == "$other_repo"/* ]] && [[ -f "$other_repo/.gitmodules" ]]; then
            echo "$other_repo"
            return 0
        fi
    done <<< "$all_repos"

    return 1
}

# Get the default/tracking branch for a repo
get_remote_branch() {
    local branch
    branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

    if [[ "$branch" == "HEAD" ]]; then
        # Detached HEAD - try to find default branch
        if git show-ref --verify --quiet refs/remotes/origin/main 2>/dev/null; then
            echo "origin/main"
        elif git show-ref --verify --quiet refs/remotes/origin/master 2>/dev/null; then
            echo "origin/master"
        else
            echo ""
        fi
        return
    fi

    # Check for tracking remote
    local remote
    remote=$(git config --get "branch.${branch}.remote" 2>/dev/null || echo "origin")

    if git show-ref --verify --quiet "refs/remotes/${remote}/${branch}" 2>/dev/null; then
        echo "${remote}/${branch}"
    elif git show-ref --verify --quiet "refs/remotes/origin/${branch}" 2>/dev/null; then
        echo "origin/${branch}"
    else
        echo ""
    fi
}

# Sync a single repository
sync_repo() {
    local repo_path="$1"
    local parent_repo="$2"  # If this is a submodule, this is the parent

    ((TOTAL_FOUND++))

    # Verify it exists
    if [[ ! -d "$repo_path/.git" ]] && [[ ! -f "$repo_path/.git" ]]; then
        print_dim "Skipped (not found): ${repo_path/#$HOME/~}"
        ((TOTAL_SKIPPED++))
        return 0
    fi

    local display_path="${repo_path/#$HOME/~}"
    print_repo "$display_path"

    cd "$repo_path"

    # Check if this is a submodule (has .git file instead of directory)
    local is_submodule=false
    if [[ -f "$repo_path/.git" ]]; then
        is_submodule=true
    fi

    # Get remote branch
    local remote_branch
    remote_branch=$(get_remote_branch)

    if [[ -z "$remote_branch" ]]; then
        print_warning "No remote branch found - skipping"
        ((TOTAL_SKIPPED++))
        return 0
    fi

    # Fetch from origin (PULL only - never push)
    if [[ "$DRY_RUN" == false ]]; then
        if ! git fetch origin 2>/dev/null; then
            print_error "Failed to fetch"
            ((TOTAL_FAILED++))
            log "FAILED: $repo_path (fetch failed)"
            return 1
        fi
    fi

    # Check current state
    local has_changes=false
    local status_output
    status_output=$(git status --porcelain 2>/dev/null)
    [[ -n "$status_output" ]] && has_changes=true

    # Get current commit and remote commit
    local local_commit remote_commit
    local_commit=$(git rev-parse HEAD 2>/dev/null)
    remote_commit=$(git rev-parse "$remote_branch" 2>/dev/null || echo "")

    if [[ -z "$remote_commit" ]]; then
        print_warning "Could not find remote commit"
        ((TOTAL_SKIPPED++))
        return 0
    fi

    # Check if we need to sync
    local needs_sync=false
    local ahead=0 behind=0

    if [[ "$local_commit" != "$remote_commit" ]]; then
        local counts
        counts=$(git rev-list --left-right --count "${remote_branch}...HEAD" 2>/dev/null || echo "0 0")
        behind=$(echo "$counts" | awk '{print $1}')
        ahead=$(echo "$counts" | awk '{print $2}')
        needs_sync=true
    fi

    # Report status
    if [[ "$has_changes" == true ]]; then
        print_warning "Uncommitted changes (will discard)"
        needs_sync=true
    fi

    if [[ "$ahead" -gt 0 ]]; then
        print_warning "$ahead local commits (will discard)"
    fi

    if [[ "$behind" -gt 0 ]]; then
        print_info "$behind commits to pull"
    fi

    # Perform sync
    if [[ "$needs_sync" == true ]]; then
        if [[ "$DRY_RUN" == true ]]; then
            print_info "[DRY RUN] Would reset to $remote_branch"
        else
            # Discard local changes
            git checkout -- . 2>/dev/null || true
            git clean -fd 2>/dev/null || true

            # For submodules in detached HEAD, checkout the branch first
            if [[ "$is_submodule" == true ]]; then
                local branch_name="${remote_branch#origin/}"
                git checkout "$branch_name" 2>/dev/null || true
            fi

            # Reset to remote
            if git reset --hard "$remote_branch" 2>/dev/null; then
                print_success "Synced to $remote_branch"
                log "SYNCED: $repo_path"
            else
                print_error "Failed to reset"
                ((TOTAL_FAILED++))
                log "FAILED: $repo_path (reset failed)"
                return 1
            fi
        fi
    else
        print_success "Already up to date"
    fi

    ((TOTAL_SYNCED++))

    # Update nested submodules
    if [[ -f "$repo_path/.gitmodules" ]]; then
        print_info "Updating submodules..."
        if [[ "$DRY_RUN" == false ]]; then
            git submodule update --init --recursive 2>/dev/null || true
        fi
    fi

    return 0
}

# Main
main() {
    print_header "Force Sync to Remote (PULL ONLY)"

    echo -e "${DIM}This script syncs local repos to match remote.${NC}"
    echo -e "${DIM}It will NEVER push - only pull/reset to remote state.${NC}"
    echo ""

    echo -e "Scanning:"
    for dir in "${SCAN_DIRS[@]}"; do
        echo -e "  ${CYAN}${dir/#$HOME/\~}${NC}"
    done
    echo ""

    # Discover repos
    echo -e "${DIM}Discovering repositories...${NC}"
    local repos
    repos=$(discover_repos)

    local repo_count
    repo_count=$(echo "$repos" | grep -c '^' || echo "0")

    echo -e "Found ${BOLD}$repo_count${NC} repositories"
    echo ""

    # List only mode
    if [[ "$LIST_ONLY" == true ]]; then
        print_header "Discovered Repositories"
        while IFS= read -r repo; do
            [[ -z "$repo" ]] && continue
            echo -e "  ${GREEN}${repo/#$HOME/~}${NC}"
        done <<< "$repos"
        exit 0
    fi

    if [[ "$DRY_RUN" == true ]]; then
        echo -e "${YELLOW}DRY RUN MODE - no changes will be made${NC}"
        echo ""
    fi

    echo -e "Log: ${DIM}$LOG_FILE${NC}"
    echo ""

    # Confirmation
    if [[ "$FORCE_MODE" == false ]] && [[ "$DRY_RUN" == false ]]; then
        echo -e "${YELLOW}${BOLD}⚠ This will:${NC}"
        echo -e "  ${YELLOW}• Discard ALL local uncommitted changes${NC}"
        echo -e "  ${YELLOW}• Reset ALL repos to remote state${NC}"
        echo -e "  ${YELLOW}• Discard any unpushed local commits${NC}"
        echo ""
        read -p "Continue? [y/N] " -n 1 -r
        echo ""
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${RED}Aborted.${NC}"
            exit 1
        fi
        echo ""
    fi

    log "=== Starting force sync of $repo_count repositories ==="

    # Sync each repo
    while IFS= read -r repo; do
        [[ -z "$repo" ]] && continue

        # Check if this is a submodule
        local parent
        parent=$(is_submodule_of "$repo" "$repos") || parent=""

        sync_repo "$repo" "$parent"
        echo ""
    done <<< "$repos"

    # Summary
    print_header "Summary"
    echo -e "  ${CYAN}Found:${NC}   $TOTAL_FOUND repositories"
    echo -e "  ${GREEN}Synced:${NC}  $TOTAL_SYNCED"
    if [[ $TOTAL_SKIPPED -gt 0 ]]; then
        echo -e "  ${YELLOW}Skipped:${NC} $TOTAL_SKIPPED"
    fi
    if [[ $TOTAL_FAILED -gt 0 ]]; then
        echo -e "  ${RED}Failed:${NC}  $TOTAL_FAILED"
    fi
    echo ""
    echo -e "  ${DIM}Log: $LOG_FILE${NC}"

    log "=== Completed: $TOTAL_SYNCED synced, $TOTAL_SKIPPED skipped, $TOTAL_FAILED failed ==="
}

main
