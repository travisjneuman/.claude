# Scripts

Helper scripts for setup, maintenance, and automation of the Claude Code toolkit.
Up: [README](../README.md) · Not here: Claude Code lifecycle hooks are in [hooks/README.md](../hooks/README.md); count definitions are in [COUNT-PIPELINE.md](../docs/COUNT-PIPELINE.md).

**Location:** `~/.claude/scripts/`

---

## Quick Reference

### Setup (run once per machine)

| Script                 | Purpose                                       | When to Run                                    |
| ---------------------- | --------------------------------------------- | ---------------------------------------------- |
| `install.sh`           | One-line installer (curl-pipe)                | First-time setup on any machine                |
| `setup-new-machine.sh` | Complete setup (plugins, hooks, verification) | After cloning the repo                         |
| `init-marketplaces.sh` | Clone all 81 marketplace repos from upstreams | After cloning, or to fix broken marketplace clones     |
| `setup-hooks.sh`       | Install git hooks into `.git/hooks/`          | After cloning (called by setup-new-machine.sh) |

### Maintenance (run periodically)

| Script                | Purpose                                 | When to Run                                                |
| --------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `update-counts.sh`    | Explicitly refresh public counts, source evidence, website snapshots and current numeric docs | After reviewed public source changes |
| `generate-showcase-images.mjs` | Regenerate the `tjn.portfolio` showcase screenshots from `counts.json` (the website OG image is the static GitHub social preview) | After public showcase counts change |
| `generate-index.mjs`  | Regenerate `INDEX.md`, `index/graph.json`, `skills/MASTER_INDEX.md` (`--write`) | After adding/removing skills, agents, commands, rules, or marketplaces |
| `regenerate-index.sh` | Compatibility wrapper for `generate-index.mjs --write` | Same as above                                   |
| `install-plugins.sh`  | Install enabled plugins, update upstream-tracking ones, LSP binaries | Runs daily automatically; run after changing plugins       |
| `_pull-all-repos.sh` (repo root) | Pull marketplace clones and re-sync their URLs and `no_push` | After upstream changes, or if remotes are misconfigured |

### Repo Management

| Script                     | Purpose                               | When to Run                                    |
| -------------------------- | ------------------------------------- | ---------------------------------------------- |
| `add-marketplace.sh <git-url> [name]` | Add a marketplace repo to the manifest and clone it | When adopting a new community repo |
| `install-in-place.sh`      | Turn an existing `~/.claude` into a checkout of this toolkit without deleting anything | First install over a Claude-created `~/.claude` |

### Utilities

| Script                              | Purpose                                                       |
| ----------------------------------- | ------------------------------------------------------------- |
| `fix-plugin-line-endings.sh`        | Convert CRLF to LF in plugin files (Linux/Mac)                |
| `fix-plugin-line-endings.ps1`       | Same, for Windows PowerShell                                  |
| `generate-counts.mjs`, `count-inventory.mjs` | Count pipeline (see [COUNT-PIPELINE.md](../docs/COUNT-PIPELINE.md)) |
| `check-budgets.mjs`                 | Always-on context budget check; run manually (pre-commit no longer runs it) |
| `tune-tiers.mjs`                    | Promote/demote core-tier skills from usage counts (`--apply` to write) |
| `public-output-safety.mjs`, `media-routing.mjs` | Shared libraries for publication safety and media routing; not run directly |

---

## Git Hooks (scripts/hooks/)

These are git hooks installed into `.git/hooks/` by `setup-hooks.sh`:

| Hook               | Purpose                                                                       |
| ------------------ | ----------------------------------------------------------------------------- |
| `pre-commit.sh`    | Marketplace/gitlink, privacy, credential and ignored-runtime safety gates; no generation/tests/staging |
| `commit-msg.sh`    | Enforce conventional commit message format                                    |
| `pre-push.sh`      | Block force-push to master/main, warn about unsafe nested repo changes                 |
| `staged-public-safety.mjs` | Implementation of the pre-commit safety gates (called by `pre-commit.sh`) |

These are different from the Claude Code lifecycle hooks in `~/.claude/hooks/`. See [hooks/README.md](../hooks/README.md) for that system.

---

## Root-Level Script

`~/.claude/_pull-all-repos.sh` lives at root level (not in scripts/) because it's the primary user-facing script. It:

1. Initializes missing marketplace clones from the manifest
2. Pulls the parent repo
3. Pulls all 81 marketplace repos
4. Enforces `no_push` on marketplace repos
5. Protects parent repo push URL
6. Pulls custom project directories (from `.env.local`)
7. Leaves public counts/indexes unchanged; publication requires an explicit source refresh

```bash
# Pull everything
~/.claude/_pull-all-repos.sh

# Check status without pulling
~/.claude/_pull-all-repos.sh --status
```

---

## Common Workflows

### New machine setup

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
bash ~/.claude/scripts/init-marketplaces.sh
bash ~/.claude/scripts/setup-new-machine.sh
```

### After adding a new skill

```bash
# Refresh discovery first if needed (also updates public settings.json).
node ~/.claude/scripts/generate-index.mjs --write

# One explicit count write, from complete existing marketplace checkouts.
node ~/.claude/scripts/generate-counts.mjs --write --as-of=YYYY-MM-DD \
  --travis-repo=/path/to/travisjneuman \
  --portfolio-repo=/path/to/tjn.portfolio
# Omit consumer paths for a deliberately local-only refresh.
# No implicit images, generic showcase sync, Git staging, commit or push.
```

### Fixing broken marketplace repos

```bash
# Re-sync clone URLs and push protection from the manifest
bash ~/.claude/_pull-all-repos.sh

# If that doesn't work, re-initialize from upstreams
bash ~/.claude/scripts/init-marketplaces.sh
```

---

## Count publication contract

See [COUNT-PIPELINE.md](../docs/COUNT-PIPELINE.md) for public populations, committed HEAD marketplace evidence, snapshot dates/pins, fail-closed source coverage, preflight/rollback, marker-owned profile prose and portfolio JSON. Website builds always consume the same saved canonical inventory; they do not recount local clones. `--check` is read-only, and `--write --check` is rejected. No automatic pre-commit budget/tests or regeneration remains; privacy/credential/marketplace gates still run.

Image rendering is separate, DESK-only, in an approved dated `desk-run` work folder. Optional `--sync-images` requires explicit `--renderer-path` and `--image-output-dir`, with the documented renderer contract; it never implies portfolio delivery. Do not use legacy direct-to-repo rendering commands.

## See Also

- [Setup Guide](../docs/SETUP-GUIDE.md) — Full setup instructions
- [New Device Setup](../docs/NEW-DEVICE-SETUP.md) — Cross-platform guide
- [Maintenance](../docs/MAINTENANCE.md) — Ongoing maintenance
- [Hooks README](../hooks/README.md) — Claude Code lifecycle hooks
- [External Repos](../docs/reference/tooling/external-repos.md) — Marketplace repo management

