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

| Repo                             | URL                                                                    |
| -------------------------------- | ---------------------------------------------------------------------- |
| alirezarezvani-claude-skills     | https://github.com/alirezarezvani/claude-skills.git                    |
| alvinunreal-awesome-claude       | https://github.com/alvinunreal/awesome-claude.git                      |
| anthropic-agent-skills           | https://github.com/anthropics/skills.git                               |
| auto-claude                      | https://github.com/AndyMik90/Auto-Claude.git                           |
| awesome-claude-skills            | https://github.com/ComposioHQ/awesome-claude-skills.git                |
| behisecc-awesome-claude-skills   | https://github.com/BehiSecc/awesome-claude-skills.git                  |
| claude-code-plugins              | https://github.com/anthropics/claude-code.git                          |
| claude-code-plugins-plus-skills  | https://github.com/jeremylongshore/claude-code-plugins-plus-skills.git |
| claude-mem                       | https://github.com/thedotmack/claude-mem.git                           |
| claude-plugins-official          | https://github.com/anthropics/claude-plugins-official.git              |
| claude-scientific-skills         | https://github.com/K-Dense-AI/claude-scientific-skills.git             |
| get-shit-done                    | https://github.com/glittercowboy/get-shit-done.git                     |
| hesreallyhim-awesome-claude-code | https://github.com/hesreallyhim/awesome-claude-code.git                |
| mhattingpete-skills              | https://github.com/mhattingpete/claude-skills-marketplace.git          |
| obra-superpowers                 | https://github.com/obra/superpowers-marketplace.git                    |
| skill-seekers                    | https://github.com/yusufkaraaslan/Skill_Seekers.git                    |
| skillsforge                      | https://github.com/rawveg/skillsforge-marketplace.git                  |
| taches-cc-resources              | https://github.com/glittercowboy/taches-cc-resources.git               |
| travisvn-awesome-claude-skills   | https://github.com/travisvn/awesome-claude-skills.git                  |
| voltagent-awesome-claude-skills  | https://github.com/VoltAgent/awesome-claude-skills.git                 |
| voltagent-subagents              | https://github.com/VoltAgent/awesome-claude-code-subagents.git         |
| wshobson-agents                  | https://github.com/wshobson/agents.git                                 |

---

## Updating All External Repos

### Recommended: _pull-all-repos.sh

```bash
# Pull parent + all submodules + custom directories
~/.claude/_pull-all-repos.sh

# Check status without pulling
~/.claude/_pull-all-repos.sh --status

# Or use slash command in Claude Code
/pull-repos
```

**What gets pulled:**
1. `~/.claude` - Parent repo (travisjneuman/.claude)
2. `~/.claude/plugins/marketplaces/*` - Marketplace submodules
3. Custom project directories (if configured) - your own repos

**Important:** The script enforces `no_push` on marketplace submodules only. Custom project directories retain full push access.

### Adding Your Own Project Directories

Edit `~/.claude/_pull-all-repos.sh` and find the `CUSTOM_PROJECT_DIRS` section:

```bash
CUSTOM_PROJECT_DIRS=(
    # "/e/Web Development"           # Uncomment and edit
    # "$HOME/projects"               # Works on any platform
)
```

Windows paths in Git Bash: `E:\Web Development` → `/e/Web Development`

### Alternative: update-external-repos.sh

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

_External repos: always fetch, never push._
