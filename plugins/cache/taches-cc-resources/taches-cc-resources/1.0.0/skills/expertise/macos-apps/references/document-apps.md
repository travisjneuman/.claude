# Document-Based Apps

Apps where users create, open, and save discrete files (like TextEdit, Pages, Xcode).

<when_to_use>
Use document-based architecture when:
- Users explicitly create/open/save files
- Multiple documents open simultaneously
- Files shared with other apps
- Standard document behaviors expected (Recent Documents, autosave, versions)

Do NOT use when:
- Single internal database (use shoebox pattern)
- No user-facing files
</when_to_use>

<swiftui_document_group>
<basic_setup>
```swift
import SwiftUI
import UniformTypeIdentifiers

@main
struct MyDocumentApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: MyDocument()) { file in
            DocumentView(document: file.$document)
        }
        .commands {
            DocumentCommands()
        }
    }
}

struct MyDocument: FileDocument {
    // Supported types
    static var readableContentTypes: [UTType] { [.myDocument] }
    static var writableContentTypes: [UTType] { [.myDocument] }

    // Document data
    var content: DocumentContent

    // New document
    init() {
        content = DocumentContent()
    }

    // Load from file
    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents else {
            throw CocoaError(.fileReadCorruptFile)
        }
        content = try JSONDecoder().decode(DocumentContent.self, from: data)
    }

    // Save to file
    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        let data = try JSONEncoder().encode(content)
        return FileWrapper(regularFileWithContents: data)
    }
}

// Custom UTType
extension UTType {
    static var myDocument: UTType {
        UTType(exportedAs: "com.yourcompany.myapp.document")
    }
}
```
</basic_setup>

<document_view>
```swift
struct DocumentView: View {
    @Binding var document: MyDocument
    @FocusedBinding(\.document) private var focusedDocument

    var body: some View {
        TextEditor(text: $document.content.text)
            .focusedSceneValue(\.document, $document)
    }
}

// Focused values for commands
struct DocumentFocusedValueKey: FocusedValueKey {
    typealias Value = Binding<MyDocument>
}

extension FocusedValues {
    var document: Binding<MyDocument>? {
        get { self[DocumentFocusedValueKey.self] }
        set { self[DocumentFocusedValueKey.self] = newValue }
    }
}
```
</document_view>

<document_commands>
```swift
struct DocumentCommands: Commands {
    @FocusedBinding(\.document) private var document

    var body: some Commands {
        CommandMenu("Format") {
            Button("Bold") {
                document?.wrappedValue.content.toggleBold()
            }
            .keyboardShortcut("b", modifiers: .command)
            .disabled(document == nil)

            Button("Italic") {
                document?.wrappedValue.content.toggleItalic()
            }
            .keyboardShortcut("i", modifiers: .command)
            .disabled(document == nil)
        }
    }
}
```
</document_commands>

<reference_file_document>
For documents referencing external files:

```swift
struct ProjectDocument: ReferenceFileDocument {
    static var readableContentTypes: [UTType] { [.myProject] }

    var project: Project

    init() {
        project = Project()
    }

    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents else {
            throw CocoaError(.fileReadCorruptFile)
        }
        project = try JSONDecoder().decode(Project.self, from: data)
    }

    func snapshot(contentType: UTType) throws -> Project {
        project
    }

    func fileWrapper(snapshot: Project, configuration: WriteConfiguration) throws -> FileWrapper {
        let data = try JSONEncoder().encode(snapshot)
        return FileWrapper(regularFileWithContents: data)
    }
}
```
</reference_file_document>
</swiftui_document_group>

<info_plist_document_types>
Configure document types in Info.plist:

```xml
<key>CFBundleDocumentTypes</key>
<array>
    <dict>
        <key>CFBundleTypeName</key>
        <string>My Document</string>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>LSHandlerRank</key>
        <string>Owner</string>
        <key>LSItemContentTypes</key>
        <array>
            <string>com.yourcompany.myapp.document</string>
        </array>
    </dict>
</array>

<key>UTExportedTypeDeclarations</key>
<array>
    <dict>
        <key>UTTypeIdentifier</key>
        <string>com.yourcompany.myapp.document</string>
        <key>UTTypeDescription</key>
        <string>My Document</string>
        <key>UTTypeConformsTo</key>
        <array>
            <string>public.data</string>
            <string>public.content</string>
        </array>
        <key>UTTypeTagSpecification</key>
        <dict>
            <key>public.filename-extension</key>
            <array>
                <string>mydoc</string>
            </array>
        </dict>
    </dict>
</array>
```
</info_plist_document_types>

<nsdocument_appkit>
For more control, use NSDocument:

<nsdocument_subclass>
```swift
import AppKit

class Document: NSDocument {
    var content = DocumentContent()

    override class var autosavesInPlace: Bool { true }

    override func makeWindowControllers() {
        let contentView = DocumentView(document: self)
        let hostingController = NSHostingController(rootView: contentView)

        let window = NSWindow(contentViewController: hostingController)
        window.setContentSize(NSSize(width: 800, height: 600))
        window.styleMask = [.titled, .closable, .miniaturizable, .resizable]

        let windowController = NSWindowController(window: window)
        addWindowController(windowController)
    }

    override func data(ofType typeName: String) throws -> Data {
        try JSONEncoder().encode(content)
    }

    override func read(from data: Data, ofType typeName: String) throws {
        content = try JSONDecoder().decode(DocumentContent.self, from: data)
    }
}
```
</nsdocument_subclass>

