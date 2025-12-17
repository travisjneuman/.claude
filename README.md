# .claude/ Directory

Copy this entire folder anywhere. It's self-contained.

---

## Setup on New Machine

```powershell
# 1. Copy folder
cp -r ~/.claude /new/location/.claude

# 2. Copy config to parent (Claude Code expects it there)
cp /new/location/.claude/.claude.json /new/location/.claude.json

# 3. Login
claude
```

---

## Folder Structure

```
.claude/
├── CLAUDE.md                 # Global instructions
├── README.md                 # This file
├── .claude.json              # Config backup (copy to parent on new machine)
├── .mcp.json                 # MCP server definitions
├── .credentials.json         # Auth (regenerated on login)
├── settings.json             # Permissions, plugins
├── settings.local.json       # Local overrides
│
├── commands/                 # Slash commands
│   └── gsd/                  # GSD workflow (19 commands)
├── skills/                   # Reusable skills (40+ skills)
├── templates/                # Task templates
├── docs/                     # Documentation
├── get-shit-done/            # GSD workflow resources
├── .archive/                 # Archived content (not loaded)
│
├── history.jsonl             # Conversation history
├── plans/                    # Project planning documents
├── tasks/                    # Active task files
├── todos/                    # Todo states
├── projects/                 # Per-project state
├── plugins/                  # Downloaded plugins
│
├── debug/                    # ◆ Deletable cruft
├── file-history/             # ◆ Deletable cruft
├── shell-snapshots/          # ◆ Deletable cruft
├── statsig/                  # ◆ Deletable cruft
├── stats-cache.json          # ◆ Deletable cruft
├── telemetry/                # ◆ Deletable cruft
└── sqlite_mcp_server.db      # ◆ Deletable cruft
```

**◆ Deletable cruft** = Safe to delete anytime. Just wastes space. Regenerated as needed.

---

## After Copying

| What | Happens |
|------|---------|
| `.claude.json` | Copy to parent, then login regenerates OAuth tokens |
| `projects/` | Old paths ignored, new ones created as you work |
| Everything else | Just works |

---

## MCP Server Management

MCP servers are **disabled by default** to save context tokens (~34k+ with all 5 servers).

### Available Servers

| Server | Purpose | Tokens |
|--------|---------|--------|
| `playwright` | Browser automation, screenshots, cross-browser testing | ~14,446 |
| `filesystem` | File operations beyond Claude's built-in tools | ~9,220 |
| `memory` | Persistent knowledge graph across sessions | ~5,795 |
| `sqlite` | SQLite database operations | ~3,437 |
| `sequential-thinking` | Structured multi-step reasoning | ~1,554 |
| `context7` | Up-to-date library/framework documentation | ~TBD |
| `chrome-devtools` | Chrome debugging, Core Web Vitals, performance profiling | ~18,000 |
| `puppeteer` | Simple browser automation, screenshots, PDFs | ~8,000 |
| `browserbase` | Cloud browser automation, anti-bot, scaling | ~12,000 |

### Browser Automation Quick Reference

| Need | Use |
|------|-----|
| Cross-browser testing | `playwright` |
| Performance profiling | `chrome-devtools` |
| Simple screenshots | `puppeteer` |
| Cloud scale / anti-bot | `browserbase` |

See [docs/MCP-SERVERS.md](docs/MCP-SERVERS.md) for detailed comparison.

### Enable a Server (Current Session)

Edit `settings.json` and remove the server from `disabledMcpjsonServers`:

```json
{
  "disabledMcpjsonServers": [
    "sequential-thinking",
    // "playwright",  <-- remove from list to enable
    "memory",
    "filesystem",
    "sqlite"
  ]
}
```

**Changes take effect immediately** - no restart needed.

### Disable a Server

Add the server name back to `disabledMcpjsonServers` in `settings.json`.

### Quick Commands

```bash
# Check server status
/mcp

# View which servers are disabled
# Look at settings.json "disabledMcpjsonServers" array
```

### Configuration Files

| File | Purpose |
|------|---------|
| `.mcp.json` | Server definitions (what servers exist) |
| `settings.json` | `disabledMcpjsonServers` array (which are disabled) |

### Workflow

1. Start session with all servers disabled (default)
2. Determine which server you need
3. Edit `settings.json` to remove that server from `disabledMcpjsonServers`
4. Server becomes available immediately
5. When done, add server back to disabled list (optional)

### Troubleshooting

- **`claude doctor` shows "1 MCP server failed"**: Often a transient timing issue. Check `/mcp` for actual status.
- **Server not connecting**: Set `MCP_TIMEOUT=10000` environment variable for slow-starting servers.
- **High token usage**: Re-disable servers you're not actively using.

---

## Platform Note

Windows MCP servers need `cmd /c` wrapper (already configured in `.mcp.json`).

For Linux/Mac, edit `.mcp.json` and change:
```json
"command": "cmd", "args": ["/c", "npx", ...]
```
To:
```json
"command": "npx", "args": [...]
```

---

## Cleanup (Optional)

Delete cruft to save space:
```powershell
rm -rf debug file-history shell-snapshots statsig telemetry
rm stats-cache.json sqlite_mcp_server.db
```

---

## Last Updated

December 17, 2025
