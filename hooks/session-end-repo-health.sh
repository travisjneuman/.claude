#!/bin/bash
# SessionEnd hook: make sure nothing is left uncommitted or unpushed in repos you own.
#
# Returns immediately and does the work in a detached background process, so a
# fast exit never cancels it and Claude never waits for it.
#
# For ~/.claude and every git repo under CUSTOM_PROJECT_DIRS (depth <= 3), when the
# origin owner is listed in GITHUB_OWNERS (otherwise the repo is left alone):
#   1. Skip if detached, without upstream, mid-merge/rebase, or with conflicts.
#   2. Pending changes (anyone's): skip if a credential-looking string is in the
#      diff or new files; otherwise `git add -A` and commit a checkpoint.
#   3. Push when ahead and not diverged, through REPO_PUSH_COMMAND (e.g. repo-sync
#      push-safe) or `git push`.
# Nested repos are handled before their parents so submodule pointers are current.
# Results go to ~/.claude/logs/departure.log. Never resets, cleans, or force-pushes.
#
# Settings (local layer, optional): GITHUB_OWNERS, REPO_PUSH_COMMAND,
# SESSION_END_AUTOPUSH=0 (report only), CUSTOM_PROJECT_DIRS.

set -u
[ "${CLAUDE_TOOLKIT_SKIP_SESSION_END:-}" = "1" ] && exit 0

SCRIPT_DIR="$HOME/.claude"
mkdir -p "$SCRIPT_DIR/logs"
LOG="$SCRIPT_DIR/logs/departure.log"

if [ "${SESSION_END_DETACHED:-}" != "1" ]; then
  SESSION_END_DETACHED=1 nohup bash "$0" >/dev/null 2>&1 </dev/null &
  exit 0
fi

env_get() { grep -h "^$1=" "$HOME/.claude/.env.local" "$HOME/.claude/local/shared.env" 2>/dev/null | head -1 | cut -d'=' -f2- | sed -e 's/^["'"'"']//' -e 's/["'"'"']$//'; }
GITHUB_OWNERS=$(env_get GITHUB_OWNERS)
REPO_PUSH_COMMAND=$(env_get REPO_PUSH_COMMAND)
AUTOPUSH=$(env_get SESSION_END_AUTOPUSH); AUTOPUSH=${AUTOPUSH:-1}
[ -z "$GITHUB_OWNERS" ] && exit 0
HOST=$(env_get TJN_HOST_NAME); HOST=${HOST:-$(hostname)}

# Only one departure run at a time per machine.
LOCK="$SCRIPT_DIR/logs/.departure.lock"
if ! mkdir "$LOCK" 2>/dev/null; then exit 0; fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT

SECRET_RE='AKIA[0-9A-Z]{16}|sk-(ant-|proj-)?[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,}|glpat-[A-Za-z0-9_-]{20}|xox[bpors]-[A-Za-z0-9-]{10,}|-----BEGIN[A-Z ]*PRIVATE KEY'

log() { echo "$(date '+%Y-%m-%d %H:%M') $*" >> "$LOG"; }

owned() {
  local url owner
  url=$(git -C "$1" remote get-url --push origin 2>/dev/null) || return 1
  [ "$url" = "no_push" ] && return 1
  IFS=',' read -ra owners <<< "$GITHUB_OWNERS"
  for owner in "${owners[@]}"; do
    [[ -n "$owner" && "$url" =~ github\.com[:/]${owner}/ ]] && return 0
  done
  return 1
}

process() {
  local repo="$1" name gitdir branch
  name="${repo#$HOME/}"
  owned "$repo" || return 0
  branch=$(git -C "$repo" symbolic-ref --short -q HEAD) || { log "SKIP detached   $name"; return 0; }
  git -C "$repo" rev-parse -q --verify '@{u}' >/dev/null || { log "SKIP no-upstream $name"; return 0; }
  gitdir=$(git -C "$repo" rev-parse --absolute-git-dir)
  if [ -e "$gitdir/MERGE_HEAD" ] || [ -d "$gitdir/rebase-merge" ] || [ -d "$gitdir/rebase-apply" ] || [ -n "$(git -C "$repo" diff --name-only --diff-filter=U)" ]; then
    log "SKIP in-progress merge/rebase or conflicts $name"; return 0
  fi

  if [ -n "$(git -C "$repo" status --porcelain)" ]; then
    local newfiles hit=""
    git -C "$repo" diff HEAD 2>/dev/null | grep '^+' | grep -Eq "$SECRET_RE" && hit=1
    newfiles=$(git -C "$repo" ls-files -o --exclude-standard -z | xargs -0 -I{} sh -c 'test -f "$1" && test $(wc -c < "$1") -lt 2000000 && echo "$1"' _ "$repo/{}" 2>/dev/null)
    [ -n "$newfiles" ] && printf '%s\n' "$newfiles" | tr '\n' '\0' | xargs -0 grep -Elq "$SECRET_RE" 2>/dev/null && hit=1
    if [ -n "$hit" ]; then log "SKIP possible secret in pending changes $name (commit manually after checking)"; return 0; fi
    git -C "$repo" add -A
    if git -C "$repo" commit -q -m "chore: checkpoint pending changes at session end ($HOST)" >/dev/null 2>&1; then
      log "COMMITTED  $name"
    else
      log "COMMIT-FAILED $name (a commit hook refused; see the repo)"; return 0
    fi
  fi

  [ "$AUTOPUSH" = "0" ] && return 0
  git -C "$repo" fetch -q origin 2>/dev/null || { log "FETCH-FAILED $name"; return 0; }
  local ahead behind
  read -r ahead behind < <(git -C "$repo" rev-list --left-right --count 'HEAD...@{u}' 2>/dev/null)
  [ "${ahead:-0}" -eq 0 ] && return 0
  if [ "${behind:-0}" -gt 0 ] && [ -z "$REPO_PUSH_COMMAND" ]; then log "DIVERGED   $name (+$ahead/-$behind)"; return 0; fi
  if [ -n "$REPO_PUSH_COMMAND" ]; then
    (cd "$repo" && eval "$REPO_PUSH_COMMAND") >/dev/null 2>&1 && log "PUSHED     $name" || log "PUSH-FAILED $name"
  else
    git -C "$repo" push -q origin "$branch" 2>/dev/null && log "PUSHED     $name" || log "PUSH-FAILED $name"
  fi
}

CUSTOM_PROJECT_DIRS=()
RAW_DIRS=$(env_get CUSTOM_PROJECT_DIRS)
[ -n "$RAW_DIRS" ] && IFS=',' read -ra CUSTOM_PROJECT_DIRS <<< "$RAW_DIRS"

# Collect repos, deepest first (children before parents).
repos=("$SCRIPT_DIR")
for d in "${CUSTOM_PROJECT_DIRS[@]}"; do
  d="${d/#\~/$HOME}"; [ -d "$d" ] || continue
  while IFS= read -r g; do repos+=("$(dirname "$g")"); done < <(
    find "$d" -maxdepth 4 \( -name node_modules -o -name .build -o -name DerivedData -o -name Pods -o -name vendor -o -name .venv -o -name dist -o -name .next \) -prune -o -name .git -print 2>/dev/null)
done
while IFS= read -r r; do process "$r"; done < <(printf '%s\n' "${repos[@]}" | awk '{print gsub("/","/") "\t" $0}' | sort -rn | cut -f2- | awk '!seen[$0]++')

# Keep the log small.
[ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt 2000 ] && tail -500 "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
exit 0
