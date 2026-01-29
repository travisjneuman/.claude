# fix-plugin-line-endings.ps1
# Converts CRLF to LF in plugin scripts to ensure cross-platform compatibility
# PowerShell version for Windows users

$ErrorActionPreference = "Stop"

$ClaudeDir = if ($env:CLAUDE_DIR) { $env:CLAUDE_DIR } else { "$env:USERPROFILE\.claude" }
$PluginCache = "$ClaudeDir\plugins\cache"
$PluginMarketplaces = "$ClaudeDir\plugins\marketplaces"

function Write-Info { param($Message) Write-Host "[INFO] $Message" -ForegroundColor Blue }
function Write-Success { param($Message) Write-Host "[OK] $Message" -ForegroundColor Green }
function Write-Warn { param($Message) Write-Host "[WARN] $Message" -ForegroundColor Yellow }

function Fix-LineEndings {
    param([string]$FilePath)

    $content = Get-Content -Path $FilePath -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return $false }

    if ($content -match "`r`n") {
        $newContent = $content -replace "`r`n", "`n"
        # Write without BOM and with LF line endings
        [System.IO.File]::WriteAllText($FilePath, $newContent, [System.Text.UTF8Encoding]::new($false))
        return $true
    }
    return $false
}

function Process-Directory {
    param([string]$Directory)

    if (-not (Test-Path $Directory)) { return @{Total=0; Fixed=0} }

    $files = Get-ChildItem -Path $Directory -Recurse -Include "*.sh","*.cmd","*.bash" -File -ErrorAction SilentlyContinue
    $total = 0
    $fixed = 0

    foreach ($file in $files) {
        $total++
        if (Fix-LineEndings -FilePath $file.FullName) {
            $fixed++
            $relativePath = $file.FullName.Replace($ClaudeDir, "~\.claude")
            Write-Success "Fixed: $relativePath"
        }
    }

    return @{Total=$total; Fixed=$fixed}
}

Write-Host ""
Write-Info "Fixing plugin line endings for cross-platform compatibility..."
Write-Info "CLAUDE_DIR: $ClaudeDir"
Write-Host ""

$totalFiles = 0
$totalFixed = 0

# Process plugin cache
if (Test-Path $PluginCache) {
    Write-Info "Processing plugin cache..."
    $result = Process-Directory -Directory $PluginCache
    $totalFiles += $result.Total
    $totalFixed += $result.Fixed
}

# Process marketplace plugins
if (Test-Path $PluginMarketplaces) {
    Write-Info "Processing marketplace plugins..."
    $result = Process-Directory -Directory $PluginMarketplaces
    $totalFiles += $result.Total
    $totalFixed += $result.Fixed
}

Write-Host ""
if ($totalFixed -gt 0) {
    Write-Success "Fixed $totalFixed of $totalFiles script files"
} else {
    Write-Info "Checked $totalFiles script files - no fixes needed"
}
