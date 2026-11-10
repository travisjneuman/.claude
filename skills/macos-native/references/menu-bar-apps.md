# macos-native: Menu Bar Apps

Part of the `macos-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Menu Bar Apps

### Status Item

```swift
import Cocoa

class StatusBarController {
    private var statusItem: NSStatusItem?
    private var popover: NSPopover?

    init() {
        setupStatusItem()
        setupPopover()
    }

    private func setupStatusItem() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)

        if let button = statusItem?.button {
            button.image = NSImage(systemSymbolName: "star.fill", accessibilityDescription: "App")
            button.action = #selector(togglePopover)
            button.target = self
        }
    }

    private func setupPopover() {
        popover = NSPopover()
        popover?.contentViewController = PopoverViewController()
        popover?.behavior = .transient
    }

    @objc private func togglePopover() {
        guard let button = statusItem?.button, let popover = popover else { return }

        if popover.isShown {
            popover.performClose(nil)
        } else {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .minY)
            NSApp.activate(ignoringOtherApps: true)
        }
    }
}

class PopoverViewController: NSViewController {
    override func loadView() {
        view = NSView(frame: NSRect(x: 0, y: 0, width: 300, height: 200))
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        let label = NSTextField(labelWithString: "Menu Bar App Content")
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
        ])
    }
}
```

### Menu Construction

```swift
func setupMainMenu() {
    let mainMenu = NSMenu()

    // App Menu
    let appMenu = NSMenu()
    let appMenuItem = NSMenuItem()
    appMenuItem.submenu = appMenu

    appMenu.addItem(withTitle: "About My App", action: #selector(NSApplication.orderFrontStandardAboutPanel(_:)), keyEquivalent: "")
    appMenu.addItem(NSMenuItem.separator())
    appMenu.addItem(withTitle: "Preferences...", action: #selector(showPreferences), keyEquivalent: ",")
    appMenu.addItem(NSMenuItem.separator())
    appMenu.addItem(withTitle: "Quit My App", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")

    mainMenu.addItem(appMenuItem)

    // File Menu
    let fileMenu = NSMenu(title: "File")
    let fileMenuItem = NSMenuItem()
    fileMenuItem.submenu = fileMenu

    fileMenu.addItem(withTitle: "New", action: #selector(newDocument), keyEquivalent: "n")
    fileMenu.addItem(withTitle: "Open...", action: #selector(openDocument), keyEquivalent: "o")
    fileMenu.addItem(NSMenuItem.separator())
    fileMenu.addItem(withTitle: "Save", action: #selector(saveDocument), keyEquivalent: "s")

    mainMenu.addItem(fileMenuItem)

    // Edit Menu
    let editMenu = NSMenu(title: "Edit")
    let editMenuItem = NSMenuItem()
    editMenuItem.submenu = editMenu

    editMenu.addItem(withTitle: "Undo", action: Selector(("undo:")), keyEquivalent: "z")
    editMenu.addItem(withTitle: "Redo", action: Selector(("redo:")), keyEquivalent: "Z")
    editMenu.addItem(NSMenuItem.separator())
    editMenu.addItem(withTitle: "Cut", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
    editMenu.addItem(withTitle: "Copy", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
    editMenu.addItem(withTitle: "Paste", action: #selector(NSText.paste(_:)), keyEquivalent: "v")

    mainMenu.addItem(editMenuItem)

    NSApp.mainMenu = mainMenu
}
```

---
