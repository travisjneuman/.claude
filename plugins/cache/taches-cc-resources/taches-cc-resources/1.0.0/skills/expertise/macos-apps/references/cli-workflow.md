# CLI-Only Workflow

Build, run, debug, and monitor macOS apps entirely from command line without opening Xcode.

<prerequisites>
```bash
# Ensure Xcode is installed and selected
xcode-select -p
# Should show: /Applications/Xcode.app/Contents/Developer

# If not, run:
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

# Install XcodeGen for project creation
brew install xcodegen

# Optional: prettier build output
brew install xcbeautify
```
</prerequisites>

<create_project>
**Create a new project entirely from CLI**:

```bash
# Create directory structure
mkdir MyApp && cd MyApp
mkdir -p Sources Tests Resources

# Create project.yml (Claude generates this)
cat > project.yml << 'EOF'
name: MyApp
options:
  bundleIdPrefix: com.yourcompany
  deploymentTarget:
    macOS: "14.0"
targets:
  MyApp:
    type: application
    platform: macOS
    sources: [Sources]
    settings:
      PRODUCT_BUNDLE_IDENTIFIER: com.yourcompany.myapp
      DEVELOPMENT_TEAM: YOURTEAMID
EOF

# Create app entry point
cat > Sources/MyApp.swift << 'EOF'
import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            Text("Hello, World!")
        }
    }
}
EOF

# Generate .xcodeproj
xcodegen generate

# Verify
xcodebuild -list -project MyApp.xcodeproj

# Build
xcodebuild -project MyApp.xcodeproj -scheme MyApp build
```

See [project-scaffolding.md](project-scaffolding.md) for complete project.yml templates.
</create_project>

<build>
<list_schemes>
```bash
# See available schemes and targets
xcodebuild -list -project MyApp.xcodeproj
```
</list_schemes>

<build_debug>
```bash
# Build debug configuration
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -configuration Debug \
    -derivedDataPath ./build \
    build

# Output location
ls ./build/Build/Products/Debug/MyApp.app
```
</build_debug>

<build_release>
```bash
# Build release configuration
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -configuration Release \
    -derivedDataPath ./build \
    build
```
</build_release>

<build_with_signing>
```bash
# Build with code signing for distribution
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -configuration Release \
    -derivedDataPath ./build \
    CODE_SIGN_IDENTITY="Developer ID Application: Your Name" \
    DEVELOPMENT_TEAM=YOURTEAMID \
    build
```
</build_with_signing>

<clean>
```bash
# Clean build artifacts
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    clean

# Remove derived data
rm -rf ./build
```
</clean>

<build_errors>
Build output goes to stdout. Filter for errors:

```bash
xcodebuild -project MyApp.xcodeproj -scheme MyApp build 2>&1 | grep -E "error:|warning:"
```

For prettier output, use xcpretty (install with `gem install xcpretty`):

```bash
xcodebuild -project MyApp.xcodeproj -scheme MyApp build | xcpretty
```
</build_errors>
</build>

<run>
<launch_app>
```bash
# Run the built app
open ./build/Build/Products/Debug/MyApp.app

# Or run directly (shows stdout in terminal)
./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp
```
</launch_app>

<run_with_arguments>
```bash
# Pass command line arguments
./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp --debug-mode

# Pass environment variables
MYAPP_DEBUG=1 ./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp
```
</run_with_arguments>

<background>
```bash
# Run in background (don't bring to front)
open -g ./build/Build/Products/Debug/MyApp.app

# Run hidden (no dock icon)
open -j ./build/Build/Products/Debug/MyApp.app
```
</background>
</run>

<logging>
<os_log_in_code>
Add logging to your Swift code:

```swift
import os

class DataService {
    private let logger = Logger(subsystem: "com.yourcompany.MyApp", category: "Data")

    func loadItems() async throws -> [Item] {
        logger.info("Loading items...")

        do {
            let items = try await fetchItems()
            logger.info("Loaded \(items.count) items")
            return items
        } catch {
            logger.error("Failed to load items: \(error.localizedDescription)")
            throw error
        }
    }

    func saveItem(_ item: Item) {
        logger.debug("Saving item: \(item.id)")
        // ...
    }
}
```

**Log levels**:
- `.debug` - Verbose development info
- `.info` - General informational
- `.notice` - Notable conditions
- `.error` - Errors
- `.fault` - Critical failures
</os_log_in_code>

<stream_logs>
```bash
# Stream logs from your app (run while app is running)
log stream --predicate 'subsystem == "com.yourcompany.MyApp"' --level info

# Filter by category
log stream --predicate 'subsystem == "com.yourcompany.MyApp" and category == "Data"'

# Filter by process name
log stream --predicate 'process == "MyApp"' --level debug

# Include debug messages
log stream --predicate 'subsystem == "com.yourcompany.MyApp"' --level debug

# Show only errors
log stream --predicate 'subsystem == "com.yourcompany.MyApp" and messageType == error'
```
</stream_logs>

