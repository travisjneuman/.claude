# Claude Code Lifecycle Hooks

Hooks are bash scripts that run automatically at specific points during a Claude Code session.

**Location:** `~/.claude/hooks/`
**Configuration:** `~/.claude/settings.json` → `hooks` section

---

## Hook Lifecycle

```
Session Start
  ├── session-start-pull.sh      (pull repos in background)
  └── session-start-context.sh   (load previous session context)

Every Prompt
  └── prompt-context.sh          (inject git status into prompt)

Before Tool Execution (Bash only)
  ├── guard-dangerous.sh         (block dangerous commands)
  └── pre-commit-counts.sh       (update counts before git commit)

Before Tool Execution (Write/Edit only)
  └── pre-write-validate.sh      (block writes to protected paths)

After Tool Execution (Write/Edit only)
  ├── format-code.sh             (auto-format modified files)
  ├── secret-scan.sh             (scan for secrets in written files)
  └── post-edit-lint.sh          (run linter on modified files)

Session Stop
  └── session-stop-summary.sh    (save session summary)
```

---

## Hook Reference

| Hook                       | Event            | Matcher     | Registered | What It Does                                                                                                                                                       |
| -------------------------- | ---------------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `session-start-pull.sh`    | SessionStart     | —           | Yes        | Runs `_pull-all-repos.sh` in background with 60s timeout. Logs to `logs/pull-repos.log`.                                                                           |
| `session-start-context.sh` | SessionStart     | —           | Yes        | Checks for recent session context and injects it if the last session was within a configured window.                                                               |
| `prompt-context.sh`        | UserPromptSubmit | —           | Yes        | Injects current git branch, status, and recent commits into each prompt for context.                                                                               |
| `guard-dangerous.sh`       | PreToolUse       | Bash        | Yes        | Blocks commands matching dangerous patterns: `rm -rf /`, `git push --force`, `DROP TABLE`, `git reset --hard origin`, `git clean -fd`. Exits with code 2 to block. |
| `pre-commit-counts.sh`     | PreToolUse       | Bash        | Yes        | Detects `git commit` commands and runs `update-counts.sh` first. Auto-stages updated doc files.                                                                    |
| `pre-write-validate.sh`    | PreToolUse       | Write\|Edit | Yes        | Blocks writes to protected paths (.env, credentials, node_modules, .git, .ssh, .gnupg, *.pem, *.key). Exits with code 2 to block.                                 |
| `format-code.sh`           | PostToolUse      | Write\|Edit | **No**     | Auto-formats files after Claude writes or edits them (Prettier, etc.). Deregistered: adds latency, overlaps with editor formatters.                                |
| `secret-scan.sh`           | PostToolUse      | Write\|Edit | Yes        | Scans written/edited files for leaked secrets (API keys, tokens, passwords). Warns but does not block. Skips .md files.                                            |
| `post-edit-lint.sh`        | PostToolUse      | Write\|Edit | **No**     | Runs appropriate linter after edits (ESLint for JS/TS, ruff for Python, clippy for Rust, go vet for Go). Deregistered: adds latency, overlaps with CI linting.     |
| `session-stop-summary.sh`  | Stop             | —           | Yes        | Writes a session summary for continuity between sessions.                                                                                                          |

---

## Detailed Hook Documentation

### session-start-pull.sh

**Event:** SessionStart
**Purpose:** Keep all repositories up to date without blocking session startup.

**What it does:**

1. Creates `~/.claude/logs/` directory if it doesn't exist
2. Runs `_pull-all-repos.sh` in the background with a 60-second timeout
3. After pulling, runs `fix-marketplace-paths.sh` for cross-platform path compatibility
4. Runs `update-counts.sh` to reconcile any count changes from updated repos
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
2. Checks if the file is less than 24 hours old (platform-aware: uses `stat -f%m` on macOS, `stat -c%Y` on Linux)
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

### prompt-context.sh

**Event:** UserPromptSubmit
**Purpose:** Give Claude awareness of the current git state with every prompt.

**What it does:**

1. Checks if the current directory is a git repository (exits silently if not)
2. Reads current branch name, last commit, staged changes, and unstaged changes
3. Outputs a compact summary that gets appended to the prompt context

**Output format:**

```
[Git: main | Last: abc1234 feat: latest change]
[Staged: 2 files changed, 15 insertions(+)]
[Unstaged: 1 file changed, 3 insertions(+)]
```

**Performance:** Extremely lightweight — only runs `git branch`, `git log -1`, and `git diff --stat` commands.

---

### guard-dangerous.sh

**Event:** PreToolUse (matcher: Bash)
**Purpose:** Prevent Claude from executing commands that could cause irreversible damage.

**What it does:**

1. Reads the command from `$CLAUDE_TOOL_INPUT` environment variable
2. Checks against dangerous patterns using case-insensitive regex
3. Exits with code 2 to block, code 0 to allow

**Blocked patterns:**
| Pattern | Risk |
| ------- | ---- |
| `rm -rf /` or `rm -rf ~` or `rm -rf $HOME` | Filesystem destruction |
| `git push --force` / `git push -f` | Overwrite remote history |
| `DROP TABLE` | Database destruction |
| `TRUNCATE TABLE` | Database data loss |
| `git clean -fd` | Delete untracked files |
| `git reset --hard origin` | Discard all local changes |
| `chmod -R 777` | Overly permissive file permissions |
| `curl ... \| sh` / `wget ... \| sh` | Pipe-to-shell (remote code execution) |
| `npm publish` / `yarn publish` | Accidental package publication |
| `docker system prune -a` | Destroy all Docker resources |
| `git checkout -- .` / `git restore .` | Discard all unstaged changes |

**Exit codes:**

- `0` — Command is safe, proceed
- `2` — Command blocked, Claude sees the error message

**Override:** Claude can still suggest the command to the user, who can run it manually. The hook only prevents automatic execution.

---

### pre-commit-counts.sh

**Event:** PreToolUse (matcher: Bash)
**Purpose:** Ensure documentation counts are accurate before every git commit.

**What it does:**

1. Checks if the Bash command starts with `git commit`
2. If so, runs `update-counts.sh` silently to reconcile all counts
3. Auto-stages files that may have been updated: README.md, CLAUDE.md, counts.json, plugin.json, MASTER_INDEX.md, website layout files, and marketplace-counts.json

**Why this matters:** Counts are hardcoded in many files. Without this hook, committing after adding a skill would leave stale counts in documentation. The hook ensures counts are always accurate at commit time.

**Staged files:** README.md, CLAUDE.md, skills/README.md, skills/MASTER_INDEX.md, docs/_.md, commands/_.md, plugin.json, counts.json, website layout/footer/console files, marketplace-counts.json.

---

### format-code.sh

**Event:** PostToolUse (matcher: Write|Edit)
**Purpose:** Auto-format files after Claude writes or edits them.

**What it does:**

1. Reads the tool input JSON from stdin using Node.js
2. Extracts `tool_input.file_path` to identify which file was modified
3. Determines file extension and applies the appropriate formatter

**Formatters by extension:**
| Extension | Formatter |
| --------- | --------- |
| `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.scss`, `.html`, `.md`, `.yaml`, `.yml` | Prettier (`npx prettier --write`) |
| `.py` | Ruff (`ruff format`) or Black (`black --quiet`) |
| `.go` | gofmt (`gofmt -w`) |
| `.rs` | rustfmt (`rustfmt`) |
| `.sh`, `.bash` | shfmt (`shfmt -w`) |

**Cross-platform:** Uses Node.js for JSON parsing (always available where Claude Code runs). Falls back gracefully if formatters aren't installed.

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
