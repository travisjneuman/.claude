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

| Hook | Event | Matcher | What It Does |
| ---- | ----- | ------- | ------------ |
| `session-start-pull.sh` | SessionStart | — | Runs `_pull-all-repos.sh` in background with 60s timeout. Logs to `logs/pull-repos.log`. |
| `session-start-context.sh` | SessionStart | — | Checks for recent session context and injects it if the last session was within a configured window. |
| `prompt-context.sh` | UserPromptSubmit | — | Injects current git branch, status, and recent commits into each prompt for context. |
| `guard-dangerous.sh` | PreToolUse | Bash | Blocks commands matching dangerous patterns: `rm -rf /`, `git push --force`, `DROP TABLE`, `git reset --hard origin`, `git clean -fd`. Exits with code 2 to block. |
| `pre-commit-counts.sh` | PreToolUse | Bash | Detects `git commit` commands and runs `update-counts.sh` first. Auto-stages updated doc files. |
| `format-code.sh` | PostToolUse | Write\|Edit | Auto-formats files after Claude writes or edits them (Prettier, etc.). |
| `session-stop-summary.sh` | Stop | — | Writes a session summary for continuity between sessions. |

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

| Code | Meaning |
| ---- | ------- |
| 0 | Allow (hook ran successfully, proceed) |
| 2 | Block (for PreToolUse: prevents the tool from executing) |
| Other | Error (logged, but doesn't block) |

---

## Disabling a Hook

Edit `settings.json` and remove or comment out the hook entry. Hooks cannot be toggled via a CLI command — you must edit the JSON directly.

---

## Adding a New Hook

1. Create a bash script in `~/.claude/hooks/`
2. Add the hook entry to `settings.json` under the appropriate event
3. The script receives context via environment variables (e.g., `$CLAUDE_TOOL_INPUT` for PreToolUse)

---

## Difference: hooks/ vs scripts/hooks/

| Directory | Purpose |
| --------- | ------- |
| `~/.claude/hooks/` | **Claude Code lifecycle hooks** — run by Claude Code automatically via settings.json |
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

---

## See Also

- [Configuration](../docs/CONFIGURATION.md) — Full settings.json reference
- [Scripts README](../scripts/README.md) — Helper scripts
- [Git Hooks Setup](../rules/tooling/git-hooks-setup.md) — Project-level git hooks
