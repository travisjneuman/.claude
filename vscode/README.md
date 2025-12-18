# Global VSCode Settings

This folder contains global VSCode settings that apply to all VSCode variants.

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

| Platform | Path |
|----------|------|
| Windows | `%APPDATA%\Code\User\settings.json` |
| macOS | `~/Library/Application Support/Code/User/settings.json` |
| Linux | `~/.config/Code/User/settings.json` |

## What This Contains

- `settings.json` - Global VSCode settings (Git-tracked)
- `setup-vscode-settings.ps1` - Setup script for Windows
- `README.md` - This file

## How It Works

1. Your VSCode settings are stored here (Git-tracked)
2. Symlinks point from each VSCode variant to this file
3. Changes in any VSCode update this file
4. Git tracks the changes
5. New machines can clone and run setup script

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
