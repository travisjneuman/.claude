# App Extensions

Share extensions, widgets, Quick Look previews, and Shortcuts for macOS.

<share_extension>
<setup>
1. File > New > Target > Share Extension
2. Configure activation rules in Info.plist
3. Implement share view controller

**Info.plist activation rules**:
```xml
<key>NSExtension</key>
<dict>
    <key>NSExtensionAttributes</key>
    <dict>
        <key>NSExtensionActivationRule</key>
        <dict>
            <key>NSExtensionActivationSupportsText</key>
            <true/>
            <key>NSExtensionActivationSupportsWebURLWithMaxCount</key>
            <integer>1</integer>
            <key>NSExtensionActivationSupportsImageWithMaxCount</key>
            <integer>10</integer>
        </dict>
    </dict>
    <key>NSExtensionPointIdentifier</key>
    <string>com.apple.share-services</string>
    <key>NSExtensionPrincipalClass</key>
    <string>$(PRODUCT_MODULE_NAME).ShareViewController</string>
</dict>
```
</setup>

<share_view_controller>
```swift
import Cocoa
import Social

class ShareViewController: SLComposeServiceViewController {
    override func loadView() {
        super.loadView()
        // Customize title
        title = "Save to MyApp"
    }

    override func didSelectPost() {
        // Get shared items
        guard let extensionContext = extensionContext else { return }

        for item in extensionContext.inputItems as? [NSExtensionItem] ?? [] {
            for provider in item.attachments ?? [] {
                if provider.hasItemConformingToTypeIdentifier("public.url") {
                    provider.loadItem(forTypeIdentifier: "public.url") { [weak self] url, error in
                        if let url = url as? URL {
                            self?.saveURL(url)
                        }
                    }
                }

                if provider.hasItemConformingToTypeIdentifier("public.image") {
                    provider.loadItem(forTypeIdentifier: "public.image") { [weak self] image, error in
                        if let image = image as? NSImage {
                            self?.saveImage(image)
                        }
                    }
                }
            }
        }

        extensionContext.completeRequest(returningItems: nil)
    }

    override func isContentValid() -> Bool {
        // Validate content before allowing post
        return !contentText.isEmpty
    }

    override func didSelectCancel() {
        extensionContext?.cancelRequest(withError: NSError(domain: "ShareExtension", code: 0))
    }

    private func saveURL(_ url: URL) {
        // Save to shared container
        let sharedDefaults = UserDefaults(suiteName: "group.com.yourcompany.myapp")
        var urls = sharedDefaults?.array(forKey: "savedURLs") as? [String] ?? []
        urls.append(url.absoluteString)
        sharedDefaults?.set(urls, forKey: "savedURLs")
    }

    private func saveImage(_ image: NSImage) {
        // Save to shared container
        guard let data = image.tiffRepresentation,
              let rep = NSBitmapImageRep(data: data),
              let pngData = rep.representation(using: .png, properties: [:]) else { return }

        let containerURL = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.com.yourcompany.myapp"
        )!
        let imageURL = containerURL.appendingPathComponent(UUID().uuidString + ".png")
        try? pngData.write(to: imageURL)
    }
}
```
</share_view_controller>

<app_groups>
Share data between app and extension:

```xml
<!-- Entitlements for both app and extension -->
<key>com.apple.security.application-groups</key>
<array>
    <string>group.com.yourcompany.myapp</string>
</array>
```

```swift
// Shared UserDefaults
let shared = UserDefaults(suiteName: "group.com.yourcompany.myapp")

// Shared container
let containerURL = FileManager.default.containerURL(
    forSecurityApplicationGroupIdentifier: "group.com.yourcompany.myapp"
)
```
</app_groups>
</share_extension>

<widgets>
<widget_extension>
1. File > New > Target > Widget Extension
2. Define timeline provider
3. Create widget view

