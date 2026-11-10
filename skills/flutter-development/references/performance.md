# flutter-development: Performance

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Performance

### Best Practices

```dart
// Use const constructors
const SizedBox(height: 16)

// Avoid rebuilds with const
const MyStaticWidget()

// Use ListView.builder for long lists
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(items[index]),
)

// Cache images
CachedNetworkImage(
  imageUrl: url,
  placeholder: (context, url) => const CircularProgressIndicator(),
)
```

---
