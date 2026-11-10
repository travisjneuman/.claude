# ios-development: Swift 6 Concurrency

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Swift 6 Concurrency

```swift
// Complete data race safety (strict concurrency checking)
// Enable in Xcode: SWIFT_STRICT_CONCURRENCY = complete

// Sendable conformance required for data crossing isolation boundaries
struct UserData: Sendable {
    let id: UUID
    let name: String
}

// Actor isolation
actor DatabaseManager {
    private var cache: [String: Data] = [:]

    func get(_ key: String) -> Data? { cache[key] }
    func set(_ key: String, value: Data) { cache[key] = value }
}

// Global actors
@MainActor
class ViewModel {
    var items: [Item] = []

    func load() async {
        let data = await fetchFromNetwork() // Runs off main actor
        items = data // Back on main actor automatically
    }
}

// Typed throws (Swift 6)
enum DataError: Error {
    case notFound, corrupted
}

func loadData() throws(DataError) -> Data {
    guard let data = cache.get("key") else {
        throw .notFound
    }
    return data
}
```

---
