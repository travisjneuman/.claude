# Testing and Debugging

Patterns for unit testing, UI testing, and debugging macOS apps.

<unit_testing>
<basic_test>
```swift
import XCTest
@testable import MyApp

final class DataServiceTests: XCTestCase {
    var sut: DataService!

    override func setUp() {
        super.setUp()
        sut = DataService()
    }

    override func tearDown() {
        sut = nil
        super.tearDown()
    }

    func testAddItem() {
        // Given
        let item = Item(name: "Test")

        // When
        sut.addItem(item)

        // Then
        XCTAssertEqual(sut.items.count, 1)
        XCTAssertEqual(sut.items.first?.name, "Test")
    }

    func testDeleteItem() {
        // Given
        let item = Item(name: "Test")
        sut.addItem(item)

        // When
        sut.deleteItem(item.id)

        // Then
        XCTAssertTrue(sut.items.isEmpty)
    }
}
```
</basic_test>

<async_testing>
```swift
final class NetworkServiceTests: XCTestCase {
    var sut: NetworkService!
    var mockSession: MockURLSession!

    override func setUp() {
        super.setUp()
        mockSession = MockURLSession()
        sut = NetworkService(session: mockSession)
    }

    func testFetchProjects() async throws {
        // Given
        let expectedProjects = [Project(name: "Test")]
        mockSession.data = try JSONEncoder().encode(expectedProjects)
        mockSession.response = HTTPURLResponse(
            url: URL(string: "https://api.example.com")!,
            statusCode: 200,
            httpVersion: nil,
            headerFields: nil
        )

        // When
        let projects: [Project] = try await sut.fetch(Endpoint.projects().request)

        // Then
        XCTAssertEqual(projects.count, 1)
        XCTAssertEqual(projects.first?.name, "Test")
    }

    func testFetchError() async {
        // Given
        mockSession.error = NetworkError.timeout

        // When/Then
        do {
            let _: [Project] = try await sut.fetch(Endpoint.projects().request)
            XCTFail("Expected error")
        } catch {
            XCTAssertTrue(error is NetworkError)
        }
    }
}
```
</async_testing>

<testing_observables>
```swift
final class AppStateTests: XCTestCase {
    func testAddItem() {
        // Given
        let sut = AppState()

        // When
        sut.addItem(Item(name: "Test"))

        // Then
        XCTAssertEqual(sut.items.count, 1)
    }

    func testSelectedItem() {
        // Given
        let sut = AppState()
        let item = Item(name: "Test")
        sut.items = [item]

        // When
        sut.selectedItemID = item.id

        // Then
        XCTAssertEqual(sut.selectedItem?.name, "Test")
    }
}
```
</testing_observables>

<mock_dependencies>
```swift
// Protocol for testability
protocol DataStoreProtocol {
    func fetchAll() async throws -> [Item]
    func save(_ item: Item) async throws
}

// Mock implementation
class MockDataStore: DataStoreProtocol {
    var itemsToReturn: [Item] = []
    var savedItems: [Item] = []
    var shouldThrow = false

    func fetchAll() async throws -> [Item] {
        if shouldThrow { throw TestError.mock }
        return itemsToReturn
    }

    func save(_ item: Item) async throws {
        if shouldThrow { throw TestError.mock }
        savedItems.append(item)
    }
}

enum TestError: Error {
    case mock
}

// Test using mock
final class ViewModelTests: XCTestCase {
    func testLoadItems() async throws {
        // Given
        let mockStore = MockDataStore()
        mockStore.itemsToReturn = [Item(name: "Test")]
        let sut = ViewModel(dataStore: mockStore)

        // When
        await sut.loadItems()

        // Then
        XCTAssertEqual(sut.items.count, 1)
    }
}
```
</mock_dependencies>

<testing_swiftdata>
```swift
final class SwiftDataTests: XCTestCase {
    var container: ModelContainer!
    var context: ModelContext!

    override func setUp() {
        super.setUp()

        let schema = Schema([Project.self, Task.self])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        container = try! ModelContainer(for: schema, configurations: config)
        context = ModelContext(container)
    }

    func testCreateProject() throws {
        // Given
        let project = Project(name: "Test")

        // When
        context.insert(project)
        try context.save()

        // Then
        let descriptor = FetchDescriptor<Project>()
        let projects = try context.fetch(descriptor)
        XCTAssertEqual(projects.count, 1)
        XCTAssertEqual(projects.first?.name, "Test")
    }

    func testCascadeDelete() throws {
        // Given
        let project = Project(name: "Test")
        let task = Task(title: "Task")
        task.project = project
        context.insert(project)
        context.insert(task)
        try context.save()

        // When
        context.delete(project)
        try context.save()

        // Then
        let tasks = try context.fetch(FetchDescriptor<Task>())
        XCTAssertTrue(tasks.isEmpty)
    }
}
```
</testing_swiftdata>
</unit_testing>

