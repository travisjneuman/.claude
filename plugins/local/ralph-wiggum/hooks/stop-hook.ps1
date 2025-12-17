# Ralph Wiggum Stop Hook (PowerShell version)
# Prevents session exit when a ralph-loop is active
# Feeds Claude's output back as input to continue the loop

$ErrorActionPreference = "Stop"

# Read hook input from stdin
$hookInput = $input | Out-String

# Check if ralph-loop is active
$ralphStateFile = ".claude/ralph-loop.local.md"

if (-not (Test-Path $ralphStateFile)) {
    # No active loop - allow exit
    exit 0
}

# Read state file content
$stateContent = Get-Content $ralphStateFile -Raw

# Parse markdown frontmatter (YAML between ---) and extract values
$frontmatterMatch = [regex]::Match($stateContent, '(?s)^---\r?\n(.+?)\r?\n---')
if (-not $frontmatterMatch.Success) {
    Write-Error "Ralph loop: State file missing frontmatter"
    Remove-Item $ralphStateFile -Force
    exit 0
}

$frontmatter = $frontmatterMatch.Groups[1].Value

# Extract values from frontmatter
$iterationMatch = [regex]::Match($frontmatter, 'iteration:\s*(\d+)')
$maxIterationsMatch = [regex]::Match($frontmatter, 'max_iterations:\s*(\d+)')
$completionPromiseMatch = [regex]::Match($frontmatter, 'completion_promise:\s*"?([^"\r\n]+)"?')

# Validate iteration field
if (-not $iterationMatch.Success) {
    Write-Host "Warning: Ralph loop: State file corrupted" -ForegroundColor Yellow
    Write-Host "   File: $ralphStateFile"
    Write-Host "   Problem: 'iteration' field is not valid"
    Write-Host ""
    Write-Host "   This usually means the state file was manually edited or corrupted."
    Write-Host "   Ralph loop is stopping. Run /ralph-loop again to start fresh."
    Remove-Item $ralphStateFile -Force
    exit 0
}

$iteration = [int]$iterationMatch.Groups[1].Value

# Validate max_iterations field
if (-not $maxIterationsMatch.Success) {
    Write-Host "Warning: Ralph loop: State file corrupted" -ForegroundColor Yellow
    Write-Host "   File: $ralphStateFile"
    Write-Host "   Problem: 'max_iterations' field is not valid"
    Write-Host ""
    Write-Host "   This usually means the state file was manually edited or corrupted."
    Write-Host "   Ralph loop is stopping. Run /ralph-loop again to start fresh."
    Remove-Item $ralphStateFile -Force
    exit 0
}

$maxIterations = [int]$maxIterationsMatch.Groups[1].Value

# Get completion promise (may be null/empty)
$completionPromise = if ($completionPromiseMatch.Success) { $completionPromiseMatch.Groups[1].Value.Trim() } else { $null }

# Check if max iterations reached
if ($maxIterations -gt 0 -and $iteration -ge $maxIterations) {
    Write-Host "Ralph loop: Max iterations ($maxIterations) reached." -ForegroundColor Red
    Remove-Item $ralphStateFile -Force
    exit 0
}

# Get transcript path from hook input
try {
    $hookData = $hookInput | ConvertFrom-Json
    $transcriptPath = $hookData.transcript_path
} catch {
    Write-Host "Warning: Ralph loop: Failed to parse hook input" -ForegroundColor Yellow
    Remove-Item $ralphStateFile -Force
    exit 0
}

if (-not (Test-Path $transcriptPath)) {
    Write-Host "Warning: Ralph loop: Transcript file not found" -ForegroundColor Yellow
    Write-Host "   Expected: $transcriptPath"
    Write-Host "   This is unusual and may indicate a Claude Code internal issue."
    Write-Host "   Ralph loop is stopping."
    Remove-Item $ralphStateFile -Force
    exit 0
}