<search_past_logs>
```bash
# Search recent logs (last hour)
log show --predicate 'subsystem == "com.yourcompany.MyApp"' --last 1h

# Search specific time range
log show --predicate 'subsystem == "com.yourcompany.MyApp"' \
    --start "2024-01-15 10:00:00" \
    --end "2024-01-15 11:00:00"

# Export to file
log show --predicate 'subsystem == "com.yourcompany.MyApp"' --last 1h > app_logs.txt
```
</search_past_logs>

<system_logs>
```bash
# See app lifecycle events
log stream --predicate 'process == "MyApp" or (sender == "lsd" and message contains "MyApp")'

# Network activity (if using NSURLSession)
log stream --predicate 'subsystem == "com.apple.network" and process == "MyApp"'

# Core Data / SwiftData activity
log stream --predicate 'subsystem == "com.apple.coredata"'
```
</system_logs>
</logging>

<debugging>
<lldb_attach>
```bash
# Start app, then attach lldb
./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp &

# Attach by process name
lldb -n MyApp

# Or attach by PID
lldb -p $(pgrep MyApp)
```
</lldb_attach>

<lldb_launch>
```bash
# Launch app under lldb directly
lldb ./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp

# In lldb:
(lldb) run
```
</lldb_launch>

<common_lldb_commands>
```bash
# In lldb session:

# Set breakpoint by function name
(lldb) breakpoint set --name saveItem
(lldb) b DataService.swift:42

# Set conditional breakpoint
(lldb) breakpoint set --name saveItem --condition 'item.name == "Test"'

# Continue execution
(lldb) continue
(lldb) c

# Step over/into/out
(lldb) next
(lldb) step
(lldb) finish

# Print variable
(lldb) p item
(lldb) po self.items

# Print with format
(lldb) p/x pointer  # hex
(lldb) p/t flags    # binary

# Backtrace
(lldb) bt
(lldb) bt all  # all threads

# List threads
(lldb) thread list

# Switch thread
(lldb) thread select 2

# Frame info
(lldb) frame info
(lldb) frame variable  # all local variables

# Watchpoint (break when value changes)
(lldb) watchpoint set variable self.items.count

# Expression evaluation
(lldb) expr self.items.append(newItem)
```
</common_lldb_commands>

<debug_entitlement>
For lldb to attach, your app needs the `get-task-allow` entitlement (included in Debug builds by default):

```xml
<key>com.apple.security.get-task-allow</key>
<true/>
```

If you have attachment issues:
```bash
# Check entitlements
codesign -d --entitlements - ./build/Build/Products/Debug/MyApp.app
```
</debug_entitlement>
</debugging>

<crash_logs>
<locations>
```bash
# User crash logs
ls ~/Library/Logs/DiagnosticReports/

# System crash logs (requires sudo)
ls /Library/Logs/DiagnosticReports/

# Find your app's crashes
ls ~/Library/Logs/DiagnosticReports/ | grep MyApp
```
</locations>

<read_crash>
```bash
# View latest crash
cat ~/Library/Logs/DiagnosticReports/MyApp_*.ips | head -200

# Symbolicate (if you have dSYM)
atos -arch arm64 -o ./build/Build/Products/Debug/MyApp.app.dSYM/Contents/Resources/DWARF/MyApp -l 0x100000000 0x100001234
```
</read_crash>

<monitor_crashes>
```bash
# Watch for new crashes
fswatch ~/Library/Logs/DiagnosticReports/ | grep MyApp
```
</monitor_crashes>
</crash_logs>

<profiling>
<instruments_cli>
```bash
# List available templates
instruments -s templates

# Profile CPU usage
instruments -t "Time Profiler" -D trace.trace ./build/Build/Products/Debug/MyApp.app

# Profile memory
instruments -t "Allocations" -D memory.trace ./build/Build/Products/Debug/MyApp.app

# Profile leaks
instruments -t "Leaks" -D leaks.trace ./build/Build/Products/Debug/MyApp.app
```
</instruments_cli>

<signposts>
Add signposts for custom profiling:

```swift
import os

class DataService {
    private let signposter = OSSignposter(subsystem: "com.yourcompany.MyApp", category: "Performance")

    func loadItems() async throws -> [Item] {
        let signpostID = signposter.makeSignpostID()
        let state = signposter.beginInterval("Load Items", id: signpostID)

        defer {
            signposter.endInterval("Load Items", state)
        }

        return try await fetchItems()
    }
}
```

View in Instruments with "os_signpost" instrument.
</signposts>
</profiling>

<code_signing>
<check_signature>
```bash
# Verify signature
codesign -v ./build/Build/Products/Release/MyApp.app

# Show signature details
codesign -dv --verbose=4 ./build/Build/Products/Release/MyApp.app

# Show entitlements
codesign -d --entitlements - ./build/Build/Products/Release/MyApp.app
```
</check_signature>

