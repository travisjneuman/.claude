# AppKit Integration

When and how to use AppKit alongside SwiftUI for advanced functionality.

<when_to_use_appkit>
Use AppKit (not SwiftUI) when you need:
- Custom drawing with `NSView.draw(_:)`
- Complex text editing (`NSTextView`)
- Drag and drop with custom behaviors
- Low-level event handling
- Popovers with specific positioning
- Custom window chrome
- Backward compatibility (< macOS 13)

**Anti-pattern: Using AppKit to "fix" SwiftUI**

Before reaching for AppKit as a workaround:
1. Search your SwiftUI code for what's declaratively controlling the behavior
2. SwiftUI wrappers (NSHostingView, NSViewRepresentable) manage their wrapped AppKit objects
3. Your AppKit code may run but be overridden by SwiftUI's declarative layer
4. Example: Setting `NSWindow.minSize` is ignored if content view has `.frame(minWidth:)`

**Debugging mindset:**
- SwiftUI's declarative layer = policy
- AppKit's imperative APIs = implementation details
- Policy wins. Check policy first.

Prefer SwiftUI for everything else.
</when_to_use_appkit>

<nsviewrepresentable>
<basic_pattern>
```swift
import SwiftUI

struct CustomCanvasView: NSViewRepresentable {
    @Binding var drawing: Drawing

    func makeNSView(context: Context) -> CanvasNSView {
        let view = CanvasNSView()
        view.delegate = context.coordinator
        return view
    }

    func updateNSView(_ nsView: CanvasNSView, context: Context) {
        nsView.drawing = drawing
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, CanvasDelegate {
        var parent: CustomCanvasView

        init(_ parent: CustomCanvasView) {
            self.parent = parent
        }

        func canvasDidUpdate(_ drawing: Drawing) {
            parent.drawing = drawing
        }
    }
}
```
</basic_pattern>

<with_sizeThatFits>
```swift
struct IntrinsicSizeView: NSViewRepresentable {
    let text: String

    func makeNSView(context: Context) -> NSTextField {
        let field = NSTextField(labelWithString: text)
        field.setContentHuggingPriority(.required, for: .horizontal)
        return field
    }

    func updateNSView(_ nsView: NSTextField, context: Context) {
        nsView.stringValue = text
    }

    func sizeThatFits(_ proposal: ProposedViewSize, nsView: NSTextField, context: Context) -> CGSize? {
        nsView.fittingSize
    }
}
```
</with_sizeThatFits>
</nsviewrepresentable>

<custom_nsview>
<drawing_view>
```swift
import AppKit

class CanvasNSView: NSView {
    var drawing: Drawing = Drawing() {
        didSet { needsDisplay = true }
    }

    weak var delegate: CanvasDelegate?

    override var isFlipped: Bool { true }  // Use top-left origin

    override func draw(_ dirtyRect: NSRect) {
        guard let context = NSGraphicsContext.current?.cgContext else { return }

        // Background
        NSColor.windowBackgroundColor.setFill()
        context.fill(bounds)

        // Draw content
        for path in drawing.paths {
            context.setStrokeColor(path.color.cgColor)
            context.setLineWidth(path.lineWidth)
            context.addPath(path.cgPath)
            context.strokePath()
        }
    }

    // Mouse handling
    override func mouseDown(with event: NSEvent) {
        let point = convert(event.locationInWindow, from: nil)
        drawing.startPath(at: point)
        needsDisplay = true
    }

    override func mouseDragged(with event: NSEvent) {
        let point = convert(event.locationInWindow, from: nil)
        drawing.addPoint(point)
        needsDisplay = true
    }

    override func mouseUp(with event: NSEvent) {
        drawing.endPath()
        delegate?.canvasDidUpdate(drawing)
    }

    override var acceptsFirstResponder: Bool { true }
}

protocol CanvasDelegate: AnyObject {
    func canvasDidUpdate(_ drawing: Drawing)
}
```
</drawing_view>

