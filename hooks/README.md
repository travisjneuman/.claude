# Hooks

Hooks are small scripts Claude Code runs automatically at fixed moments: when a session starts, before or after a tool runs, when a session ends. They're wired in `settings.json` and all go through `run-hook.js`, which finds the script (public `hooks/` first, then your private `local/hooks/`), picks the right interpreter on macOS, Linux, or Windows, and passes Claude Code's JSON through.

**Token cost** means text injected into Claude's context. Most hooks here cost zero: they either do their work silently or only speak up when something is wrong.

## Active hooks

| When | Hook | What it does, in plain terms | Tokens | Time |
| --- | --- | --- | --- | --- |
| Session start (background) | `session-start-pull.sh` | Once a day at most, fast-forward pulls `~/.claude`, the marketplace clones, and (optionally) your project repos. Never commits, pushes, or merges. Logs to `logs/pull-repos.log`. `/pull-repos` forces a pull. | 0 | 0 (async) |
| Session start | `session-start-repo-health.sh` | Looks at local git state (no network) for `~/.claude` and your project dirs, and prints a short banner only if a repo is behind, unpushed, dirty, diverged, or detached. Capped at 15 lines. | 0, or ~50–300 when something needs attention | ~0.1 s |
| Session start | `local-session-start.sh` *(private, optional)* | Whatever your private layer needs, e.g. exporting host path variables into Bash. | 0 by default | ~10 ms |
| Before Bash / Write / Edit / EnterWorktree / Agent | `guard.js` | Blocks a short list of footguns: `rm -rf` on `/` or `~`, force push and `reset --hard` (unless the command carries `GUARD_APPROVED_FORCE=<owner>/<repo>`, the record of the user's approval for a repo they own), `git clean`, discarding all changes, `curl … \| sh`, destructive SQL, package publishing, AI attribution trailers, and writes to `.env`, credential, key, `.git/`, or `node_modules` files. Then, if your private layer has `local-pre-tool-use.py`, runs it for Bash/worktree/agent calls and relays its deny. Runs in-process. | 0 (a deny reason only when it blocks) | ~100–200 ms |
| After Write / Edit | `secret-scan.js` | Greps the file just written for things that look like real credentials (AWS, OpenAI/Anthropic, GitHub, GitLab, Slack tokens, private keys). If found, tells Claude so it removes them before committing. Never blocks. | 0, or a short warning | ~20 ms (in-process) |
| Session end | `session-end-repo-health.sh` | Returns instantly and works in the background. For repos owned by `GITHUB_OWNERS`: commits any pending changes as a checkpoint (skips mid-merge/rebase, conflicts, or anything that looks like a secret), then pushes through `REPO_PUSH_COMMAND` if set, else `git push`. Nested repos first. Log: `logs/departure.log`. Report-only when `GITHUB_OWNERS` is unset. | 0 | 0 (background) |
| After every response (Stop) | `daily-maintenance.js` | Checks a timestamp and exits in milliseconds, except once per 24 h per machine, when it starts a background job: counts which skills, agents, and slash commands the transcripts show were used (names and counts only) into `USAGE_DIR/<HOST>.json`, then runs the commit-everything sweep. Covers desktop sessions that stay open for days and never reach SessionEnd. | 0 | ~50 ms (background once a day) |
| Status bar | `statusline.js` | Draws `model · effort · folder (branch) · context tokens · prompt-cache hit % (or "cold") · 5h/7d usage · cost` under the prompt. Rendered by the client, never sent to Claude. | 0 | ~20 ms |

## Plugin hooks

`claude-security` (installed, **off by default**) adds hooks that run three scripts after every tool call and print a tip after each push, so it's enabled only when you run a security scan: `/plugin enable claude-security@claude-plugins-official`. The other enabled plugins add no hooks.

## Removed in the 2026-09 modernization, and why

| Hook | Why it went |
| --- | --- |
| `pre-bash-check.sh`, `pre-write-validate.sh` | Read `$CLAUDE_TOOL_INPUT`, which Claude Code never sets (input arrives as JSON on stdin), so they never blocked anything. Replaced by `guard.js`. |
| `prompt-context.sh` (every prompt) | Injected branch and last commit into every prompt. Claude Code already gives the model git status at session start, so this was pure repeated token cost. |
| `session-stop-summary.sh` + `session-start-context.sh` | Wrote a "last session" file after every turn and injected it into the next session, even in an unrelated project. `claude --continue` / `--resume` and auto memory do this properly. |
| `statusline.sh` | Read fields that don't exist in the status line JSON, so it showed "unknown". Replaced by `statusline.js`. |
| `gsd-*.js` (5 files) | GSD-specific hooks from the vendored GSD copy. Removed in v3.2.0 together with that copy. GSD itself (the `gsd-core` marketplace) has since been removed from the toolkit. |
| Auto-commit/push inside `_pull-all-repos.sh` | The background pull used to `git add -u`, commit, and push `~/.claude` on its own. That could sweep in-progress edits into a public push. Counts and indexes now regenerate in the git pre-commit hook instead. |

## Git hooks for this repo (`scripts/hooks/`)

Installed by `bash scripts/setup-hooks.sh` as thin wrappers, so updates arrive with a normal pull.

- **pre-commit:** blocks staged marketplace clones or gitlinks; runs the public-safety gate (`local/public-safety-patterns.txt`, private); regenerates `INDEX.md`, `index/graph.json`, `skills/MASTER_INDEX.md`, and counts; blocks obvious secrets.
- **commit-msg:** conventional commit format.
- **pre-push:** blocks non-fast-forward pushes to `main`/`master` and gitlinks or marketplace content in `HEAD`.

## Writing a hook

Read JSON from stdin (`tool_name`, `tool_input`, `cwd`, `hook_event_name`, …). To block a tool call, print `{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"…"}}` and exit 0. To add context, use `additionalContext`. Keep SessionStart hooks fast (Claude's first reply waits for them) and put slow work behind `"async": true`. Reference: https://code.claude.com/docs/en/hooks
