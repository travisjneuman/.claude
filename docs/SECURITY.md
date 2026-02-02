# Security & Privacy Documentation

This document explains the security decisions made when this repository was made public, and why certain files are gitignored.

**Last Updated:** February 2026 (v2.3.1)

---

## Security Audit Summary (December 2025)

Before making this repository public, a comprehensive security audit was performed. This document explains what was done and why, to prevent future maintainers from accidentally reverting these protections.

### What Was Removed

| Item                   | Files                            | Reason                                                        |
| ---------------------- | -------------------------------- | ------------------------------------------------------------- |
| `.archive/` folder     | 139 files                        | Contained personal project data, client info, emails          |
| `settings.json` (root) | Initially removed, then restored | Toolkit config - SHOULD be tracked                            |
| `vscode/settings.json` | 1 file                           | Contained hardcoded paths and local network IPs               |
| `.vscode/` folder      | Entire folder                    | Standard VSCode workspace folder with machine-specific config |
| Git history            | All traces                       | Used `git-filter-repo` to purge sensitive data from history   |

### What Was Preserved

| Item                               | Reason                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `settings.json`                    | Claude Code toolkit configuration (permissions, hooks, plugins) - essential for the toolkit |
| `vscode/setup-vscode-settings.ps1` | Portable setup script - doesn't contain personal data                                       |
| `vscode/README.md`                 | Documentation - no sensitive data                                                           |

---

## Files That MUST Stay Gitignored

### Critical: Do NOT Revert These

| Pattern                | Why It's Ignored                                           |
| ---------------------- | ---------------------------------------------------------- |
| `.archive/`            | Personal project archives, client data, emails             |
| `.vscode/`             | VSCode workspace folder - auto-generated, machine-specific |
| `vscode/settings.json` | VSCode IDE settings with hardcoded paths and local IPs     |
| `settings.local.json`  | Personal override file - machine-specific                  |
| `.mcp.json`            | MCP server config - platform-specific commands             |
| `.claude.json`         | MCP backup - machine-specific                              |

### Why These Decisions Were Made

#### 1. `.archive/` Folder

**Problem:** Contained 139 files including:

- Personal project CLAUDE.md files with client names
- Email addresses (e.g., client emails in project docs)
- Project-specific configurations with identifying information

**Solution:**

- Added to `.gitignore`
- Removed from Git tracking
- Rewrote Git history to purge all traces

**Impact:** Users who fork this repo won't inherit personal project data.

#### 2. `.vscode/` vs `vscode/` Folders

**Problem:** Two folders with similar names but different purposes:

- `.vscode/` (with dot) - Standard VSCode workspace folder, auto-created
- `vscode/` (without dot) - Our custom setup scripts folder

The `.vscode/` folder contained `settings.json` with:

- Hardcoded user paths (`C:\Users\tjn\.claude`)
- Local network IPs (`192.168.1.40`)
- Remote SSH host configurations

**Solution:**

- Entire `.vscode/` folder gitignored
- Our `vscode/` folder tracked (but `settings.json` within it gitignored)
- Clear documentation distinguishing the two

**Impact:** Machine-specific VSCode configurations don't leak to public repo.

#### 3. `vscode/settings.json`

**Problem:** VSCode settings file contained:

```json
"git.scanRepositories": ["C:\\Users\\tjn\\.claude", "."],
"security.allowedUNCHosts": ["192.168.1.40"],
"remote.SSH.remotePlatform": {
    "192.168.1.10": "windows",
    "192.168.1.40": "linux"
}
```

**Solution:**

- Gitignored the file
- Users create their own after cloning
- Setup script helps configure it

**Impact:** Local network topology not exposed.

#### 4. `settings.json` (Root - Toolkit Config)

**Important:** This file IS tracked and SHOULD remain tracked.

**Why it's different:** Unlike `vscode/settings.json`, the root `settings.json` contains Claude Code toolkit configuration:

- Permission allow/deny lists
- Enabled plugins
- Hook configurations
- MCP server defaults

**These are not personal data** - they're the toolkit's functionality configuration that users want when cloning this repo.

---

## Git History Rewriting

### What Was Done

Used `git-filter-repo` to completely remove sensitive files from Git history:

```bash
# Remove .archive/ from all history
python -m git_filter_repo --invert-paths --path .archive/ --force

# Remove settings files from all history
python -m git_filter_repo --invert-paths --path settings.json --path vscode/settings.json --force
```

### Why This Matters

Even if files are deleted in the latest commit, they remain in Git history. Anyone can:

1. Clone the repo
2. Run `git log --all --oneline -- .archive/`
3. Checkout historical commits
4. Access the "deleted" files

**History rewriting ensures complete removal.**

### Re-adding Origin After filter-repo

`git-filter-repo` removes the origin remote for safety. After running it:

```bash
git remote add origin https://github.com/travisjneuman/.claude.git
git push --force origin master
```

---

## For Future Maintainers

### Before Making Changes to .gitignore

Ask yourself:

1. Does this file contain hardcoded paths?
2. Does this file contain IP addresses?
3. Does this file contain email addresses or client names?
4. Is this file auto-generated by an IDE?
5. Would another user's version of this file conflict?

If ANY answer is yes, the file should probably stay gitignored.

### If You Think Something Should Be Tracked

1. Review this document first
2. Check the file for personal/machine-specific data
3. Consider whether tracking benefits outweigh privacy risks
4. Document your decision if you make changes

### Red Flags in Files

Watch for these patterns that indicate a file should NOT be tracked:

- `C:\Users\<username>\` - Windows user paths
- `/Users/<username>/` - macOS user paths
- `/home/<username>/` - Linux user paths
- `192.168.x.x` - Local network IPs
- `10.x.x.x` - Private network IPs
- Email addresses
- API keys or tokens
- Client/project names

---

## Verification Commands

### Check What's Gitignored

```bash
# Verify specific files are ignored
git check-ignore -v .vscode/settings.json vscode/settings.json

# List all ignored files
git status --ignored
```

### Check Git History for Sensitive Files

```bash
# Should return empty if properly cleaned
git log --all --oneline -- .archive/
git log --all --oneline -- vscode/settings.json
```

### Verify No Personal Data in Tracked Files

```bash
# Search for IP addresses
grep -r "192\.168\." --include="*.json" --include="*.md"

# Search for user paths (adjust username)
grep -r "C:\\\\Users\\\\tjn" --include="*.json" --include="*.md"
```

---

## Summary

| File/Folder                        | Status        | Reason                              |
| ---------------------------------- | ------------- | ----------------------------------- |
| `settings.json`                    | ✅ Tracked    | Toolkit config (permissions, hooks) |
| `settings.local.json`              | ❌ Gitignored | Personal overrides                  |
| `vscode/README.md`                 | ✅ Tracked    | Documentation                       |
| `vscode/setup-vscode-settings.ps1` | ✅ Tracked    | Portable setup script               |
| `vscode/settings.json`             | ❌ Gitignored | Contains local paths/IPs            |
| `.vscode/`                         | ❌ Gitignored | VSCode workspace folder             |
| `.archive/`                        | ❌ Gitignored | Personal project archives           |
| `.mcp.json`                        | ❌ Gitignored | Platform-specific MCP config        |
| `plans/`                           | ❌ Gitignored | User-specific planning docs         |
| `tasks/`                           | ❌ Gitignored | User-specific task files            |

---

## See Also

- [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) - Complete folder map
- [CONFIGURATION.md](./CONFIGURATION.md) - Settings file details
- [../vscode/README.md](../vscode/README.md) - VSCode setup instructions
