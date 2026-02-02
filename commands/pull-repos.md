---
description: Pull all repos (parent + 68 marketplace submodules)
arguments:
  - name: action
    description: "Action: pull, status (default: pull)"
    required: false
---

# Pull Repos

Pull the parent repo, marketplace submodules, and custom project directories with a single command.

## Usage

```
/pull-repos [action]
```

## What It Does

1. **Pulls parent repo** (`~/.claude` - travisjneuman/.claude)
2. **Pulls all submodules** (68 repos in `plugins/marketplaces/`)
3. **Pulls custom project directories** (if configured - your own repos)
4. **Fixes detached HEAD** automatically on any repo
5. **Enforces no_push** on marketplace submodules only (not your repos)

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
| 2-50 | `plugins/marketplaces/*`          | Submodules | ❌ no_push enforced |
| 51+  | Custom project directories        | Your repos | ✅ Push enabled     |

## Features

- ✅ **Auto-discovers repos** - Add new submodules and they're automatically included
- ✅ **Custom project directories** - Add your own project folders (see below)
- ✅ **Fixes detached HEAD** - Common issue with submodules, fixed automatically
- ✅ **Detects correct branch** - main/master/development per repo
- ✅ **Enforces no_push** - Only on marketplace submodules (not your repos)
- ✅ **Safe** - Only pulls, never pushes or discards changes

## Adding Your Own Project Directories

Edit `~/.claude/_pull-all-repos.sh` and find the `CUSTOM_PROJECT_DIRS` section near the top:

```bash
CUSTOM_PROJECT_DIRS=(
    # "/e/Web Development"           # Uncomment and edit for your directories
    # "/c/Users/you/projects"        # Add as many as needed
    # "$HOME/projects"               # Works on any platform
)
```

**Windows paths in Git Bash:**

- `E:\Web Development` → `/e/Web Development`
- `C:\Users\you\projects` → `/c/Users/you/projects`

Your custom directories are pulled but NOT set to no_push (full push access retained).

## How no_push Works (Location-Based)

The script uses **location** to determine which repos get `no_push` protection:

| Location                 | no_push? | Why                                 |
| ------------------------ | -------- | ----------------------------------- |
| `~/.claude` (parent)     | ❌ No    | Root level = your repo              |
| `plugins/marketplaces/*` | ✅ Yes   | Marketplace folder = external repos |
| Custom directories       | ❌ No    | You added them = your repos         |

**Key points:**

- `no_push` is ONLY applied to repos inside `plugins/marketplaces/`
- The parent repo and custom directories retain full push capability
- This is location-based, not ownership-based
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

Marketplace Submodules:
  alirezarezvani-claude-skills: pulled 5 commits
  anthropic-agent-skills: already up to date
  ...

Enforcing no_push on submodules:
  All submodules already have no_push configured

=== Summary ===
  Total repos:       68 (1 parent + 67 submodules)
  Updated:         1
  Already current: 23
```

## When to Use

- **Starting work** - Pull latest before beginning
- **After someone pushes** - Sync changes from another machine
- **Regularly** - Keep all repos up to date
- **After adding submodules** - Script auto-discovers new repos

## Related

- `~/.claude/_pull-all-repos.sh` - The underlying script
- `/backup-config` - Backup configuration before changes
- `rules/tooling/external-repos.md` - External repo management

---

_One command to sync everything._
