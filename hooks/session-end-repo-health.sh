#!/bin/bash
# SessionEnd hook: Push unpushed commits in user-owned repos; warn on dirty trees.
#
# Why this exists:
#   The arrival-side session-start-repo-health.sh catches diverged/unpushed/dirty
#   state when entering a machine. This is its symmetric departure-side
#   counterpart: try to leave the machine clean so the NEXT machine's arrival
#   has nothing to flag. Together they form the loop: depart-clean / arrive-aware.
#
# What it does:
#   1. Walks parent ~/.claude + CUSTOM_PROJECT_DIRS (depth ≤3, same set as arrival).
#   2. For each user-owned git repo (push URL contains 'travisjneuman'):
#      - If clean tree + unpushed commits → fetches, attempts FF push, reports.
#      - If dirty tree → emits a warning. Does NOT auto-commit.
#      - If diverged → emits a warning. Does NOT attempt resolution.
#   3. Output is appended to ~/.claude/last-session.md so it appears in the next
#      session's context-loader injection. Also echoed to stderr.
#
# What it does NOT do:
#   - Never auto-commits dirty trees (that's how the d4b9e8e bad-base mess started).
#   - Never force-pushes.
#   - Never touches non-user-owned repos (marketplace no_push, others' forks).
#   - Does NOT block session exit on push failure — best-effort, never blocking.
#
# Safety guard: only runs on SessionEnd, never on Stop, to avoid pushing every
# turn during active work.

set -u

SCRIPT_DIR="$HOME/.claude"
ENV_FILE="$SCRIPT_DIR/.env.local"
SUMMARY_FILE="$HOME/.claude/last-session.md"

# Read CUSTOM_PROJECT_DIRS (same source as _pull-all-repos.sh and arrival hook)
CUSTOM_PROJECT_DIRS=()
if [[ -f "$ENV_FILE" ]]; then
    RAW_DIRS=$(grep '^CUSTOM_PROJECT_DIRS=' "$ENV_FILE" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [[ -n "$RAW_DIRS" ]]; then
        IFS=',' read -ra CUSTOM_PROJECT_DIRS <<< "$RAW_DIRS"
    fi
fi

# Determine if a repo is user-owned (push URL contains travisjneuman)
is_user_owned() {
    local repo="$1"
    local push_url
    push_url=$(git -C "$repo" remote get-url --push origin 2>/dev/null) || return 1
    [[ "$push_url" == *"travisjneuman"* ]]
}

# Process one repo. Echoes status lines (one per finding) to stdout.
process_repo() {
    local repo="$1"
    [[ -d "$repo/.git" || -f "$repo/.git" ]] || return 0
    is_user_owned "$repo" || return 0

    local short_name="${repo#$HOME/}"

    local branch
    branch=$(git -C "$repo" rev-parse --abbrev-ref HEAD 2>/dev/null) || return 0
    [[ "$branch" == "HEAD" ]] && { echo "  SKIP-DETACHED  $short_name"; return 0; }

    # Dirty tree → warn only
    local dirty
    dirty=$(git -C "$repo" status --porcelain 2>/dev/null)
    if [[ -n "$dirty" ]]; then
        local n
        n=$(echo "$dirty" | wc -l | tr -d ' ')
        echo "  DIRTY          $short_name ($n uncommitted change(s) on $branch — needs human review)"
        # Continue to also report unpushed-commit state below
    fi

    # Upstream comparison (no fetch — we'll do that only when we'd push)
    local upstream
    upstream=$(git -C "$repo" rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)
    if [[ -z "$upstream" ]]; then
        echo "  NO-UPSTREAM    $short_name ($branch tracks no remote)"
        return 0
    fi

    local counts local_ahead remote_ahead
    counts=$(git -C "$repo" rev-list --left-right --count "HEAD...@{u}" 2>/dev/null) || return 0
    local_ahead=$(echo "$counts" | awk '{print $1}')
    remote_ahead=$(echo "$counts" | awk '{print $2}')

    if [[ "$local_ahead" -gt 0 && "$remote_ahead" -gt 0 ]]; then
        echo "  DIVERGED       $short_name (local +$local_ahead, remote +$remote_ahead — manual reconcile needed)"
        return 0
    fi

    if [[ "$local_ahead" -gt 0 && "$remote_ahead" -eq 0 && -z "$dirty" ]]; then
        # Clean tree, only-local-ahead. Try to push.
        # Fetch first to confirm no remote racing (cheap with `--no-tags` and shallow ref-list)
        if ! git -C "$repo" fetch origin --quiet 2>/dev/null; then
            echo "  PUSH-FETCH-FAIL $short_name (could not fetch origin — push skipped)"
            return 0
        fi
        # Re-compute after fetch — remote may have advanced
        counts=$(git -C "$repo" rev-list --left-right --count "HEAD...@{u}" 2>/dev/null)
        local_ahead=$(echo "$counts" | awk '{print $1}')
        remote_ahead=$(echo "$counts" | awk '{print $2}')

        if [[ "$remote_ahead" -gt 0 ]]; then
            echo "  RACE-DIVERGED  $short_name (remote advanced during exit — local +$local_ahead, remote +$remote_ahead, push skipped)"
            return 0
        fi

        if git -C "$repo" push origin "$branch" --quiet 2>/dev/null; then
            echo "  PUSHED         $short_name (+$local_ahead commit(s) pushed to origin/$branch)"
        else
            echo "  PUSH-FAILED    $short_name (push to origin/$branch was rejected — manual intervention needed)"
        fi
    fi
}

# Collect findings
FINDINGS=""

# Parent
if out=$(process_repo "$SCRIPT_DIR"); then
    [[ -n "$out" ]] && FINDINGS+="$out"$'\n'
fi

# Custom project dirs to depth 3
for project_dir in "${CUSTOM_PROJECT_DIRS[@]}"; do
    [[ -z "$project_dir" ]] && continue
    project_dir="${project_dir/#\~/$HOME}"
    [[ -d "$project_dir" ]] || continue

    for repo in "$project_dir"/*/ "$project_dir"/.*/; do
        [[ -d "$repo" ]] || continue
        rb=$(basename "$repo")
        [[ "$rb" == "." || "$rb" == ".." ]] && continue
        if out=$(process_repo "${repo%/}"); then
            [[ -n "$out" ]] && FINDINGS+="$out"$'\n'
        fi

        for nested in "$repo"*/ "$repo".*/; do
            [[ -d "$nested" ]] || continue
            nb=$(basename "$nested")
            [[ "$nb" == "." || "$nb" == ".." ]] && continue
            if out=$(process_repo "${nested%/}"); then
                [[ -n "$out" ]] && FINDINGS+="$out"$'\n'
            fi

            for nested2 in "$nested"*/ "$nested".*/; do
                [[ -d "$nested2" ]] || continue
                n2b=$(basename "$nested2")
                [[ "$n2b" == "." || "$n2b" == ".." ]] && continue
                if out=$(process_repo "${nested2%/}"); then
                    [[ -n "$out" ]] && FINDINGS+="$out"$'\n'
                fi
            done
        done
    done
done

# If anything happened, append to summary file (next session sees this) AND stderr
if [[ -n "$FINDINGS" ]]; then
    {
        echo ""
        echo "## Departure-time repo health ($(date '+%Y-%m-%d %H:%M'))"
        echo ""
        echo "\`\`\`"
        echo -n "$FINDINGS"
        echo "\`\`\`"
    } >> "$SUMMARY_FILE" 2>/dev/null

    {
        echo "=== Departure repo health ==="
        echo -n "$FINDINGS"
        echo "============================="
    } >&2
fi

exit 0
