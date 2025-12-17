# Menu Bar Apps

Status bar utilities with quick access and minimal UI.

<when_to_use>
Use menu bar pattern when:
- Quick actions or status display
- Background functionality
- Minimal persistent UI
- System-level utilities

Examples: Rectangle, Bartender, system utilities
</when_to_use>

<basic_setup>
```swift
import SwiftUI

@main
struct MenuBarApp: App {
    var body: some Scene {
        MenuBarExtra("MyApp", systemImage: "star.fill") {
            MenuContent()
        }
        .menuBarExtraStyle(.window)  // or .menu

        // Optional settings window
        Settings {
            SettingsView()
        }
    }
}

struct MenuContent: View {
    @AppStorage("isEnabled") private var isEnabled = true
    @Environment(\.openSettings) private var openSettings

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Toggle("Enabled", isOn: $isEnabled)

            Divider()

            Button("Settings...") {
                openSettings()
            }
            .keyboardShortcut(",", modifiers: .command)

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q", modifiers: .command)
        }
        .padding()
        .frame(width: 200)
    }
}
```
</basic_setup>

<menu_styles>
<window_style>
Rich UI with any SwiftUI content:

```swift
MenuBarExtra("MyApp", systemImage: "star.fill") {
    WindowStyleContent()
}
.menuBarExtraStyle(.window)

struct WindowStyleContent: View {
    var body: some View {
        VStack(spacing: 16) {
            // Header
            HStack {
                Image(systemName: "star.fill")
                    .font(.title)
                Text("MyApp")
                    .font(.headline)
            }

            Divider()

            // Content
            List {
                ForEach(items) { item in
                    ItemRow(item: item)
                }
            }
            .frame(height: 200)

            // Actions
            HStack {
                Button("Action 1") { }
                Button("Action 2") { }
            }
        }
        .padding()
        .frame(width: 300)
    }
}
```
</window_style>

<menu_style>
Standard menu appearance:

```swift
MenuBarExtra("MyApp", systemImage: "star.fill") {
    Button("Action 1") { performAction1() }
        .keyboardShortcut("1")

    Button("Action 2") { performAction2() }
        .keyboardShortcut("2")

    Divider()

    Menu("Submenu") {
        Button("Sub-action 1") { }
        Button("Sub-action 2") { }
    }

    Divider()

    Button("Quit") {
        NSApplication.shared.terminate(nil)
    }
    .keyboardShortcut("q", modifiers: .command)
}
.menuBarExtraStyle(.menu)
```
</menu_style>
</menu_styles>

<dynamic_icon>
```swift
@main
struct MenuBarApp: App {
    @State private var status: AppStatus = .idle

    var body: some Scene {
        MenuBarExtra {
            MenuContent(status: $status)
        } label: {
            switch status {
            case .idle:
                Image(systemName: "circle")
            case .active:
                Image(systemName: "circle.fill")
            case .error:
                Image(systemName: "exclamationmark.circle")
            }
        }
    }
}

enum AppStatus {
    case idle, active, error
}

// Or with text
MenuBarExtra {
    Content()
} label: {
    Label("\(count)", systemImage: "bell.fill")
}
```
</dynamic_icon>

<background_only>
App without dock icon (menu bar only):

```swift
// Info.plist
// <key>LSUIElement</key>
// <true/>

@main
struct MenuBarApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        MenuBarExtra("MyApp", systemImage: "star.fill") {
            MenuContent()
        }

        Settings {
            SettingsView()
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        // Clicking dock icon (if visible) shows settings
        if !flag {
            NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
        }
        return true
    }
}
```
</background_only>

