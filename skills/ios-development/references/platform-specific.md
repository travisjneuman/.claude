# ios-development: Platform-Specific

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Platform-Specific

### iPadOS Specifics

```swift
// Split view
NavigationSplitView {
    Sidebar()
} content: {
    ContentList()
} detail: {
    DetailView()
}

// Keyboard shortcuts
.keyboardShortcut("n", modifiers: .command)

// Hover effects
.hoverEffect(.highlight)
```

### tvOS Specifics

```swift
// Focus management
@FocusState private var isFocused: Bool

Button("Action") { }
    .focused($isFocused)
    .focusable()

// Large text for 10-foot UI
.font(.system(size: 38))
```

---
