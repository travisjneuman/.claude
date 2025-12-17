# Data Persistence

Patterns for persisting data in macOS apps using SwiftData, Core Data, and file-based storage.

<choosing_persistence>
**SwiftData** (macOS 14+): Best for new apps
- Declarative schema in code
- Tight SwiftUI integration
- Automatic iCloud sync
- Less boilerplate

**Core Data**: Best for complex needs or backward compatibility
- Visual schema editor
- Fine-grained migration control
- More mature ecosystem
- Works on older macOS

**File-based (Codable)**: Best for documents or simple data
- JSON/plist storage
- No database overhead
- Portable data
- Good for document-based apps

**UserDefaults**: Preferences and small state only
- Not for app data

**Keychain**: Sensitive data only
- Passwords, tokens, keys
</choosing_persistence>

<swiftdata>
<model_definition>
```swift
import SwiftData

@Model
class Project {
    var name: String
    var createdAt: Date
    var isArchived: Bool

    @Relationship(deleteRule: .cascade, inverse: \Task.project)
    var tasks: [Task]

    @Attribute(.externalStorage)
    var thumbnail: Data?

    // Computed properties are fine
    var activeTasks: [Task] {
        tasks.filter { !$0.isComplete }
    }

    init(name: String) {
        self.name = name
        self.createdAt = Date()
        self.isArchived = false
        self.tasks = []
    }
}

@Model
class Task {
    var title: String
    var isComplete: Bool
    var dueDate: Date?
    var priority: Priority

    var project: Project?

    enum Priority: Int, Codable {
        case low = 0
        case medium = 1
        case high = 2
    }

    init(title: String, priority: Priority = .medium) {
        self.title = title
        self.isComplete = false
        self.priority = priority
    }
}
```
</model_definition>

<container_setup>
```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Project.self)
    }
}

// Custom configuration
@main
struct MyApp: App {
    let container: ModelContainer

    init() {
        let schema = Schema([Project.self, Task.self])
        let config = ModelConfiguration(
            "MyApp",
            schema: schema,
            isStoredInMemoryOnly: false,
            cloudKitDatabase: .automatic
        )

        do {
            container = try ModelContainer(for: schema, configurations: config)
        } catch {
            fatalError("Failed to create container: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(container)
    }
}
```
</container_setup>

<querying>
```swift
struct ProjectListView: View {
    // Basic query
    @Query private var projects: [Project]

    // Filtered and sorted
    @Query(
        filter: #Predicate<Project> { !$0.isArchived },
        sort: \Project.createdAt,
        order: .reverse
    ) private var activeProjects: [Project]

    // Dynamic filter
    @Query private var allProjects: [Project]

    var filteredProjects: [Project] {
        if searchText.isEmpty {
            return allProjects
        }
        return allProjects.filter {
            $0.name.localizedCaseInsensitiveContains(searchText)
        }
    }

    @State private var searchText = ""

    var body: some View {
        List(filteredProjects) { project in
            Text(project.name)
        }
        .searchable(text: $searchText)
    }
}
```
</querying>

<relationship_patterns>
<critical_rule>
**When adding items to relationships, set the inverse relationship property, then insert into context.** Don't manually append to arrays.
</critical_rule>

<adding_to_relationships>
```swift
// CORRECT: Set inverse, then insert
func addCard(to column: Column, title: String) {
    let card = Card(title: title, position: 1.0)
    card.column = column  // Set the inverse relationship
    modelContext.insert(card)  // Insert into context
    // SwiftData automatically updates column.cards
}

// WRONG: Don't manually append to arrays
func addCardWrong(to column: Column, title: String) {
    let card = Card(title: title, position: 1.0)
    column.cards.append(card)  // This can cause issues
    modelContext.insert(card)
}
```
</adding_to_relationships>

<when_to_insert>
**Always call `modelContext.insert()` for new objects.** SwiftData needs this to track the object.

```swift
// Creating a new item - MUST insert
let card = Card(title: "New")
card.column = column
modelContext.insert(card)  // Required!

// Modifying existing item - no insert needed
existingCard.title = "Updated"  // SwiftData tracks this automatically

// Moving item between parents
card.column = newColumn  // Just update the relationship
// No insert needed for existing objects
```
</when_to_insert>

<relationship_definition>
```swift
@Model
class Column {
    var name: String
    var position: Double

    // Define relationship with inverse
    @Relationship(deleteRule: .cascade, inverse: \Card.column)
    var cards: [Card] = []

    init(name: String, position: Double) {
        self.name = name
        self.position = position
    }
}

@Model
class Card {
    var title: String
    var position: Double

    // The inverse side - this is what you SET when adding
    var column: Column?

    init(title: String, position: Double) {
        self.title = title
        self.position = position
    }
}
```
</relationship_definition>

