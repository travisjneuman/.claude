# ios-development: Apple Human Interface Guidelines

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Apple Human Interface Guidelines

### iOS Design Principles

- **Clarity**: Text is legible, icons precise, adornments subtle
- **Deference**: Content is paramount, UI doesn't compete
- **Depth**: Visual layers and realistic motion convey hierarchy

### Key Metrics

| Element        | Size                           |
| -------------- | ------------------------------ |
| Touch target   | 44x44 pt minimum               |
| Navigation bar | 44 pt                          |
| Tab bar        | 49 pt                          |
| Status bar     | 47 pt (notch) / 20 pt (legacy) |

### Safe Areas

```swift
.safeAreaInset(edge: .bottom) {
    BottomBar()
}

// Ignore safe area
.ignoresSafeArea(.keyboard)
.ignoresSafeArea(.container, edges: .bottom)
```

---
