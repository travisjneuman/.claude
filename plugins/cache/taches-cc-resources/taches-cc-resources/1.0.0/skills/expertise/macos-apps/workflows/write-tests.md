# Workflow: Write and Run Tests

<required_reading>
**Read these reference files NOW:**
1. references/testing-tdd.md
2. references/testing-debugging.md
</required_reading>

<philosophy>
Tests are documentation that runs. Write tests that:
- Describe what the code should do
- Catch regressions before users do
- Enable confident refactoring
</philosophy>

<process>
## Step 1: Understand What to Test

Ask the user:
- New tests for existing code?
- Tests for new feature (TDD)?
- Fix a bug with regression test?

**What Claude tests (automated):**
- Core logic (data transforms, calculations, algorithms)
- State management (models, relationships)
- Service layer (mocked dependencies)
- Edge cases (nil, empty, boundaries)

**What user tests (manual):**
- UX feel and visual polish
- Real hardware/device integration
- Performance under real conditions

## Step 2: Set Up Test Target

If tests don't exist yet:
```bash
# Add test target to project.yml (XcodeGen)
targets:
  AppNameTests:
    type: bundle.unit-test
    platform: macOS
    sources:
      - path: Tests
    dependencies:
      - target: AppName
```

Or create test files manually in Xcode's test target.

## Step 3: Write Tests

### Unit Tests (Logic)

```swift
import Testing
@testable import AppName

struct ItemTests {
    @Test func itemCreation() {
        let item = Item(name: "Test", value: 42)
        #expect(item.name == "Test")
        #expect(item.value == 42)
    }

    @Test func itemValidation() {
        let emptyItem = Item(name: "", value: 0)
        #expect(!emptyItem.isValid)
    }

    @Test(arguments: [0, -1, 1000001])
    func invalidValues(value: Int) {
        let item = Item(name: "Test", value: value)
        #expect(!item.isValid)
    }
}
```

### State Tests

```swift
struct AppStateTests {
    @Test func addItem() {
        let state = AppState()
        let item = Item(name: "New", value: 10)

        state.addItem(item)

        #expect(state.items.count == 1)
        #expect(state.items.first?.name == "New")
    }

    @Test func deleteItem() {
        let state = AppState()
        let item = Item(name: "ToDelete", value: 1)
        state.addItem(item)

        state.deleteItem(item)

        #expect(state.items.isEmpty)
    }
}
```

### Async Tests

```swift
struct NetworkTests {
    @Test func fetchItems() async throws {
        let service = MockDataService()
        service.mockItems = [Item(name: "Fetched", value: 5)]

        let items = try await service.fetchItems()

        #expect(items.count == 1)
    }

    @Test func fetchHandlesError() async {
        let service = MockDataService()
        service.shouldFail = true

        await #expect(throws: NetworkError.self) {
            try await service.fetchItems()
        }
    }
}
```

### Edge Cases

```swift
struct EdgeCaseTests {
    @Test func emptyList() {
        let state = AppState()
        #expect(state.items.isEmpty)
        #expect(state.selectedItem == nil)
    }

    @Test func nilHandling() {
        let item: Item? = nil
        #expect(item?.name == nil)
    }

    @Test func boundaryValues() {
        let item = Item(name: String(repeating: "a", count: 10000), value: Int.max)
        #expect(item.isValid) // or test truncation behavior
    }
}
```

## Step 4: Run Tests

```bash
# Run all tests
xcodebuild test \
  -project AppName.xcodeproj \
  -scheme AppName \
  -resultBundlePath TestResults.xcresult

# Run specific test
xcodebuild test \
  -project AppName.xcodeproj \
  -scheme AppName \
  -only-testing:AppNameTests/ItemTests/testItemCreation

# View results
xcrun xcresulttool get test-results summary --path TestResults.xcresult
```

## Step 5: Coverage Report

```bash
# Generate coverage
xcodebuild test \
  -project AppName.xcodeproj \
  -scheme AppName \
  -enableCodeCoverage YES \
  -resultBundlePath TestResults.xcresult

# View coverage
xcrun xccov view --report TestResults.xcresult

# Coverage as JSON
xcrun xccov view --report --json TestResults.xcresult > coverage.json
```

## Step 6: TDD Cycle

For new features:
1. **Red:** Write failing test for desired behavior
2. **Green:** Write minimum code to pass
3. **Refactor:** Clean up while keeping tests green
4. **Repeat:** Next behavior
</process>

<test_patterns>
### Arrange-Act-Assert
```swift
@Test func pattern() {
    // Arrange
    let state = AppState()
    let item = Item(name: "Test", value: 1)

    // Act
    state.addItem(item)

    // Assert
    #expect(state.items.contains(item))
}
```

### Mocking Dependencies
```swift
protocol DataServiceProtocol {
    func fetchItems() async throws -> [Item]
}

class MockDataService: DataServiceProtocol {
    var mockItems: [Item] = []
    var shouldFail = false

    func fetchItems() async throws -> [Item] {
        if shouldFail { throw TestError.mock }
        return mockItems
    }
}
```

### Testing SwiftUI State
```swift
@Test func viewModelState() {
    let state = AppState()
    state.items = [Item(name: "A", value: 1), Item(name: "B", value: 2)]

    state.selectedItem = state.items.first

    #expect(state.selectedItem?.name == "A")
}
```
</test_patterns>

<what_not_to_test>
- SwiftUI view rendering (use previews + manual testing)
- Apple framework behavior
- Simple getters/setters with no logic
- Private implementation details (test via public interface)
</what_not_to_test>

<coverage_targets>
| Code Type | Target Coverage |
|-----------|-----------------|
| Business logic | 80-100% |
| State management | 70-90% |
| Utilities/helpers | 60-80% |
| Views | 0% (manual test) |
| Generated code | 0% |
</coverage_targets>