<common_pitfalls>
**Pitfall 1: Not setting inverse relationship**
```swift
// WRONG - card won't appear in column.cards
let card = Card(title: "New", position: 1.0)
modelContext.insert(card)  // Missing: card.column = column
```

**Pitfall 2: Manually managing both sides**
```swift
// WRONG - redundant and can cause issues
card.column = column
column.cards.append(card)  // Don't do this
modelContext.insert(card)
```

**Pitfall 3: Forgetting to insert**
```swift
// WRONG - object won't persist
let card = Card(title: "New", position: 1.0)
card.column = column
// Missing: modelContext.insert(card)
```
</common_pitfalls>

<reordering_items>
```swift
// For drag-and-drop reordering within same parent
func moveCard(_ card: Card, to newPosition: Double) {
    card.position = newPosition
    // SwiftData tracks the change automatically
}

// Moving between parents (e.g., column to column)
func moveCard(_ card: Card, to newColumn: Column, position: Double) {
    card.column = newColumn
    card.position = position
    // No insert needed - card already exists
}
```
</reordering_items>
</relationship_patterns>

<crud_operations>
```swift
struct ProjectListView: View {
    @Environment(\.modelContext) private var context
    @Query private var projects: [Project]

    var body: some View {
        List {
            ForEach(projects) { project in
                Text(project.name)
            }
            .onDelete(perform: deleteProjects)
        }
        .toolbar {
            Button("Add") {
                addProject()
            }
        }
    }

    private func addProject() {
        let project = Project(name: "New Project")
        context.insert(project)
        // Auto-saves
    }

    private func deleteProjects(at offsets: IndexSet) {
        for index in offsets {
            context.delete(projects[index])
        }
    }
}

// In a service
actor DataService {
    private let context: ModelContext

    init(container: ModelContainer) {
        self.context = ModelContext(container)
    }

    func fetchProjects() throws -> [Project] {
        let descriptor = FetchDescriptor<Project>(
            predicate: #Predicate { !$0.isArchived },
            sortBy: [SortDescriptor(\.createdAt, order: .reverse)]
        )
        return try context.fetch(descriptor)
    }

    func save(_ project: Project) throws {
        context.insert(project)
        try context.save()
    }
}
```
</crud_operations>

<icloud_sync>
```swift
// Enable in ModelConfiguration
let config = ModelConfiguration(
    cloudKitDatabase: .automatic  // or .private("containerID")
)

// Handle sync status
struct SyncStatusView: View {
    @Environment(\.modelContext) private var context

    var body: some View {
        // SwiftData handles sync automatically
        // Monitor with NotificationCenter for CKAccountChanged
        Text("Syncing...")
    }
}
```
</icloud_sync>
</swiftdata>

<core_data>
<stack_setup>
```swift
class PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentContainer

    init(inMemory: Bool = false) {
        container = NSPersistentContainer(name: "MyApp")

        if inMemory {
            container.persistentStoreDescriptions.first?.url = URL(fileURLWithPath: "/dev/null")
        }

        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Failed to load store: \(error)")
            }
        }

        container.viewContext.automaticallyMergesChangesFromParent = true
        container.viewContext.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
    }

    var viewContext: NSManagedObjectContext {
        container.viewContext
    }

    func newBackgroundContext() -> NSManagedObjectContext {
        container.newBackgroundContext()
    }
}
```
</stack_setup>

<fetch_request>
```swift
struct ProjectListView: View {
    @Environment(\.managedObjectContext) private var context

    @FetchRequest(
        sortDescriptors: [NSSortDescriptor(keyPath: \CDProject.createdAt, ascending: false)],
        predicate: NSPredicate(format: "isArchived == NO")
    )
    private var projects: FetchedResults<CDProject>

    var body: some View {
        List(projects) { project in
            Text(project.name ?? "Untitled")
        }
    }
}
```
</fetch_request>

<crud_operations_coredata>
```swift
// Create
func createProject(name: String) {
    let project = CDProject(context: context)
    project.id = UUID()
    project.name = name
    project.createdAt = Date()

    do {
        try context.save()
    } catch {
        context.rollback()
    }
}

// Update
func updateProject(_ project: CDProject, name: String) {
    project.name = name
    try? context.save()
}

// Delete
func deleteProject(_ project: CDProject) {
    context.delete(project)
    try? context.save()
}

// Background operations
func importProjects(_ data: [ProjectData]) async throws {
    let context = PersistenceController.shared.newBackgroundContext()

    try await context.perform {
        for item in data {
            let project = CDProject(context: context)
            project.id = UUID()
            project.name = item.name
        }
        try context.save()
    }
}
```
</crud_operations_coredata>
</core_data>

