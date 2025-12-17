# System APIs

macOS system integration: file system, notifications, services, and automation.

<file_system>
<standard_directories>
```swift
let fileManager = FileManager.default

// App Support (persistent app data)
let appSupport = fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
let appFolder = appSupport.appendingPathComponent("MyApp", isDirectory: true)

// Documents (user documents)
let documents = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first!

// Caches (temporary, can be deleted)
let caches = fileManager.urls(for: .cachesDirectory, in: .userDomainMask).first!

// Temporary (short-lived)
let temp = fileManager.temporaryDirectory

// Create directories
try? fileManager.createDirectory(at: appFolder, withIntermediateDirectories: true)
```
</standard_directories>

<file_operations>
```swift
// Read
let data = try Data(contentsOf: fileURL)
let string = try String(contentsOf: fileURL)

// Write
try data.write(to: fileURL, options: .atomic)
try string.write(to: fileURL, atomically: true, encoding: .utf8)

// Copy/Move
try fileManager.copyItem(at: source, to: destination)
try fileManager.moveItem(at: source, to: destination)

// Delete
try fileManager.removeItem(at: fileURL)

// Check existence
let exists = fileManager.fileExists(atPath: path)

// List directory
let contents = try fileManager.contentsOfDirectory(
    at: folderURL,
    includingPropertiesForKeys: [.isDirectoryKey, .fileSizeKey],
    options: [.skipsHiddenFiles]
)
```
</file_operations>

<file_monitoring>
```swift
import CoreServices

class FileWatcher {
    private var stream: FSEventStreamRef?
    private var callback: () -> Void

    init(path: String, onChange: @escaping () -> Void) {
        self.callback = onChange

        var context = FSEventStreamContext()
        context.info = Unmanaged.passUnretained(self).toOpaque()

        let paths = [path] as CFArray
        stream = FSEventStreamCreate(
            nil,
            { _, info, numEvents, eventPaths, _, _ in
                guard let info = info else { return }
                let watcher = Unmanaged<FileWatcher>.fromOpaque(info).takeUnretainedValue()
                DispatchQueue.main.async {
                    watcher.callback()
                }
            },
            &context,
            paths,
            FSEventStreamEventId(kFSEventStreamEventIdSinceNow),
            0.5,  // Latency in seconds
            FSEventStreamCreateFlags(kFSEventStreamCreateFlagFileEvents)
        )

        FSEventStreamSetDispatchQueue(stream!, DispatchQueue.global())
        FSEventStreamStart(stream!)
    }

    deinit {
        if let stream = stream {
            FSEventStreamStop(stream)
            FSEventStreamInvalidate(stream)
            FSEventStreamRelease(stream)
        }
    }
}

// Usage
let watcher = FileWatcher(path: "/path/to/watch") {
    print("Files changed!")
}
```
</file_monitoring>

<security_scoped_bookmarks>
For sandboxed apps to retain file access:

```swift
class BookmarkManager {
    func saveBookmark(for url: URL) throws -> Data {
        // User selected this file via NSOpenPanel
        let bookmark = try url.bookmarkData(
            options: .withSecurityScope,
            includingResourceValuesForKeys: nil,
            relativeTo: nil
        )
        return bookmark
    }

    func resolveBookmark(_ data: Data) throws -> URL {
        var isStale = false
        let url = try URL(
            resolvingBookmarkData: data,
            options: .withSecurityScope,
            relativeTo: nil,
            bookmarkDataIsStale: &isStale
        )

        // Start accessing
        guard url.startAccessingSecurityScopedResource() else {
            throw BookmarkError.accessDenied
        }

        // Remember to call stopAccessingSecurityScopedResource() when done

        return url
    }
}
```
</security_scoped_bookmarks>
</file_system>

