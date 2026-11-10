# flutter-development: Riverpod 3.0 Patterns

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Riverpod 3.0 Patterns

```dart
// Modern Riverpod with code generation
@riverpod
class Counter extends _$Counter {
  @override
  int build() => 0;

  void increment() => state++;
  void decrement() => state--;
}

// Async provider with Riverpod 3.0
@riverpod
Future<List<Item>> items(Ref ref) async {
  final repository = ref.watch(repositoryProvider);
  return repository.fetchItems();
}

// Family provider (parameterized)
@riverpod
Future<User> user(Ref ref, String userId) async {
  return ref.watch(apiClientProvider).getUser(userId);
}

// Usage in widget
class ItemScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final items = ref.watch(itemsProvider);

    return items.when(
      data: (data) => ListView.builder(
        itemCount: data.length,
        itemBuilder: (context, i) => ItemTile(data[i]),
      ),
      loading: () => const CircularProgressIndicator(),
      error: (err, stack) => Text('Error: $err'),
    );
  }
}
```

---
