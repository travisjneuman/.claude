---
name: macos-native
description: Native macOS development with AppKit, Catalyst, and macOS-specific APIs. Use when building Mac-native apps, menu bar apps, system extensions, or macOS-specific features.
---

# macOS Native Development

Comprehensive guide for building native macOS applications with AppKit and modern macOS APIs.

## Framework Overview

| Framework            | Use Case             | Notes                       |
| -------------------- | -------------------- | --------------------------- |
| **AppKit**           | Traditional Mac apps | Full control, mature        |
| **SwiftUI**          | Modern Mac apps      | Cross-platform, declarative |
| **Catalyst**         | iPad apps on Mac     | Quick port, limitations     |
| **AppKit + SwiftUI** | Hybrid approach      | Best of both worlds         |

---

## AppKit Fundamentals

### Application Structure

```swift
// AppDelegate.swift
import Cocoa

@main
class AppDelegate: NSObject, NSApplicationDelegate {
    var mainWindow: NSWindow?

    func applicationDidFinishLaunching(_ notification: Notification) {
        setupMainWindow()
        setupMainMenu()
    }

    func applicationWillTerminate(_ notification: Notification) {
        // Cleanup
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

    private func setupMainWindow() {
        let contentRect = NSRect(x: 0, y: 0, width: 800, height: 600)
        let styleMask: NSWindow.StyleMask = [
            .titled, .closable, .miniaturizable, .resizable
        ]

        mainWindow = NSWindow(
            contentRect: contentRect,
            styleMask: styleMask,
            backing: .buffered,
            defer: false
        )

        mainWindow?.title = "My Mac App"
        mainWindow?.contentViewController = MainViewController()
        mainWindow?.center()
        mainWindow?.makeKeyAndOrderFront(nil)
    }
}
```

### View Controller

```swift
import Cocoa

class MainViewController: NSViewController {
    private let tableView = NSTableView()
    private let scrollView = NSScrollView()
    private var items: [String] = []

    override func loadView() {
        view = NSView(frame: NSRect(x: 0, y: 0, width: 800, height: 600))
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        loadData()
    }

    private func setupUI() {
        // Setup scroll view
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.hasVerticalScroller = true
        scrollView.documentView = tableView
        view.addSubview(scrollView)

        // Setup table view
        let column = NSTableColumn(identifier: NSUserInterfaceItemIdentifier("main"))
        column.title = "Items"
        column.width = 200
        tableView.addTableColumn(column)
        tableView.delegate = self
        tableView.dataSource = self

        // Constraints
        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.topAnchor, constant: 20),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -20),
        ])
    }

    private func loadData() {
        items = ["Item 1", "Item 2", "Item 3"]
        tableView.reloadData()
    }
}

extension MainViewController: NSTableViewDataSource, NSTableViewDelegate {
    func numberOfRows(in tableView: NSTableView) -> Int {
        return items.count
    }

    func tableView(_ tableView: NSTableView, viewFor tableColumn: NSTableColumn?, row: Int) -> NSView? {
        let identifier = NSUserInterfaceItemIdentifier("cell")
        var cell = tableView.makeView(withIdentifier: identifier, owner: nil) as? NSTextField

        if cell == nil {
            cell = NSTextField(labelWithString: "")
            cell?.identifier = identifier
        }

        cell?.stringValue = items[row]
        return cell
    }
}
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/macos-native/`).

| Topic | File | Covers |
| --- | --- | --- |
| Menu Bar Apps | [`references/menu-bar-apps.md`](references/menu-bar-apps.md) | Status Item; Menu Construction |
| Document-Based Apps | [`references/document-based-apps.md`](references/document-based-apps.md) | Document Controller |
| System Integration | [`references/system-integration.md`](references/system-integration.md) | Services; Drag and Drop; Notifications |
| Sandboxing & Entitlements | [`references/sandboxing-and-entitlements.md`](references/sandboxing-and-entitlements.md) | Common Entitlements; Security-Scoped Bookmarks |
| Checklist | [`references/checklist.md`](references/checklist.md) | Mac App Store Submission; Best Practices |
