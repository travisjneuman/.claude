# Hooks Compliance Audit Report

**Date:** 2026-03-04
**Auditor:** Claude Opus 4.6
**Scope:** ~/.claude/settings.json hooks section + all scripts in ~/.claude/hooks/
**Spec version:** Claude Code Hooks (18 events, 4 hook types)

---

## Summary

The hooks setup is functional and well-documented but has several spec compliance gaps. The most significant issues are: (1) stdin JSON parsing is not used by most PreToolUse hooks which rely on the CLAUDE_TOOL_INPUT environment variable instead, (2) the Stop hook does not check stop_hook_active risking infinite loops, and (3) no hooks use the async or once fields despite clear candidates.

**Compliance score: 6/10** -- Hooks work in practice but diverge from the official spec input mechanism and miss several safety and optimization opportunities.

---

## 1. run-hook.js Wrapper Analysis

**File:** ~/.claude/hooks/run-hook.js

### Findings

| Item | Status | Detail |
|------|--------|--------|
| Cross-platform path resolution | PASS | Uses os.homedir() correctly, converts backslashes, prefers Git Bash on Windows |
| Stdin passthrough | FRAGILE | stdio inherit passes parent stdin, but no explicit buffering guarantee |
| Timeout | PASS | 30-second timeout via execSync |
| Exit code propagation | PASS | Propagates child exit code via e.status |
| Missing hook graceful exit | PASS | Exits 0 if hook file not found |

### Issue: No stdin buffering/forwarding guarantee

The stdio inherit option in execSync means the child process shares the parent stdin/stdout/stderr file descriptors. This works for passing JSON stdin from Claude Code to the shell script, but only if stdin has not already been consumed. Since run-hook.js itself does not read stdin, this should work. However, it is fragile -- if Node.js or any module reads stdin first, the data is lost.

**Recommendation:** Explicitly read stdin in run-hook.js and pass it to the child via the input option in execSync, or use pipe for stdin and inherit for stdout/stderr. Example fix:

```js
const chunks = [];
process.stdin.on('data', c => chunks.push(c));
process.stdin.on('end', () => {
  const input = Buffer.concat(chunks);
  execSync(cmd, {
    input,
    stdio: ['pipe', 'inherit', 'inherit'],
    env: { ...process.env, HOME: home },
    timeout: 30000,
  });
});
```

---

## 2. Per-Hook Audit

### 2.1 session-start-pull.sh (SessionStart)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | N/A | SessionStart hooks receive session_id and cwd but this hook does not need them |
| Exit codes | PASS | Always exits 0 |
| async field | MISSING | Hook runs background process internally but config lacks async true |
| once field | MISSING | Should be once true -- pulling repos only needs to happen once per session |
| Error handling | PASS | Uses or-true for non-critical operations |

**Issues:**
- Background subshell (ampersand) is a workaround for lacking async true in config. If Claude Code async support works correctly, the ampersand could be removed and async true used instead, giving Claude Code visibility into the process.
- Missing once true -- if a session reconnects, this would pull again unnecessarily.

---

### 2.2 session-start-context.sh (SessionStart)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | SKIP | Does not read stdin; does not need hook input |
| Exit codes | PASS | Always exits 0 |
| once field | SHOULD ADD | Context injection should happen once per session, not on reconnect |
| Error handling | PASS | Guards for missing file, age check has null redirect |
| Cross-platform | PASS | macOS vs Linux stat detection |

**Issue:** The stat -c%Y fallback for non-Darwin platforms may not work on Windows Git Bash (depends on GNU coreutils bundled with Git for Windows). Should be tested.

---

### 2.3 session-stop-summary.sh (Stop)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | FAIL | Does not read stdin at all. The Stop hook receives JSON with stop_hook_active field |
| stop_hook_active check | FAIL | CRITICAL. Does not check stop_hook_active. If the hook output causes Claude to generate more output triggering another Stop event, this creates an infinite loop |
| Exit codes | PASS | Always exits 0 |
| Error handling | PASS | Uses null redirect and or-true appropriately |

**Critical fix needed:** Add at the top of the script:

```bash
INPUT=$(cat)
STOP_ACTIVE=$(echo "$INPUT" | node -e "
  let d='';process.stdin.on('data',c=>d+=c);
  process.stdin.on('end',()=>{
    try{console.log(JSON.parse(d).stop_hook_active||false)}
    catch(e){console.log(false)}
  });
" 2>/dev/null)

if [ "$STOP_ACTIVE" = "true" ]; then
  exit 0
fi
```