```swift
import WidgetKit
import SwiftUI

// Timeline entry
struct ItemEntry: TimelineEntry {
    let date: Date
    let items: [Item]
}

// Timeline provider
struct ItemProvider: TimelineProvider {
    func placeholder(in context: Context) -> ItemEntry {
        ItemEntry(date: Date(), items: [.placeholder])
    }

    func getSnapshot(in context: Context, completion: @escaping (ItemEntry) -> Void) {
        let entry = ItemEntry(date: Date(), items: loadItems())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<ItemEntry>) -> Void) {
        let items = loadItems()
        let entry = ItemEntry(date: Date(), items: items)

        // Refresh every hour
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))

        completion(timeline)
    }

    private func loadItems() -> [Item] {
        // Load from shared container
        let shared = UserDefaults(suiteName: "group.com.yourcompany.myapp")
        // ... deserialize items
        return []
    }
}

// Widget view
struct ItemWidgetView: View {
    var entry: ItemEntry

    var body: some View {
        VStack(alignment: .leading) {
            Text("Recent Items")
                .font(.headline)

            ForEach(entry.items.prefix(3)) { item in
                HStack {
                    Image(systemName: item.icon)
                    Text(item.name)
                }
                .font(.caption)
            }
        }
        .padding()
    }
}

// Widget configuration
@main
struct ItemWidget: Widget {
    let kind = "ItemWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: ItemProvider()) { entry in
            ItemWidgetView(entry: entry)
        }
        .configurationDisplayName("Recent Items")
        .description("Shows your most recent items")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
```
</widget_extension>

<widget_deep_links>
```swift
struct ItemWidgetView: View {
    var entry: ItemEntry

    var body: some View {
        VStack {
            ForEach(entry.items) { item in
                Link(destination: URL(string: "myapp://item/\(item.id)")!) {
                    Text(item.name)
                }
            }
        }
        .widgetURL(URL(string: "myapp://widget"))
    }
}

// Handle in main app
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    handleURL(url)
                }
        }
    }

    func handleURL(_ url: URL) {
        // Parse myapp://item/123
        if url.host == "item", let id = url.pathComponents.last {
            // Navigate to item
        }
    }
}
```
</widget_deep_links>

<update_widget>
```swift
// From main app, tell widget to refresh
import WidgetKit

func itemsChanged() {
    WidgetCenter.shared.reloadTimelines(ofKind: "ItemWidget")
}

// Reload all widgets
WidgetCenter.shared.reloadAllTimelines()
```
</update_widget>
</widgets>

<quick_look>
<preview_extension>
1. File > New > Target > Quick Look Preview Extension
2. Implement preview view controller

```swift
import Cocoa
import Quartz

class PreviewViewController: NSViewController, QLPreviewingController {
    @IBOutlet var textView: NSTextView!

    func preparePreviewOfFile(at url: URL, completionHandler handler: @escaping (Error?) -> Void) {
        do {
            let content = try loadDocument(at: url)
            textView.string = content.text
            handler(nil)
        } catch {
            handler(error)
        }
    }

    private func loadDocument(at url: URL) throws -> DocumentContent {
        let data = try Data(contentsOf: url)
        return try JSONDecoder().decode(DocumentContent.self, from: data)
    }
}
```
</preview_extension>

<thumbnail_extension>
1. File > New > Target > Thumbnail Extension

```swift
import QuickLookThumbnailing

class ThumbnailProvider: QLThumbnailProvider {
    override func provideThumbnail(
        for request: QLFileThumbnailRequest,
        _ handler: @escaping (QLThumbnailReply?, Error?) -> Void
    ) {
        let size = request.maximumSize

        handler(QLThumbnailReply(contextSize: size) { context -> Bool in
            // Draw thumbnail
            let content = self.loadContent(at: request.fileURL)
            self.drawThumbnail(content, in: context, size: size)
            return true
        }, nil)
    }

    private func drawThumbnail(_ content: DocumentContent, in context: CGContext, size: CGSize) {
        // Draw background
        context.setFillColor(NSColor.white.cgColor)
        context.fill(CGRect(origin: .zero, size: size))

        // Draw content preview
        // ...
    }
}
```
</thumbnail_extension>
</quick_look>

