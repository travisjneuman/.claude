# Claude Code Lifecycle Hooks

Hooks are bash scripts that run automatically at specific points during a Claude Code session.

**Location:** `~/.claude/hooks/`
**Configuration:** `~/.claude/settings.json` → `hooks` section

---

## Hook Lifecycle

```
Session Start
  ├── session-start-pull.sh           (pull repos in background)
  ├── session-start-context.sh        (load previous session context)
  └── session-start-repo-health.sh    (surface diverged/dirty/unpushed repos as banner)

Every Prompt
  └── prompt-context.sh          (inject git status — cached by index mtime)

Before Tool Execution (Bash only)
  └── pre-bash-check.sh          (guard dangerous commands + pre-commit counts)

Before Tool Execution (Write/Edit only)
  └── pre-write-validate.sh      (block writes to protected paths)

Before Compaction
  └── session-stop-summary.sh    (save session context before compaction)

After Tool Execution (Write/Edit only)
  └── secret-scan.sh             (scan for secrets in written files)

Session Stop
  └── session-stop-summary.sh    (save session summary)

Session End (on exit/clear/logout)
  ├── session-stop-summary.sh         (final session summary on exit)
  └── session-end-repo-health.sh      (push unpushed work, warn on dirty trees)

Status Line (persistent display)
  └── statusline.sh              (format status bar — zero token cost)
```

---

## Hook Reference

| Hook                       | Event            | Matcher     | Registered | What It Does                                                                                                                                                       |
| -------------------------- | ---------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `session-start-pull.sh`    | SessionStart     | —           | Yes        | Runs `_pull-all-repos.sh` in background with 60s timeout. Logs to `logs/pull-repos.log`. Rotates log at 500KB.                                                     |
| `session-start-context.sh` | SessionStart     | —           | Yes        | Injects previous session context if within 72 hours (covers weekends).                                                                                             |
| `session-start-repo-health.sh` | SessionStart | —           | Yes        | Synchronous diagnostic. Emits a banner naming any repo (parent + CUSTOM_PROJECT_DIRS, depth ≤3) that is DIVERGED, UNPUSHED, BEHIND, DIRTY, DETACHED, or NO_UPSTREAM. Silent when all clean. No network. |
| `prompt-context.sh`        | UserPromptSubmit | —           | Yes        | Injects git branch/status/commits. Caches output by `.git/index` mtime — skips git calls when nothing changed.                                                    |
| `pre-bash-check.sh`        | PreToolUse       | Bash        | Yes        | Combined guard + pre-commit. Blocks dangerous patterns (exit 2). On `git commit` in ~/.claude, runs update-counts.sh and stages docs.                              |
| `pre-write-validate.sh`    | PreToolUse       | Write\|Edit | Yes        | Blocks writes to protected paths (.env*, credentials, node_modules, .git, .ssh, .gnupg, *.pem, *.key, *.p12, *.pfx, *.jks). Exits with code 2 to block.           |
| `session-stop-summary.sh`  | PreCompact       | —           | Yes        | Saves session context before context compaction (same script, fires also on PreCompact event).                                                                                              |
| `secret-scan.sh`           | PostToolUse      | Write\|Edit | Yes        | Scans written/edited files for leaked secrets (API keys, tokens, passwords). Warns but does not block. Skips .md files.                                            |
| `session-stop-summary.sh`  | Stop             | —           | Yes        | Writes a session summary for continuity between sessions.                                                                                                          |
| `session-stop-summary.sh`  | SessionEnd       | —           | Yes        | Final session summary on exit/clear/logout (belt + suspenders + safety net).                                                                                       |
| `session-end-repo-health.sh` | SessionEnd     | —           | Yes        | Departure ceremony. For user-owned repos (push URL contains `travisjneuman`): pushes unpushed commits when tree is clean, warns on dirty/diverged. Never auto-commits. Output appended to `last-session.md` so next session sees it. |
| `statusline.sh`            | statusLine       | —           | Yes        | Formats persistent status bar (model, branch, context %, cost). Zero token cost.                                                                                   |
| `gsd-check-update.js`      | SessionStart     | —           | Yes        | Background check for GSD plugin updates.                                                                                                                            |
| `gsd-prompt-guard.js`      | PreToolUse       | Write\|Edit | Yes        | Soft guard: scans for prompt-injection patterns in `.planning/` writes.                                                                                            |
| `gsd-context-monitor.js`   | PostToolUse      | Bash\|Edit\|Write\|MultiEdit\|Agent\|Task | Yes | Injects context-usage warnings when nearing limits.                                                                                                  |
| `gsd-statusline.js`        | —                | —           | No (alt)   | Alternative GSD-flavored statusline. Not registered by default; swap with `statusline.sh` if preferred.                                                            |
| `gsd-workflow-guard.js`    | —                | —           | No (opt-in)| Soft guard: warns when editing outside an active GSD workflow context. Opt-in via `hooks.workflow_guard: true` in GSD config.                                     |