<file_based>
<codable_storage>
```swift
struct AppData: Codable {
    var items: [Item]
    var lastModified: Date
}

class FileStorage {
    private let fileURL: URL

    init() {
        let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let appFolder = appSupport.appendingPathComponent("MyApp", isDirectory: true)

        // Create directory if needed
        try? FileManager.default.createDirectory(at: appFolder, withIntermediateDirectories: true)

        fileURL = appFolder.appendingPathComponent("data.json")
    }

    func load() throws -> AppData {
        let data = try Data(contentsOf: fileURL)
        return try JSONDecoder().decode(AppData.self, from: data)
    }

    func save(_ appData: AppData) throws {
        let data = try JSONEncoder().encode(appData)
        try data.write(to: fileURL, options: .atomic)
    }
}
```
</codable_storage>

<document_storage>
For document-based apps, see [document-apps.md](document-apps.md).

```swift
struct ProjectDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.json] }

    var project: Project

    init(project: Project = Project()) {
        self.project = project
    }

    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents else {
            throw CocoaError(.fileReadCorruptFile)
        }
        project = try JSONDecoder().decode(Project.self, from: data)
    }

    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        let data = try JSONEncoder().encode(project)
        return FileWrapper(regularFileWithContents: data)
    }
}
```
</document_storage>
</file_based>

<keychain>
```swift
import Security

class KeychainService {
    static let shared = KeychainService()

    func save(key: String, data: Data) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecValueData as String: data
        ]

        SecItemDelete(query as CFDictionary)

        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.saveFailed(status)
        }
    }

    func load(key: String) throws -> Data {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key,
            kSecReturnData as String: true
        ]

        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)

        guard status == errSecSuccess, let data = result as? Data else {
            throw KeychainError.loadFailed(status)
        }

        return data
    }

    func delete(key: String) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: key
        ]

        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.deleteFailed(status)
        }
    }
}

enum KeychainError: Error {
    case saveFailed(OSStatus)
    case loadFailed(OSStatus)
    case deleteFailed(OSStatus)
}

// Usage
let token = "secret-token".data(using: .utf8)!
try KeychainService.shared.save(key: "api-token", data: token)
```
</keychain>

<user_defaults>
```swift
// Using @AppStorage
struct SettingsView: View {
    @AppStorage("theme") private var theme = "system"
    @AppStorage("fontSize") private var fontSize = 14.0

    var body: some View {
        Form {
            Picker("Theme", selection: $theme) {
                Text("System").tag("system")
                Text("Light").tag("light")
                Text("Dark").tag("dark")
            }

            Slider(value: $fontSize, in: 10...24) {
                Text("Font Size: \(Int(fontSize))")
            }
        }
    }
}

// Type-safe wrapper
extension UserDefaults {
    enum Keys {
        static let theme = "theme"
        static let recentFiles = "recentFiles"
    }

    var theme: String {
        get { string(forKey: Keys.theme) ?? "system" }
        set { set(newValue, forKey: Keys.theme) }
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
```
</user_defaults>

<migration>
<swiftdata_migration>
```swift
// SwiftData handles lightweight migrations automatically
// For complex migrations, use VersionedSchema

enum MyAppSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Project.self]
    }

    @Model
    class Project {
        var name: String
        init(name: String) { self.name = name }
    }
}

enum MyAppSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)
    static var models: [any PersistentModel.Type] {
        [Project.self]
    }

    @Model
    class Project {
        var name: String
        var createdAt: Date  // New property
        init(name: String) {
            self.name = name
            self.createdAt = Date()
        }
    }
}

enum MyAppMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [MyAppSchemaV1.self, MyAppSchemaV2.self]
    }

    static var stages: [MigrationStage] {
        [migrateV1toV2]
    }

    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: MyAppSchemaV1.self,
        toVersion: MyAppSchemaV2.self
    )
}
```
</swiftdata_migration>
</migration>

<best_practices>
- Use SwiftData for new apps targeting macOS 14+
- Use background contexts for heavy operations
- Handle migration explicitly for production apps
- Don't store large blobs in database (use @Attribute(.externalStorage))
- Use transactions for multiple related changes
- Test persistence with in-memory stores
</best_practices>
