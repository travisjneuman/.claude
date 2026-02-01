# Setup Guide

How to deploy this Claude Code configuration to a new machine.

**Last Updated:** January 2026 (v2.2)

**See also:** [NEW-DEVICE-SETUP.md](./NEW-DEVICE-SETUP.md) for detailed cross-platform instructions.

---

## Prerequisites

Before starting, ensure you have:

- [ ] Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- [ ] Node.js 18+ installed
- [ ] Python 3.8+ with `pipx` or `uvx` (for sqlite MCP server)
- [ ] Git installed (for cloning from GitHub)
- [ ] **Windows only:** Git for Windows (includes Git Bash)

---

## Quick Setup (All Platforms)

Works on: **Arch Linux** | **macOS** | **Windows (Git Bash)**

```bash
# 1. Clone the repo
git clone https://github.com/travisjneuman/.claude.git ~/.claude

# 2. Initialize marketplace repos with correct upstream remotes
bash ~/.claude/scripts/init-marketplaces.sh

# 3. Complete setup (plugins, hooks, verification)
bash ~/.claude/scripts/setup-new-machine.sh
```

**IMPORTANT:** Always run `init-marketplaces.sh` on new devices. This ensures:

- Marketplace repos fetch from original upstreams (not your personal repo)
- Push is blocked on marketplace repos (read-only)
- Main repo can push to your personal GitHub

---

## Alternative: One-Line Install

**macOS / Linux / Windows (Git Bash):**

```bash
curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash
```

After install, run `/bootstrap` in Claude Code to verify configuration.

---

## Manual Setup (Detailed)

### Step 1: Clone

**Mac/Linux:**

```bash
git clone https://github.com/travisjneuman/.claude.git ~/.claude
```

**Windows (PowerShell):**

```powershell
git clone https://github.com/travisjneuman/.claude.git $env:USERPROFILE\.claude
```

### Step 2: Initialize Marketplace Repos

**CRITICAL:** This step configures correct remote URLs.

**All platforms (use Git Bash on Windows):**

```bash
bash ~/.claude/scripts/init-marketplaces.sh
```

This script:

- Clones all 51 marketplace repos from their original upstreams
- Sets `no_push` on each to prevent accidental modifications
- Ensures main repo can push to your GitHub

### Step 2: Setup MCP Config (Platform-Specific)

MCP configuration is platform-specific and NOT synced via git. Create `~/.claude/.mcp.json`:

**Mac/Linux template:**

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-sequential-thinking"]
    }
  }
}
```

**Windows template:**

```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@anthropic-ai/mcp-sequential-thinking"]
    }
  }
}
```

See `docs/MCP-SERVERS.md` for full templates.

### Step 3: Login to Claude Code

```bash
claude
```

Follow the authentication prompts.

### Step 4: Verify Setup

```
/doctor
/mcp
```

Done! Your configuration is now active.

---

## Cross-Platform Sync

This configuration syncs across Windows, macOS, and Linux via GitHub.

| Component                | Sync Method    | Notes                            |
| ------------------------ | -------------- | -------------------------------- |
| CLAUDE.md, settings.json | Git            | Shared across all machines       |
| Skills, agents, rules    | Git            | Shared across all machines       |
| Commands, templates      | Git            | Shared across all machines       |
| .vscode/ settings        | Git            | Shared VSCode workspace settings |
| Marketplace plugins      | Git submodules | Read-only, fetch updates only    |
| `.mcp.json`              | **Manual**     | Platform-specific (cmd vs npx)   |
| Session data             | Not synced     | Local to each machine            |

### Workflow

**Push changes (from any machine):**

```bash
cd ~/.claude
git add -A
git commit -m "Update: description"
git push origin master
```

**Pull changes (on other machines):**

```bash
cd ~/.claude
git pull origin master
git submodule update --remote --merge
```

**Update marketplace plugins:**

```bash
bash ~/.claude/scripts/update-marketplaces.sh
```

---

## Files Synced via Git

```
.claude/
+-- CLAUDE.md              <- Core rules
+-- settings.json          <- Shared settings
+-- commands/              <- Slash commands
+-- skills/                <- 72 skills
+-- agents/                <- 36 agents
+-- rules/                 <- Contextual rules
+-- templates/             <- Templates
+-- docs/                  <- Documentation
+-- scripts/               <- Helper scripts
+-- plugins/
|   +-- local/             <- Your custom plugins
|   +-- marketplaces/      <- External plugins (submodules)
+-- .vscode/               <- Shared VSCode settings
```

## Files NOT Synced (Machine-Specific)

- `.mcp.json` (platform-specific MCP commands)
- `settings.local.json` (local overrides)
- `debug/`, `projects/`, `todos/` (session data)
- `history.jsonl`, `.credentials.json` (private data)

---

## Platform-Specific Notes

### Windows

- **Git for Windows required** - Hooks execute via Git Bash
- Path separators work either way (`/` or `\`)
- Home directory: `C:\Users\username\`
- MCP commands need `cmd /c` wrapper
- SessionStart hooks use bash syntax (Git Bash handles this)

### Mac

- Home directory: `/Users/username/`
- MCP commands use `npx` directly

### Linux

- Home directory: `/home/username/`
- MCP commands use `npx` directly

### Remote SSH (VS Code)

When using VS Code Remote SSH:

1. Clone `.claude/` on the **remote** machine
2. Create `.mcp.json` for the remote platform (usually Linux)
3. Install Claude Code on remote: `npm install -g @anthropic-ai/claude-code`

---

## Troubleshooting

### MCP Server Will Not Start

1. Check `~/.claude/.mcp.json` syntax
2. **Windows:** Ensure `cmd /c` wrapper is used
3. **Mac/Linux:** Ensure NO `cmd /c` wrapper

### Submodule Issues

```bash
cd ~/.claude
git submodule init
git submodule update --remote
for repo in plugins/marketplaces/*/; do
    (cd "$repo" && git remote set-url --push origin no_push)
done
```

### Settings Not Loading

```bash
ls -la ~/.claude/settings.json
cat ~/.claude/settings.json | python -m json.tool
```

Then run `/doctor` in Claude.

---

## Verification Checklist

- [ ] `claude` command works
- [ ] Authentication successful
- [ ] `/doctor` shows no critical issues
- [ ] `/mcp` shows servers
- [ ] Git operations work (`git status` in ~/.claude)

---

## See Also

- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) - What to copy
- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [MCP-SERVERS.md](./MCP-SERVERS.md) - MCP setup
- [MAINTENANCE.md](./MAINTENANCE.md) - Keeping things clean
