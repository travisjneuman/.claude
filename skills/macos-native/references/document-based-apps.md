# macos-native: Document-Based Apps

Part of the `macos-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Document-Based Apps

### Document Controller

```swift
import Cocoa
import UniformTypeIdentifiers

class MyDocument: NSDocument {
    var content: String = ""

    override class var autosavesInPlace: Bool { true }

    override func makeWindowControllers() {
        let storyboard = NSStoryboard(name: "Main", bundle: nil)
        let windowController = storyboard.instantiateController(
            withIdentifier: "Document Window Controller"
        ) as! NSWindowController
        addWindowController(windowController)
    }

    override func data(ofType typeName: String) throws -> Data {
        guard let data = content.data(using: .utf8) else {
            throw NSError(domain: NSOSStatusErrorDomain, code: unimpErr)
        }
        return data
    }

    override func read(from data: Data, ofType typeName: String) throws {
        guard let content = String(data: data, encoding: .utf8) else {
            throw NSError(domain: NSOSStatusErrorDomain, code: unimpErr)
        }
        self.content = content
    }
}

// Info.plist Document Types
/*
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
            <string>com.example.mydocument</string>
        </array>
    </dict>
</array>
*/
```

---
