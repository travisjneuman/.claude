# Global VSCode Settings

This folder contains global VSCode settings that apply to all VSCode variants.

---

## ⚠️ Important: Two VSCode Folders

There are TWO different VSCode-related folders in this repo:

| Folder               | Path       | Description                | Tracked?              |
| -------------------- | ---------- | -------------------------- | --------------------- |
| **This folder**      | `vscode/`  | Our portable setup scripts | ✅ Yes (scripts only) |
| **VSCode workspace** | `.vscode/` | Auto-created by VSCode     | ❌ No (gitignored)    |

### Why `vscode/settings.json` is Gitignored

The `settings.json` file in this folder is **intentionally gitignored** because it contains:

1. **Hardcoded paths** - e.g., `C:\Users\tjn\.claude` (machine-specific)
2. **Local network IPs** - e.g., `192.168.1.40` (security concern for public repos)
3. **Remote SSH hosts** - Machine-specific remote connections

**You need to create your own `settings.json`** after cloning. The setup script will help, or copy from your existing VSCode settings.

### Why `.vscode/` is Gitignored

The `.vscode/` folder (with dot prefix) is the **standard VSCode workspace folder**:

- Auto-created when you open `.claude/` in VSCode
- Contains workspace-specific settings
- Should never be committed to public repos
- Standard practice in all open-source projects

---

## Setup (First Time)

### Windows (Run as Administrator)

```powershell
# Run PowerShell as Administrator, then:
cd ~/.claude/vscode
.\setup-vscode-settings.ps1
```

### macOS / Linux

```bash
# VSCode
ln -sf ~/.claude/vscode/settings.json ~/Library/Application\ Support/Code/User/settings.json

# Or for Linux:
ln -sf ~/.claude/vscode/settings.json ~/.config/Code/User/settings.json
```

### Manual Setup (Windows)

If the script doesn't work, manually create symlinks:

```powershell
# VSCode (replace 'username' with your username)
cmd /c mklink "C:\Users\username\AppData\Roaming\Code\User\settings.json" "C:\Users\username\.claude\vscode\settings.json"

# VSCode Insiders
cmd /c mklink "C:\Users\username\AppData\Roaming\Code - Insiders\User\settings.json" "C:\Users\username\.claude\vscode\settings.json"

# Cursor (if installed)
cmd /c mklink "C:\Users\username\AppData\Roaming\Cursor\User\settings.json" "C:\Users\username\.claude\vscode\settings.json"
```

## VSCode Settings Paths by Platform

| Platform | Path                                                    |
| -------- | ------------------------------------------------------- |
| Windows  | `%APPDATA%\Code\User\settings.json`                     |
| macOS    | `~/Library/Application Support/Code/User/settings.json` |
| Linux    | `~/.config/Code/User/settings.json`                     |

## What This Contains

| File                        | Description              | Tracked?               |
| --------------------------- | ------------------------ | ---------------------- |
| `README.md`                 | This documentation       | ✅ Yes                 |
| `setup-vscode-settings.ps1` | Windows setup script     | ✅ Yes                 |
| `settings.json`             | VSCode settings template | ❌ **No** (gitignored) |

**Note:** You must create `settings.json` yourself after cloning. It's gitignored because it contains machine-specific paths and local network IPs.

## How It Works

1. Clone this repo to your machine
2. Create your own `settings.json` (copy from your existing VSCode settings)
3. Run the setup script to create symlinks
4. Your VSCode variants now use the settings in this folder
5. Changes made in VSCode update the local `settings.json`

**Note:** The `settings.json` file is NOT tracked in Git (it's gitignored). Only the setup scripts are shared. Each user maintains their own settings locally.

## Supported VSCode Variants

- VSCode
- VSCode Insiders
- Cursor
- Windsurf
- (Add more as needed)

## For Team Members

1. Clone the `~/.claude` repo
2. Run the setup script as Administrator
3. Your VSCode settings are now synced
