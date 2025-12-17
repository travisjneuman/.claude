# macOS Polish

Details that make apps feel native and professional.

<keyboard_shortcuts>
<standard_shortcuts>
```swift
import SwiftUI

struct AppCommands: Commands {
    var body: some Commands {
        // File operations
        CommandGroup(replacing: .saveItem) {
            Button("Save") { save() }
                .keyboardShortcut("s", modifiers: .command)

            Button("Save As...") { saveAs() }
                .keyboardShortcut("s", modifiers: [.command, .shift])
        }

        // Edit operations (usually automatic)
        // ⌘Z Undo, ⌘X Cut, ⌘C Copy, ⌘V Paste, ⌘A Select All

        // View menu
        CommandMenu("View") {
            Button("Zoom In") { zoomIn() }
                .keyboardShortcut("+", modifiers: .command)

            Button("Zoom Out") { zoomOut() }
                .keyboardShortcut("-", modifiers: .command)

            Button("Actual Size") { resetZoom() }
                .keyboardShortcut("0", modifiers: .command)

            Divider()

            Button("Toggle Sidebar") { toggleSidebar() }
                .keyboardShortcut("s", modifiers: [.command, .control])

            Button("Toggle Inspector") { toggleInspector() }
                .keyboardShortcut("i", modifiers: [.command, .option])
        }

        // Custom menu
        CommandMenu("Actions") {
            Button("Run") { run() }
                .keyboardShortcut("r", modifiers: .command)

            Button("Build") { build() }
                .keyboardShortcut("b", modifiers: .command)
        }
    }
}
```
</standard_shortcuts>

<view_shortcuts>
```swift
struct ContentView: View {
    var body: some View {
        MainContent()
            .onKeyPress(.space) {
                togglePlay()
                return .handled
            }
            .onKeyPress(.delete) {
                deleteSelected()
                return .handled
            }
            .onKeyPress(.escape) {
                clearSelection()
                return .handled
            }
            .onKeyPress("f", modifiers: .command) {
                focusSearch()
                return .handled
            }
    }
}
```
</view_shortcuts>
</keyboard_shortcuts>

<menu_bar>
```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .commands {
            // Replace standard items
            CommandGroup(replacing: .newItem) {
                Button("New Project") { newProject() }
                    .keyboardShortcut("n", modifiers: .command)

                Button("New from Template...") { newFromTemplate() }
                    .keyboardShortcut("n", modifiers: [.command, .shift])
            }

            // Add after existing group
            CommandGroup(after: .importExport) {
                Button("Import...") { importFile() }
                    .keyboardShortcut("i", modifiers: [.command, .shift])

                Button("Export...") { exportFile() }
                    .keyboardShortcut("e", modifiers: [.command, .shift])
            }

            // Add entire menu
            CommandMenu("Project") {
                Button("Build") { build() }
                    .keyboardShortcut("b", modifiers: .command)

                Button("Run") { run() }
                    .keyboardShortcut("r", modifiers: .command)

                Divider()

                Button("Clean") { clean() }
                    .keyboardShortcut("k", modifiers: [.command, .shift])
            }

            // Add to Help menu
            CommandGroup(after: .help) {
                Button("Keyboard Shortcuts") { showShortcuts() }
                    .keyboardShortcut("/", modifiers: .command)
            }
        }
    }
}
```
</menu_bar>

<context_menus>
```swift
struct ItemRow: View {
    let item: Item

    var body: some View {
        Text(item.name)
            .contextMenu {
                Button("Open") { open(item) }

                Button("Open in New Window") { openInNewWindow(item) }

                Divider()

                Button("Duplicate") { duplicate(item) }
                    .keyboardShortcut("d", modifiers: .command)

                Button("Rename") { rename(item) }

                Divider()

                Button("Delete", role: .destructive) { delete(item) }
            }
    }
}
```
</context_menus>

