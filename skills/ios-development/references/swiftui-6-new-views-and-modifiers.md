# ios-development: SwiftUI 6 New Views and Modifiers

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## SwiftUI 6 New Views and Modifiers

```swift
// Mesh gradient (iOS 18+)
MeshGradient(
    width: 3, height: 3,
    points: [
        .init(0, 0), .init(0.5, 0), .init(1, 0),
        .init(0, 0.5), .init(0.5, 0.5), .init(1, 0.5),
        .init(0, 1), .init(0.5, 1), .init(1, 1)
    ],
    colors: [
        .red, .purple, .indigo,
        .orange, .cyan, .blue,
        .yellow, .green, .mint
    ]
)

// Zoom navigation transition
NavigationLink {
    DetailView(item: item)
} label: {
    ItemCard(item: item)
}
.matchedTransitionSource(id: item.id, in: namespace)

// ScrollView enhancements
ScrollView {
    LazyVStack {
        ForEach(items) { item in
            ItemRow(item: item)
        }
    }
}
.scrollPosition(id: $scrolledID)
.defaultScrollAnchor(.bottom)

// Custom containers
@Entry macro for EnvironmentValues
@Environment(\.myCustomValue) var value
```

---
