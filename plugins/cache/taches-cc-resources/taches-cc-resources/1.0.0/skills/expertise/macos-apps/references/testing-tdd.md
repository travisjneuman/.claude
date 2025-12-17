<overview>
Test-Driven Development patterns for macOS apps. Write tests first, implement minimal code to pass, refactor while keeping tests green. Covers SwiftData testing, network mocking, @Observable state testing, and UI testing patterns.
</overview>

<tdd_workflow>
Test-Driven Development cycle for macOS apps:

1. **Write failing test** - Specify expected behavior
2. **Run test** - Verify RED (fails as expected)
3. **Implement** - Minimal code to pass
4. **Run test** - Verify GREEN (passes)
5. **Refactor** - Clean up while keeping green
6. **Run suite** - Ensure no regressions

Repeat for each feature. Keep tests running fast.
</tdd_workflow>

<test_organization>
```
MyApp/
├── MyApp/
│   └── ... (production code)
└── MyAppTests/
    ├── ModelTests/
    │   ├── ItemTests.swift
    │   └── ItemStoreTests.swift
    ├── ServiceTests/
    │   ├── NetworkServiceTests.swift
    │   └── StorageServiceTests.swift
    └── ViewModelTests/
        └── AppStateTests.swift
```

Group tests by layer. One test file per production file/class.
</test_organization>

<testing_swiftdata>
SwiftData requires ModelContainer. Create in-memory container for tests:

```swift
@MainActor
class ItemTests: XCTestCase {
    var container: ModelContainer!
    var context: ModelContext!

    override func setUp() async throws {
        // In-memory container (doesn't persist)
        let schema = Schema([Item.self, Tag.self])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        container = try ModelContainer(for: schema, configurations: config)
        context = ModelContext(container)
    }

    override func tearDown() {
        container = nil
        context = nil
    }

    func testCreateItem() throws {
        let item = Item(name: "Test")
        context.insert(item)
        try context.save()

        let fetched = try context.fetch(FetchDescriptor<Item>())
        XCTAssertEqual(fetched.count, 1)
        XCTAssertEqual(fetched.first?.name, "Test")
    }
}
```
</testing_swiftdata>

<testing_relationships>
Critical: Test relationship behavior with in-memory container:

```swift
func testDeletingParentCascadesToChildren() throws {
    let parent = Parent(name: "Parent")
    let child1 = Child(name: "Child1")
    let child2 = Child(name: "Child2")

    child1.parent = parent
    child2.parent = parent

    context.insert(parent)
    context.insert(child1)
    context.insert(child2)
    try context.save()

    context.delete(parent)
    try context.save()

    let children = try context.fetch(FetchDescriptor<Child>())
    XCTAssertEqual(children.count, 0) // Cascade delete worked
}
```
</testing_relationships>

<mocking_network>
```swift
protocol NetworkSession {
    func data(for request: URLRequest) async throws -> (Data, URLResponse)
}

extension URLSession: NetworkSession {}

class MockNetworkSession: NetworkSession {
    var mockData: Data?
    var mockResponse: URLResponse?
    var mockError: Error?

    func data(for request: URLRequest) async throws -> (Data, URLResponse) {
        if let error = mockError { throw error }
        return (mockData ?? Data(), mockResponse ?? URLResponse())
    }
}

// Test
func testFetchItems() async throws {
    let json = """
    [{"id": 1, "name": "Test"}]
    """.data(using: .utf8)!

    let mock = MockNetworkSession()
    mock.mockData = json
    mock.mockResponse = HTTPURLResponse(url: URL(string: "https://api.example.com")!,
                                        statusCode: 200,
                                        httpVersion: nil,
                                        headerFields: nil)

    let service = NetworkService(session: mock)
    let items = try await service.fetchItems()

    XCTAssertEqual(items.count, 1)
    XCTAssertEqual(items.first?.name, "Test")
}
```
</mocking_network>

<testing_observable>
Test @Observable state changes:

```swift
func testAppStateUpdatesOnAdd() {
    let appState = AppState()

    XCTAssertEqual(appState.items.count, 0)

    appState.addItem(Item(name: "Test"))

    XCTAssertEqual(appState.items.count, 1)
    XCTAssertEqual(appState.items.first?.name, "Test")
}

func testSelectionChanges() {
    let appState = AppState()
    let item = Item(name: "Test")
    appState.addItem(item)

    appState.selectedItemID = item.id

    XCTAssertEqual(appState.selectedItem?.id, item.id)
}
```
</testing_observable>

<ui_testing>
Use XCUITest for critical user flows:

```swift
class MyAppUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        app = XCUIApplication()
        app.launch()
    }

    func testAddItemFlow() {
        app.buttons["Add"].click()

        let nameField = app.textFields["Name"]
        nameField.click()
        nameField.typeText("New Item")

        app.buttons["Save"].click()

        XCTAssertTrue(app.staticTexts["New Item"].exists)
    }
}
```

Keep UI tests minimal (slow, brittle). Test critical flows only.
</ui_testing>

<what_not_to_test>
Don't test:
- SwiftUI framework itself
- URLSession (Apple's code)
- File system (use mocks)

Do test:
- Your business logic
- State management
- Data transformations
- Service layer with mocks
</what_not_to_test>

<running_tests>
```bash
# Run all tests
xcodebuild test -scheme MyApp -destination 'platform=macOS'

# Run unit tests only (fast)
xcodebuild test -scheme MyApp -destination 'platform=macOS' -only-testing:MyAppTests

# Run UI tests only (slow)
xcodebuild test -scheme MyApp -destination 'platform=macOS' -only-testing:MyAppUITests

# Watch mode
find . -name "*.swift" | entr xcodebuild test -scheme MyApp -destination 'platform=macOS' -only-testing:MyAppTests
```
</running_tests>
