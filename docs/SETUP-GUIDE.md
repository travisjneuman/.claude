# Setup Guide

How to deploy this Claude Code configuration to a new machine.

---

## Prerequisites

Before starting, ensure you have:

- [ ] Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- [ ] Node.js 18+ installed
- [ ] Python 3.8+ with `pipx` or `uvx` (for sqlite MCP server)
- [ ] Git installed (for cloning from GitHub)

---

## Quick Setup (5 Minutes)

### Step 1: Clone from GitHub (Recommended)

**Mac/Linux:**
```bash
# Clone with all submodules
git clone --recurse-submodules https://github.com/travisjneuman/.claude.git ~/.claude

# Set read-only on marketplace repos (prevents accidental pushes)
for repo in ~/.claude/plugins/marketplaces/*/; do
    (cd "$repo" && git remote set-url --push origin no_push)
done
```

**Windows (PowerShell):**
```powershell
git clone --recurse-submodules https://github.com/travisjneuman/.claude.git $env:USERPROFILE\.claude

Get-ChildItem "$env:USERPROFILE\.claude\plugins\marketplaces" -Directory | ForEach-Object {
    Push-Location $_.FullName
    git remote set-url --push origin no_push
    Pop-Location
}
```

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

| Component | Sync Method | Notes |
|-----------|-------------|-------|
| CLAUDE.md, settings.json | Git | Shared across all machines |
| Skills, agents, rules | Git | Shared across all machines |
| Commands, templates | Git | Shared across all machines |
| .vscode/ settings | Git | Shared VSCode workspace settings |
| Marketplace plugins | Git submodules | Read-only, fetch updates only |
| `.mcp.json` | **Manual** | Platform-specific (cmd vs npx) |
| Session data | Not synced | Local to each machine |

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
+-- skills/                <- 67 skills
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

- Path separators work either way (`/` or `\`)
- Home directory: `C:\Users\username\`
- MCP commands need `cmd /c` wrapper

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
