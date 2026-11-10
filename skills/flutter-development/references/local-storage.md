# flutter-development: Local Storage

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Local Storage

### Hive (Recommended)

```dart
// Model
@HiveType(typeId: 0)
class Item extends HiveObject {
  @HiveField(0)
  late String id;

  @HiveField(1)
  late String name;
}

// Setup
await Hive.initFlutter();
Hive.registerAdapter(ItemAdapter());
await Hive.openBox<Item>('items');

// Usage
final box = Hive.box<Item>('items');
await box.put('key', item);
final item = box.get('key');
```

### SharedPreferences

```dart
final prefs = await SharedPreferences.getInstance();
await prefs.setString('token', 'abc123');
final token = prefs.getString('token');
```

---
