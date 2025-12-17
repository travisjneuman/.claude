# Project Scaffolding

Complete setup for new macOS Swift apps with all necessary files and configurations.

<new_project_checklist>
1. Create project.yml for XcodeGen
2. Create Swift source files
3. Run `xcodegen generate`
4. Configure signing (DEVELOPMENT_TEAM)
5. Build and verify with `xcodebuild`
</new_project_checklist>

<xcodegen_setup>
**Install XcodeGen** (one-time):
```bash
brew install xcodegen
```

**Create a new macOS app**:
```bash
mkdir MyApp && cd MyApp
mkdir -p Sources Tests Resources
# Create project.yml (see template below)
# Create Swift files
xcodegen generate
xcodebuild -project MyApp.xcodeproj -scheme MyApp build
```
</xcodegen_setup>

<project_yml_template>
**project.yml** - Complete macOS SwiftUI app template:

```yaml
name: MyApp
options:
  bundleIdPrefix: com.yourcompany
  deploymentTarget:
    macOS: "14.0"
  xcodeVersion: "15.0"
  createIntermediateGroups: true

configs:
  Debug: debug
  Release: release

settings:
  base:
    SWIFT_VERSION: "5.9"
    MACOSX_DEPLOYMENT_TARGET: "14.0"

targets:
  MyApp:
    type: application
    platform: macOS
    sources:
      - Sources
    resources:
      - Resources
    info:
      path: Sources/Info.plist
      properties:
        LSMinimumSystemVersion: $(MACOSX_DEPLOYMENT_TARGET)
        CFBundleName: $(PRODUCT_NAME)
        CFBundleIdentifier: $(PRODUCT_BUNDLE_IDENTIFIER)
        CFBundleShortVersionString: "1.0"
        CFBundleVersion: "1"
        LSApplicationCategoryType: public.app-category.utilities
        NSPrincipalClass: NSApplication
        NSHighResolutionCapable: true
    entitlements:
      path: Sources/MyApp.entitlements
      properties:
        com.apple.security.app-sandbox: true
        com.apple.security.network.client: true
        com.apple.security.files.user-selected.read-write: true
    settings:
      base:
        PRODUCT_BUNDLE_IDENTIFIER: com.yourcompany.myapp
        PRODUCT_NAME: MyApp
        CODE_SIGN_STYLE: Automatic
        DEVELOPMENT_TEAM: YOURTEAMID
      configs:
        Debug:
          DEBUG_INFORMATION_FORMAT: dwarf-with-dsym
          SWIFT_OPTIMIZATION_LEVEL: -Onone
          CODE_SIGN_ENTITLEMENTS: Sources/MyApp.entitlements
        Release:
          SWIFT_OPTIMIZATION_LEVEL: -Osize

  MyAppTests:
    type: bundle.unit-test
    platform: macOS
    sources:
      - Tests
    dependencies:
      - target: MyApp
    settings:
      base:
        PRODUCT_BUNDLE_IDENTIFIER: com.yourcompany.myapp.tests

schemes:
  MyApp:
    build:
      targets:
        MyApp: all
        MyAppTests: [test]
    run:
      config: Debug
    test:
      config: Debug
      gatherCoverageData: true
      targets:
        - MyAppTests
    profile:
      config: Release
    archive:
      config: Release
```
</project_yml_template>

<project_yml_swiftdata>
**project.yml with SwiftData**:

Add to target settings:
```yaml
    settings:
      base:
        # ... existing settings ...
        SWIFT_ACTIVE_COMPILATION_CONDITIONS: "$(inherited) SWIFT_DATA"
    dependencies:
      - sdk: SwiftData.framework
```
</project_yml_swiftdata>

<project_yml_packages>
**Adding Swift Package dependencies**:

```yaml
packages:
  Alamofire:
    url: https://github.com/Alamofire/Alamofire
    from: 5.8.0
  KeychainAccess:
    url: https://github.com/kishikawakatsumi/KeychainAccess
    from: 4.2.0

targets:
  MyApp:
    # ... other config ...
    dependencies:
      - package: Alamofire
      - package: KeychainAccess
```
</project_yml_packages>

