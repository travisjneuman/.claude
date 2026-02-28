# Flutter + Dart Stack Guide

**When to use:** Any cross-platform mobile, web, or desktop application built with Flutter 3.x and Dart 3.

---

## Project Commands

```bash
# Development
flutter run                          # Run on connected device
flutter run -d chrome                # Run in Chrome (web)
flutter run -d macos                 # Run on macOS desktop
flutter run --release                # Run in release mode

# Building
flutter build apk                   # Android APK
flutter build appbundle              # Android App Bundle (Play Store)
flutter build ios                    # iOS build
flutter build web                    # Web build
flutter build macos                  # macOS desktop

# Testing
flutter test                         # Run all tests
flutter test test/widgets/           # Run specific directory
flutter test --coverage              # With coverage report
flutter test --update-goldens        # Update golden files

# Code quality
dart analyze                         # Static analysis
dart fix --apply                     # Auto-fix lint issues
dart format .                        # Format code

# Dependencies
flutter pub get                      # Install dependencies
flutter pub upgrade                  # Upgrade dependencies
flutter pub outdated                 # Check outdated packages

# Code generation
dart run build_runner build          # Run code generation
dart run build_runner watch          # Watch mode
```

---

## Code Standards

### Widget Structure

```dart
import 'package:flutter/material.dart';

class UserCard extends StatelessWidget {
  const UserCard({
    super.key,
    required this.name,
    required this.email,
    this.onTap,
  });

  final String name;
  final String email;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: theme.textTheme.titleMedium),
              const SizedBox(height: 4),
              Text(email, style: theme.textTheme.bodySmall),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Dart 3 Features

```dart
// Records
(String, int) getUserInfo() => ('Alice', 30);

final (name, age) = getUserInfo();

// Pattern matching
sealed class AuthState {}
class Authenticated extends AuthState {
  final User user;
  Authenticated(this.user);
}
class Unauthenticated extends AuthState {}
class Loading extends AuthState {}

Widget buildAuthWidget(AuthState state) {
  return switch (state) {
    Authenticated(user: final u) => Text('Hello, ${u.name}'),
    Unauthenticated() => const LoginScreen(),
    Loading() => const CircularProgressIndicator(),
  };
}

// Extension types
extension type UserId(int value) {
  UserId.fromString(String s) : value = int.parse(s);
}

// Class modifiers
final class ImmutableConfig {
  final String apiUrl;
  final int timeout;
  const ImmutableConfig({required this.apiUrl, required this.timeout});
}
```

### Naming Conventions

| Type            | Convention              | Example                        |
| --------------- | ----------------------- | ------------------------------ |
| Classes         | PascalCase              | `UserProfile`, `AuthService`   |
| Files           | snake_case              | `user_profile.dart`            |
| Variables       | camelCase               | `userName`, `isActive`         |
| Constants       | camelCase or lowerCase  | `defaultPadding`, `maxRetries` |
| Private members | underscore prefix       | `_controller`, `_cache`        |
| Extensions      | PascalCase              | `StringExtension`              |

### State Management (Riverpod 3)

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// Simple state
final counterProvider = StateProvider<int>((ref) => 0);

// Async data
final usersProvider = FutureProvider<List<User>>((ref) async {
  final repository = ref.watch(userRepositoryProvider);
  return repository.fetchUsers();
});

// Notifier pattern (recommended)
final authProvider = NotifierProvider<AuthNotifier, AuthState>(
  AuthNotifier.new,
);

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() => Unauthenticated();

  Future<void> login(String email, String password) async {
    state = Loading();
    try {
      final user = await ref.read(authServiceProvider).login(email, password);
      state = Authenticated(user);
    } catch (e) {
      state = AuthError(e.toString());
    }
  }

  void logout() {
    ref.read(authServiceProvider).clearSession();
    state = Unauthenticated();
  }
}

// Using in widget
class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return switch (authState) {
      Authenticated(user: final user) => Text(user.name),
      Loading() => const CircularProgressIndicator(),
      _ => const LoginPrompt(),
    };
  }
}
```

### Navigation (GoRouter)

```dart
import 'package:go_router/go_router.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    redirect: (context, state) {
      final isLoggedIn = authState is Authenticated;
      final isLoginRoute = state.matchedLocation == '/login';

      if (!isLoggedIn && !isLoginRoute) return '/login';
      if (isLoggedIn && isLoginRoute) return '/';
      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
        routes: [
          GoRoute(
            path: 'users/:id',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return UserDetailScreen(userId: id);
            },
          ),
        ],
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
    ],
  );
});
```

---

## File Organization

