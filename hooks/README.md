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

After Tool Execution (Write/Edit only)
  └── format-code.sh             (auto-format modified files)

Session Stop
  └── session-stop-summary.sh    (save session summary)
```

---

## Hook Reference

| Hook                       | Event            | Matcher     | What It Does                                                                                                                                                       |
| -------------------------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `session-start-pull.sh`    | SessionStart     | —           | Runs `_pull-all-repos.sh` in background with 60s timeout. Logs to `logs/pull-repos.log`.                                                                           |
| `session-start-context.sh` | SessionStart     | —           | Checks for recent session context and injects it if the last session was within a configured window.                                                               |
| `prompt-context.sh`        | UserPromptSubmit | —           | Injects current git branch, status, and recent commits into each prompt for context.                                                                               |
| `guard-dangerous.sh`       | PreToolUse       | Bash        | Blocks commands matching dangerous patterns: `rm -rf /`, `git push --force`, `DROP TABLE`, `git reset --hard origin`, `git clean -fd`. Exits with code 2 to block. |
| `pre-commit-counts.sh`     | PreToolUse       | Bash        | Detects `git commit` commands and runs `update-counts.sh` first. Auto-stages updated doc files.                                                                    |
| `format-code.sh`           | PostToolUse      | Write\|Edit | Auto-formats files after Claude writes or edits them (Prettier, etc.).                                                                                             |
| `session-stop-summary.sh`  | Stop             | —           | Writes a session summary for continuity between sessions.                                                                                                          |

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
| `rm -rf /` or `rm -rf ~` | Filesystem destruction |
| `git push --force` | Overwrite remote history |
| `DROP TABLE` | Database destruction |
| `TRUNCATE TABLE` | Database data loss |
| `git clean -fd` | Delete untracked files |
| `git reset --hard origin` | Discard all local changes |

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

**Cross-platform:** Uses Node.js for JSON parsing (always available where Claude Code runs). Falls back gracefully if formatters aren't installed.

---

### session-stop-summary.sh

**Event:** Stop
**Purpose:** Save a session summary so the next session can resume context.

**What it does:**

1. Creates `~/.claude/session-summaries/` directory if needed
2. Captures: timestamp, current branch, working directory, last 5 git commits
3. Writes summary to `~/.claude/last-session.md` (read by `session-start-context.sh`)
4. Archives a timestamped copy to `session-summaries/session-YYYYMMDD-HHMMSS.md`

**Output file (`last-session.md`):**

```markdown
# Last Session — 2026-02-05 15:00

**Working directory:** /Users/tjn/.claude
**Branch:** master

## Recent commits

abc1234 feat: latest change
def5678 fix: previous fix
...

## Session context

This file was auto-generated at session end.
```

**Paired with:** `session-start-context.sh` reads this file at the next session start.

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
            "command": "bash ~/.claude/hooks/script.sh",
            "statusMessage": "Doing something"
          }
        ]
      }
    ]
  }
}
```

- **`type`**: Always `"command"` (runs a shell command)
- **`command`**: The bash command to execute
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
2. Add the hook entry to `settings.json` under the appropriate event
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
      "command": "bash ~/.claude/hooks/block-publish.sh",
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

- The path uses `~/.claude/hooks/` which resolves to `$HOME/.claude/hooks/`
- On a different machine, ensure the repo is cloned to `~/.claude/`

**Hook blocking unexpectedly:**

- `guard-dangerous.sh` blocks commands matching broad patterns
- Check if your command matches: `rm -rf`, `git push --force`, `DROP TABLE`, etc.
- Bypass with caution if it's a false positive

**Hook running slowly:**

- `session-start-pull.sh` runs in background — shouldn't slow startup
- `format-code.sh` depends on Prettier/Ruff being installed and fast
- `prompt-context.sh` should be near-instant (simple git commands)

---

## See Also

- [Configuration](../docs/CONFIGURATION.md) — Full settings.json reference
- [Scripts README](../scripts/README.md) — Helper scripts
- [Git Hooks Setup](../rules/tooling/git-hooks-setup.md) — Project-level git hooks
- [Architecture Overview](../docs/ARCHITECTURE.md) — How hooks fit in the system