<alternative_xcode_template>
**Alternative: Xcode GUI method**

For users who prefer Xcode:
1. File > New > Project > macOS > App
2. Settings: SwiftUI, Swift, SwiftData (optional)
3. Save to desired location
</alternative_xcode_template>

<minimal_file_structure>
```
MyApp/
├── MyApp.xcodeproj/
│   └── project.pbxproj
├── MyApp/
│   ├── MyApp.swift           # App entry point
│   ├── ContentView.swift     # Main view
│   ├── Info.plist
│   ├── MyApp.entitlements
│   └── Assets.xcassets/
│       ├── Contents.json
│       ├── AppIcon.appiconset/
│       │   └── Contents.json
│       └── AccentColor.colorset/
│           └── Contents.json
└── MyAppTests/
    └── MyAppTests.swift
```
</minimal_file_structure>

<starter_code>
<app_entry_point>
**MyApp.swift**:
```swift
import SwiftUI

@main
struct MyApp: App {
    @State private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(appState)
        }
        .commands {
            CommandGroup(replacing: .newItem) { }  // Remove default New
        }

        Settings {
            SettingsView()
        }
    }
}
```
</app_entry_point>

<app_state>
**AppState.swift**:
```swift
import SwiftUI

@Observable
class AppState {
    var items: [Item] = []
    var selectedItemID: UUID?
    var searchText = ""

    var selectedItem: Item? {
        items.first { $0.id == selectedItemID }
    }

    var filteredItems: [Item] {
        if searchText.isEmpty {
            return items
        }
        return items.filter { $0.name.localizedCaseInsensitiveContains(searchText) }
    }

    func addItem(_ name: String) {
        let item = Item(name: name)
        items.append(item)
        selectedItemID = item.id
    }

    func deleteItem(_ item: Item) {
        items.removeAll { $0.id == item.id }
        if selectedItemID == item.id {
            selectedItemID = nil
        }
    }
}

struct Item: Identifiable, Hashable {
    let id = UUID()
    var name: String
    var createdAt = Date()
}
```
</app_state>

<content_view>
**ContentView.swift**:
```swift
import SwiftUI

struct ContentView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        @Bindable var appState = appState

        NavigationSplitView {
            SidebarView()
        } detail: {
            DetailView()
        }
        .searchable(text: $appState.searchText)
        .navigationTitle("MyApp")
    }
}

struct SidebarView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        @Bindable var appState = appState

        List(appState.filteredItems, selection: $appState.selectedItemID) { item in
            Text(item.name)
                .tag(item.id)
        }
        .toolbar {
            ToolbarItem {
                Button(action: addItem) {
                    Label("Add", systemImage: "plus")
                }
            }
        }
    }

    private func addItem() {
        appState.addItem("New Item")
    }
}

struct DetailView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        if let item = appState.selectedItem {
            VStack {
                Text(item.name)
                    .font(.title)
                Text(item.createdAt.formatted())
                    .foregroundStyle(.secondary)
            }
            .padding()
        } else {
            ContentUnavailableView("No Selection", systemImage: "sidebar.left")
        }
    }
}
```
</content_view>

<settings_view>
**SettingsView.swift**:
```swift
import SwiftUI

struct SettingsView: View {
    var body: some View {
        TabView {
            GeneralSettingsView()
                .tabItem {
                    Label("General", systemImage: "gear")
                }

            AdvancedSettingsView()
                .tabItem {
                    Label("Advanced", systemImage: "slider.horizontal.3")
                }
        }
        .frame(width: 450, height: 250)
    }
}

struct GeneralSettingsView: View {
    @AppStorage("showWelcome") private var showWelcome = true
    @AppStorage("defaultName") private var defaultName = "Untitled"

    var body: some View {
        Form {
            Toggle("Show welcome screen on launch", isOn: $showWelcome)
            TextField("Default item name", text: $defaultName)
        }
        .padding()
    }
}

struct AdvancedSettingsView: View {
    @AppStorage("enableLogging") private var enableLogging = false

    var body: some View {
        Form {
            Toggle("Enable debug logging", isOn: $enableLogging)
        }
        .padding()
    }
}
```
</settings_view>
</starter_code>