---

## Detailed Hook Documentation

### session-start-pull.sh

**Event:** SessionStart
**Purpose:** Keep all repositories up to date without blocking session startup.

**What it does:**

1. Creates `~/.claude/logs/` directory if it doesn't exist
2. Rotates `logs/pull-repos.log` if over 500KB (keeps last 100 lines)
3. Runs `_pull-all-repos.sh` in the background with a 60-second timeout
4. After pulling, runs `fix-marketplace-paths.sh` for cross-platform path compatibility
5. All output is logged to `logs/pull-repos.log`

**Key design decisions:**

- Runs asynchronously (`&` at the end) so Claude Code starts immediately
- Uses `timeout 60` to prevent hanging on network issues
- Exits 0 immediately regardless of background process status

**Troubleshooting:**

- Check `~/.claude/logs/pull-repos.log` for errors
- If repos aren't updating, verify network connectivity
- Run `_pull-all-repos.sh` manually to debug

---

### session-start-context.sh

**Event:** SessionStart
**Purpose:** Inject context from the previous session so Claude can pick up where it left off.

**What it does:**

1. Checks if `~/.claude/last-session.md` exists
2. Checks if the file is less than 72 hours old (covers weekends; platform-aware: uses `stat -f%m` on macOS, `stat -c%Y` on Linux)
3. If recent, outputs the file contents to stdout (which Claude Code injects into context)

**Output format:**

```
=== Previous Session Context ===
# Last Session — 2026-02-05 15:00
**Working directory:** /path/to/project
**Branch:** master
## Recent commits
abc1234 feat: last thing I did
...
=== End Previous Session ===
```

**Cross-platform:** Uses `uname` detection for macOS vs Linux `stat` syntax differences.

---

### session-start-repo-health.sh

**Event:** SessionStart
**Purpose:** Make invisible repo problems visible. Existed because the async `session-start-pull.sh` logs failures to a file Claude never reads, so diverged/dirty/unpushed repos can sit invisible for months (cf. the 88-day `.lzg_platform` drift incident).

**What it does:**

1. Reads `CUSTOM_PROJECT_DIRS` from `.env.local` (same source as `_pull-all-repos.sh`)
2. Walks each directory to depth 3 to catch nested submodule layouts (e.g. `web-dev/.lzg_platform/Lazy Golfing/lzg.home`)
3. For each git repo, classifies state without making any network calls:
   - **DIVERGED** — local and `@{u}` both ahead → manual reconciliation needed
   - **UNPUSHED** — local ahead only → push needed
   - **BEHIND** — remote ahead only → fast-forward pull available
   - **DIRTY** — uncommitted changes
   - **DETACHED** — detached HEAD
   - **NO_UPSTREAM** — branch tracks no remote
4. If any problems found, emits a banner to stdout (which Claude Code injects into context)
5. If all repos are clean and synced, exits silently (zero output, zero token cost)