<swiftdata_debugging>
<verify_relationships>
When SwiftData items aren't appearing or relationships seem broken:

```swift
// Debug print to verify relationships
func debugRelationships(for column: Column) {
    print("=== Column: \(column.name) ===")
    print("Cards count: \(column.cards.count)")
    for card in column.cards {
        print("  - Card: \(card.title)")
        print("    Card's column: \(card.column?.name ?? "NIL")")
    }
}

// Verify inverse relationships are set
func verifyCard(_ card: Card) {
    if card.column == nil {
        print("⚠️ Card '\(card.title)' has no column set!")
    } else {
        let inParentArray = card.column!.cards.contains { $0.id == card.id }
        print("Card in column.cards: \(inParentArray)")
    }
}
```
</verify_relationships>

<common_swiftdata_issues>
**Issue: Items not appearing in list**

Symptoms: Added items don't show, count is 0

Debug steps:
```swift
// 1. Check modelContext has the item
let descriptor = FetchDescriptor<Card>()
let allCards = try? modelContext.fetch(descriptor)
print("Total cards in context: \(allCards?.count ?? 0)")

// 2. Check relationship is set
if let card = allCards?.first {
    print("Card column: \(card.column?.name ?? "NIL")")
}

// 3. Check parent's array
print("Column.cards count: \(column.cards.count)")
```

Common causes:
- Forgot `modelContext.insert(item)` for new objects
- Didn't set inverse relationship (`card.column = column`)
- Using wrong modelContext (view context vs background context)
</common_swiftdata_issues>

<inspect_database>
```swift
// Print database location
func printDatabaseLocation() {
    let url = URL.applicationSupportDirectory
        .appendingPathComponent("default.store")
    print("Database: \(url.path)")
}

// Dump all items of a type
func dumpAllItems<T: PersistentModel>(_ type: T.Type, context: ModelContext) {
    let descriptor = FetchDescriptor<T>()
    if let items = try? context.fetch(descriptor) {
        print("=== \(String(describing: T.self)) (\(items.count)) ===")
        for item in items {
            print("  \(item)")
        }
    }
}

// Usage
dumpAllItems(Column.self, context: modelContext)
dumpAllItems(Card.self, context: modelContext)
```
</inspect_database>

<logging_swiftdata_operations>
```swift
import os

let dataLogger = Logger(subsystem: "com.yourapp", category: "SwiftData")

// Log when adding items
func addCard(to column: Column, title: String) {
    let card = Card(title: title, position: 1.0)
    card.column = column
    modelContext.insert(card)

    dataLogger.debug("Added card '\(title)' to column '\(column.name)'")
    dataLogger.debug("Column now has \(column.cards.count) cards")
}

// Log when relationships change
func moveCard(_ card: Card, to newColumn: Column) {
    let oldColumn = card.column?.name ?? "none"
    card.column = newColumn

    dataLogger.debug("Moved '\(card.title)' from '\(oldColumn)' to '\(newColumn.name)'")
}

// View logs in Console.app or:
// log stream --predicate 'subsystem == "com.yourapp" AND category == "SwiftData"' --level debug
```
</logging_swiftdata_operations>

<symptom_cause_table>
**Quick reference for common SwiftData symptoms:**

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Items don't appear | Missing `insert()` | Call `modelContext.insert(item)` |
| Items appear once then disappear | Inverse relationship not set | Set `child.parent = parent` before insert |
| Changes don't persist | Wrong context | Use same modelContext throughout |
| @Query returns empty | Schema mismatch | Verify @Model matches container schema |
| Cascade delete fails | Missing deleteRule | Add `@Relationship(deleteRule: .cascade)` |
| Relationship array always empty | Not using inverse | Set inverse on child, not append on parent |
</symptom_cause_table>
</swiftdata_debugging>

<ui_testing>
```swift
import XCTest

final class MyAppUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    func testAddItem() {
        // Tap add button
        app.buttons["Add"].click()

        // Verify item appears in list
        XCTAssertTrue(app.staticTexts["New Item"].exists)
    }

    func testRenameItem() {
        // Add item first
        app.buttons["Add"].click()

        // Select and rename
        app.staticTexts["New Item"].click()
        let textField = app.textFields["Name"]
        textField.click()
        textField.typeText("Renamed Item")

        // Verify
        XCTAssertTrue(app.staticTexts["Renamed Item"].exists)
    }

    func testDeleteItem() {
        // Add item
        app.buttons["Add"].click()

        // Right-click and delete
        app.staticTexts["New Item"].rightClick()
        app.menuItems["Delete"].click()

        // Verify deleted
        XCTAssertFalse(app.staticTexts["New Item"].exists)
    }
}
```
</ui_testing>

