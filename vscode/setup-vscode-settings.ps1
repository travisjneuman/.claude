# VSCode Settings Symlink Setup Script
# Run this script as Administrator to set up symlinks

$SourceSettings = "$env:USERPROFILE\.claude\vscode\settings.json"

# Define VSCode variant paths
$VSCodePaths = @(
    @{
        Name = "VSCode"
        Path = "$env:APPDATA\Code\User\settings.json"
    },
    @{
        Name = "VSCode Insiders"
        Path = "$env:APPDATA\Code - Insiders\User\settings.json"
    },
    @{
        Name = "Cursor"
        Path = "$env:APPDATA\Cursor\User\settings.json"
    },
    @{
        Name = "Windsurf"
        Path = "$env:APPDATA\Windsurf\User\settings.json"
    },
    @{
        Name = "VSCodium"
        Path = "$env:APPDATA\VSCodium\User\settings.json"
    }
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "VSCode Settings Symlink Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Source: $SourceSettings" -ForegroundColor Yellow
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script requires Administrator privileges!" -ForegroundColor Red
    Write-Host "Please run PowerShell as Administrator and try again." -ForegroundColor Red
    exit 1
}

# Check source file exists
if (-not (Test-Path $SourceSettings)) {
    Write-Host "ERROR: Source settings file not found!" -ForegroundColor Red
    Write-Host "Expected: $SourceSettings" -ForegroundColor Red
    exit 1
}

foreach ($VSCode in $VSCodePaths) {
    $Name = $VSCode.Name
    $TargetPath = $VSCode.Path
    $ParentDir = Split-Path $TargetPath -Parent

    Write-Host "Processing: $Name" -ForegroundColor White

    # Check if parent directory exists (VSCode variant installed)
    if (-not (Test-Path $ParentDir)) {
        Write-Host "  SKIPPED: $Name not installed" -ForegroundColor DarkGray
        continue
    }

    # Check if symlink already exists
    if (Test-Path $TargetPath) {
        $item = Get-Item $TargetPath -Force
        if ($item.LinkType -eq "SymbolicLink") {
            $existingTarget = $item.Target
            if ($existingTarget -eq $SourceSettings) {
                Write-Host "  OK: Symlink already configured" -ForegroundColor Green
                continue
            } else {
                Write-Host "  WARNING: Existing symlink points elsewhere: $existingTarget" -ForegroundColor Yellow
            }
        }

        # Backup existing settings
        $BackupPath = "$TargetPath.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
        Write-Host "  Backing up existing settings to: $BackupPath" -ForegroundColor Yellow
        Move-Item $TargetPath $BackupPath -Force
    }

    # Create symlink
    try {
        New-Item -ItemType SymbolicLink -Path $TargetPath -Target $SourceSettings -Force | Out-Null
        Write-Host "  SUCCESS: Symlink created" -ForegroundColor Green
    } catch {
        Write-Host "  ERROR: Failed to create symlink: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your VSCode settings are now synced from:" -ForegroundColor White
Write-Host "  $SourceSettings" -ForegroundColor Yellow
Write-Host ""
Write-Host "Any changes made in VSCode will update this file." -ForegroundColor White
Write-Host "Commit and push to sync across machines." -ForegroundColor White