**Key design decisions:**

- **Synchronous, not async** — runs inline so its banner reaches Claude's context. The other pull hook stays async for actual fetching.
- **No `git fetch`** — uses last-fetched refs only. Network blocking would defeat the purpose; the async pull handles freshness.
- **Skips `plugins/marketplaces/*`** — those are `no_push`-enforced external repos; their divergence is meaningless and noisy.
- **Silent on success** — the banner only appears when there's something to show.

**Output example:**

```
=== Repo Health Check ===
Out-of-sync repos detected. Reconcile before editing them.
(Status reflects last fetched state — does not include this session's pull.)

  DIVERGED   web-dev/.lzg_platform (local +154, remote +673 — pull blocked, needs reconciliation)
  DIRTY      web-dev/tjn.portfolio (3 uncommitted change(s) on main)

Legend: ...
=== End Repo Health Check ===
```

**Companion CLAUDE.md rule:** When this banner appears for a repo, do not edit that repo without first reconciling. The banner is a hard precondition, not advisory.

---

### prompt-context.sh

**Event:** UserPromptSubmit
**Purpose:** Give Claude awareness of the current git state with every prompt.

**What it does:**

1. Checks if the current directory is a git repository (exits silently if not)
2. Checks `.git/index` mtime against cached value — returns cached output if unchanged
3. On cache miss: reads current branch, last commit, staged/unstaged changes
4. Writes cache to `.git/.claude-prompt-cache` (never committed, per-repo)

**Output format:**

```
[Git: main | Last: abc1234 feat: latest change]
[Staged: 2 files changed, 15 insertions(+)]
[Unstaged: 1 file changed, 3 insertions(+)]
```

**Performance:** Caches output by `.git/index` modification time. On cache hit (most consecutive prompts), returns instantly without running any git commands. Cache invalidates automatically on `git add`, `git commit`, `git checkout`, `git reset`, or any index-modifying operation.

---

### session-stop-summary.sh

**Event:** Stop
**Purpose:** Save a session summary so the next session can resume context.

**What it does:**

1. Creates `~/.claude/session-summaries/` directory if needed
2. Detects the actual working directory from `CLAUDE_WORKING_DIR` env var (falls back to `pwd`)
3. Gets the git branch from the actual working directory (not `~/.claude`)
4. Captures: timestamp, branch, working directory, last 5 git commits
5. Captures active task context (lists recent task files from `tasks/` directory)
6. Captures pending TodoWrite todos (from `.claude/todos.json`)
7. Writes summary to `~/.claude/last-session.md` (read by `session-start-context.sh`)
8. Archives a timestamped copy to `session-summaries/session-YYYYMMDD-HHMMSS.md`
9. Cleans up session summaries older than 90 days

**Output file (`last-session.md`):**

```markdown
# Last Session -- 2026-02-05 15:00

**Working directory:** /home/tjn/projects/myapp
**Branch:** feature/auth

## Recent commits

abc1234 feat: latest change
def5678 fix: previous fix
...

## Active tasks

auth-implementation
database-schema

## Pending todos

- Add error handling to login flow
- Write tests for auth service

## Session context

This file was auto-generated at session end.
```

**Paired with:** `session-start-context.sh` reads this file at the next session start.

---

### session-end-repo-health.sh

**Event:** SessionEnd
**Purpose:** Departure-side counterpart to `session-start-repo-health.sh`. Tries to leave the machine clean so the next machine's arrival banner has nothing to flag. Together they form: *depart-clean / arrive-aware*.

**What it does:**

1. Reads `CUSTOM_PROJECT_DIRS` from `.env.local` (same scope as arrival hook)
2. Walks parent + each custom dir to depth 3
3. For each git repo whose push URL contains `travisjneuman` (user-owned):
   - **Clean tree + unpushed commits** → fetches, re-checks divergence, attempts FF push, reports outcome
   - **Dirty tree** → emits `DIRTY` warning. **Does NOT auto-commit** (auto-committing dirty trees is what produced the bad-base `d4b9e8e` mess on 2026-04-29)
   - **Diverged** → emits `DIVERGED` warning. Does NOT attempt resolution.
   - **Race condition** (remote advanced during the fetch-and-push window) → emits `RACE-DIVERGED`, leaves work unpushed, surfaces it for next session