<window_management>
<multiple_windows>
```swift
@main
struct MyApp: App {
    var body: some Scene {
        // Main document window
        DocumentGroup(newDocument: MyDocument()) { file in
            DocumentView(document: file.$document)
        }

        // Auxiliary windows
        Window("Inspector", id: "inspector") {
            InspectorView()
        }
        .windowResizability(.contentSize)
        .defaultPosition(.trailing)
        .keyboardShortcut("i", modifiers: [.command, .option])

        // Floating utility
        Window("Quick Entry", id: "quick-entry") {
            QuickEntryView()
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentSize)

        Settings {
            SettingsView()
        }
    }
}

// Open window from view
struct ContentView: View {
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        Button("Show Inspector") {
            openWindow(id: "inspector")
        }
    }
}
```
</multiple_windows>

<window_state>
```swift
// Save and restore window state
class WindowStateManager {
    static func save(_ window: NSWindow, key: String) {
        let frame = window.frame
        UserDefaults.standard.set(NSStringFromRect(frame), forKey: "window.\(key).frame")
    }

    static func restore(_ window: NSWindow, key: String) {
        guard let frameString = UserDefaults.standard.string(forKey: "window.\(key).frame"),
              let frame = NSRectFromString(frameString) as NSRect? else { return }
        window.setFrame(frame, display: true)
    }
}

// Window delegate
class WindowDelegate: NSObject, NSWindowDelegate {
    func windowWillClose(_ notification: Notification) {
        guard let window = notification.object as? NSWindow else { return }
        WindowStateManager.save(window, key: "main")
    }
}
```
</window_state>
</window_management>

<dock_menu>
```swift
class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDockMenu(_ sender: NSApplication) -> NSMenu? {
        let menu = NSMenu()

        menu.addItem(NSMenuItem(
            title: "New Project",
            action: #selector(newProject),
            keyEquivalent: ""
        ))

        menu.addItem(NSMenuItem.separator())

        // Recent items
        let recentProjects = RecentProjectsManager.shared.projects
        for project in recentProjects.prefix(5) {
            let item = NSMenuItem(
                title: project.name,
                action: #selector(openRecent(_:)),
                keyEquivalent: ""
            )
            item.representedObject = project.url
            menu.addItem(item)
        }

        return menu
    }

    @objc private func newProject() {
        NSDocumentController.shared.newDocument(nil)
    }

    @objc private func openRecent(_ sender: NSMenuItem) {
        guard let url = sender.representedObject as? URL else { return }
        NSDocumentController.shared.openDocument(
            withContentsOf: url,
            display: true
        ) { _, _, _ in }
    }
}
```
</dock_menu>

<accessibility>
<voiceover>
```swift
struct ItemRow: View {
    let item: Item

    var body: some View {
        HStack {
            Image(systemName: item.icon)
            VStack(alignment: .leading) {
                Text(item.name)
                Text(item.date.formatted())
                    .font(.caption)
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(item.name), \(item.date.formatted())")
        .accessibilityHint("Double-tap to open")
        .accessibilityAddTraits(.isButton)
    }
}
```
</voiceover>

<custom_rotors>
```swift
struct NoteListView: View {
    let notes: [Note]
    @State private var selectedNote: Note?

    var body: some View {
        List(notes, selection: $selectedNote) { note in
            NoteRow(note: note)
        }
        .accessibilityRotor("Pinned Notes") {
            ForEach(notes.filter { $0.isPinned }) { note in
                AccessibilityRotorEntry(note.title, id: note.id) {
                    selectedNote = note
                }
            }
        }
        .accessibilityRotor("Recent Notes") {
            ForEach(notes.sorted { $0.modifiedAt > $1.modifiedAt }.prefix(10)) { note in
                AccessibilityRotorEntry("\(note.title), modified \(note.modifiedAt.formatted())", id: note.id) {
                    selectedNote = note
                }
            }
        }
    }
}
```
</custom_rotors>

<reduced_motion>
```swift
struct AnimationHelper {
    static var prefersReducedMotion: Bool {
        NSWorkspace.shared.accessibilityDisplayShouldReduceMotion
    }

    static func animation(_ animation: Animation) -> Animation? {
        prefersReducedMotion ? nil : animation
    }
}

// Usage
withAnimation(AnimationHelper.animation(.spring())) {
    isExpanded.toggle()
}
```
</reduced_motion>
</accessibility>

