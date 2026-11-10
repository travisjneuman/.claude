---
name: flutter-development
description: Cross-platform development with Flutter and Dart for iOS, Android, Web, Desktop, and embedded. Use when building Flutter apps, implementing Material/Cupertino design, or optimizing Dart code.
---

# Flutter Development

Build beautiful, natively compiled applications for mobile, web, desktop, and embedded from a single codebase.

## Supported Platforms

| Platform | Status | Notes                   |
| -------- | ------ | ----------------------- |
| iOS      | Stable | Full native performance |
| Android  | Stable | Full native performance |
| Web      | Stable | PWA support             |
| macOS    | Stable | Native desktop          |
| Windows  | Stable | Native desktop          |
| Linux    | Stable | Native desktop          |

---

## Project Structure

```
my_app/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   ├── features/
│   │   ├── home/
│   │   │   ├── home_screen.dart
│   │   │   ├── home_controller.dart
│   │   │   └── widgets/
│   │   └── settings/
│   ├── core/
│   │   ├── theme/
│   │   ├── utils/
│   │   └── constants/
│   └── shared/
│       ├── models/
│       ├── services/
│       └── widgets/
├── test/
├── pubspec.yaml
└── analysis_options.yaml
```

---

## Basic Structure

### Main Entry

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
```

### Stateless Widget

```dart
class GreetingCard extends StatelessWidget {
  const GreetingCard({
    super.key,
    required this.name,
  });

  final String name;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          'Hello, $name!',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
      ),
    );
  }
}
```

### Stateful Widget

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Count: $_count',
          style: Theme.of(context).textTheme.headlineLarge,
        ),
        const SizedBox(height: 16),
        ElevatedButton(
          onPressed: _increment,
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/flutter-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| State Management | [`references/state-management.md`](references/state-management.md) | Riverpod (Recommended); BLoC Pattern |
| Navigation | [`references/navigation.md`](references/navigation.md) | GoRouter (Recommended) |
| Common Widgets | [`references/common-widgets.md`](references/common-widgets.md) | Lists; Forms |
| Networking | [`references/networking.md`](references/networking.md) | Dio HTTP Client |
| Local Storage | [`references/local-storage.md`](references/local-storage.md) | Hive (Recommended); SharedPreferences |
| Platform-Specific Code | [`references/platform-specific-code.md`](references/platform-specific-code.md) | 22 lines |
| Testing | [`references/testing.md`](references/testing.md) | Widget Tests; Unit Tests |
| Performance | [`references/performance.md`](references/performance.md) | Best Practices |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Dart 3 Features | [`references/dart-3-features.md`](references/dart-3-features.md) | Sealed Classes and Pattern Matching; Records; Extension Types; If-Case and Switch Expressions |
| Riverpod 3.0 Patterns | [`references/riverpod-3-0-patterns.md`](references/riverpod-3-0-patterns.md) | 46 lines |
| Material 3 / Material You | [`references/material-3-material-you.md`](references/material-3-material-you.md) | 38 lines |
| Build and Deployment | [`references/build-and-deployment.md`](references/build-and-deployment.md) | Fastlane; Codemagic CI/CD; EAS Build (for Expo/RN comparison reference) |