<global_shortcuts>
```swift
import Carbon

class ShortcutManager {
    static let shared = ShortcutManager()

    private var hotKeyRef: EventHotKeyRef?
    private var callback: (() -> Void)?

    func register(keyCode: UInt32, modifiers: UInt32, action: @escaping () -> Void) {
        self.callback = action

        var hotKeyID = EventHotKeyID()
        hotKeyID.signature = OSType("MYAP".fourCharCodeValue)
        hotKeyID.id = 1

        var eventType = EventTypeSpec(eventClass: OSType(kEventClassKeyboard), eventKind: UInt32(kEventHotKeyPressed))

        InstallEventHandler(GetApplicationEventTarget(), { _, event, userData -> OSStatus in
            guard let userData = userData else { return OSStatus(eventNotHandledErr) }
            let manager = Unmanaged<ShortcutManager>.fromOpaque(userData).takeUnretainedValue()
            manager.callback?()
            return noErr
        }, 1, &eventType, Unmanaged.passUnretained(self).toOpaque(), nil)

        RegisterEventHotKey(keyCode, modifiers, hotKeyID, GetApplicationEventTarget(), 0, &hotKeyRef)
    }

    func unregister() {
        if let ref = hotKeyRef {
            UnregisterEventHotKey(ref)
        }
    }
}

extension String {
    var fourCharCodeValue: FourCharCode {
        var result: FourCharCode = 0
        for char in utf8.prefix(4) {
            result = (result << 8) + FourCharCode(char)
        }
        return result
    }
}

// Usage
ShortcutManager.shared.register(
    keyCode: UInt32(kVK_ANSI_M),
    modifiers: UInt32(cmdKey | optionKey)
) {
    // Toggle menu bar app
}
```
</global_shortcuts>

<with_main_window>
Menu bar app with optional main window:

```swift
@main
struct MenuBarApp: App {
    @State private var showMainWindow = false

    var body: some Scene {
        MenuBarExtra("MyApp", systemImage: "star.fill") {
            MenuContent(showMainWindow: $showMainWindow)
        }

        Window("MyApp", id: "main") {
            MainWindowContent()
        }
        .defaultSize(width: 600, height: 400)

        Settings {
            SettingsView()
        }
    }
}

struct MenuContent: View {
    @Binding var showMainWindow: Bool
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        VStack {
            Button("Show Window") {
                openWindow(id: "main")
            }

            // Quick actions...
        }
        .padding()
    }
}
```
</with_main_window>

<persistent_state>
```swift
struct MenuContent: View {
    @AppStorage("isEnabled") private var isEnabled = true
    @AppStorage("checkInterval") private var checkInterval = 60
    @AppStorage("notificationsEnabled") private var notifications = true

    var body: some View {
        VStack(alignment: .leading) {
            Toggle("Enabled", isOn: $isEnabled)

            Picker("Check every", selection: $checkInterval) {
                Text("1 min").tag(60)
                Text("5 min").tag(300)
                Text("15 min").tag(900)
            }

            Toggle("Notifications", isOn: $notifications)
        }
        .padding()
    }
}
```
</persistent_state>

<popover_from_menu_bar>
Custom popover positioning:

```swift
class PopoverManager: NSObject {
    private var statusItem: NSStatusItem?
    private var popover = NSPopover()

    func setup() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)

        if let button = statusItem?.button {
            button.image = NSImage(systemSymbolName: "star.fill", accessibilityDescription: "MyApp")
            button.action = #selector(togglePopover)
            button.target = self
        }

        popover.contentViewController = NSHostingController(rootView: PopoverContent())
        popover.behavior = .transient
    }

    @objc func togglePopover() {
        if popover.isShown {
            popover.close()
        } else if let button = statusItem?.button {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
        }
    }
}
```
</popover_from_menu_bar>

<timer_background_task>
```swift
@Observable
class BackgroundService {
    private var timer: Timer?
    var lastCheck: Date?
    var status: String = "Idle"

    func start() {
        timer = Timer.scheduledTimer(withTimeInterval: 60, repeats: true) { [weak self] _ in
            Task {
                await self?.performCheck()
            }
        }
    }

    func stop() {
        timer?.invalidate()
        timer = nil
    }

    private func performCheck() async {
        status = "Checking..."
        // Do work
        await Task.sleep(for: .seconds(2))
        lastCheck = Date()
        status = "OK"
    }
}

struct MenuContent: View {
    @State private var service = BackgroundService()

    var body: some View {
        VStack {
            Text("Status: \(service.status)")

            if let lastCheck = service.lastCheck {
                Text("Last: \(lastCheck.formatted())")
                    .font(.caption)
            }

            Button("Check Now") {
                Task { await service.performCheck() }
            }
        }
        .padding()
        .onAppear {
            service.start()
        }
    }
}
```
</timer_background_task>

<best_practices>
- Keep menu content minimal and fast
- Use .window style for rich UI, .menu for simple actions
- Provide keyboard shortcuts for common actions
- Save state with @AppStorage
- Include "Quit" option always
- Use background-only (LSUIElement) when appropriate
- Provide settings window for configuration
- Show status in icon when possible (dynamic icon)
</best_practices>