<shortcuts>
<app_intents>
```swift
import AppIntents

// Define intent
struct CreateItemIntent: AppIntent {
    static var title: LocalizedStringResource = "Create Item"
    static var description = IntentDescription("Creates a new item in MyApp")

    @Parameter(title: "Name")
    var name: String

    @Parameter(title: "Folder", optionsProvider: FolderOptionsProvider())
    var folder: String?

    func perform() async throws -> some IntentResult & ProvidesDialog {
        let item = Item(name: name)
        if let folderName = folder {
            item.folder = findFolder(named: folderName)
        }

        try await DataService.shared.save(item)

        return .result(dialog: "Created \(name)")
    }
}

// Options provider
struct FolderOptionsProvider: DynamicOptionsProvider {
    func results() async throws -> [String] {
        let folders = try await DataService.shared.fetchFolders()
        return folders.map { $0.name }
    }
}

// Register shortcuts
struct MyAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: CreateItemIntent(),
            phrases: [
                "Create item in \(.applicationName)",
                "New \(.applicationName) item"
            ],
            shortTitle: "Create Item",
            systemImageName: "plus.circle"
        )
    }
}
```
</app_intents>

<entity_queries>
```swift
// Define entity
struct ItemEntity: AppEntity {
    static var typeDisplayRepresentation = TypeDisplayRepresentation(name: "Item")

    var id: UUID
    var name: String

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(title: "\(name)")
    }

    static var defaultQuery = ItemQuery()
}

// Define query
struct ItemQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [ItemEntity] {
        let items = try await DataService.shared.fetchItems(ids: identifiers)
        return items.map { ItemEntity(id: $0.id, name: $0.name) }
    }

    func suggestedEntities() async throws -> [ItemEntity] {
        let items = try await DataService.shared.recentItems(limit: 10)
        return items.map { ItemEntity(id: $0.id, name: $0.name) }
    }
}

// Use in intent
struct OpenItemIntent: AppIntent {
    static var title: LocalizedStringResource = "Open Item"

    @Parameter(title: "Item")
    var item: ItemEntity

    func perform() async throws -> some IntentResult {
        // Open item in app
        NotificationCenter.default.post(
            name: .openItem,
            object: nil,
            userInfo: ["id": item.id]
        )
        return .result()
    }
}
```
</entity_queries>
</shortcuts>

<action_extension>
```swift
import Cocoa

class ActionViewController: NSViewController {
    @IBOutlet var textView: NSTextView!

    override func viewDidLoad() {
        super.viewDidLoad()

        // Get input items
        for item in extensionContext?.inputItems as? [NSExtensionItem] ?? [] {
            for provider in item.attachments ?? [] {
                if provider.hasItemConformingToTypeIdentifier("public.text") {
                    provider.loadItem(forTypeIdentifier: "public.text") { [weak self] text, _ in
                        DispatchQueue.main.async {
                            self?.textView.string = text as? String ?? ""
                        }
                    }
                }
            }
        }
    }

    @IBAction func done(_ sender: Any) {
        // Return modified content
        let outputItem = NSExtensionItem()
        outputItem.attachments = [
            NSItemProvider(item: textView.string as NSString, typeIdentifier: "public.text")
        ]

        extensionContext?.completeRequest(returningItems: [outputItem])
    }

    @IBAction func cancel(_ sender: Any) {
        extensionContext?.cancelRequest(withError: NSError(domain: "ActionExtension", code: 0))
    }
}
```
</action_extension>

<extension_best_practices>
- Share data via App Groups
- Keep extensions lightweight (memory limits)
- Handle errors gracefully
- Test in all contexts (Finder, Safari, etc.)
- Update Info.plist activation rules carefully
- Use WidgetCenter.shared.reloadTimelines() to update widgets
- Define clear App Intents with good phrases
</extension_best_practices>
