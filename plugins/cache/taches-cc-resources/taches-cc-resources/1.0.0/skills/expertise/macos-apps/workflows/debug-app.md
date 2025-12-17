# Workflow: Debug an Existing macOS App

<required_reading>
**Read these reference files NOW:**
1. references/cli-observability.md
2. references/testing-debugging.md
</required_reading>

<philosophy>
Debugging is iterative. Use whatever gets you to the root cause fastest:
- Small app, obvious symptom → read relevant code
- Large codebase, unclear cause → use tools to narrow down
- Code looks correct but fails → tools reveal runtime behavior
- After fixing → tools verify the fix

The goal is root cause, not following a ritual.
</philosophy>

<process>
## Step 1: Understand the Symptom

Ask the user or observe:
- What's the actual behavior vs expected?
- When does it happen? (startup, after action, under load)
- Is it reproducible?
- Any error messages?

## Step 2: Build and Check for Compile Errors

```bash
cd /path/to/app
xcodebuild -project AppName.xcodeproj -scheme AppName -derivedDataPath ./build build 2>&1 | xcsift
```

Fix any compile errors first. They're the easiest wins.

## Step 3: Choose Your Approach

**If you know roughly where the problem is:**
→ Read that code, form hypothesis, test it

**If you have no idea where to start:**
→ Use tools to narrow down (Step 4)

**If code looks correct but behavior is wrong:**
→ Runtime observation (Step 4) reveals what's actually happening

## Step 4: Runtime Diagnostics

Launch with log streaming:
```bash
# Terminal 1: stream logs
log stream --level debug --predicate 'subsystem == "com.company.AppName"'

# Terminal 2: launch
open ./build/Build/Products/Debug/AppName.app
```

**Match symptom to tool:**

| Symptom | Tool | Command |
|---------|------|---------|
| Memory growing / leak suspected | leaks | `leaks AppName` |
| UI freezes / hangs | spindump | `spindump AppName -o /tmp/hang.txt` |
| Crash | crash report | `cat ~/Library/Logs/DiagnosticReports/AppName_*.ips` |
| Slow performance | time profiler | `xcrun xctrace record --template 'Time Profiler' --attach AppName` |
| Race condition suspected | thread sanitizer | Build with `-enableThreadSanitizer YES` |
| Nothing happens / silent failure | logs | Check log stream output |

**Interact with the app** to trigger the issue. Use `cliclick` if available:
```bash
cliclick c:500,300  # click at coordinates
```

## Step 5: Interpret Tool Output

| Tool Shows | Likely Cause | Where to Look |
|------------|--------------|---------------|
| Leaked object: DataService | Retain cycle | Closures capturing self in DataService |
| Main thread blocked in computeX | Sync work on main | That function - needs async |
| Crash at force unwrap | Nil where unexpected | The unwrap site + data flow to it |
| Thread sanitizer warning | Data race | Shared mutable state without sync |
| High CPU in function X | Hot path | That function - algorithm or loop issue |

## Step 6: Read Relevant Code

Now you know where to look. Read that specific code:
- Understand what it's trying to do
- Identify the flaw
- Consider edge cases

## Step 7: Fix the Root Cause

Not the symptom. The actual cause.

**Bad:** Add nil check to prevent crash
**Good:** Fix why the value is nil in the first place

**Bad:** Add try/catch to swallow error
**Good:** Fix what's causing the error

## Step 8: Verify the Fix

Use the same diagnostic that found the issue:
```bash
# Rebuild
xcodebuild -project AppName.xcodeproj -scheme AppName build

# Launch and test
open ./build/Build/Products/Debug/AppName.app

# Run same diagnostic
leaks AppName  # should show 0 leaks now
```

## Step 9: Prevent Regression

If the bug was significant, write a test:
```bash
xcodebuild test -project AppName.xcodeproj -scheme AppName
```
</process>

<common_patterns>
## Memory Leaks
**Symptom:** Memory grows over time, `leaks` shows retained objects
**Common causes:**
- Closure captures `self` strongly: `{ self.doThing() }`
- Delegate not weak: `var delegate: SomeProtocol`
- Timer not invalidated
**Fix:** `[weak self]`, `weak var delegate`, `timer.invalidate()`

## UI Freezes
**Symptom:** App hangs, spinning beachball, spindump shows main thread blocked
**Common causes:**
- Sync network call on main thread
- Heavy computation on main thread
- Deadlock from incorrect async/await usage
**Fix:** `Task { }`, `Task.detached { }`, check actor isolation

## Crashes
**Symptom:** App terminates, crash report generated
**Common causes:**
- Force unwrap of nil: `value!`
- Array index out of bounds
- Unhandled error
**Fix:** `guard let`, bounds checking, proper error handling

## Silent Failures
**Symptom:** Nothing happens, no error, no crash
**Common causes:**
- Error silently caught and ignored
- Async task never awaited
- Condition always false
**Fix:** Add logging, check control flow, verify async chains

## Performance Issues
**Symptom:** Slow, high CPU, laggy UI
**Common causes:**
- O(n²) or worse algorithm
- Unnecessary re-renders in SwiftUI
- Repeated expensive operations
**Fix:** Better algorithm, memoization, `let _ = Self._printChanges()`
</common_patterns>

<tools_quick_reference>
```bash
# Build errors (structured JSON)
xcodebuild build 2>&1 | xcsift

# Real-time logs
log stream --level debug --predicate 'subsystem == "com.company.App"'

# Memory leaks
leaks AppName

# UI hangs
spindump AppName -o /tmp/hang.txt

# Crash reports
cat ~/Library/Logs/DiagnosticReports/AppName_*.ips | head -100

# Memory regions
vmmap --summary AppName

# Heap analysis
heap AppName

# Attach debugger
lldb -n AppName

# CPU profiling
xcrun xctrace record --template 'Time Profiler' --attach AppName

# Thread issues (build flag)
xcodebuild build -enableThreadSanitizer YES
```
</tools_quick_reference>
