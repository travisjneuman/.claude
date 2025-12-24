# External Repository Management

**When to use:** Updating GSD, marketplace plugins, or other external dependencies.

---

## Overview

External repositories are managed as git submodules or nested repos with **read-only** configuration:
- **Fetch:** Pulls updates from upstream
- **Push:** Blocked via `no_push` URL

This prevents accidental modifications to upstream projects while keeping them updated.

---

## External Repos

All external repos are located in `~/.claude/plugins/marketplaces/`:

| Repo | Type | URL |
|------|------|-----|
| anthropic-agent-skills | Submodule | https://github.com/anthropics/skills.git |
| claude-code-plugins | Submodule | https://github.com/anthropics/claude-code.git |
| claude-plugins-official | Submodule | https://github.com/anthropics/claude-plugins-official.git |
| taches-cc-resources | Submodule | https://github.com/glittercowboy/taches-cc-resources.git |
| get-shit-done | Submodule | https://github.com/glittercowboy/get-shit-done.git |
| awesome-claude-skills | Submodule | https://github.com/ComposioHQ/awesome-claude-skills.git |

---

## Updating All External Repos

### Using the Update Script

```bash
bash ~/.claude/scripts/update-external-repos.sh
```

### Manual Update

```bash
cd ~/.claude

# Update all submodules
git submodule update --remote --merge

# Or update each individually
for repo in plugins/marketplaces/*/; do
    (cd "$repo" && git fetch origin && git pull origin main 2>/dev/null || git pull origin master)
done

# Commit the updates
git add plugins/marketplaces
git commit -m "chore: update external repos"
```

---

## Verifying No-Push Configuration

Each external repo should have `no_push` as the push URL:

```bash
# Check a repo's remotes
cd ~/.claude/plugins/marketplaces/get-shit-done
git remote -v

# Expected output:
# origin  https://github.com/glittercowboy/get-shit-done.git (fetch)
# origin  no_push (push)
```

### Setting No-Push (if missing)

```bash
cd ~/.claude/path/to/repo
git remote set-url --push origin no_push
```

---

## Adding New External Repos

### As a Submodule (Preferred)

```bash
cd ~/.claude

# Add submodule
git submodule add https://github.com/owner/repo.git path/to/repo

# Set no-push
cd path/to/repo
git remote set-url --push origin no_push
```

### As a Nested Repo

```bash
cd ~/.claude

# Clone into location
git clone https://github.com/owner/repo.git path/to/repo

# Set no-push
cd path/to/repo
git remote set-url --push origin no_push

# Add to parent's .gitignore OR track as gitlink
```

---

## Troubleshooting

### Push Rejected

If you see an error trying to push:
```
fatal: 'no_push' does not appear to be a git repository
```

This is **expected behavior**. The repo is configured as read-only.

### Submodule Not Updating

```bash
# Re-initialize submodules
git submodule init
git submodule update --remote
```

### Detached HEAD in Submodule

```bash
cd ~/.claude/plugins/marketplaces/get-shit-done
git checkout main  # or master
git pull origin main
```

---

## Related Documentation

- `~/.claude/CLAUDE.md` - GSD integration section
- `~/.claude/plugins/marketplaces/get-shit-done/README.md` - GSD usage guide
- `~/.claude/plugins/README.md` - Plugin marketplace info

---

*External repos: always fetch, never push.*