<user_defaults>
```swift
extension UserDefaults {
    enum Keys {
        static let theme = "theme"
        static let fontSize = "fontSize"
        static let recentFiles = "recentFiles"
        static let windowFrame = "windowFrame"
    }

    var theme: String {
        get { string(forKey: Keys.theme) ?? "system" }
        set { set(newValue, forKey: Keys.theme) }
    }

    var fontSize: Double {
        get { double(forKey: Keys.fontSize).nonZero ?? 14.0 }
        set { set(newValue, forKey: Keys.fontSize) }
    }

    var recentFiles: [URL] {
        get {
            guard let data = data(forKey: Keys.recentFiles),
                  let urls = try? JSONDecoder().decode([URL].self, from: data)
            else { return [] }
            return urls
        }
        set {
            let data = try? JSONEncoder().encode(newValue)
            set(data, forKey: Keys.recentFiles)
        }
    }
}

extension Double {
    var nonZero: Double? { self == 0 ? nil : self }
}

// Register defaults at launch
func registerDefaults() {
    UserDefaults.standard.register(defaults: [
        UserDefaults.Keys.theme: "system",
        UserDefaults.Keys.fontSize: 14.0
    ])
}
```
</user_defaults>

<error_presentation>
```swift
struct ErrorPresenter: ViewModifier {
    @Binding var error: AppError?

    func body(content: Content) -> some View {
        content
            .alert(
                "Error",
                isPresented: Binding(
                    get: { error != nil },
                    set: { if !$0 { error = nil } }
                ),
                presenting: error
            ) { _ in
                Button("OK", role: .cancel) {}
            } message: { error in
                Text(error.localizedDescription)
            }
    }
}

extension View {
    func errorAlert(_ error: Binding<AppError?>) -> some View {
        modifier(ErrorPresenter(error: error))
    }
}

// Usage
ContentView()
    .errorAlert($appState.error)
```
</error_presentation>

<onboarding>
```swift
struct OnboardingView: View {
    @AppStorage("hasSeenOnboarding") private var hasSeenOnboarding = false
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "star.fill")
                .font(.system(size: 64))
                .foregroundStyle(.accentColor)

            Text("Welcome to MyApp")
                .font(.largeTitle)

            VStack(alignment: .leading, spacing: 16) {
                FeatureRow(icon: "doc.text", title: "Create Documents", description: "Organize your work in documents")
                FeatureRow(icon: "folder", title: "Stay Organized", description: "Use folders and tags")
                FeatureRow(icon: "cloud", title: "Sync Everywhere", description: "Access on all your devices")
            }

            Button("Get Started") {
                hasSeenOnboarding = true
                dismiss()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding(40)
        .frame(width: 500)
    }
}

struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title2)
                .frame(width: 40)
                .foregroundStyle(.accentColor)

            VStack(alignment: .leading) {
                Text(title).fontWeight(.medium)
                Text(description).foregroundStyle(.secondary)
            }
        }
    }
}
```
</onboarding>

<sparkle_updates>
```swift
// Add Sparkle package for auto-updates
// https://github.com/sparkle-project/Sparkle

import Sparkle

class UpdaterManager {
    private var updater: SPUUpdater?

    func setup() {
        let controller = SPUStandardUpdaterController(
            startingUpdater: true,
            updaterDelegate: nil,
            userDriverDelegate: nil
        )
        updater = controller.updater
    }

    func checkForUpdates() {
        updater?.checkForUpdates()
    }
}

// In commands
CommandGroup(after: .appInfo) {
    Button("Check for Updates...") {
        updaterManager.checkForUpdates()
    }
}
```
</sparkle_updates>

<app_lifecycle>
```swift
class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        // Register defaults
        registerDefaults()

        // Setup services
        setupServices()

        // Check for updates
        checkForUpdates()
    }

    func applicationWillTerminate(_ notification: Notification) {
        // Save state
        saveApplicationState()
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        // Return false for document-based or menu bar apps
        return false
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag {
            // Reopen main window
            NSDocumentController.shared.newDocument(nil)
        }
        return true
    }
}
```
</app_lifecycle>