<debugging>
<os_log>
```swift
import os

let logger = Logger(subsystem: "com.yourcompany.MyApp", category: "General")

// Log levels
logger.debug("Debug info")
logger.info("General info")
logger.notice("Notable event")
logger.error("Error occurred")
logger.fault("Critical failure")

// With interpolation
logger.info("Loaded \(items.count) items")

// Privacy for sensitive data
logger.info("User: \(username, privacy: .private)")

// In console
// log stream --predicate 'subsystem == "com.yourcompany.MyApp"' --level debug
```
</os_log>

<signposts>
```swift
import os

let signposter = OSSignposter(subsystem: "com.yourcompany.MyApp", category: "Performance")

func loadData() async {
    let signpostID = signposter.makeSignpostID()
    let state = signposter.beginInterval("Load Data", id: signpostID)

    // Work
    await fetchFromNetwork()

    signposter.endInterval("Load Data", state)
}

// Interval with metadata
func processItem(_ item: Item) {
    let state = signposter.beginInterval("Process Item", id: signposter.makeSignpostID())

    // Work
    process(item)

    signposter.endInterval("Process Item", state, "Processed \(item.name)")
}
```
</signposts>

<breakpoint_actions>
```swift
// Symbolic breakpoints in Xcode:
// - Symbol: `-[NSException raise]` to catch all exceptions
// - Symbol: `UIViewAlertForUnsatisfiableConstraints` for layout issues

// In code, trigger debugger
func criticalFunction() {
    guard condition else {
        #if DEBUG
        raise(SIGINT)  // Triggers breakpoint
        #endif
        return
    }
}
```
</breakpoint_actions>

<memory_debugging>
```swift
// Check for leaks with weak references
class DebugHelper {
    static func trackDeallocation<T: AnyObject>(_ object: T, name: String) {
        let observer = DeallocObserver(name: name)
        objc_setAssociatedObject(object, "deallocObserver", observer, .OBJC_ASSOCIATION_RETAIN)
    }
}

class DeallocObserver {
    let name: String

    init(name: String) {
        self.name = name
    }

    deinit {
        print("✓ \(name) deallocated")
    }
}

// Usage in tests
func testNoMemoryLeak() {
    weak var weakRef: ViewModel?

    autoreleasepool {
        let vm = ViewModel()
        weakRef = vm
        DebugHelper.trackDeallocation(vm, name: "ViewModel")
    }

    XCTAssertNil(weakRef, "ViewModel should be deallocated")
}
```
</memory_debugging>
</debugging>

<common_issues>
<memory_leaks>
**Symptom**: Memory grows over time, objects not deallocated

**Common causes**:
- Strong reference cycles in closures
- Delegate not weak
- NotificationCenter observers not removed

**Fix**:
```swift
// Use [weak self]
someService.fetch { [weak self] result in
    self?.handle(result)
}

// Weak delegates
weak var delegate: MyDelegate?

// Remove observers
deinit {
    NotificationCenter.default.removeObserver(self)
}
```
</memory_leaks>

<main_thread_violations>
**Symptom**: Purple warnings, UI not updating, crashes

**Fix**:
```swift
// Ensure UI updates on main thread
Task { @MainActor in
    self.items = fetchedItems
}

// Or use DispatchQueue
DispatchQueue.main.async {
    self.tableView.reloadData()
}
```
</main_thread_violations>

<swiftui_not_updating>
**Symptom**: View doesn't reflect state changes

**Common causes**:
- Missing @Observable
- Property not being tracked
- Binding not connected

**Fix**:
```swift
// Ensure class is @Observable
@Observable
class AppState {
    var items: [Item] = []  // This will be tracked
}

// Use @Bindable for mutations
@Bindable var appState = appState
TextField("Name", text: $appState.name)
```
</swiftui_not_updating>
</common_issues>

<test_coverage>
```bash
# Build with coverage
xcodebuild -project MyApp.xcodeproj \
    -scheme MyApp \
    -enableCodeCoverage YES \
    -derivedDataPath ./build \
    test

# View coverage report
xcrun xccov view --report ./build/Logs/Test/*.xcresult
```
</test_coverage>

<performance_testing>
```swift
func testPerformanceLoadLargeDataset() {
    measure {
        let items = (0..<10000).map { Item(name: "Item \($0)") }
        sut.items = items
    }
}

// With options
func testPerformanceWithMetrics() {
    let metrics: [XCTMetric] = [
        XCTClockMetric(),
        XCTMemoryMetric(),
        XCTCPUMetric()
    ]

    measure(metrics: metrics) {
        performHeavyOperation()
    }
}
```
</performance_testing>
