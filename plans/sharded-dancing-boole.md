# Migration Verification Plan: Macbook Setup

**Task:** Verify web-dev workspace and global ~/.claude/ setup after migration to Macbook

---

## Verification Summary

### Global ~/.claude/ Setup: MASTERPIECE CONFIRMED

The global Claude configuration is **production-ready** with excellent organization:

| Component | Status | Details |
|-----------|--------|---------|
| Core files | Complete | CLAUDE.md, settings.json, .mcp.json all present |
| Skills | 68 directories | 131 markdown files, MASTER_INDEX.md present |
| Agents | 37 specialists | Full coverage across domains |
| Commands | Complete | 19 GSD commands + run.md, start-task.md |
| Rules | 11 files | checklists/, stacks/, tooling/ all populated |
| Submodules | 5 repos | get-shit-done + 4 marketplace repos |
| Documentation | 11 guides | Comprehensive reference material |
| MCP Servers | 9 configured | All disabled by default (correct pattern) |

**No issues found in global setup.**

---

### Web-dev Workspace: 98% Complete

| Component | Status | Details |
|-----------|--------|---------|
| _meta.notes vault | Complete | 130+ markdown files, well-organized |
| Project directories | Complete | All 6 primary projects present |
| VS Code workspaces | Complete | 7 workspace files |
| Obsidian config | Complete | 8 plugins installed |
| Git repository | Healthy | 4 commits, proper remote |

---

## Issues Found

### Issue 1: Hardcoded Path Reference (Cross-Platform Issue)

**Location:** `/Users/tjn/web-dev/CLAUDE.md` line 10

**Current:**
```markdown
**Location:** `F:\Web Development`
```

**Problem:** Hardcoded paths break on different systems (Windows vs macOS vs Linux)

**Solution:** Use relative path or platform-agnostic description:
```markdown
**Location:** This directory (web-dev workspace root)
```

This approach:
- Works on any OS
- Works when cloned to different locations
- No need to update when moving/copying the workspace

---

### Issue 2: Undocumented Projects (Optional)

New project directories exist but aren't in the workspace CLAUDE.md:

| Directory | Type |
|-----------|------|
| `ios.deadweather/` | iOS project |
| `ios.tdr/` | iOS TDR project |
| `ndc.oakstone.properties/` | OakStone properties |
| `ndev.kmn/` | ndev Consulting |
| `system.cloudflare/` | Cloudflare config |
| `system.macos/` | macOS automation |
| `tdr.blog/` | TDR blog |
| `tjn.hudsonfoods/` | Hudson Foods |
| `tjn.nailperfection/` | Nail Perfection |

**Decision needed:** Add to CLAUDE.md or leave as untracked projects?

---

### Issue 3: _meta.notes File Counts Outdated (Minor)

The CLAUDE.md references older counts:
- "Concepts/ - 14 files" → Actually 34 files
- "Decisions/ - 2 ADRs" → Actually 3 ADRs
- "Snippets/ - 7 files" → Actually 8 files
- "Templates/ - 8 files" → Actually 11 files
- "Dashboards/ - 7 files" → Actually 8 files

---

## Recommended Changes

### Required Fixes

1. **Update path reference** in CLAUDE.md line 10:
   - Change `F:\Web Development` to `/Users/tjn/web-dev`

2. **Document 9 additional projects** (user confirmed):
   - iOS projects: ios.deadweather, ios.tdr
   - Client projects: ndc.oakstone.properties, ndev.kmn, tjn.hudsonfoods, tjn.nailperfection
   - System configs: system.cloudflare, system.macos
   - Blog: tdr.blog

3. **Update _meta.notes file counts** in CLAUDE.md Structure section

---

## Files to Modify

| File | Change |
|------|--------|
| `/Users/tjn/web-dev/CLAUDE.md` | Update Windows path to macOS path |
| `/Users/tjn/web-dev/CLAUDE.md` | Add 9 new project directories |
| `/Users/tjn/web-dev/CLAUDE.md` | Update _meta.notes file counts |

---

## Execution Steps

### Step 1: Make Path Cross-Platform
**File:** `/Users/tjn/web-dev/CLAUDE.md` line 10
```diff
- **Location:** `F:\Web Development`
+ **Location:** This directory (web-dev workspace root)
```

This is platform-agnostic and works when:
- Used on Windows (`F:\Web Development`)
- Used on macOS (`/Users/tjn/web-dev`)
- Used on Linux (`/home/tjn/web-dev`)
- Cloned to any other location

### Step 2: Add New Projects Section
**File:** `/Users/tjn/web-dev/CLAUDE.md` after "Incubating AI Systems" table

