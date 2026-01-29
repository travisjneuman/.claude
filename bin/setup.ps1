# Cross-platform setup script for Claude Code toolkit (PowerShell)
# Run this on Windows if not using Git Bash

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ClaudeDir = Split-Path -Parent $ScriptDir
$BinDir = $ScriptDir

Write-Host "Setting up Claude Code toolkit..."
Write-Host "Bin directory: $BinDir"

# Create python3.cmd shim if python3 doesn't exist
$python3Exists = $null -ne (Get-Command python3 -ErrorAction SilentlyContinue)

if (-not $python3Exists) {
    Write-Host "Creating python3 shim for Windows..."

    # Create python3.cmd
    $python3Cmd = Join-Path $BinDir "python3.cmd"
    Set-Content -Path $python3Cmd -Value "@echo off`npython %*"

    # Try to copy to WindowsApps
    $windowsApps = Join-Path $env:LOCALAPPDATA "Microsoft\WindowsApps"
    if (Test-Path $windowsApps) {
        try {
            Copy-Item $python3Cmd -Destination (Join-Path $windowsApps "python3.cmd") -Force
            Write-Host "Installed python3.cmd to WindowsApps (already in PATH)"
        } catch {
            Write-Host "Note: Could not copy to WindowsApps. Will add bin to PATH instead."
        }
    }
} else {
    Write-Host "python3 already available, skipping shim creation."
}

# Check if bin is in PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$BinDir*") {
    Write-Host ""
    Write-Host "Adding bin directory to user PATH..."

    $newPath = $currentPath + ";" + $BinDir
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")

    Write-Host "Added $BinDir to PATH."
    Write-Host "Please restart your terminal for changes to take effect."
} else {
    Write-Host "Bin directory already in PATH."
}

# Run plugin maintenance script
$FixScript = Join-Path (Split-Path -Parent $BinDir) "scripts\fix-plugin-line-endings.ps1"
if (Test-Path $FixScript) {
    Write-Host ""
    Write-Host "Running plugin maintenance..."
    & $FixScript
}

# Run bash setup-hooks if available (for git hooks)
$SetupHooks = Join-Path (Split-Path -Parent $BinDir) "scripts\setup-hooks.sh"
if (Test-Path $SetupHooks) {
    $gitBash = "C:\Program Files\Git\bin\bash.exe"
    if (Test-Path $gitBash) {
        Write-Host ""
        Write-Host "Installing git hooks..."
        & $gitBash -l $SetupHooks
    } else {
        Write-Host ""
        Write-Host "Note: Git Bash not found. Run 'bash ~/.claude/scripts/setup-hooks.sh' to install git hooks."
    }
}

Write-Host ""
Write-Host "Setup complete!"
Write-Host ""
Write-Host "What was configured:"
Write-Host "  - python3 shim for Windows compatibility"
Write-Host "  - Plugin line endings fixed (CRLF -> LF)"
Write-Host "  - Git hooks installed (if Git Bash available)"
Write-Host ""
Write-Host "Automatic maintenance:"
Write-Host "  - Line endings will be fixed after 'git pull'"
Write-Host "  - Run 'bash ~/.claude/scripts/update-plugins.sh' to update plugins"
