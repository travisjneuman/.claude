# Setup Guide

How to deploy this Claude Code configuration to a new machine.

---

## Prerequisites

Before starting, ensure you have:

- [ ] Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- [ ] Node.js 18+ installed
- [ ] Python 3.8+ with `pipx` or `uvx` (for sqlite MCP server)
- [ ] Access to this `.claude/` folder (copy, git clone, etc.)

---

## Quick Setup (5 Minutes)

### Step 1: Copy the Folder

Copy the entire `.claude/` folder to your home directory:

**Windows:**
```powershell
Copy-Item -Path "source\.claude" -Destination "$env:USERPROFILE\.claude" -Recurse
```

**Mac/Linux:**
```bash
cp -r source/.claude ~/.claude
```

### Step 2: Copy MCP Config

Copy the MCP server config (note: this goes OUTSIDE the folder):

**Windows:**
```powershell
Copy-Item -Path "$env:USERPROFILE\.claude\.claude.json" -Destination "$env:USERPROFILE\.claude.json"
```

**Mac/Linux:**
```bash
cp ~/.claude/.claude.json ~/.claude.json
```

### Step 3: Login to Claude Code

```bash
claude
```

Follow the authentication prompts.

### Step 4: Verify Setup

```bash
/doctor
/mcp
```

Done! Your configuration is now active.

---

## Detailed Setup

### Step 1: Prepare Source Files

If copying from a Windows machine to Linux/Mac (or vice versa), the configuration is portable - no changes needed.

**Files to copy:**
```
.claude/
├── .claude.json           ← MCP backup
├── settings.json          ← Main settings
├── settings.local.json    ← Local settings
├── commands/              ← Slash commands
├── skills/                ← Skills
├── templates/             ← Templates
├── docs/                  ← Documentation
├── plans/                 ← Planning docs
├── README.md
└── CLAUDE.md
```

**Do NOT copy:**
- `debug/`
- `file-history/`
- `ide/`
- `projects/`
- `shell-snapshots/`
- `statsig/`
- `telemetry/`
- `todos/`
- `downloads/`
- `security_warnings_*.json`
- `history.jsonl`
- `stats-cache.json`
- `.credentials.json`
- `sqlite_mcp_server.db`

### Step 2: Copy to Destination

**Option A: Direct Copy**

```bash
# Create directory
mkdir -p ~/.claude

# Copy files (example from USB drive)
cp -r /media/usb/.claude/* ~/.claude/
```

**Option B: Git Repository**

If you've committed this config to a repo:
```bash
git clone your-repo ~/.claude
```

**Option C: Archive**

Create portable archive (excludes machine-specific files):
```bash
cd ~/.claude
tar --exclude='debug' \
    --exclude='file-history' \
    --exclude='ide' \
    --exclude='projects' \
    --exclude='shell-snapshots' \
    --exclude='statsig' \
    --exclude='telemetry' \
    --exclude='todos' \
    --exclude='downloads' \
    --exclude='security_warnings_*' \
    --exclude='history.jsonl' \
    --exclude='stats-cache.json' \
    --exclude='.credentials.json' \
    --exclude='sqlite_mcp_server.db' \
    -cvf claude-config.tar .
```

Extract on new machine:
```bash
mkdir -p ~/.claude
cd ~/.claude
tar -xvf /path/to/claude-config.tar
```

### Step 3: Setup MCP Configuration

**Critical:** The `.claude.json` file must be at `~/.claude.json`, NOT inside `.claude/`.

```bash
# Copy from backup inside .claude/
cp ~/.claude/.claude.json ~/.claude.json
```

Verify the file structure:
```
~/
├── .claude.json           ← MCP servers (HERE)
└── .claude/               ← Everything else
    ├── settings.json
    └── ...
```

### Step 4: Install Dependencies

**For MCP servers to work:**

```bash
# Verify npx works
npx --version

# For sqlite MCP (Python-based)
pip install uvx
# or
pipx install uvx
```

### Step 5: First Run

```bash
claude
```

**First run will:**
1. Prompt for authentication
2. Download MCP server packages (may take a minute)
3. Create machine-specific files (projects/, etc.)

### Step 6: Verify Configuration

**Check settings loaded:**
```
/config
```

**Check MCP servers:**
```
/mcp
```

**Check for issues:**
```
/doctor
```

**Check plugins:**
```
/plugin
```

---

## Platform-Specific Notes

### Windows

- Path separators work either way (`/` or `\`)
- Home directory: `C:\Users\username\`
- Use PowerShell for setup commands

### Mac

- Home directory: `/Users/username/`
- May need to allow terminal in Security preferences

### Linux

- Home directory: `/home/username/`
- sqlite MCP requires Python 3.8+

### WSL (Windows Subsystem for Linux)

- Treat as Linux
- Home directory: `/home/username/`
- Can access Windows files at `/mnt/c/`

### Remote SSH (VS Code)

When using VS Code Remote SSH:
1. Install Claude Code on the **remote** machine
2. Copy `.claude/` to the **remote** home directory
3. Copy `.claude.json` to the **remote** home directory
4. Configuration applies to remote environment

---

## Post-Setup Tasks

### Configure Status Line

```
/statusline
```

Or run in terminal:
```bash
npx ccstatusline@latest
```

### Review Permissions

```
/permissions
```

Current mode is `bypassPermissions`. Change if needed.

### Customize CLAUDE.md

Edit `~/.claude/CLAUDE.md` with your preferences:
- Coding style
- Common commands
- Project defaults

---

## Troubleshooting

### "Permission denied"

```bash
chmod -R u+rw ~/.claude
```

### MCP Server Won't Start

1. Check internet connection (needs to download packages)
2. Verify npx/uvx installed
3. Check `~/.claude.json` syntax:
   ```bash
   cat ~/.claude.json | python -m json.tool
   ```

### Settings Not Loading

1. Verify files exist:
   ```bash
   ls -la ~/.claude/settings.json
   ```
2. Check JSON syntax:
   ```bash
   cat ~/.claude/settings.json | python -m json.tool
   ```
3. Run `/doctor`

### Skills Not Activating

1. Check skill folder names match SKILL.md `name` field
2. Verify SKILL.md has valid YAML frontmatter
3. Try explicit invocation: `Use [skill-name] to...`

### Wrong Settings Applied

Settings load in order - later files override earlier:
1. System defaults
2. `~/.claude/settings.json` (user)
3. `~/.claude/settings.local.json` (user local)
4. `.claude/settings.json` (project)
5. `.claude/settings.local.json` (project local)

Check for conflicting project settings.

---

## Verification Checklist

After setup, verify:

- [ ] `claude` command works
- [ ] Authentication successful
- [ ] `/doctor` shows no critical issues
- [ ] `/mcp` shows servers (may be disabled until called)
- [ ] `/config` shows expected settings
- [ ] Skills activate when referenced
- [ ] Slash commands appear (`/run`, `/start-task`)

---

## Updating Configuration

When you update the config on one machine and want to sync:

1. **Update the backup:**
   ```bash
   # After changing MCP servers
   cp ~/.claude.json ~/.claude/.claude.json
   ```

2. **Commit/copy changes**

3. **On other machines:**
   - Pull/copy updated `.claude/` folder
   - Copy `.claude/.claude.json` to `~/.claude.json` if MCP changed

---

## See Also

- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) - What to copy
- [CONFIGURATION.md](./CONFIGURATION.md) - Settings details
- [MCP-SERVERS.md](./MCP-SERVERS.md) - MCP setup
- [MAINTENANCE.md](./MAINTENANCE.md) - Keeping things clean