**Additional issue:** Uses CLAUDE_WORKING_DIR env var which is not documented in the official spec. The official spec provides cwd in the JSON stdin payload. The hook should read cwd from stdin JSON instead.

---

### 2.4 prompt-context.sh (UserPromptSubmit)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | SKIP | Does not read stdin. The spec says UserPromptSubmit receives session_id, cwd, and prompt |
| Exit codes | PASS | Always exits 0 |
| Error handling | PASS | Guards with git rev-parse check |
| Performance | PASS | Lightweight git commands |

**Minor issue:** Relies on the shell pwd being the project directory. Reading cwd from stdin JSON would be more reliable.

---

### 2.5 guard-dangerous.sh (PreToolUse, matcher: Bash)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | FAIL | Uses CLAUDE_TOOL_INPUT env var instead of reading JSON from stdin |
| Exit codes | PASS | Uses 0 (allow) and 2 (block) correctly |
| Error handling | WARN | If CLAUDE_TOOL_INPUT is empty, grep matches nothing and allows -- safe but could log a warning |

**Spec divergence:** The official spec provides tool input via stdin JSON containing tool_input.command. The hook should parse that from stdin rather than relying on an env var.

---

### 2.6 pre-commit-counts.sh (PreToolUse, matcher: Bash)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | FAIL | Same issue as guard-dangerous.sh -- uses CLAUDE_TOOL_INPUT |
| Exit codes | PASS | Always exits 0 (never blocks) |
| Error handling | PASS | Uses or-true and null redirect |

**Same spec divergence as guard-dangerous.sh** regarding stdin JSON vs env var.

---

### 2.7 pre-write-validate.sh (PreToolUse, matcher: Write or Edit)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | PARTIAL | Uses CLAUDE_TOOL_INPUT and parses it as JSON with Node.js. This works if the env var contains the full tool input JSON, but per spec the input comes via stdin |
| Exit codes | PASS | Uses 0 (allow) and 2 (block) correctly |
| Error handling | PASS | Exits 0 on parse failure (safe default) |
| Path validation | PASS | Comprehensive blocked paths list |

**Same spec divergence** -- should read from stdin, not CLAUDE_TOOL_INPUT.

---

### 2.8 secret-scan.sh (PostToolUse, matcher: Write or Edit)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | PASS | Reads stdin with INPUT=$(cat) and parses tool_input.file_path via Node.js |
| Exit codes | PASS | Always exits 0 (warn only) |
| Error handling | PASS | Guards for missing file, skips binary/lock files |
| Pattern coverage | GOOD | Covers AWS keys, GitHub tokens, Slack tokens, GitLab tokens, private keys, passwords |

**This is the most spec-compliant hook.** It correctly reads JSON from stdin and parses tool_input.

**Minor gap:** Does not scan for Google Cloud keys (AIza prefix), Azure keys, Stripe keys (sk_live, pk_live), or JWT tokens.

---

### 2.9 format-code.sh (PostToolUse -- NOT REGISTERED)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | PASS | Reads stdin, parses via Node.js |
| Registration | DEREGISTERED | Not in settings.json -- intentionally disabled for latency |

No action needed.

---

### 2.10 post-edit-lint.sh (PostToolUse -- NOT REGISTERED)

| Check | Status | Detail |
|-------|--------|--------|
| JSON stdin parsing | PASS | Reads stdin, parses via Node.js |
| Registration | DEREGISTERED | Not in settings.json -- intentionally disabled for latency |

No action needed.

---

## 3. Settings.json Configuration Audit

### Hook Events Used (5 of 18)

| Event | Used | Hooks |
|-------|------|-------|
| SessionStart | YES | session-start-pull.sh, session-start-context.sh |
| UserPromptSubmit | YES | prompt-context.sh |
| PreToolUse | YES | guard-dangerous.sh, pre-commit-counts.sh, pre-write-validate.sh |
| PostToolUse | YES | secret-scan.sh |
| Stop | YES | session-stop-summary.sh |
| SubagentStart | NO | -- |
| SubagentStop | NO | -- |
| Notification | NO | -- |
| PermissionRequest | NO | -- |
| PostToolUseFailure | NO | -- |
| TeammateIdle | NO | -- |
| TaskCompleted | NO | -- |
| ConfigChange | NO | -- |
| WorktreeCreate | NO | -- |
| WorktreeRemove | NO | -- |
| PreCompact | NO | -- |
| SessionEnd | NO | -- |

### Missing Spec Fields

