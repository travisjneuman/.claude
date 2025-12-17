# CLI Observability

Complete debugging and monitoring without opening Xcode. Claude has full visibility into build errors, runtime logs, crashes, memory issues, and network traffic.

<prerequisites>
```bash
# Install observability tools (one-time)
brew tap ldomaradzki/xcsift && brew install xcsift
brew install mitmproxy xcbeautify
```
</prerequisites>

<build_output>
## Build Error Parsing

**xcsift** converts verbose xcodebuild output to token-efficient JSON for AI agents:

```bash
xcodebuild -project MyApp.xcodeproj -scheme MyApp build 2>&1 | xcsift
```

Output includes structured errors with file paths and line numbers:
```json
{
  "status": "failed",
  "errors": [
    {"file": "/path/File.swift", "line": 42, "message": "Type mismatch..."}
  ]
}
```

**Alternative** (human-readable):
```bash
xcodebuild build 2>&1 | xcbeautify
```
</build_output>

<runtime_logging>
## Runtime Logs

### In-App Logging Pattern

Add to all apps:
```swift
import os

extension Logger {
    static let app = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "App")
    static let network = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "Network")
    static let data = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "Data")
}

// Usage
Logger.network.debug("Request: \(url)")
Logger.data.error("Save failed: \(error)")
```

### Stream Logs from Running App

```bash
# All logs from your app
log stream --level debug --predicate 'subsystem == "com.yourcompany.MyApp"'

# Filter by category
log stream --level debug \
  --predicate 'subsystem == "com.yourcompany.MyApp" AND category == "Network"'

# Errors only
log stream --predicate 'subsystem == "com.yourcompany.MyApp" AND messageType == error'

# JSON output for parsing
log stream --level debug --style json \
  --predicate 'subsystem == "com.yourcompany.MyApp"'
```

### Search Historical Logs

```bash
# Last hour
log show --predicate 'subsystem == "com.yourcompany.MyApp"' --last 1h

# Export to file
log show --predicate 'subsystem == "com.yourcompany.MyApp"' --last 1h > logs.txt
```
</runtime_logging>

<crash_analysis>
## Crash Logs

### Find Crashes

```bash
# List crash reports
ls ~/Library/Logs/DiagnosticReports/ | grep MyApp

# View latest crash
cat ~/Library/Logs/DiagnosticReports/MyApp_*.ips | head -200
```

### Symbolicate with atos

```bash
# Get load address from "Binary Images:" section of crash report
xcrun atos -arch arm64 \
  -o MyApp.app.dSYM/Contents/Resources/DWARF/MyApp \
  -l 0x104600000 \
  0x104605ca4

# Verify dSYM matches
xcrun dwarfdump --uuid MyApp.app.dSYM
```

### Symbolicate with LLDB

```bash
xcrun lldb
(lldb) command script import lldb.macosx.crashlog
(lldb) crashlog /path/to/crash.ips
```
</crash_analysis>

<debugger>
## LLDB Debugging

### Attach to Running App

```bash
# By name
lldb -n MyApp

# By PID
lldb -p $(pgrep MyApp)
```

### Launch and Debug

```bash
lldb ./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp
(lldb) run
```

### Essential Commands

```bash
# Breakpoints
(lldb) breakpoint set --file ContentView.swift --line 42
(lldb) breakpoint set --name "AppState.addItem"
(lldb) breakpoint set --name saveItem --condition 'item.name == "Test"'

# Watchpoints (break when value changes)
(lldb) watchpoint set variable self.items.count

# Execution
(lldb) continue    # or 'c'
(lldb) next        # step over
(lldb) step        # step into
(lldb) finish      # step out

# Inspection
(lldb) p variable
(lldb) po object
(lldb) frame variable   # all local vars
(lldb) bt               # backtrace
(lldb) bt all           # all threads

# Evaluate expressions
(lldb) expr self.items.count
(lldb) expr self.items.append(newItem)
```
</debugger>

<memory_debugging>
## Memory Debugging

### Leak Detection

```bash
# Check running process for leaks
leaks MyApp

# Run with leak check at exit
leaks --atExit -- ./MyApp

# With stack traces (shows where leak originated)
MallocStackLogging=1 ./MyApp &
leaks MyApp
```

### Heap Analysis