<keyboard_handling>
```swift
class KeyHandlingView: NSView {
    var onKeyPress: ((NSEvent) -> Bool)?

    override var acceptsFirstResponder: Bool { true }

    override func keyDown(with event: NSEvent) {
        if let handler = onKeyPress, handler(event) {
            return  // Event handled
        }
        super.keyDown(with: event)
    }

    override func flagsChanged(with event: NSEvent) {
        // Handle modifier key changes
        if event.modifierFlags.contains(.shift) {
            // Shift pressed
        }
    }
}
```
</keyboard_handling>
</custom_nsview>

<nstextview_integration>
<rich_text_editor>
```swift
struct RichTextEditor: NSViewRepresentable {
    @Binding var attributedText: NSAttributedString
    var isEditable: Bool = true

    func makeNSView(context: Context) -> NSScrollView {
        let scrollView = NSTextView.scrollableTextView()
        let textView = scrollView.documentView as! NSTextView

        textView.delegate = context.coordinator
        textView.isEditable = isEditable
        textView.isRichText = true
        textView.allowsUndo = true
        textView.usesFontPanel = true
        textView.usesRuler = true
        textView.isRulerVisible = true

        // Typography
        textView.textContainerInset = NSSize(width: 20, height: 20)
        textView.font = .systemFont(ofSize: 14)

        return scrollView
    }

    func updateNSView(_ nsView: NSScrollView, context: Context) {
        let textView = nsView.documentView as! NSTextView

        if textView.attributedString() != attributedText {
            textView.textStorage?.setAttributedString(attributedText)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, NSTextViewDelegate {
        var parent: RichTextEditor

        init(_ parent: RichTextEditor) {
            self.parent = parent
        }

        func textDidChange(_ notification: Notification) {
            guard let textView = notification.object as? NSTextView else { return }
            parent.attributedText = textView.attributedString()
        }
    }
}
```
</rich_text_editor>
</nstextview_integration>

<nshostingview>
Use SwiftUI views in AppKit:

```swift
import AppKit
import SwiftUI

class MyWindowController: NSWindowController {
    convenience init() {
        let window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 800, height: 600),
            styleMask: [.titled, .closable, .resizable, .miniaturizable],
            backing: .buffered,
            defer: false
        )

        // SwiftUI content in AppKit window
        let hostingView = NSHostingView(
            rootView: ContentView()
                .environment(appState)
        )
        window.contentView = hostingView

        self.init(window: window)
    }
}

// In toolbar item
class ToolbarItemController: NSToolbarItem {
    override init(itemIdentifier: NSToolbarItem.Identifier) {
        super.init(itemIdentifier: itemIdentifier)

        let hostingView = NSHostingView(rootView: ToolbarButton())
        view = hostingView
    }
}
```
</nshostingview>

<drag_and_drop>
<dragging_source>
```swift
class DraggableView: NSView, NSDraggingSource {
    var item: Item?

    override func mouseDown(with event: NSEvent) {
        guard let item = item else { return }

        let pasteboardItem = NSPasteboardItem()
        pasteboardItem.setString(item.id.uuidString, forType: .string)

        let draggingItem = NSDraggingItem(pasteboardWriter: pasteboardItem)
        draggingItem.setDraggingFrame(bounds, contents: snapshot())

        beginDraggingSession(with: [draggingItem], event: event, source: self)
    }

    func draggingSession(_ session: NSDraggingSession, sourceOperationMaskFor context: NSDraggingContext) -> NSDragOperation {
        context == .withinApplication ? .move : .copy
    }

    func draggingSession(_ session: NSDraggingSession, endedAt screenPoint: NSPoint, operation: NSDragOperation) {
        if operation == .move {
            // Remove from source
        }
    }

    private func snapshot() -> NSImage {
        let image = NSImage(size: bounds.size)
        image.lockFocus()
        draw(bounds)
        image.unlockFocus()
        return image
    }
}
```
</dragging_source>