<undo_support>
```swift
class Document: NSDocument {
    var content = DocumentContent() {
        didSet {
            updateChangeCount(.changeDone)
        }
    }

    func updateContent(_ newContent: DocumentContent) {
        let oldContent = content

        undoManager?.registerUndo(withTarget: self) { document in
            document.updateContent(oldContent)
        }
        undoManager?.setActionName("Update Content")

        content = newContent
    }
}
```
</undo_support>

<nsdocument_lifecycle>
```swift
class Document: NSDocument {
    // Called when document is first opened
    override func windowControllerDidLoadNib(_ windowController: NSWindowController) {
        super.windowControllerDidLoadNib(windowController)
        // Setup UI
    }

    // Called before saving
    override func prepareSavePanel(_ savePanel: NSSavePanel) -> Bool {
        savePanel.allowedContentTypes = [.myDocument]
        savePanel.allowsOtherFileTypes = false
        return true
    }

    // Called after saving
    override func save(to url: URL, ofType typeName: String, for saveOperation: NSDocument.SaveOperationType, completionHandler: @escaping (Error?) -> Void) {
        super.save(to: url, ofType: typeName, for: saveOperation) { error in
            if error == nil {
                // Post-save actions
            }
            completionHandler(error)
        }
    }

    // Handle close with unsaved changes
    override func canClose(withDelegate delegate: Any, shouldClose shouldCloseSelector: Selector?, contextInfo: UnsafeMutableRawPointer?) {
        // Custom save confirmation
        super.canClose(withDelegate: delegate, shouldClose: shouldCloseSelector, contextInfo: contextInfo)
    }
}
```
</nsdocument_lifecycle>
</nsdocument_appkit>

<package_documents>
For documents containing multiple files (like .pages):

```swift
struct PackageDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.myPackage] }

    var mainContent: MainContent
    var assets: [String: Data]

    init(configuration: ReadConfiguration) throws {
        guard let directory = configuration.file.fileWrappers else {
            throw CocoaError(.fileReadCorruptFile)
        }

        // Read main content
        guard let mainData = directory["content.json"]?.regularFileContents else {
            throw CocoaError(.fileReadCorruptFile)
        }
        mainContent = try JSONDecoder().decode(MainContent.self, from: mainData)

        // Read assets
        assets = [:]
        if let assetsDir = directory["Assets"]?.fileWrappers {
            for (name, wrapper) in assetsDir {
                if let data = wrapper.regularFileContents {
                    assets[name] = data
                }
            }
        }
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        let directory = FileWrapper(directoryWithFileWrappers: [:])

        // Write main content
        let mainData = try JSONEncoder().encode(mainContent)
        directory.addRegularFile(withContents: mainData, preferredFilename: "content.json")

        // Write assets
        let assetsDir = FileWrapper(directoryWithFileWrappers: [:])
        for (name, data) in assets {
            assetsDir.addRegularFile(withContents: data, preferredFilename: name)
        }
        directory.addFileWrapper(assetsDir)
        assetsDir.preferredFilename = "Assets"

        return directory
    }
}

// UTType for package
extension UTType {
    static var myPackage: UTType {
        UTType(exportedAs: "com.yourcompany.myapp.package", conformingTo: .package)
    }
}
```
</package_documents>

<recent_documents>
```swift
// NSDocumentController manages Recent Documents automatically

// Custom recent documents menu
struct AppCommands: Commands {
    var body: some Commands {
        CommandGroup(after: .newItem) {
            Menu("Open Recent") {
                ForEach(recentDocuments, id: \.self) { url in
                    Button(url.lastPathComponent) {
                        NSDocumentController.shared.openDocument(
                            withContentsOf: url,
                            display: true
                        ) { _, _, _ in }
                    }
                }

                if !recentDocuments.isEmpty {
                    Divider()
                    Button("Clear Menu") {
                        NSDocumentController.shared.clearRecentDocuments(nil)
                    }
                }
            }
        }
    }

    var recentDocuments: [URL] {
        NSDocumentController.shared.recentDocumentURLs
    }
}
```
</recent_documents>

<export_import>
```swift
struct DocumentView: View {
    @Binding var document: MyDocument
    @State private var showingExporter = false
    @State private var showingImporter = false

    var body: some View {
        MainContent(document: $document)
            .toolbar {
                Button("Export") { showingExporter = true }
                Button("Import") { showingImporter = true }
            }
            .fileExporter(
                isPresented: $showingExporter,
                document: document,
                contentType: .pdf,
                defaultFilename: "Export"
            ) { result in
                switch result {
                case .success(let url):
                    print("Exported to \(url)")
                case .failure(let error):
                    print("Export failed: \(error)")
                }
            }
            .fileImporter(
                isPresented: $showingImporter,
                allowedContentTypes: [.plainText, .json],
                allowsMultipleSelection: false
            ) { result in
                switch result {
                case .success(let urls):
                    importFile(urls.first!)
                case .failure(let error):
                    print("Import failed: \(error)")
                }
            }
    }
}

// Export to different format
extension MyDocument {
    func exportAsPDF() -> Data {
        // Generate PDF from content
        let renderer = ImageRenderer(content: ContentPreview(content: content))
        return renderer.render { size, render in
            var box = CGRect(origin: .zero, size: size)
            guard let context = CGContext(consumer: CGDataConsumer(data: NSMutableData() as CFMutableData)!, mediaBox: &box, nil) else { return }
            context.beginPDFPage(nil)
            render(context)
            context.endPDFPage()
            context.closePDF()
        } ?? Data()
    }
}
```
</export_import>
