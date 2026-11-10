# Advisor plans

Findings from read-through audits of this repo (method: [shadcn/improve](https://github.com/shadcn/improve)), with their status. First pass against `14bb4b1`, second against `f3d1d00`. `plans/` is gitignored here (Claude Code writes runtime plans there), so audit plans live in this folder.

Up: [README](../README.md) · Not here: release history is in [CHANGELOG.md](../CHANGELOG.md); the security policy and trust model are in [SECURITY.md](../SECURITY.md).

Validation in this repo is by review, not tests (see `CLAUDE.md`). An executor confirms each item by re-reading the files named in "Done when".

## Status

| # | Finding | Category | Status |
|---|---------|----------|--------|
| 01 | `init-marketplaces.sh` rewrote `origin` to the maintainer's repo | Correctness | DONE |
| 02 | `_pull-all-repos.sh` set `no_push` on every repo not owned by the maintainer | Correctness | DONE |
| 03 | `tune-tiers.mjs` wrote broken skills and lost agent frontmatter; seven agents demoted | Correctness | DONE (agents restored; moves now opt-in and lossless) |
| 04 | `install.sh` used submodule flags, wrote a bogus `.mcp.json`, advertised pipe-to-shell | Correctness | DONE |
| 05 | Host-only symlinks were committed (`skills/diagnose-crash`, `skills/omarchy`) | Correctness | DONE (untracked, ignored, and two gates stop a repeat) |
| 06 | `secret-scan.js` echoed the matched line into the conversation | Security | DONE |
| 07 | No opt-out for background plugin and language-server installs; trust model undocumented | DX / Security | DONE |
| 08 | README version, quick start, and `agents/README.md` out of step with the tree | Docs | DONE |
| 09 | Published counts lag the tree (180 skills published, 183 exist; hook matcher text) | Correctness | TODO (needs an authorized count refresh) |
| 10 | `settings.json` mixes toolkit defaults with the maintainer's own choices | DX | IN PROGRESS (groundwork shipped, dormant) |
| 11 | Tier tuning moved agents without updating what describes them | Debt | DONE (agents are report-only by default) |
| 12 | `setup-new-machine.sh` and the setup docs describe an older marketplace model | Docs / Debt | TODO |
| 13 | `docs/` carries superseded and overlapping guides | Docs | TODO |
| 14 | `env_get` and the secret regex are copy-pasted across hooks and scripts | Debt | TODO (low priority) |
| 15 | Website build failed on every push since 2026-10-10 | Correctness | DONE in source; confirm on the deploy that follows the push |
| 16 | Guard never saw PowerShell commands | Security | DONE |
| 17 | Unreviewed marketplace content can be followed as instructions; undocumented | Security / Docs | DONE (documented as intended: `SECURITY.md`) |
| 18 | Forked skills ran in the background with a reduced tool set; three had no task | Correctness | DONE |
| 19 | Toolkit could not be installed as a plugin | Direction | DONE (`tjn-skills`, skills only; `claude plugin validate` passes; not yet exercised on a live install) |
| 20 | Commands used placeholders and argument declarations Claude Code does not read; stale checks | Correctness | DONE |
| 21 | Literal `$1`-style text in skills is replaced by arguments | Correctness | WON'T FIX by escaping (it would regress other agents that read these files); see "Considered and rejected" |
| 22 | Four unanswered community items; no security policy | Community | `SECURITY.md` and private vulnerability reporting DONE; triage is the owner's (assessment below) |
| 23 | Project-folder push policy still lives in the public pull script | Debt | DONE differently: kept, and now entirely opt-in through `GITHUB_OWNERS` |
| 24 | Hooks assume `~/.claude`; `CLAUDE_CONFIG_DIR` is not honored | DX | TODO (low priority) |
| 25 | Unreferenced files: `bin/prettier-hook.js`, `bin/setup.ps1` | Debt | TODO (archive, don't delete) |

Recommended order for the open items: 09, then 10 (second release), 12, 13. Items 14, 24 and 25 only when those files are being edited anyway.

## Open items

### 09: Refresh the published counts

- **Evidence**: `counts.json` lists 180 skills; `git ls-files 'skills/*/SKILL.md'` gives 183 (`agent-browser`, `agent-desktop` and `image-studio` were added after the 2026-10-10 snapshot). Its hook entry for `guard.js` still shows the matcher without `PowerShell`. `INDEX.md` is regenerated and already says 183.
- **Why it's open**: counts are regenerated only by an explicit, reviewed source refresh with private inputs ([docs/COUNT-PIPELINE.md](../docs/COUNT-PIPELINE.md)); the audits did not run one.
- **Not broken meanwhile**: every file the snapshot lists exists, so the website builds; the three newer skills are simply not shown on the site yet.
- **Do**: follow `docs/COUNT-PIPELINE.md` exactly, review the diff, publish. Don't hand-edit the numbers.
- **Done when**: `counts.json` `inventory.skills` equals the tracked `skills/*/SKILL.md` list, and README, `plugin.json` and the website show the same numbers.
- **Remember**: any change that adds, removes or renames a skill, agent or command makes the website build fail if the snapshot names a file that no longer exists. Removing or renaming one needs the refresh in the same change.

### 10: Separate toolkit defaults from the maintainer's own settings (second release)

- **Decision (owner, 2026-11)**: go ahead, in two releases.
- **Why two**: once `settings.json` stops being tracked, the pull that delivers that commit deletes the file from every checkout, and with it all hook wiring. Something must rebuild it immediately after that pull, and that something has to be on the machine before the pull arrives.
- **Shipped in the first release (dormant)**: `scripts/build-settings.mjs` (merges `settings.base.json` and a private `local/settings.overlay.json` into `settings.json`; does nothing while `settings.json` is tracked or the base is absent), `scripts/hooks/post-merge.sh`, and calls from `_pull-all-repos.sh` and `scripts/install.sh`.
- **Facts checked against the Claude Code docs**: there is no user-level `settings.local.json` (only `.claude/settings.local.json` at project scope); `--settings` applies to one session; array settings such as `permissions.allow` combine across scopes, but there is only one user-scope file.
- **Second release, in this order**:
  1. Wait until every machine that matters has pulled the first release. Run `bash ~/.claude/scripts/setup-hooks.sh` on each of the maintainer's hosts so the `post-merge` hook exists there (it is installed only by that script).
  2. Split the current file. `settings.base.json` (tracked) keeps toolkit behaviour: `$schema`, `attribution`, `includeGitInstructions`, `permissions`, `hooks`, `statusLine`, `disableBundledSkills`, `autoMemoryEnabled`, `skipDangerousModePermissionPrompt`, `pluginConfigs`, `skillOverrides` for skills the repo ships, the telemetry and subagent `env` entries. The private overlay takes everything personal: `env.COMPUTER_USE_CODEX_LAUNCHER_PATH`, `enabledPlugins`, `extraKnownMarketplaces`, `modelSettings`, `theme`, `tui`, `verbose`, `autoCompactWindow`, `claudeMdExcludes`, `teammateMode`, and the `skillOverrides` entries for linked vendor skills. Decide with the owner which plugins, if any, belong in the public base.
  3. Point the writers at the right layer: `scripts/generate-index.mjs` (writes `skillOverrides`), `scripts/tune-tiers.mjs` (saves and restores `settings.json`), `scripts/install-plugins.sh` (rewrites `extraKnownMarketplaces`), `scripts/check-budgets.mjs` and `scripts/count-inventory.mjs` (read hooks from `settings.json`; they should read the base), and `.gitattributes`.
  4. Confirm on one host that `node scripts/build-settings.mjs --stdout` reproduces the current `settings.json` exactly from base plus overlay.
  5. In one commit: add `settings.base.json`, `git rm --cached settings.json`, add `/settings.json` to `.gitignore`, update `docs/CONFIGURATION.md`, `README.md`, `local.example/` (ship a `settings.overlay.example.json`), and the CHANGELOG with the one manual command for anyone whose `settings.json` disappears: `node ~/.claude/scripts/build-settings.mjs`.
- **Stop and report if**: step 4 does not reproduce the file byte for byte, or any host lacks the `post-merge` hook.
- **Known limit**: someone who skips the first release and pulls the second by hand, with no `post-merge` hook, loses `settings.json` until they run the command above. The CHANGELOG entry must say so in its first line.

### 12: Bring first-run scripts and setup docs to the current marketplace model

- **Evidence**: `scripts/setup-new-machine.sh` clones `claude-code-plugins-plus-skills` separately "because it can't be a git submodule" (nothing is a submodule now), registers three marketplaces by directory whether or not they are in the manifest, and ends by suggesting `/start-task` "to test the router". `docs/NEW-DEVICE-SETUP.md` calls `init-marketplaces.sh` legacy while `README.md`, `scripts/README.md`, and `_pull-all-repos.sh` all use it. `docs/SETUP-GUIDE.md` step 2 runs `_pull-all-repos.sh`, which needs Bash 4 and stops on stock macOS with a message. `docs/reference/tooling/external-repos.md` and `docs/PLUGIN-MANAGEMENT.md` still say "submodule".
- **Do**: decide the one supported path (suggested: clone or `install-in-place.sh`, then optional `init-marketplaces.sh`, then optional `local/`), make `setup-new-machine.sh` do exactly that, and make the docs say the same thing.
- **Done when**: README Quick Start, `docs/SETUP-GUIDE.md`, `docs/NEW-DEVICE-SETUP.md`, and `scripts/README.md` name the same scripts in the same order, and none of them says "submodule" about marketplaces.

### 13: Prune and merge `docs/`

- **Evidence**: about 10,700 lines across 59 files. `docs/OPUS-4-6-GUIDE.md` opens with a note that it is superseded. `docs/MCP-SERVERS.md` (542 lines) and `docs/reference/tooling/mcp-servers.md` cover the same subject for a toolkit that ships no MCP servers, and both still describe a `sequential-thinking` server. `docs/AGENT-TEAMS.md` and `docs/reference/workflows/agent-teams.md` overlap, as do `docs/SKILLS.md`, `skills/README.md`, and `docs/SKILL-CREATION-GUIDE.md`. `docs/FOLDER-STRUCTURE.md` (673 lines) hand-maintains a tree.
- **Do**: move superseded guides to `archive/` (never delete), pick one owner per subject and link to it from the other, and replace the hand-drawn tree with a short description that points at the generated `INDEX.md`.
- **Done when**: no file under `docs/` starts with a "superseded" notice, and each subject above has one owning file.

### 14: One copy of `env_get` and the secret pattern

- **Evidence**: `env_get` is defined in `_pull-all-repos.sh`, `hooks/session-start-pull.sh`, `hooks/session-start-repo-health.sh`, `hooks/session-end-repo-health.sh`, and `scripts/install-plugins.sh`, with a JavaScript twin in `hooks/daily-maintenance.js`. The credential regex is in `hooks/secret-scan.js` and `hooks/session-end-repo-health.sh`.
- **Not urgent**: the copies are identical today. Hooks must stay standalone and fast, so a shared file is only worth it if it can't make a hook fail when missing.

### 22: Community items (assessment only; nothing was posted, closed or merged)

| Item | What it is | Assessment |
|------|------------|------------|
| PR #4, "restructure career-path-planner into Hermes-standard format" (2026-08-20) | One intended file change, but the branch has unrelated history, so the PR shows 776 files and +234,173 lines and cannot be merged as it stands | Not useful as submitted. It rewrites the skill for a different agent (frontmatter `author: Hermes`, tools named `web_search` / `write_file`), cuts it from 437 to 234 lines, and its stated reason (dangling "See Also" links) does not hold: all three links resolve. A fresh single-file PR against current `master` could be reconsidered |
| Issue #5, add `vostride/agent-qa` as a marketplace source (2026-10-25) | Feature request from an account unrelated to that project | Plausible but optional. The repo is real and active (about 850 stars, pushed this week) with four skills; its license is not a standard one, and it is a testing tool in a toolkit whose default is no tests. Adding it is one `scripts/add-marketplace.sh` call if wanted |
| Issue #3, "online entry point" for `recipe-card-creator` (2026-06-30) | A third party hosted the skill on their own site and posted a tracked badge link | Promotional. MIT allows the reuse. Nothing to do in the repo; close when triaging |
| Issue #1, "Add a description to improve Dispatch discoverability" (2026-03-29) | Automated outreach from a third-party tool | Promotional and wrong on the facts: `database-expert` has a description. Close when triaging |

Private vulnerability reporting, which `SECURITY.md` points people to, was turned on for the repository on 2026-11-10.

### 24, 25: Small items

- **24**: `hooks/run-hook.js` and every hook build paths from `os.homedir()/.claude`. Someone running with `CLAUDE_CONFIG_DIR` set gets no hooks. Honor that variable first when it is set.
- **25**: nothing references `bin/prettier-hook.js` or `bin/setup.ps1`. Move them to `archive/` with a line in `archive/` explaining what they were.

## Considered and rejected

- **No tests, no CI**: decided in `CLAUDE.md` and the hooks README. Not a finding.
- **`bypassPermissions` by default**: the toolkit's stated purpose; documented in the README table and `SECURITY.md`.
- **Unpinned, unreviewed marketplaces**: intended for a full-access setup (owner, 2026-11). Documented in `SECURITY.md`; not to be "fixed" by pinning.
- **Session-end commit and push**: only acts for owners in `GITHUB_OWNERS`, skips anything that looks like a secret, never forces. By design.
- **Regex guard can be evaded**: `hooks/guard.js` says so itself; it guards against slips, not intent.
- **Escaping literal `$1`-style text in skills**: Claude Code replaces `$0`, `$1`, … in a skill's content with the arguments the skill was invoked with, so a dollar amount or SQL placeholder in an example can be garbled when a skill is invoked with several words (24 skills contain such text; `grep -l '\$[0-9]' skills/*/SKILL.md`). The documented escape is a backslash, but these files are also read directly by other agents and tools, which would then always see the backslash, and in code examples it would be wrong code. A rare glitch in one harness is the smaller cost; the text stays as written.
- **Removing the project-folder push policy from `_pull-all-repos.sh`**: the maintainer's hosts run it (their settings keep the project-folder pull on, and the `.openclaw` local-only rule exists nowhere else), so removing it would change their behaviour. It is instead fully opt-in: with `GITHUB_OWNERS` unset, no push URL is touched.
- **Trimming the skill library**: nothing is to be removed (owner, 2026-11). Quality work on skills means fixing, not culling.
- **Strict website snapshot**: the site lists only what `counts.json` names and fails the build on a missing file, by design (`docs/COUNT-PIPELINE.md`). The fix for the outage was the import, not loosening this.

## Not audited

Every skill body line by line (frontmatter, forked-skill behaviour, argument substitution and cross-links were checked across all of them; prose quality was sampled), the count generators beyond what the website consumes, the PowerShell scripts, `templates/`, and most of `docs/` beyond the files named above.
