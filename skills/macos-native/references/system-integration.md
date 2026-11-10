# macos-native: System Integration

Part of the `macos-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## System Integration

### Services

```swift
// Providing a service
class ServiceProvider: NSObject {
    @objc func processText(_ pboard: NSPasteboard, userData: String, error: AutoreleasingUnsafeMutablePointer<NSString?>) {
        guard let text = pboard.string(forType: .string) else { return }

        let processed = text.uppercased()

        pboard.clearContents()
        pboard.setString(processed, forType: .string)
    }
}

// Register in Info.plist
/*
<key>NSServices</key>
<array>
    <dict>
        <key>NSMenuItem</key>
        <dict>
            <key>default</key>
            <string>Process with My App</string>
        </dict>
        <key>NSMessage</key>
        <string>processText</string>
        <key>NSPortName</key>
        <string>MyApp</string>
        <key>NSSendTypes</key>
        <array>
            <string>NSStringPboardType</string>
        </array>
        <key>NSReturnTypes</key>
        <array>
            <string>NSStringPboardType</string>
        </array>
    </dict>
</array>
*/
```

### Drag and Drop

```swift
class DropView: NSView {
    override init(frame frameRect: NSRect) {
        super.init(frame: frameRect)
        registerForDraggedTypes([.fileURL, .string])
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        registerForDraggedTypes([.fileURL, .string])
    }

    override func draggingEntered(_ sender: NSDraggingInfo) -> NSDragOperation {
        return .copy
    }

    override func performDragOperation(_ sender: NSDraggingInfo) -> Bool {
        let pasteboard = sender.draggingPasteboard

        if let urls = pasteboard.readObjects(forClasses: [NSURL.self]) as? [URL] {
            for url in urls {
                handleDroppedFile(url)
            }
            return true
        }

        if let strings = pasteboard.readObjects(forClasses: [NSString.self]) as? [String] {
            for string in strings {
                handleDroppedText(string)
            }
            return true
        }

        return false
    }

    private func handleDroppedFile(_ url: URL) {
        print("Dropped file: \(url)")
    }

    private func handleDroppedText(_ text: String) {
        print("Dropped text: \(text)")
    }
}
```

### Notifications

```swift
import UserNotifications

class NotificationManager {
    static let shared = NotificationManager()

    func requestAuthorization() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                print("Notification permission granted")
            }
        }
    }

    func scheduleNotification(title: String, body: String, delay: TimeInterval = 5) {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default

        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: delay, repeats: false)
        let request = UNNotificationRequest(
            identifier: UUID().uuidString,
            content: content,
            trigger: trigger
        )

        UNUserNotificationCenter.current().add(request)
    }
}
```

---