4. Writes findings to:
   - `~/.claude/last-session.md` (so next session's context-loader injects them)
   - stderr (so they appear in the closing terminal)

**Why SessionEnd, not Stop:** Stop fires after every Claude turn. Pushing every turn would interrupt mid-work intermediate commits the user might want to revise. SessionEnd fires on actual exit/clear/logout — the right moment for departure logic.

**What it does NOT do:**

- Never auto-commits dirty trees
- Never force-pushes
- Never touches non-user-owned repos (marketplaces with `no_push`, others' forks)
- Never blocks session exit on push failure — best-effort, advisory
- Never fires on `Stop` mid-session (only on `SessionEnd`)

**Best-effort, not bulletproof:** If the user kills the terminal hard (kill -9, lid close), SessionEnd may not fire. The arrival hook on the *next* machine is the catch-all safety net.

**Companion CLAUDE.md rule:** "Reconcile before editing — repo health banner is mandatory" (Git Safety section). Strengthened with a paired departure-side expectation: any unpushed work that survives a session is a rule violation in this turn or the previous one.

---

## Cross-Platform Hook Runner

All hooks use `hooks/run-hook.js` — a Node.js-based runner that resolves hook paths using `os.homedir()`. This ensures hooks work correctly on:

- **Windows** — Git Bash, CMD, PowerShell (avoids WSL `~` → `/root/` bug)
- **macOS** — `/Users/username`
- **Linux** — `/home/username`

**Why Node.js?** On Windows, Claude Code may invoke WSL's bash, which resolves `~` to `/root/` instead of the actual Windows user home. Node.js `os.homedir()` is the only reliable cross-platform method, and Node.js is guaranteed to be installed (Claude Code requires it).

**Why Git Bash on Windows?** Bare `bash` may resolve to WSL's bash (`C:\Windows\System32\bash.exe`), which tries to mount all Windows drives on startup and fails on network drives (e.g. `Z:\`). The runner explicitly prefers Git Bash (`C:\Program Files\Git\usr\bin\bash.exe`) to avoid this.

Each hook command in `settings.json` follows this pattern:

```json
"command": "node -e \"process.env.HOOK_NAME='script-name.sh';require(require('path').join(require('os').homedir(),'.claude','hooks','run-hook'))\""
```

The runner:
1. Resolves the home directory via `os.homedir()`
2. Constructs the hook path: `~/.claude/hooks/<HOOK_NAME>`
3. Exits silently if the hook script doesn't exist (non-blocking)
4. Converts Windows backslashes to forward slashes for bash compatibility
5. On Windows, prefers Git Bash (`C:\Program Files\Git\usr\bin\bash.exe`) over WSL bash to avoid drive mount errors
6. Executes the hook via bash with `HOME` env var set correctly

---

## How Hooks Work

Hooks are defined in `settings.json` under the `hooks` key:

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName",
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"process.env.HOOK_NAME='script.sh';require(require('path').join(require('os').homedir(),'.claude','hooks','run-hook'))\"",
            "statusMessage": "Doing something"
          }
        ]
      }
    ]
  }
}
```

- **`type`**: Always `"command"` (runs a shell command)
- **`command`**: Node.js one-liner that invokes `run-hook.js` with the hook name
- **`statusMessage`**: Text shown in the Claude Code spinner while the hook runs
- **`matcher`**: (Optional) Only run for specific tools (e.g., `"Bash"`, `"Write|Edit"`)

### Exit Codes

| Code  | Meaning                                                  |
| ----- | -------------------------------------------------------- |
| 0     | Allow (hook ran successfully, proceed)                   |
| 2     | Block (for PreToolUse: prevents the tool from executing) |
| Other | Error (logged, but doesn't block)                        |

### Environment Variables

Hooks receive context via environment variables:

| Variable             | Available In | Contains                                           |
| -------------------- | ------------ | -------------------------------------------------- |
| `$CLAUDE_TOOL_INPUT` | PreToolUse   | The tool's input (e.g., the bash command)          |
| stdin (JSON)         | PostToolUse  | Tool input object with `tool_input.file_path` etc. |

---

## Disabling a Hook

Edit `settings.json` and remove or comment out the hook entry. Hooks cannot be toggled via a CLI command — you must edit the JSON directly.

---

## Adding a New Hook

1. Create a bash script in `~/.claude/hooks/`
2. Add the hook entry to `settings.json` using the `run-hook.js` pattern (see above)
3. The script receives context via environment variables (e.g., `$CLAUDE_TOOL_INPUT` for PreToolUse)

### Example: Custom PreToolUse Hook

```bash
#!/bin/bash
# Block npm publish commands
COMMAND="$CLAUDE_TOOL_INPUT"
if echo "$COMMAND" | grep -qE 'npm publish'; then
  echo "BLOCKED: npm publish requires manual execution." >&2
  exit 2
