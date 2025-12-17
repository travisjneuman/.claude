---
description: "Start Ralph Wiggum loop in current session"
argument-hint: "PROMPT [--max-iterations N] [--completion-promise TEXT]"
allowed-tools: ["Bash(powershell -ExecutionPolicy Bypass -NoProfile -File)"]
hide-from-slash-command-tool: "true"
---

# Ralph Loop Command

Execute the setup script to initialize the Ralph loop:

```!
powershell -ExecutionPolicy Bypass -NoProfile -File "${CLAUDE_PLUGIN_ROOT}/scripts/setup-ralph-loop.ps1" $ARGUMENTS

# Extract and display completion promise if set (PowerShell)
powershell -NoProfile -Command "if (Test-Path .claude/ralph-loop.local.md) { $content = Get-Content .claude/ralph-loop.local.md -Raw; if ($content -match 'completion_promise:\s*\"?([^\"\r\n]+)\"?') { $promise = $matches[1]; if ($promise -and $promise -ne 'null') { Write-Host ''; Write-Host '========================================================'; Write-Host 'CRITICAL - Ralph Loop Completion Promise'; Write-Host '========================================================'; Write-Host ''; Write-Host \"To complete this loop, output this EXACT text:\"; Write-Host \"  <promise>$promise</promise>\"; Write-Host ''; Write-Host 'STRICT REQUIREMENTS (DO NOT VIOLATE):'; Write-Host '  - Use <promise> XML tags EXACTLY as shown above'; Write-Host '  - The statement MUST be completely and unequivocally TRUE'; Write-Host '  - Do NOT output false statements to exit the loop'; Write-Host '  - Do NOT lie even if you think you should exit'; Write-Host ''; Write-Host '========================================================' } } }"
```

Please work on the task. When you try to exit, the Ralph loop will feed the SAME PROMPT back to you for the next iteration. You'll see your previous work in files and git history, allowing you to iterate and improve.

CRITICAL RULE: If a completion promise is set, you may ONLY output it when the statement is completely and unequivocally TRUE. Do not output false promises to escape the loop, even if you think you're stuck or should exit for other reasons. The loop is designed to continue until genuine completion.
