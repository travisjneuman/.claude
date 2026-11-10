# Advisor plans

Findings from a read-through audit of this repo (method: [shadcn/improve](https://github.com/shadcn/improve)), written against commit `14bb4b1`. `plans/` is gitignored here (Claude Code writes runtime plans there), so audit plans live in this folder.

Up: [README](../README.md) · Not here: release history is in [CHANGELOG.md](../CHANGELOG.md).

Validation in this repo is by review, not tests (see `CLAUDE.md`). An executor confirms each item by re-reading the files named in "Done when".

## Status

| # | Finding | Category | Status |
|---|---------|----------|--------|
| 01 | `init-marketplaces.sh` rewrote `origin` to the maintainer's repo | Correctness | DONE |
| 02 | `_pull-all-repos.sh` set `no_push` on every repo not owned by the maintainer | Correctness | DONE |
| 03 | `tune-tiers.mjs` wrote skills with an empty description and two frontmatter blocks (7 files) | Correctness | DONE |
| 04 | `install.sh` used submodule flags, wrote a bogus `.mcp.json`, advertised pipe-to-shell | Correctness | DONE |
| 05 | Tracked symlinks to absolute host paths (`skills/diagnose-crash`, `skills/omarchy`) | Correctness | DONE |
| 06 | `secret-scan.js` echoed the matched line into the conversation | Security | DONE |
| 07 | No opt-out for background plugin and language-server installs; trust model undocumented | DX / Security | DONE |
| 08 | README version, quick start, and `agents/README.md` out of step with the tree | Docs | DONE |
| 09 | Published counts say 10 agents; 3 exist | Correctness | TODO (needs an authorized count refresh) |
| 10 | `settings.json` mixes toolkit defaults with the maintainer's machine and plugin choices | DX | TODO (owner decision) |
| 11 | Tier tuning changes the agent set but not the docs and counts that describe it | Debt | TODO |
| 12 | `setup-new-machine.sh` and the setup docs describe an older marketplace model | Docs / Debt | TODO |
| 13 | `docs/` carries superseded and overlapping guides | Docs | TODO |
| 14 | `env_get` and the secret regex are copy-pasted across hooks and scripts | Debt | TODO (low priority) |

Recommended order for the open items: 09, 11 (same area), then 10, 12, 13. 14 only when one of those files is being edited anyway.

## Open items

### 09: Refresh the published counts

- **Evidence**: `counts.json` (`"agents": 10` and an `inventory.agents` list naming seven files that no longer exist), `plugin.json` (`components.agents.count`, `features`), `README.md` (Agents badge, "10 specialist agents", the What's Included table), `website/src/lib/data/`.
- **Why it's open**: counts are regenerated only by an explicit, reviewed source refresh ([docs/COUNT-PIPELINE.md](../docs/COUNT-PIPELINE.md)); the audit did not run one.
- **Do**: follow `docs/COUNT-PIPELINE.md` exactly, review the diff, publish. Don't hand-edit the numbers.
- **Done when**: `counts.json` `inventory.agents` lists exactly the `.md` files in `agents/` other than `README.md`, and README, `plugin.json`, and the website show the same number.
- **Stop and report if**: the refresh changes marketplace counts by more than a few percent; that means clones are missing on the machine running it.

### 10: Separate toolkit defaults from the maintainer's own settings

- **Evidence**: `settings.json`: `env.COMPUTER_USE_CODEX_LAUNCHER_PATH` is a macOS application path; `enabledPlugins` and `extraKnownMarketplaces` are one person's plugin set (and `scripts/install-plugins.sh` installs them on every machine); `skillOverrides` lists about 110 names for skills this repo doesn't ship (vendor and plugin skills); `modelSettings`, `theme`, `tui`, `verbose`, `autoCompactWindow` are preferences.
- **Impact**: a public user inherits all of it, and the daily pull overwrites their edits to `settings.json` or blocks the pull when they've changed it (the pull skips a dirty tree, so they silently stop getting updates).
- **Options** (owner's call): (a) keep one file and document it, which is the current state plus the README note added in this audit; (b) move the personal keys into a file Claude Code merges at user scope, if the installed version supports one, and have the public file carry only toolkit behavior (hooks, permissions, name-only overrides for shipped skills); (c) generate `settings.json` from a tracked base plus an ignored overlay in `local/`.
- **Before choosing**: check the current Claude Code settings documentation for which user-scope files are merged; don't assume `~/.claude/settings.local.json` is read.
- **Out of scope**: changing `permissions.defaultMode` or any hook wiring.

### 11: Make tier tuning keep its own paper trail current

- **Evidence**: `scripts/tune-tiers.mjs` moves files between `agents/` and `skills/agent-*/` and regenerates the index, but nothing updates `agents/README.md`, and the counts stay stale until item 09 is done by hand. Three weekly runs removed seven of ten core agents (`git log --oneline -- agents`).
- **Questions for the owner first**: is demoting the core agents on 30 days of non-use intended? Usage is counted from `subagent_type` in transcripts on the hosts that report, so an agent used only on a host that doesn't report looks unused. A floor (for example, never demote `deep-code-reviewer`, `security-auditor`, `debugging-specialist`) may fit better than usage alone; `PINNED` in `tune-tiers.mjs` already does this for two skills.
- **Do** (after the answer): either add the floor to `PINNED`-style handling for agents, or have the report list "docs to update" so the job's commit includes `agents/README.md`.
- **Done when**: after a tuning run that moves an agent, `agents/README.md` names no file that is missing from `agents/`.

### 12: Bring first-run scripts and setup docs to the current marketplace model

- **Evidence**: `scripts/setup-new-machine.sh` clones `claude-code-plugins-plus-skills` separately "because it can't be a git submodule" (nothing is a submodule now), registers three marketplaces by directory whether or not they are in the manifest, and ends by suggesting `/start-task` "to test the router". `docs/NEW-DEVICE-SETUP.md` calls `init-marketplaces.sh` legacy while `README.md`, `scripts/README.md`, and `_pull-all-repos.sh` all use it. `docs/SETUP-GUIDE.md` step 2 runs `_pull-all-repos.sh`, which needs Bash 4 and fails on stock macOS with a message but no fallback. `_pull-all-repos.sh` also sets `no_push` on any repo whose path contains `/.openclaw`, a maintainer-specific case.
- **Do**: decide the one supported path (suggested: clone or `install-in-place.sh`, then optional `init-marketplaces.sh`, then optional `local/`), make `setup-new-machine.sh` do exactly that, and make the three docs say the same thing.
- **Done when**: README Quick Start, `docs/SETUP-GUIDE.md`, `docs/NEW-DEVICE-SETUP.md`, and `scripts/README.md` name the same scripts in the same order, and none of them says "submodule" about marketplaces.

### 13: Prune and merge `docs/`

- **Evidence**: about 10,700 lines across 59 files. `docs/OPUS-4-6-GUIDE.md` opens with a note that it is superseded and should not be followed. `docs/MCP-SERVERS.md` (542 lines) and `docs/reference/tooling/mcp-servers.md` cover the same subject for a toolkit that ships no MCP servers. `docs/AGENT-TEAMS.md` and `docs/reference/workflows/agent-teams.md` overlap, as do `docs/SKILLS.md`, `skills/README.md`, and `docs/SKILL-CREATION-GUIDE.md`. `docs/FOLDER-STRUCTURE.md` (673 lines) hand-maintains a tree that still lists the old `install.sh` role.
- **Do**: move superseded guides to `archive/` (never delete), pick one owner per subject and link to it from the other, and replace the hand-drawn tree with a short description that points at the generated `INDEX.md`.
- **Done when**: no file under `docs/` starts with a "superseded" notice, and each subject above has one owning file.

### 14: One copy of `env_get` and the secret pattern

- **Evidence**: `env_get` is defined in `_pull-all-repos.sh`, `hooks/session-start-pull.sh`, `hooks/session-start-repo-health.sh`, `hooks/session-end-repo-health.sh`, and `scripts/install-plugins.sh`, with a JavaScript twin in `hooks/daily-maintenance.js`. The credential regex is in `hooks/secret-scan.js` and `hooks/session-end-repo-health.sh`.
- **Not urgent**: the copies are identical today. Hooks must stay standalone and fast, so a shared file is only worth it if it can't make a hook fail when missing.

## Considered and rejected

- **No tests, no CI**: decided in `CLAUDE.md` and the hooks README. Not a finding.
- **`bypassPermissions` by default**: the toolkit's stated purpose; now called out in the README table.
- **Session-end commit and push**: only acts for owners in `GITHUB_OWNERS`, skips anything that looks like a secret, never forces. By design.
- **Regex guard can be evaded**: `hooks/guard.js` says so itself; it guards against slips, not intent.

## Not audited

The bodies of the 180+ skills (only frontmatter was checked), `commands/`, `website/`, the count and index generators beyond `tune-tiers.mjs`, the PowerShell scripts, and most of `docs/` beyond the files named above.