```bash
# Show heap summary
heap MyApp

# Show allocations of specific class
heap MyApp -class NSString

# Virtual memory regions
vmmap --summary MyApp
```

### Profiling with xctrace

```bash
# List templates
xcrun xctrace list templates

# Time Profiler
xcrun xctrace record \
  --template 'Time Profiler' \
  --time-limit 30s \
  --output profile.trace \
  --launch -- ./MyApp.app/Contents/MacOS/MyApp

# Leaks
xcrun xctrace record \
  --template 'Leaks' \
  --time-limit 5m \
  --attach $(pgrep MyApp) \
  --output leaks.trace

# Export data
xcrun xctrace export --input profile.trace --toc
```
</memory_debugging>

<sanitizers>
## Sanitizers

Enable via xcodebuild flags:

```bash
# Address Sanitizer (memory errors, buffer overflows)
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -enableAddressSanitizer YES

# Thread Sanitizer (race conditions)
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -enableThreadSanitizer YES

# Undefined Behavior Sanitizer
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -enableUndefinedBehaviorSanitizer YES
```

**Note:** ASAN and TSAN cannot run simultaneously.
</sanitizers>

<network_inspection>
## Network Traffic Inspection

### mitmproxy Setup

```bash
# Run proxy (defaults to localhost:8080)
mitmproxy   # TUI
mitmdump    # CLI output only
```

### Configure macOS Proxy

```bash
# Enable
networksetup -setwebproxy "Wi-Fi" 127.0.0.1 8080
networksetup -setsecurewebproxy "Wi-Fi" 127.0.0.1 8080

# Disable when done
networksetup -setwebproxystate "Wi-Fi" off
networksetup -setsecurewebproxystate "Wi-Fi" off
```

### Log Traffic

```bash
# Log all requests
mitmdump -w traffic.log

# Filter by domain
mitmdump --filter "~d api.example.com"

# Verbose (show bodies)
mitmdump -v
```
</network_inspection>

<test_results>
## Test Result Parsing

```bash
# Run tests with result bundle
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -resultBundlePath TestResults.xcresult

# Get summary
xcrun xcresulttool get test-results summary --path TestResults.xcresult

# Export as JSON
xcrun xcresulttool get --path TestResults.xcresult --format json > results.json

# Coverage report
xcrun xccov view --report TestResults.xcresult

# Coverage as JSON
xcrun xccov view --report --json TestResults.xcresult > coverage.json
```
</test_results>

<swiftui_debugging>
## SwiftUI Debugging

### Track View Re-evaluation

```swift
var body: some View {
    let _ = Self._printChanges()  // Logs what caused re-render
    VStack {
        // ...
    }
}
```

### Dump Objects

```swift
let _ = dump(someObject)  // Full object hierarchy to console
```

**Note:** No CLI equivalent for Xcode's visual view hierarchy inspector. Use logging extensively.
</swiftui_debugging>

<standard_debug_workflow>
## Standard Debug Workflow

```bash
# 1. Build with error parsing
xcodebuild -project MyApp.xcodeproj -scheme MyApp build 2>&1 | xcsift

# 2. Run with log streaming (background terminal)
log stream --level debug --predicate 'subsystem == "com.yourcompany.MyApp"' &

# 3. Launch app
open ./build/Build/Products/Debug/MyApp.app

# 4. If crash occurs
cat ~/Library/Logs/DiagnosticReports/MyApp_*.ips | head -100

# 5. Memory check
leaks MyApp

# 6. Deep debugging
lldb -n MyApp
```
</standard_debug_workflow>

<cli_vs_xcode>
## What CLI Can and Cannot Do

| Task | CLI | Tool |
|------|-----|------|
| Build errors | ✓ | xcsift |
| Runtime logs | ✓ | log stream |
| Crash symbolication | ✓ | atos, lldb |
| Breakpoints/debugging | ✓ | lldb |
| Memory leaks | ✓ | leaks, xctrace |
| CPU profiling | ✓ | xctrace |
| Network inspection | ✓ | mitmproxy |
| Test results | ✓ | xcresulttool |
| Sanitizers | ✓ | xcodebuild flags |
| View hierarchy | ⚠️ | _printChanges() only |
| GPU debugging | ✗ | Requires Xcode |
</cli_vs_xcode>
