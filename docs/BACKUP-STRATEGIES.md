# Backup Strategies for Gitignored Session Data

> **Status:** Reference documentation for potential future implementation
> **Last Updated:** 2026-01-03
> **Note:** This is a local-only reference file, not tracked in version control

---

## Problem Statement

How to backup ~600 MB of gitignored session data (`history.jsonl`, `projects/`, `file-history/`) across multiple development machines (Windows/macOS/Linux) while:

- Enabling real-time sync for same-session continuity
- Avoiding git repository corruption
- Maintaining security (keeping credentials local)
- Supporting daily machine switches

---

## Option 1: Symlink-Based Proton Drive Sync (Recommended)

### Overview

Use symbolic links to make session data appear in `~/.claude/` while actual files live in `~/ProtonDrive/.claude-session-backup/`. Proton Drive syncs the backup directory (not the git repo itself).

### Architecture

```
Proton Drive Location:
~/ProtonDrive/
└── .claude-session-backup/      # Syncs via Proton Drive
    ├── history.jsonl            # → symlinked from ~/.claude/
    ├── projects/                # → symlinked from ~/.claude/
    ├── file-history/            # → symlinked from ~/.claude/
    ├── .archive/                # → symlinked from ~/.claude/
    ├── .planning/               # → symlinked from ~/.claude/
    └── tasks/                   # → symlinked from ~/.claude/

~/.claude/
├── .git/                        # NOT synced (stays local)
├── history.jsonl                # Symlink → ~/ProtonDrive/.claude-session-backup/
├── projects/                    # Symlink → ~/ProtonDrive/.claude-session-backup/
├── file-history/                # Symlink → ~/ProtonDrive/.claude-session-backup/
└── [all other files tracked by git]
```

### Benefits

- ✅ Real-time sync via Proton Drive
- ✅ No git corruption (repo not synced)
- ✅ Transparent to Claude Code (symlinks look like normal files)
- ✅ Cross-platform (Windows/macOS/Linux)
- ✅ Easy setup via scripts
- ✅ Keeps `.credentials.json` local (security)

### Limitations

- ⚠️ Requires one-time setup on each machine
- ⚠️ Proton Drive must be installed and syncing
- ⚠️ ~600 MB will sync (ensure Proton Drive has space)
- ⚠️ Windows requires Developer Mode or Admin for symlinks

### Setup Scripts (Pseudocode)

**Bash (Linux/macOS):**

```bash
#!/bin/bash
# setup-proton-backup.sh

# Detect Proton Drive
PROTON_DRIVE=$(find ~ -maxdepth 2 -name "ProtonDrive" -o -name "Proton Drive" 2>/dev/null | head -1)

# Create backup directory
BACKUP_DIR="$PROTON_DRIVE/.claude-session-backup"
mkdir -p "$BACKUP_DIR"

# Items to backup
ITEMS=("history.jsonl" "projects" "file-history" ".archive" ".planning" "tasks")

# For each item, move to backup and create symlink
for ITEM in "${ITEMS[@]}"; do
    SOURCE="$HOME/.claude/$ITEM"
    DEST="$BACKUP_DIR/$ITEM"

    # Move if exists and not already a symlink
    if [ -e "$SOURCE" ] && [ ! -L "$SOURCE" ]; then
        mv "$SOURCE" "$DEST"
    fi

    # Create symlink
    if [ ! -L "$SOURCE" ]; then
        ln -s "$DEST" "$SOURCE"
    fi
done
```

**PowerShell (Windows):**

```powershell
# setup-proton-backup.ps1

# Detect Proton Drive
$ProtonDrive = Get-ChildItem -Path $HOME -Directory -Recurse -Depth 2 -Filter "*Proton*Drive*" | Select-Object -First 1

# Create backup directory
$BackupDir = Join-Path $ProtonDrive.FullName ".claude-session-backup"
New-Item -ItemType Directory -Force -Path $BackupDir | Out-Null

# Items to backup
$Items = @("history.jsonl", "projects", "file-history", ".archive", ".planning", "tasks")

# For each item, move and create symlink
foreach ($Item in $Items) {
    $Source = Join-Path $HOME ".claude\$Item"
    $Dest = Join-Path $BackupDir $Item

    # Move if exists and not symlink
    if ((Test-Path $Source) -and -not (Get-Item $Source).LinkType) {
        Move-Item -Path $Source -Destination $Dest -Force
    }

    # Create symlink (requires Developer Mode or Admin)
    if (-not (Test-Path $Source)) {
        New-Item -ItemType SymbolicLink -Path $Source -Target $Dest -Force | Out-Null
    }
}
```

### Security Considerations

**What's Synced (Safe):**

- ✅ `history.jsonl` - Conversation data (personal but not credentials)
- ✅ `projects/` - Session state (no secrets)
- ✅ `file-history/` - Code edits (already in repos)

**What's NOT Synced (Secure):**

- ❌ `.credentials.json` - OAuth tokens (stays local per machine)
- ❌ `.mcp.json` - Platform config (different per OS)
- ❌ `settings.local.json` - Personal overrides (machine-specific)

**Proton Drive Security:**

- End-to-end encrypted
- Zero-knowledge architecture
- Safer than most cloud providers for personal data

### Troubleshooting

**Symlinks Don't Work on Windows:**