fi
exit 0
```

Add to `settings.json`:

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "command": "node -e \"process.env.HOOK_NAME='block-publish.sh';require(require('path').join(require('os').homedir(),'.claude','hooks','run-hook'))\"",
      "statusMessage": "Checking publish safety"
    }
  ]
}
```

---

## Difference: hooks/ vs scripts/hooks/

| Directory                  | Purpose                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `~/.claude/hooks/`         | **Claude Code lifecycle hooks** — run by Claude Code automatically via settings.json             |
| `~/.claude/scripts/hooks/` | **Git hooks** — installed into `.git/hooks/` by setup scripts (pre-commit, commit-msg, pre-push) |

---

## Troubleshooting

**Hook not running:**

- Verify it's listed in `settings.json` → `hooks`
- Check the script exists at the path specified
- Ensure the script is valid bash (`bash -n ~/.claude/hooks/script.sh`)

**Hook error: "No such file or directory":**

- All hooks use `run-hook.js` which resolves paths via Node.js `os.homedir()` — this works on all platforms
- If you see `/root/.claude/hooks/...` on Windows, your hooks are using the old `bash ~/.claude/hooks/` pattern — update to the Node.js runner pattern
- On a different machine, ensure the repo is cloned to `~/.claude/`

**Hook blocking unexpectedly:**

- `guard-dangerous.sh` blocks commands matching broad patterns
- Check if your command matches: `rm -rf`, `git push --force`, `DROP TABLE`, etc.
- Bypass with caution if it's a false positive

**Hook error: "wsl: Failed to mount Z:\" (Windows):**

- Bare `bash` on Windows may resolve to WSL's bash (`C:\Windows\System32\bash.exe`), which tries to mount all drives on startup and fails on network drives (e.g. `Z:\`)
- `run-hook.js` handles this automatically by preferring Git Bash (`C:\Program Files\Git\usr\bin\bash.exe`) on Windows
- If you still see this error, verify Git for Windows is installed and `C:\Program Files\Git\usr\bin\bash.exe` exists
- Run `where bash` to see which bash executables are on your PATH

**Hook running slowly:**

- `session-start-pull.sh` runs in background — shouldn't slow startup
- `format-code.sh` depends on Prettier/Ruff being installed and fast
- `prompt-context.sh` should be near-instant (simple git commands)

---

## See Also

- [Configuration](../docs/CONFIGURATION.md) — Full settings.json reference
- [Scripts README](../scripts/README.md) — Helper scripts
- [Git Hooks Setup](../docs/reference/tooling/git-hooks-setup.md) — Project-level git hooks
- [Architecture Overview](../docs/ARCHITECTURE.md) — How hooks fit in the system