<notifications>
<local_notifications>
```swift
import UserNotifications

class NotificationService {
    private let center = UNUserNotificationCenter.current()

    func requestPermission() async -> Bool {
        do {
            return try await center.requestAuthorization(options: [.alert, .sound, .badge])
        } catch {
            return false
        }
    }

    func scheduleNotification(
        title: String,
        body: String,
        at date: Date,
        identifier: String
    ) async throws {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default

        let components = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: date)
        let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: false)

        let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
        try await center.add(request)
    }

    func scheduleImmediateNotification(title: String, body: String) async throws {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
        let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: trigger)

        try await center.add(request)
    }

    func cancelNotification(identifier: String) {
        center.removePendingNotificationRequests(withIdentifiers: [identifier])
    }
}
```
</local_notifications>

<notification_handling>
```swift
class AppDelegate: NSObject, NSApplicationDelegate, UNUserNotificationCenterDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        UNUserNotificationCenter.current().delegate = self
    }

    // Called when notification arrives while app is in foreground
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification
    ) async -> UNNotificationPresentationOptions {
        [.banner, .sound]
    }

    // Called when user interacts with notification
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse
    ) async {
        let identifier = response.notification.request.identifier
        // Handle the notification tap
        handleNotificationAction(identifier)
    }
}
```
</notification_handling>
</notifications>

<launch_at_login>
```swift
import ServiceManagement

class LaunchAtLoginManager {
    var isEnabled: Bool {
        get {
            SMAppService.mainApp.status == .enabled
        }
        set {
            do {
                if newValue {
                    try SMAppService.mainApp.register()
                } else {
                    try SMAppService.mainApp.unregister()
                }
            } catch {
                print("Failed to update launch at login: \(error)")
            }
        }
    }
}

// SwiftUI binding
struct SettingsView: View {
    @State private var launchAtLogin = LaunchAtLoginManager()

    var body: some View {
        Toggle("Launch at Login", isOn: Binding(
            get: { launchAtLogin.isEnabled },
            set: { launchAtLogin.isEnabled = $0 }
        ))
    }
}
```
</launch_at_login>

<nsworkspace>
```swift
import AppKit

let workspace = NSWorkspace.shared

// Open URL in browser
workspace.open(URL(string: "https://example.com")!)

// Open file with default app
workspace.open(fileURL)

// Open file with specific app
workspace.open(
    [fileURL],
    withApplicationAt: appURL,
    configuration: NSWorkspace.OpenConfiguration()
)

// Reveal in Finder
workspace.activateFileViewerSelecting([fileURL])

// Get app for file type
if let appURL = workspace.urlForApplication(toOpen: fileURL) {
    print("Default app: \(appURL)")
}

// Get running apps
let runningApps = workspace.runningApplications
for app in runningApps {
    print("\(app.localizedName ?? "Unknown"): \(app.bundleIdentifier ?? "")")
}

// Get frontmost app
if let frontmost = workspace.frontmostApplication {
    print("Frontmost: \(frontmost.localizedName ?? "")")
}

// Observe app launches
NotificationCenter.default.addObserver(
    forName: NSWorkspace.didLaunchApplicationNotification,
    object: workspace,
    queue: .main
) { notification in
    if let app = notification.userInfo?[NSWorkspace.applicationUserInfoKey] as? NSRunningApplication {
        print("Launched: \(app.localizedName ?? "")")
    }
}
```
</nsworkspace>

<process_management>
```swift
import Foundation

// Run shell command
func runCommand(_ command: String) async throws -> String {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/bin/zsh")
    process.arguments = ["-c", command]

    let pipe = Pipe()
    process.standardOutput = pipe
    process.standardError = pipe

    try process.run()
    process.waitUntilExit()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    return String(data: data, encoding: .utf8) ?? ""
}

// Launch app
func launchApp(bundleIdentifier: String) {
    if let url = NSWorkspace.shared.urlForApplication(withBundleIdentifier: bundleIdentifier) {
        NSWorkspace.shared.openApplication(at: url, configuration: NSWorkspace.OpenConfiguration())
    }
}

// Check if app is running
func isAppRunning(bundleIdentifier: String) -> Bool {
    NSWorkspace.shared.runningApplications.contains {
        $0.bundleIdentifier == bundleIdentifier
    }
}
```
</process_management>

