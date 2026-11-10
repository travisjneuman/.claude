# ios-development: Testing

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing

### Unit Tests

```swift
import XCTest
@testable import MyApp

final class MyTests: XCTestCase {
    func testExample() async throws {
        let sut = MyViewModel()
        await sut.load()
        XCTAssertEqual(sut.items.count, 10)
    }
}
```

### UI Tests

```swift
import XCTest

final class MyUITests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        continueAfterFailure = false
        app.launch()
    }

    func testNavigation() {
        app.buttons["Start"].tap()
        XCTAssertTrue(app.staticTexts["Welcome"].exists)
    }
}
```

---
