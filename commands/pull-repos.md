---
description: Pull all repos (parent + marketplace clones + configured project repos)
arguments:
  - name: action
    description: "Action: pull, status (default: pull)"
    required: false
---

# Pull Repos

Pull the parent repo, ignored marketplace clones, and configured project directories with a single command.

## Usage

```
/pull-repos [action]
```

## What It Does

1. **Pulls parent repo** (`~/.claude` - travisjneuman/.claude)
2. **Pulls all manifest marketplace clones** (read-only repos in `plugins/marketplaces/`)
3. **Pulls custom project directories recursively** (if configured)
4. **Fixes detached HEAD** automatically on any repo
5. **Enforces no_push** on marketplace clones and non-Travis-owned custom repos

## Arguments

| Argument | Default | Options          |
| -------- | ------- | ---------------- |
| `action` | `pull`  | `pull`, `status` |

## Actions

### pull (default)

Pull all repos and enforce no_push:

```bash
~/.claude/_pull-all-repos.sh
```

### status

Check status without pulling:

```bash
~/.claude/_pull-all-repos.sh --status
```

## Platform Compatibility

| Platform | Status | Notes                                             |
| -------- | ------ | ------------------------------------------------- |
| Windows  | ✅     | Requires Git Bash (included with Git for Windows) |
| macOS    | ✅     | Works with bash/zsh                               |
| Linux    | ✅     | Works with bash (including Arch)                  |

## What Gets Pulled

|  #   | Repository                        | Type       | Push Access         |
| :--: | :-------------------------------- | :--------- | :------------------ |
|  1   | `.claude` (travisjneuman/.claude) | Parent     | ✅ Push enabled     |
| 2+   | `.gitmodules` marketplace entries | Clones     | ❌ no_push enforced |
| ...  | Custom project directories        | Mixed      | ✅ Travis-owned only |

## Features

- ✅ **Auto-discovers marketplace entries** - Add new manifest entries and they're automatically included
- ✅ **Custom project directories** - Add your own project folders (see below)
- ✅ **Recursive project discovery** - Finds nested repos such as Lazy Golfing frontend/backend checkouts
- ✅ **Fixes detached HEAD** - Common issue with external clones, fixed automatically
- ✅ **Detects correct branch** - main/master/development per repo
- ✅ **Enforces no_push** - Marketplace clones and non-Travis-owned custom repos cannot push
- ✅ **Safe** - Dirty repos are skipped; pulls are fast-forward only; no merge/rebase/reset

## Adding Your Own Project Directories

Create or edit `~/.claude/.env.local`:

```bash
CUSTOM_PROJECT_DIRS="/e/Web Development,/c/Users/you/.codex,/c/Users/you/.hermes"
```

**Windows paths in Git Bash:**

- `E:\Web Development` → `/e/Web Development`
- `C:\Users\you\projects` → `/c/Users/you/projects`

Custom directories are recursively scanned. Travis-owned GitHub repos retain push access; non-Travis repos are set to `no_push`; dirty repos are skipped for safety.

## How no_push Works

The script uses both location and remote ownership:

| Repo class | no_push? | Why |
| --- | --- | --- |
| `~/.claude` parent | ❌ No | Travis-owned public toolkit repo |
| `plugins/marketplaces/*` | ✅ Yes | External upstream references |
| Custom Travis-owned repos | ❌ No | Commit/push policy applies |
| Custom non-Travis repos | ✅ Yes | External/no-push policy applies |
| `.openclaw` | ✅ Yes | Deprecated local-only exception |

**Key points:**

- `no_push` is always applied to repos inside `plugins/marketplaces/`
- Custom repos are checked by remote owner before push access is allowed
- Dirty or divergent repos are skipped instead of merged
- If you want to push to a marketplace repo, fork it to your own custom directory

**Verification:**

```bash
# Check any repo's push URL
cd ~/.claude/plugins/marketplaces/get-shit-done
git remote -v
# Should show: origin no_push (push)

cd "/e/Web Development/your-project"
git remote -v
# Should show: origin https://github.com/you/your-project.git (push)
```

## Examples

### Pull everything

```
/pull-repos
```

### Check status first

```
/pull-repos status
```

## Output Example

```
=== Pull All Repos ===

Parent Repo (~/.claude):
  .claude (travisjneuman/.claude): already up to date

Marketplace Clones:
  alirezarezvani-claude-skills: pulled 5 commits
  anthropic-agent-skills: already up to date
  ...

Enforcing no_push on marketplace clones:
  All marketplace clones already have no_push configured

=== Summary ===
  Total repos:       110 (1 parent + 108 marketplace clones + 1 custom)
  Updated:         1
  Already current: 23
```

## When to Use

- **Starting work** - Pull latest before beginning
- **After someone pushes** - Sync changes from another machine
- **Regularly** - Keep all repos up to date
- **After adding marketplace entries** - Script auto-discovers new repos from `.gitmodules`

## Related

- `~/.claude/_pull-all-repos.sh` - The underlying script
- `/backup-config` - Backup configuration before changes
- `docs/reference/tooling/external-repos.md` - External repo management

---

_One command to sync everything._
