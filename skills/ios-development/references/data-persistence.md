# ios-development: Data Persistence

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Data Persistence

### Core Data

```swift
// Model
@objc(Item)
public class Item: NSManagedObject {
    @NSManaged public var id: UUID
    @NSManaged public var name: String
    @NSManaged public var createdAt: Date
}

// Fetch
@FetchRequest(
    sortDescriptors: [NSSortDescriptor(keyPath: \Item.createdAt, ascending: false)],
    animation: .default
)
private var items: FetchedResults<Item>
```

### SwiftData (iOS 17+)

```swift
@Model
class Item {
    var id: UUID
    var name: String
    var createdAt: Date

    init(name: String) {
        self.id = UUID()
        self.name = name
        self.createdAt = Date()
    }
}

// In View
@Query(sort: \Item.createdAt, order: .reverse)
private var items: [Item]

@Environment(\.modelContext) private var modelContext

func addItem() {
    let item = Item(name: "New Item")
    modelContext.insert(item)
}
```

### Keychain

```swift
// Store sensitive data
import Security

func saveToKeychain(key: String, data: Data) throws {
    let query: [String: Any] = [
        kSecClass as String: kSecClassGenericPassword,
        kSecAttrAccount as String: key,
        kSecValueData as String: data
    ]
    SecItemDelete(query as CFDictionary)
    let status = SecItemAdd(query as CFDictionary, nil)
    guard status == errSecSuccess else {
        throw KeychainError.saveFailed
    }
}
```

---