<clipboard>
```swift
import AppKit

let pasteboard = NSPasteboard.general

// Write text
pasteboard.clearContents()
pasteboard.setString("Hello", forType: .string)

// Read text
if let string = pasteboard.string(forType: .string) {
    print(string)
}

// Write URL
pasteboard.clearContents()
pasteboard.writeObjects([url as NSURL])

// Read URLs
if let urls = pasteboard.readObjects(forClasses: [NSURL.self]) as? [URL] {
    print(urls)
}

// Write image
pasteboard.clearContents()
pasteboard.writeObjects([image])

// Monitor clipboard
class ClipboardMonitor {
    private var timer: Timer?
    private var lastChangeCount = 0

    func start(onChange: @escaping (String?) -> Void) {
        timer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { _ in
            let changeCount = NSPasteboard.general.changeCount
            if changeCount != self.lastChangeCount {
                self.lastChangeCount = changeCount
                onChange(NSPasteboard.general.string(forType: .string))
            }
        }
    }

    func stop() {
        timer?.invalidate()
    }
}
```
</clipboard>

<apple_events>
```swift
import AppKit

// Tell another app to do something (requires com.apple.security.automation.apple-events)
func tellFinderToEmptyTrash() {
    let script = """
    tell application "Finder"
        empty trash
    end tell
    """

    var error: NSDictionary?
    if let scriptObject = NSAppleScript(source: script) {
        scriptObject.executeAndReturnError(&error)
        if let error = error {
            print("AppleScript error: \(error)")
        }
    }
}

// Get data from another app
func getFinderSelection() -> [URL] {
    let script = """
    tell application "Finder"
        set selectedItems to selection
        set itemPaths to {}
        repeat with anItem in selectedItems
            set end of itemPaths to POSIX path of (anItem as text)
        end repeat
        return itemPaths
    end tell
    """

    var error: NSDictionary?
    if let scriptObject = NSAppleScript(source: script),
       let result = scriptObject.executeAndReturnError(&error).coerce(toDescriptorType: typeAEList) {
        var urls: [URL] = []
        for i in 1...result.numberOfItems {
            if let path = result.atIndex(i)?.stringValue {
                urls.append(URL(fileURLWithPath: path))
            }
        }
        return urls
    }
    return []
}
```
</apple_events>

<services>
<providing_services>
```swift
// Info.plist
/*
<key>NSServices</key>
<array>
    <dict>
        <key>NSMessage</key>
        <string>processText</string>
        <key>NSPortName</key>
        <string>MyApp</string>
        <key>NSSendTypes</key>
        <array>
            <string>public.plain-text</string>
        </array>
        <key>NSReturnTypes</key>
        <array>
            <string>public.plain-text</string>
        </array>
        <key>NSMenuItem</key>
        <dict>
            <key>default</key>
            <string>Process with MyApp</string>
        </dict>
    </dict>
</array>
*/

class ServiceProvider: NSObject {
    @objc func processText(
        _ pboard: NSPasteboard,
        userData: String,
        error: AutoreleasingUnsafeMutablePointer<NSString?>
    ) {
        guard let string = pboard.string(forType: .string) else {
            error.pointee = "No text found" as NSString
            return
        }

        // Process the text
        let processed = string.uppercased()

        // Return result
        pboard.clearContents()
        pboard.setString(processed, forType: .string)
    }
}

// Register in AppDelegate
func applicationDidFinishLaunching(_ notification: Notification) {
    NSApp.servicesProvider = ServiceProvider()
    NSUpdateDynamicServices()
}
```
</providing_services>
</services>

<accessibility>
```swift
import AppKit

// Check if app has accessibility permissions
func hasAccessibilityPermission() -> Bool {
    AXIsProcessTrusted()
}

// Request permission
func requestAccessibilityPermission() {
    let options = [kAXTrustedCheckOptionPrompt.takeRetainedValue(): true] as CFDictionary
    AXIsProcessTrustedWithOptions(options)
}

// Check display settings
let workspace = NSWorkspace.shared
let reduceMotion = workspace.accessibilityDisplayShouldReduceMotion
let reduceTransparency = workspace.accessibilityDisplayShouldReduceTransparency
let increaseContrast = workspace.accessibilityDisplayShouldIncreaseContrast
```
</accessibility>