```
lib/
├── main.dart                # Entry point
├── app.dart                 # MaterialApp configuration
├── router.dart              # GoRouter configuration
├── features/                # Feature-first organization
│   ├── auth/
│   │   ├── data/
│   │   │   ├── auth_repository.dart
│   │   │   └── auth_api.dart
│   │   ├── domain/
│   │   │   └── user.dart
│   │   └── presentation/
│   │       ├── login_screen.dart
│   │       ├── register_screen.dart
│   │       └── widgets/
│   │           └── login_form.dart
│   └── home/
│       ├── data/
│       ├── domain/
│       └── presentation/
├── shared/                  # Shared utilities
│   ├── widgets/             # Reusable widgets
│   │   ├── app_button.dart
│   │   └── loading_indicator.dart
│   ├── providers/           # Shared providers
│   ├── extensions/          # Dart extensions
│   ├── constants/           # App constants
│   └── theme/               # Theme data
│       ├── app_theme.dart
│       └── app_colors.dart
test/
├── features/
│   └── auth/
│       ├── data/
│       │   └── auth_repository_test.dart
│       └── presentation/
│           └── login_screen_test.dart
├── shared/
│   └── widgets/
│       └── app_button_test.dart
└── goldens/                 # Golden test images
    └── login_screen.png
```

---

## Testing

### Unit Tests

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockAuthApi extends Mock implements AuthApi {}

void main() {
  late AuthRepository repository;
  late MockAuthApi mockApi;

  setUp(() {
    mockApi = MockAuthApi();
    repository = AuthRepository(api: mockApi);
  });

  group('AuthRepository', () {
    test('login returns user on success', () async {
      when(() => mockApi.login(any(), any())).thenAnswer(
        (_) async => {'id': '1', 'name': 'Alice'},
      );

      final user = await repository.login('alice@example.com', 'pass');

      expect(user.name, equals('Alice'));
      verify(() => mockApi.login('alice@example.com', 'pass')).called(1);
    });

    test('login throws on invalid credentials', () async {
      when(() => mockApi.login(any(), any())).thenThrow(
        AuthException('Invalid credentials'),
      );

      expect(
        () => repository.login('bad@example.com', 'wrong'),
        throwsA(isA<AuthException>()),
      );
    });
  });
}
```

### Widget Tests

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('UserCard displays name and email', (tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: UserCard(name: 'Alice', email: 'alice@example.com'),
        ),
      ),
    );

    expect(find.text('Alice'), findsOneWidget);
    expect(find.text('alice@example.com'), findsOneWidget);
  });

  testWidgets('UserCard triggers onTap callback', (tester) async {
    var tapped = false;

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: UserCard(
            name: 'Alice',
            email: 'alice@example.com',
            onTap: () => tapped = true,
          ),
        ),
      ),
    );

    await tester.tap(find.byType(UserCard));
    expect(tapped, isTrue);
  });
}
```

### Golden Tests

```dart
testWidgets('LoginScreen matches golden', (tester) async {
  await tester.pumpWidget(
    const MaterialApp(home: LoginScreen()),
  );

  await expectLater(
    find.byType(LoginScreen),
    matchesGoldenFile('goldens/login_screen.png'),
  );
});
```

### Integration Tests

```dart
// integration_test/app_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('full login flow', (tester) async {
    app.main();
    await tester.pumpAndSettle();

    await tester.enterText(find.byKey(const Key('email')), 'user@test.com');
    await tester.enterText(find.byKey(const Key('password')), 'password');
    await tester.tap(find.byKey(const Key('login-button')));
    await tester.pumpAndSettle();

    expect(find.text('Welcome'), findsOneWidget);
  });
}
```

---

## CI/CD

### GitHub Actions

```yaml
# .github/workflows/flutter.yml
name: Flutter CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.x'
          channel: 'stable'
      - run: flutter pub get
      - run: dart analyze
      - run: dart format --set-exit-if-changed .
      - run: flutter test --coverage
```

### Fastlane

```ruby
# ios/fastlane/Fastfile
default_platform(:ios)

platform :ios do
  desc "Push to TestFlight"
  lane :beta do
    build_ios_app(scheme: "Runner")
    upload_to_testflight
  end
end
```

---

## Related Skills

| Skill                | When to Use         |
| -------------------- | ------------------- |
| `test-specialist`    | Testing guidance    |
| `tech-debt-analyzer` | Code quality        |
| `security`           | Security patterns   |
| `api-designer`       | API integration     |

### Invoke with:

```
Skill(test-specialist)
Skill(tech-debt-analyzer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/ui-visual-changes.md` - Visual changes

---

## Anti-Patterns

- [ ] Using `dynamic` type (Dart's equivalent of `any`)
- [ ] Deeply nested widget trees (extract widgets)
- [ ] Business logic inside widgets (use repositories/services)
- [ ] Not disposing controllers (`TextEditingController`, `AnimationController`)
- [ ] Missing `const` constructors on stateless widgets
- [ ] Large `build()` methods (extract to helper methods or widgets)
- [ ] Hardcoded strings (use `l10n` for localization)
- [ ] Not handling loading and error states in async UI

---

_Flutter + Dart: beautiful native apps from a single codebase with strong typing._
