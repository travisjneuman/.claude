# flutter-development: Testing

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing

### Widget Tests

```dart
testWidgets('Counter increments', (tester) async {
  await tester.pumpWidget(const MaterialApp(home: Counter()));

  expect(find.text('Count: 0'), findsOneWidget);

  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();

  expect(find.text('Count: 1'), findsOneWidget);
});
```

### Unit Tests

```dart
test('Item fromJson parses correctly', () {
  final json = {'id': '1', 'name': 'Test'};
  final item = Item.fromJson(json);

  expect(item.id, '1');
  expect(item.name, 'Test');
});
```

---