- Enable Developer Mode: Settings → Update & Security → For Developers → Developer Mode: ON
- Or run PowerShell as Administrator

**Proton Drive Conflicts:**

- Avoid using both machines simultaneously for same project
- Keep newest version if conflicts occur

---

## Option 2: Manual Rsync/Robocopy

### Overview

Script copies files to Proton Drive on demand. Manual trigger before switching machines.

### Setup

**Linux/macOS:**

```bash
#!/bin/bash
rsync -avz --delete ~/.claude/history.jsonl ~/ProtonDrive/.claude-backup/
rsync -avz --delete ~/.claude/projects/ ~/ProtonDrive/.claude-backup/projects/
rsync -avz --delete ~/.claude/file-history/ ~/ProtonDrive/.claude-backup/file-history/
```

**Windows:**

```powershell
robocopy "$HOME\.claude" "$HOME\ProtonDrive\.claude-backup" history.jsonl /MIR
robocopy "$HOME\.claude\projects" "$HOME\ProtonDrive\.claude-backup\projects" /MIR
robocopy "$HOME\.claude\file-history" "$HOME\ProtonDrive\.claude-backup\file-history" /MIR
```

### Benefits

- ✅ More control over when sync happens
- ✅ No symlinks required
- ✅ Works on all platforms

### Limitations

- ❌ Not real-time (manual trigger)
- ❌ Easy to forget before switching machines
- ❌ Requires discipline

---

## Option 3: Separate Session Data Git Repo

### Overview

Create second git repo just for session data. Clone both `.claude` and `.claude-sessions` repos. Manually push/pull session data.

### Setup

```bash
# Create session data repo
mkdir ~/.claude-sessions
cd ~/.claude-sessions
git init

# Move session data
mv ~/.claude/history.jsonl ~/.claude-sessions/
mv ~/.claude/projects ~/.claude-sessions/
mv ~/.claude/file-history ~/.claude-sessions/

# Create symlinks
ln -s ~/.claude-sessions/history.jsonl ~/.claude/
ln -s ~/.claude-sessions/projects ~/.claude/
ln -s ~/.claude-sessions/file-history ~/.claude/

# Commit and push
git add .
git commit -m "Initial session data"
git push origin main
```

### Benefits

- ✅ Version control for sessions
- ✅ Native git workflow
- ✅ Can review session history

### Limitations

- ❌ Manual git operations (push/pull)
- ❌ Not real-time
- ❌ Complex setup
- ❌ Large repo size (~600 MB)

---

## Option 4: Cloud-Based Git LFS

### Overview

Use Git LFS (Large File Storage) for session files. Push to GitHub/GitLab with LFS enabled.

### Setup

```bash
cd ~/.claude
git lfs install
git lfs track "history.jsonl"
git lfs track "projects/**/*"
git lfs track "file-history/**/*"
git add .gitattributes
git commit -m "Add LFS tracking"
```

### Benefits

- ✅ Native git workflow
- ✅ Automatic sync via git push/pull

### Limitations

- ❌ Costs money for 600+ MB (GitHub LFS pricing)
- ❌ Slower than Proton Drive
- ❌ Still requires manual push/pull

---

## Comparison Matrix

| Feature           | Proton Symlinks  | Manual Rsync     | Git Repo           | Git LFS            |
| ----------------- | ---------------- | ---------------- | ------------------ | ------------------ |
| Real-time sync    | ✅ Yes           | ❌ No            | ❌ No              | ❌ No              |
| Cross-platform    | ✅ Yes           | ✅ Yes           | ✅ Yes             | ✅ Yes             |
| Setup complexity  | 🟡 Medium        | 🟢 Low           | 🔴 High            | 🟡 Medium          |
| Manual operations | 🟢 None          | 🔴 Every switch  | 🔴 Every switch    | 🔴 Every switch    |
| Cost              | 🟢 Free          | 🟢 Free          | 🟢 Free            | 🔴 Paid            |
| Security          | 🟢 E2E encrypted | 🟢 E2E encrypted | 🟡 Depends on host | 🟡 Depends on host |

---

## Recommended Approach

**For daily machine switches:** Option 1 (Proton Drive Symlinks)

- Real-time sync enables same-session continuity
- One-time setup, zero maintenance
- Best for frequent switching

**For occasional switches:** Option 2 (Manual Rsync)

- Simpler setup
- More control
- Best for infrequent switching

**Not recommended:** Options 3 & 4

- Too complex or costly for session data backup
- Manual operations defeat the purpose

---

## Implementation Checklist

If implementing Option 1 (Proton Symlinks):

- [ ] Install Proton Drive on all dev machines
- [ ] Create setup scripts for each platform
- [ ] Test on one machine first
- [ ] Wait for initial Proton Drive sync (~600 MB)
- [ ] Set up second machine
- [ ] Verify sync works across machines
- [ ] Create verification script for monitoring
- [ ] Document troubleshooting steps

---

## Related Documentation

- `~/.claude/.gitignore` - What's ignored and why
- `~/.claude/plans/cozy-dreaming-simon.md` - Detailed technical plan for Option 1
- `~/.claude/docs/SECURITY.md` - Security considerations
- `~/.claude/CLAUDE.md` - Core workflow rules

---

_This is a reference document for potential future implementation. Not currently active._