# Read transcript and find last assistant message (JSONL format)
$transcriptLines = Get-Content $transcriptPath
$assistantLines = $transcriptLines | Where-Object { $_ -match '"role":\s*"assistant"' }

if (-not $assistantLines -or $assistantLines.Count -eq 0) {
    Write-Host "Warning: Ralph loop: No assistant messages found in transcript" -ForegroundColor Yellow
    Write-Host "   Transcript: $transcriptPath"
    Write-Host "   This is unusual and may indicate a transcript format issue"
    Write-Host "   Ralph loop is stopping."
    Remove-Item $ralphStateFile -Force
    exit 0
}

# Get last assistant message
$lastLine = if ($assistantLines -is [array]) { $assistantLines[-1] } else { $assistantLines }

try {
    $lastMessage = $lastLine | ConvertFrom-Json
    $textContent = $lastMessage.message.content | Where-Object { $_.type -eq "text" } | ForEach-Object { $_.text }
    $lastOutput = $textContent -join "`n"
} catch {
    Write-Host "Warning: Ralph loop: Failed to parse assistant message JSON" -ForegroundColor Yellow
    Write-Host "   Error: $_"
    Write-Host "   This may indicate a transcript format issue"
    Write-Host "   Ralph loop is stopping."
    Remove-Item $ralphStateFile -Force
    exit 0
}

if ([string]::IsNullOrWhiteSpace($lastOutput)) {
    Write-Host "Warning: Ralph loop: Assistant message contained no text content" -ForegroundColor Yellow
    Write-Host "   Ralph loop is stopping."
    Remove-Item $ralphStateFile -Force
    exit 0
}

# Check for completion promise (only if set)
if ($completionPromise -and $completionPromise -ne "null") {
    # Extract text from <promise> tags
    $promiseMatch = [regex]::Match($lastOutput, '(?s)<promise>(.*?)</promise>')
    if ($promiseMatch.Success) {
        $promiseText = $promiseMatch.Groups[1].Value.Trim() -replace '\s+', ' '
        if ($promiseText -eq $completionPromise) {
            Write-Host "Ralph loop: Detected <promise>$completionPromise</promise>" -ForegroundColor Green
            Remove-Item $ralphStateFile -Force
            exit 0
        }
    }
}

# Not complete - continue loop with SAME PROMPT
$nextIteration = $iteration + 1

# Extract prompt (everything after the closing ---)
$promptMatch = [regex]::Match($stateContent, '(?s)^---\r?\n.+?\r?\n---\r?\n(.+)$')
if (-not $promptMatch.Success -or [string]::IsNullOrWhiteSpace($promptMatch.Groups[1].Value)) {
    Write-Host "Warning: Ralph loop: State file corrupted or incomplete" -ForegroundColor Yellow
    Write-Host "   File: $ralphStateFile"
    Write-Host "   Problem: No prompt text found"
    Write-Host ""
    Write-Host "   This usually means:"
    Write-Host "     - State file was manually edited"
    Write-Host "     - File was corrupted during writing"
    Write-Host ""
    Write-Host "   Ralph loop is stopping. Run /ralph-loop again to start fresh."
    Remove-Item $ralphStateFile -Force
    exit 0
}

$promptText = $promptMatch.Groups[1].Value.Trim()

# Update iteration in state file
$updatedContent = $stateContent -replace 'iteration:\s*\d+', "iteration: $nextIteration"
Set-Content -Path $ralphStateFile -Value $updatedContent -NoNewline

# Build system message
if ($completionPromise -and $completionPromise -ne "null") {
    $systemMsg = "Ralph iteration $nextIteration | To stop: output <promise>$completionPromise</promise> (ONLY when statement is TRUE - do not lie to exit!)"
} else {
    $systemMsg = "Ralph iteration $nextIteration | No completion promise set - loop runs infinitely"
}

# Output JSON to block the stop and feed prompt back
$output = @{
    decision = "block"
    reason = $promptText
    systemMessage = $systemMsg
} | ConvertTo-Json -Compress

Write-Output $output

exit 0
