# agent-flutter-developer: Flutter Project Structure

Part of the `agent-flutter-developer` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Flutter Project Structure

```
lib/
├── main.dart                  # Entry point
├── app.dart                   # MaterialApp/GoRouter setup
├── config/
│   └── environment.dart       # Environment configuration
├── models/                    # Data classes
│   ├── user.dart
│   └── post.dart
├── providers/                 # Riverpod providers
│   ├── auth_provider.dart
│   └── posts_provider.dart
├── repositories/              # Data access layer
│   ├── auth_repository.dart
│   └── post_repository.dart
├── screens/                   # Full-page widgets
│   ├── home_screen.dart
│   └── posts_screen.dart
├── widgets/                   # Reusable widgets
│   ├── post_card.dart
│   └── loading_overlay.dart
├── router/                    # GoRouter config
│   └── app_router.dart
├── services/                  # Platform services
│   └── battery_service.dart
└── utils/                     # Helpers
    └── extensions.dart
```