<sign_manually>
```bash
# Sign with Developer ID (for distribution outside App Store)
codesign --force --sign "Developer ID Application: Your Name (TEAMID)" \
    --entitlements MyApp/MyApp.entitlements \
    --options runtime \
    ./build/Build/Products/Release/MyApp.app
```
</sign_manually>

<notarize>
```bash
# Create ZIP for notarization
ditto -c -k --keepParent ./build/Build/Products/Release/MyApp.app MyApp.zip

# Submit for notarization
xcrun notarytool submit MyApp.zip \
    --apple-id your@email.com \
    --team-id YOURTEAMID \
    --password @keychain:AC_PASSWORD \
    --wait

# Staple ticket to app
xcrun stapler staple ./build/Build/Products/Release/MyApp.app
```

**Store password in keychain**:
```bash
xcrun notarytool store-credentials --apple-id your@email.com --team-id TEAMID
```
</notarize>
</code_signing>

<testing>
<run_tests>
```bash
# Run all tests
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -derivedDataPath ./build \
    test

# Run specific test class
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -only-testing:MyAppTests/DataServiceTests \
    test

# Run specific test method
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -only-testing:MyAppTests/DataServiceTests/testLoadItems \
    test
```
</run_tests>

<test_output>
```bash
# Pretty test output
xcodebuild test -project MyApp.xcodeproj -scheme MyApp | xcpretty --test

# Generate test report
xcodebuild test -project MyApp.xcodeproj -scheme MyApp \
    -resultBundlePath ./TestResults.xcresult

# View result bundle
xcrun xcresulttool get --path ./TestResults.xcresult --format json
```
</test_output>

<test_coverage>
```bash
# Build with coverage
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -enableCodeCoverage YES \
    -derivedDataPath ./build \
    test

# Generate coverage report
xcrun llvm-cov report \
    ./build/Build/Products/Debug/MyApp.app/Contents/MacOS/MyApp \
    -instr-profile=./build/Build/ProfileData/*/Coverage.profdata
```
</test_coverage>
</testing>

<complete_workflow>
Typical development cycle without opening Xcode:

```bash
# 1. Edit code (in your editor of choice)
# Claude Code, vim, VS Code, etc.

# 2. Build
xcodebuild -project MyApp.xcodeproj -scheme MyApp -configuration Debug -derivedDataPath ./build build 2>&1 | grep -E "error:|warning:" || echo "Build succeeded"

# 3. Run
open ./build/Build/Products/Debug/MyApp.app

# 4. Monitor logs (in separate terminal)
log stream --predicate 'subsystem == "com.yourcompany.MyApp"' --level debug

# 5. If crash, check logs
cat ~/Library/Logs/DiagnosticReports/MyApp_*.ips | head -100

# 6. Debug if needed
lldb -n MyApp

# 7. Run tests
xcodebuild -project MyApp.xcodeproj -scheme MyApp test

# 8. Build release
xcodebuild -project MyApp.xcodeproj -scheme MyApp -configuration Release -derivedDataPath ./build build
```
</complete_workflow>

<helper_script>
Create a build script for convenience:

```bash
#!/bin/bash
# build.sh

PROJECT="MyApp.xcodeproj"
SCHEME="MyApp"
CONFIG="${1:-Debug}"

echo "Building $SCHEME ($CONFIG)..."

xcodebuild -project "$PROJECT" \
    -scheme "$SCHEME" \
    -configuration "$CONFIG" \
    -derivedDataPath ./build \
    build 2>&1 | tee build.log | grep -E "error:|warning:|BUILD"

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "✓ Build succeeded"
    echo "App: ./build/Build/Products/$CONFIG/$SCHEME.app"
else
    echo "✗ Build failed - see build.log"
    exit 1
fi
```

```bash
chmod +x build.sh
./build.sh        # Debug build
./build.sh Release  # Release build
```
</helper_script>

<useful_aliases>
Add to ~/.zshrc or ~/.bashrc:

```bash
# Build current project
alias xb='xcodebuild -project *.xcodeproj -scheme $(basename *.xcodeproj .xcodeproj) -derivedDataPath ./build build'

# Build and run
alias xbr='xb && open ./build/Build/Products/Debug/*.app'

# Run tests
alias xt='xcodebuild -project *.xcodeproj -scheme $(basename *.xcodeproj .xcodeproj) test'

# Stream logs for current project
alias xl='log stream --predicate "subsystem contains \"$(defaults read ./build/Build/Products/Debug/*.app/Contents/Info.plist CFBundleIdentifier)\"" --level debug'

# Clean
alias xc='xcodebuild -project *.xcodeproj -scheme $(basename *.xcodeproj .xcodeproj) clean && rm -rf ./build'
```
</useful_aliases>