<dragging_destination>
```swift
class DropTargetView: NSView {
    var onDrop: (([String]) -> Bool)?

    override func awakeFromNib() {
        super.awakeFromNib()
        registerForDraggedTypes([.string, .fileURL])
    }

    override func draggingEntered(_ sender: NSDraggingInfo) -> NSDragOperation {
        .copy
    }

    override func performDragOperation(_ sender: NSDraggingInfo) -> Bool {
        let pasteboard = sender.draggingPasteboard

        if let urls = pasteboard.readObjects(forClasses: [NSURL.self]) as? [URL] {
            return onDrop?(urls.map { $0.path }) ?? false
        }

        if let strings = pasteboard.readObjects(forClasses: [NSString.self]) as? [String] {
            return onDrop?(strings) ?? false
        }

        return false
    }
}
```
</dragging_destination>
</drag_and_drop>

<window_customization>
<custom_titlebar>
```swift
class CustomWindow: NSWindow {
    override init(
        contentRect: NSRect,
        styleMask style: NSWindow.StyleMask,
        backing backingStoreType: NSWindow.BackingStoreType,
        defer flag: Bool
    ) {
        super.init(contentRect: contentRect, styleMask: style, backing: backingStoreType, defer: flag)

        // Transparent titlebar
        titlebarAppearsTransparent = true
        titleVisibility = .hidden

        // Full-size content
        styleMask.insert(.fullSizeContentView)

        // Custom background
        backgroundColor = .windowBackgroundColor
        isOpaque = false
    }
}
```
</custom_titlebar>

<access_window_from_swiftui>
```swift
struct WindowAccessor: NSViewRepresentable {
    var callback: (NSWindow?) -> Void

    func makeNSView(context: Context) -> NSView {
        let view = NSView()
        DispatchQueue.main.async {
            callback(view.window)
        }
        return view
    }

    func updateNSView(_ nsView: NSView, context: Context) {}
}

// Usage
struct ContentView: View {
    var body: some View {
        MainContent()
            .background(WindowAccessor { window in
                window?.titlebarAppearsTransparent = true
            })
    }
}
```
</access_window_from_swiftui>
</window_customization>

<popover>
```swift
class PopoverController {
    private var popover: NSPopover?

    func show(from view: NSView, content: some View) {
        let popover = NSPopover()
        popover.contentViewController = NSHostingController(rootView: content)
        popover.behavior = .transient

        popover.show(
            relativeTo: view.bounds,
            of: view,
            preferredEdge: .minY
        )

        self.popover = popover
    }

    func close() {
        popover?.close()
        popover = nil
    }
}

// SwiftUI wrapper
struct PopoverButton<Content: View>: NSViewRepresentable {
    @Binding var isPresented: Bool
    @ViewBuilder var content: () -> Content

    func makeNSView(context: Context) -> NSButton {
        let button = NSButton(title: "Show", target: context.coordinator, action: #selector(Coordinator.showPopover))
        return button
    }

    func updateNSView(_ nsView: NSButton, context: Context) {
        context.coordinator.isPresented = isPresented
        context.coordinator.content = AnyView(content())

        if !isPresented {
            context.coordinator.popover?.close()
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, NSPopoverDelegate {
        var parent: PopoverButton
        var popover: NSPopover?
        var isPresented: Bool = false
        var content: AnyView = AnyView(EmptyView())

        init(_ parent: PopoverButton) {
            self.parent = parent
        }

        @objc func showPopover(_ sender: NSButton) {
            let popover = NSPopover()
            popover.contentViewController = NSHostingController(rootView: content)
            popover.behavior = .transient
            popover.delegate = self

            popover.show(relativeTo: sender.bounds, of: sender, preferredEdge: .minY)
            self.popover = popover
            parent.isPresented = true
        }

        func popoverDidClose(_ notification: Notification) {
            parent.isPresented = false
        }
    }
}
```
</popover>

<best_practices>
<do>
- Use NSViewRepresentable for custom views
- Use Coordinator for delegate callbacks
- Clean up resources in NSViewRepresentable
- Use NSHostingView to embed SwiftUI in AppKit
</do>

<avoid>
- Using AppKit when SwiftUI suffices
- Forgetting to set acceptsFirstResponder for keyboard input
- Not handling coordinate system (isFlipped)
- Memory leaks from strong delegate references
</avoid>
</best_practices>