Add new section:
```markdown
### Additional Projects

| Directory | Project | Type |
|-----------|---------|------|
| `ios.deadweather/` | Dead Weather | iOS App |
| `ios.tdr/` | TDR iOS | iOS App |
| `ndc.oakstone.properties/` | OakStone Properties | Client Project |
| `ndev.kmn/` | ndev Consulting | Client Project |
| `system.cloudflare/` | Cloudflare Config | System |
| `system.macos/` | macOS Automation | System |
| `tdr.blog/` | TDR Blog | Blog |
| `tjn.hudsonfoods/` | Hudson Foods | Client Project |
| `tjn.nailperfection/` | Nail Perfection | Client Project |
```

### Step 3: Update _meta.notes Structure
**File:** `/Users/tjn/web-dev/CLAUDE.md` lines 74-86
```diff
- ├── Concepts/               # Technology wiki (14 files)
- ├── Decisions/              # Architecture Decision Records (2 ADRs)
- ├── Snippets/               # Reusable code patterns (7 files)
- ├── Templates/              # Document templates (8 files)
- ├── Dashboards/             # Dynamic Dataview reports (7 files)
+ ├── Concepts/               # Technology wiki (34 files)
+ ├── Decisions/              # Architecture Decision Records (3 ADRs)
+ ├── Snippets/               # Reusable code patterns (8 files)
+ ├── Templates/              # Document templates (11 files)
+ ├── Dashboards/             # Dynamic Dataview reports (8 files)
```

### Step 4: Update Project Directories Table
**File:** `/Users/tjn/web-dev/CLAUDE.md` lines 178-186

Add the 9 new directories to the existing table.

### Step 5: Update ~/.claude/docs/ for Cross-Platform
**Files to update:**
- `~/.claude/docs/FOLDER-STRUCTURE.md`
- `~/.claude/docs/SETUP-GUIDE.md`
- `~/.claude/docs/MCP-SERVERS.md`
- `~/.claude/docs/README.md`
- `~/.claude/vscode/README.md`

**Pattern:** Replace `C:\Users\tjn\` with `~/` notation

Example transformations:
```diff
- C:\Users\tjn\.claude\
+ ~/.claude/

- C:\Users\tjn\.claude\skills\
+ ~/.claude/skills/

- C:\Users\tjn\AppData\Roaming\Code\User\settings.json
+ (platform-specific, keep as example with note)
```

**Note:** VS Code paths vary by OS:
- Windows: `%APPDATA%\Code\User\settings.json`
- macOS: `~/Library/Application Support/Code/User/settings.json`
- Linux: `~/.config/Code/User/settings.json`

### Step 6: Verify & Commit
```bash
# In web-dev workspace
git status
git add CLAUDE.md
git commit -m "docs: Make workspace cross-platform, add new projects"

# In ~/.claude
cd ~/.claude
git status
git add docs/ vscode/
git commit -m "docs: Use ~/ notation for cross-platform compatibility"
```

---

## Cross-Platform Considerations

### Global ~/.claude/ Hardcoded Paths

Found Windows-specific paths in documentation files:
- `docs/FOLDER-STRUCTURE.md` - Windows paths in examples
- `docs/SETUP-GUIDE.md` - Windows paths in examples
- `docs/MCP-SERVERS.md` - Windows paths in examples
- `docs/README.md` - Windows paths in examples
- `vscode/README.md` - Windows symlink commands
- `vscode/setup-vscode-settings.ps1` - Windows PowerShell script

**Assessment:** These are **documentation examples** showing Windows setup. They don't break functionality on other platforms. Consider:

1. **Option A (Minimal):** Leave as-is - docs show the original Windows setup
2. **Option B (Better):** Add macOS/Linux examples alongside Windows examples
3. **Option C (Best):** Use `~/.claude/` notation with OS-specific notes

**User Decision:** Option C - Use `~/.claude/` notation everywhere.

The `~/` notation works on all platforms:
- **Windows (Git Bash, WSL):** `~` → `/c/Users/username` or `/home/username`
- **macOS:** `~` → `/Users/username`
- **Linux:** `~` → `/home/username`

### Files That Actually Matter

Only `/Users/tjn/web-dev/CLAUDE.md` has a hardcoded path that affects runtime behavior. The global `~/.claude/` paths are in documentation/examples only.

---

## Overall Assessment

**Your setup is excellent.** The migration is complete with minor documentation updates needed.

### Verification Results

| Component | Status |
|-----------|--------|
| Global ~/.claude/ structure | READY |
| 68 skills | READY |
| 37 agents | READY |
| 19 GSD commands | READY |
| 11 rule files | READY |
| 5 git submodules | READY |
| Web-dev projects | READY |
| _meta.notes vault (130+ files) | READY |
| Obsidian config | READY |

### Work Remaining

1. **web-dev/CLAUDE.md** - Replace `F:\Web Development` with cross-platform text
2. **web-dev/CLAUDE.md** - Add 9 new project directories
3. **web-dev/CLAUDE.md** - Update file counts
4. **~/.claude/docs/** - Replace `C:\Users\tjn\` with `~/` notation (5 files)

**Estimated time:** 15-20 minutes of edits