| Field | Used | Should Use |
|-------|------|------------|
| async | NO | session-start-pull.sh should be async true |
| once | NO | session-start-pull.sh and session-start-context.sh should be once true |
| timeout | NO | All hooks use run-hook.js 30s timeout, but the spec supports per-hook timeout in settings.json |

### Hook Type Usage

Only the command type is used. The spec also supports http, prompt, and agent types. The prompt type could replace simple context-injection hooks (session-start-context.sh, prompt-context.sh) more cleanly.

---

## 4. Recommendations

### Critical (Fix Now)

1. **Add stop_hook_active check to session-stop-summary.sh.** Without this, the Stop hook could cause an infinite loop if its output triggers another stop event. Read stdin JSON, check the flag, exit early if true.

2. **Migrate PreToolUse hooks from CLAUDE_TOOL_INPUT to stdin JSON parsing.** The env var approach is not part of the official spec. Hooks that need tool input (guard-dangerous.sh, pre-commit-counts.sh, pre-write-validate.sh) should read from stdin like the PostToolUse hooks already do. Extract tool_input.command (for Bash) or tool_input.file_path (for Write/Edit) from the JSON.

### Important (Fix Soon)

3. **Add once true to SessionStart hooks.** Both session-start-pull.sh and session-start-context.sh should only run once per session, not on reconnect. Add the field to their config in settings.json.

4. **Add async true to session-start-pull.sh config.** The hook already uses ampersand internally, but declaring it async in the config is more correct and gives Claude Code better visibility.

5. **Read cwd from stdin JSON in prompt-context.sh and session-stop-summary.sh.** Both hooks currently rely on the shell working directory or custom env vars. The spec provides cwd in stdin JSON -- use it for reliability.

### Nice to Have (Consider Adding)

6. **Add a PreCompact hook.** Could save important context state before compaction, ensuring critical information survives context window compression.

7. **Add a SessionEnd hook.** Distinct from Stop -- SessionEnd fires when the session truly ends (not just when Claude stops generating). Could be used for more reliable cleanup than the Stop hook.

8. **Add a PostToolUseFailure hook.** Could log failed tool executions for debugging, especially for Bash commands that fail silently.

9. **Consider the prompt hook type for context injection.** The prompt-context.sh and session-start-context.sh hooks are essentially prompt injection -- the prompt hook type might be a cleaner fit than command type with stdout capture.

10. **Expand secret-scan.sh patterns.** Add detection for Google Cloud keys (AIza prefix), Azure storage keys, Stripe keys (sk_live, pk_live), and generic base64-encoded secrets.

11. **Fix stdin passthrough in run-hook.js.** Explicitly buffer stdin and pass via input option to execSync for guaranteed delivery to child scripts. See section 1 for the code example.

---

## 5. Unregistered Hooks on Disk

Two hook scripts exist in ~/.claude/hooks/ but are not registered in settings.json:

| Script | Purpose | Status |
|--------|---------|--------|
| format-code.sh | Auto-format after Write/Edit | Intentionally deregistered (latency) |
| post-edit-lint.sh | Lint after Write/Edit | Intentionally deregistered (latency) |

Both are documented as deregistered in the README. No action needed.

---

## 6. Cross-Platform Concerns

| Concern | Status |
|---------|--------|
| Windows path resolution | HANDLED by run-hook.js |
| Git Bash vs WSL bash | HANDLED by run-hook.js |
| macOS vs Linux stat syntax | HANDLED in session-start-context.sh |
| Windows Git Bash stat | UNKNOWN -- stat -c%Y may not work in all Git Bash versions |

---

## Appendix: Official Spec Hook Events (18 Total)

For reference, the complete list of hook events in the official spec:

1. SessionStart -- Session begins
2. UserPromptSubmit -- User sends a prompt
3. PreToolUse -- Before tool execution (supports matcher)
4. PermissionRequest -- When tool requests permission
5. PostToolUse -- After tool execution (supports matcher)
6. PostToolUseFailure -- After tool execution fails
7. Notification -- System notification
8. SubagentStart -- Subagent spawned
9. SubagentStop -- Subagent finished
10. Stop -- Claude stops generating (has stop_hook_active field)
11. TeammateIdle -- Teammate agent is idle
12. TaskCompleted -- Task marked complete
13. ConfigChange -- Configuration changed
14. WorktreeCreate -- Worktree created
15. WorktreeRemove -- Worktree removed
16. PreCompact -- Before context compaction
17. SessionEnd -- Session truly ends

---

*Report generated by Claude Opus 4.6. Read-only audit -- no files were modified.*
