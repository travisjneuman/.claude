---
name: ios-development
description: iOS, iPadOS, and tvOS development with Swift, SwiftUI, and UIKit. Use when building Apple platform apps, implementing iOS-specific features, or following Apple Human Interface Guidelines.
---

# iOS/iPadOS/tvOS Development

Comprehensive guide for building native Apple platform applications.

## Platforms Covered

| Platform | Minimum Target | Current     |
| -------- | -------------- | ----------- |
| iOS      | iOS 15.0+      | iOS 17+     |
| iPadOS   | iPadOS 15.0+   | iPadOS 17+  |
| tvOS     | tvOS 15.0+     | tvOS 17+    |
| watchOS  | watchOS 8.0+   | watchOS 10+ |

---

## SwiftUI (Preferred for New Projects)

### Basic Structure

```swift
import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("Count: \(count)")
                .font(.largeTitle)

            Button("Increment") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

### State Management

```swift
// Local state
@State private var text = ""

// Binding (child components)
@Binding var isPresented: Bool

// Observable object
@StateObject private var viewModel = MyViewModel()
@ObservedObject var viewModel: MyViewModel

// Environment
@Environment(\.dismiss) private var dismiss
@Environment(\.colorScheme) private var colorScheme
@EnvironmentObject var appState: AppState

// App Storage (UserDefaults)
@AppStorage("username") private var username = ""
```

### Modern Concurrency

```swift
// Async/await
func fetchData() async throws -> [Item] {
    let url = URL(string: "https://api.example.com/items")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([Item].self, from: data)
}

// In View
.task {
    do {
        items = try await fetchData()
    } catch {
        errorMessage = error.localizedDescription
    }
}

// Main actor for UI updates
@MainActor
class ViewModel: ObservableObject {
    @Published var items: [Item] = []

    func load() async {
        items = try? await fetchData()
    }
}
```

### Navigation (iOS 16+)

```swift
// NavigationStack with typed destinations
struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            List(items) { item in
                NavigationLink(value: item) {
                    Text(item.name)
                }
            }
            .navigationDestination(for: Item.self) { item in
                DetailView(item: item)
            }
        }
    }
}
```

### Lists and Grids

```swift
// Modern List
List {
    ForEach(items) { item in
        ItemRow(item: item)
    }
    .onDelete(perform: delete)
    .onMove(perform: move)
}
.listStyle(.insetGrouped)
.searchable(text: $searchText)
.refreshable {
    await refresh()
}

// LazyVGrid
LazyVGrid(columns: [
    GridItem(.adaptive(minimum: 150))
]) {
    ForEach(items) { item in
        ItemCard(item: item)
    }
}
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/ios-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| UIKit (Legacy/Complex UI) | [`references/uikit-legacy-complex-ui.md`](references/uikit-legacy-complex-ui.md) | View Controller Lifecycle; Auto Layout |
| Data Persistence | [`references/data-persistence.md`](references/data-persistence.md) | Core Data; SwiftData (iOS 17+); Keychain |
| Networking | [`references/networking.md`](references/networking.md) | URLSession |
| Apple Human Interface Guidelines | [`references/apple-human-interface-guidelines.md`](references/apple-human-interface-guidelines.md) | iOS Design Principles; Key Metrics; Safe Areas |
| Platform-Specific | [`references/platform-specific.md`](references/platform-specific.md) | iPadOS Specifics; tvOS Specifics |
| App Store Requirements | [`references/app-store-requirements.md`](references/app-store-requirements.md) | Required Assets; Privacy; App Transport Security |
| Testing | [`references/testing.md`](references/testing.md) | Unit Tests; UI Tests |
| Project Structure | [`references/project-structure.md`](references/project-structure.md) | 24 lines |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| @Observable Macro (iOS 17+, Replacing ObservableObject) | [`references/observable-macro-ios-17-replacing-observableobject.md`](references/observable-macro-ios-17-replacing-observableobject.md) | Migration from ObservableObject |
| SwiftUI 6 New Views and Modifiers | [`references/swiftui-6-new-views-and-modifiers.md`](references/swiftui-6-new-views-and-modifiers.md) | 44 lines |
| Swift 6 Concurrency | [`references/swift-6-concurrency.md`](references/swift-6-concurrency.md) | 46 lines |
| Minimum Target: iOS 17+ | [`references/minimum-target-ios-17.md`](references/minimum-target-ios-17.md) | 15 lines |
| visionOS and Spatial Computing | [`references/visionos-and-spatial-computing.md`](references/visionos-and-spatial-computing.md) | 50 lines |
| watchOS Development | [`references/watchos-development.md`](references/watchos-development.md) | 40 lines |
