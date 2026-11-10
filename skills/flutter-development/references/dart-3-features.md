# flutter-development: Dart 3 Features

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Dart 3 Features

### Sealed Classes and Pattern Matching

```dart
// Sealed classes for exhaustive pattern matching
sealed class Result<T> {}
class Success<T> extends Result<T> { final T value; Success(this.value); }
class Failure<T> extends Result<T> { final String error; Failure(this.error); }

// Exhaustive switch
String display(Result<User> result) => switch (result) {
  Success(value: final user) => 'Hello, ${user.name}',
  Failure(error: final msg) => 'Error: $msg',
};
```

### Records

```dart
// Lightweight data tuples
(String, int) getUserInfo() => ('John', 30);

// Named fields
({String name, int age}) getUserDetails() => (name: 'John', age: 30);

// Destructuring
final (name, age) = getUserInfo();
final (:name, :age) = getUserDetails();
```

### Extension Types

```dart
// Zero-cost type wrappers (compile-time only)
extension type UserId(String value) {
  bool get isValid => value.isNotEmpty;
}

extension type Email(String value) {
  factory Email.validated(String raw) {
    if (!raw.contains('@')) throw FormatException('Invalid email');
    return Email(raw);
  }
}

// Usage - type-safe, zero runtime cost
void sendEmail(Email to, UserId from) { ... }
sendEmail(Email.validated('a@b.com'), UserId('user123'));
```

### If-Case and Switch Expressions

```dart
// If-case for pattern matching
if (json case {'name': String name, 'age': int age}) {
  print('$name is $age years old');
}

// Switch expressions (concise)
final icon = switch (status) {
  'active' => Icons.check_circle,
  'pending' => Icons.hourglass_empty,
  'error' => Icons.error,
  _ => Icons.help,
};
```

---