<info_plist>
**Info.plist** (complete template):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleName</key>
    <string>$(PRODUCT_NAME)</string>
    <key>CFBundleDisplayName</key>
    <string>MyApp</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundlePackageType</key>
    <string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
    <key>LSMinimumSystemVersion</key>
    <string>$(MACOSX_DEPLOYMENT_TARGET)</string>
    <key>NSHumanReadableCopyright</key>
    <string>Copyright © 2024 Your Name. All rights reserved.</string>
    <key>NSPrincipalClass</key>
    <string>NSApplication</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>LSApplicationCategoryType</key>
    <string>public.app-category.productivity</string>
</dict>
</plist>
```

**Common category types**:
- `public.app-category.productivity`
- `public.app-category.developer-tools`
- `public.app-category.utilities`
- `public.app-category.music`
- `public.app-category.graphics-design`
</info_plist>

<entitlements>
**MyApp.entitlements** (sandbox with network):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.network.client</key>
    <true/>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
</dict>
</plist>
```

**Debug entitlements** (add for debug builds):
```xml
<key>com.apple.security.get-task-allow</key>
<true/>
```
</entitlements>

<assets_catalog>
**Assets.xcassets/Contents.json**:
```json
{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```

**Assets.xcassets/AppIcon.appiconset/Contents.json**:
```json
{
  "images" : [
    {
      "idiom" : "mac",
      "scale" : "1x",
      "size" : "16x16"
    },
    {
      "idiom" : "mac",
      "scale" : "2x",
      "size" : "16x16"
    },
    {
      "idiom" : "mac",
      "scale" : "1x",
      "size" : "32x32"
    },
    {
      "idiom" : "mac",
      "scale" : "2x",
      "size" : "32x32"
    },
    {
      "idiom" : "mac",
      "scale" : "1x",
      "size" : "128x128"
    },
    {
      "idiom" : "mac",
      "scale" : "2x",
      "size" : "128x128"
    },
    {
      "idiom" : "mac",
      "scale" : "1x",
      "size" : "256x256"
    },
    {
      "idiom" : "mac",
      "scale" : "2x",
      "size" : "256x256"
    },
    {
      "idiom" : "mac",
      "scale" : "1x",
      "size" : "512x512"
    },
    {
      "idiom" : "mac",
      "scale" : "2x",
      "size" : "512x512"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```

**Assets.xcassets/AccentColor.colorset/Contents.json**:
```json
{
  "colors" : [
    {
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
```
</assets_catalog>

<swift_packages>
Add dependencies via Package.swift or Xcode:

**Common packages**:
```swift
// In Xcode: File > Add Package Dependencies

// Networking
.package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.8.0")

// Logging
.package(url: "https://github.com/apple/swift-log.git", from: "1.5.0")

// Keychain
.package(url: "https://github.com/kishikawakatsumi/KeychainAccess.git", from: "4.2.0")

// Syntax highlighting
.package(url: "https://github.com/raspu/Highlightr.git", from: "2.1.0")
```

**Add via CLI**:
```bash
# Edit project to add package dependency
# (Easier to do once in Xcode, then clone for future projects)
```
</swift_packages>

<verify_setup>
```bash
# Verify project configuration
xcodebuild -list -project MyApp.xcodeproj

# Build
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -configuration Debug \
    -derivedDataPath ./build \
    build

# Run
open ./build/Build/Products/Debug/MyApp.app

# Check signing
codesign -dv ./build/Build/Products/Debug/MyApp.app
```
</verify_setup>

<next_steps>
After scaffolding:

1. **Define your data model**: Create models in Models/ folder
2. **Choose persistence**: SwiftData, Core Data, or file-based
3. **Design main UI**: Sidebar + detail or single-window layout
4. **Add menu commands**: Edit AppCommands.swift
5. **Configure logging**: Set up os.Logger with appropriate subsystem
6. **Write tests**: Unit tests for models, integration tests for services

See [cli-workflow.md](cli-workflow.md) for build/run/debug workflow.
</next_steps>
