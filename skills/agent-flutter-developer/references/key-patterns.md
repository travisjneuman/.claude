# agent-flutter-developer: Key Patterns

Part of the `agent-flutter-developer` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Riverpod State Management

```dart
// providers/auth_provider.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_provider.g.dart';

// Immutable state
class AuthState {
  final User? user;
  final bool isLoading;
  final String? error;

  const AuthState({this.user, this.isLoading = false, this.error});

  AuthState copyWith({User? user, bool? isLoading, String? error}) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

// Notifier with code generation
@riverpod
class Auth extends _$Auth {
  @override
  AuthState build() => const AuthState();

  Future<void> signIn(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      final user = await ref.read(authRepositoryProvider).signIn(
        email: email,
        password: password,
      );
      state = state.copyWith(user: user, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> signOut() async {
    await ref.read(authRepositoryProvider).signOut();
    state = const AuthState();
  }
}

// Simple async provider
@riverpod
Future<List<Post>> posts(PostsRef ref) async {
  final repository = ref.read(postRepositoryProvider);
  return repository.fetchPosts();
}

// Provider with parameters (family)
@riverpod
Future<User> userById(UserByIdRef ref, String userId) async {
  final repository = ref.read(userRepositoryProvider);
  return repository.getUser(userId);
}
```

### GoRouter Navigation

```dart
// router/app_router.dart
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'app_router.g.dart';

@riverpod
GoRouter appRouter(AppRouterRef ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/',
    debugLogDiagnostics: true,
    redirect: (context, state) {
      final isAuthenticated = authState.user != null;
      final isAuthRoute = state.matchedLocation.startsWith('/auth');

      if (!isAuthenticated && !isAuthRoute) {
        return '/auth/login?redirect=${state.matchedLocation}';
      }
      if (isAuthenticated && isAuthRoute) {
        return state.uri.queryParameters['redirect'] ?? '/';
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomePage(),
        routes: [
          GoRoute(
            path: 'posts/:id',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return PostDetailPage(postId: id);
            },
          ),
          GoRoute(
            path: 'settings',
            builder: (context, state) => const SettingsPage(),
          ),
        ],
      ),
      ShellRoute(
        builder: (context, state, child) => MainLayout(child: child),
        routes: [
          GoRoute(
            path: '/dashboard',
            builder: (context, state) => const DashboardPage(),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => const ProfilePage(),
          ),
        ],
      ),
      GoRoute(
        path: '/auth/login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/auth/register',
        builder: (context, state) => const RegisterPage(),
      ),
    ],
  );
}
```

### Widget with Riverpod Consumer

```dart
// screens/posts_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class PostsScreen extends ConsumerWidget {
  const PostsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final postsAsync = ref.watch(postsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Posts')),
      body: postsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Error: $error'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => ref.invalidate(postsProvider),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
        data: (posts) => RefreshIndicator(
          onRefresh: () => ref.refresh(postsProvider.future),
          child: ListView.builder(
            itemCount: posts.length,
            itemBuilder: (context, index) {
              final post = posts[index];
              return PostCard(
                post: post,
                onTap: () => context.push('/posts/${post.id}'),
              );
            },
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.push('/posts/new'),
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

### Platform Channel (Method Channel)

```dart
// services/battery_service.dart
import 'package:flutter/services.dart';

class BatteryService {
  static const _channel = MethodChannel('com.example.app/battery');

  Future<int> getBatteryLevel() async {
    try {
      final int result = await _channel.invokeMethod('getBatteryLevel');
      return result;
    } on PlatformException catch (e) {
      throw Exception('Failed to get battery level: ${e.message}');
    }
  }

  Stream<int> batteryLevelStream() {
    const eventChannel = EventChannel('com.example.app/battery_events');
    return eventChannel
        .receiveBroadcastStream()
        .map((event) => event as int);
  }
}
```

```kotlin
// android/app/src/main/kotlin/.../MainActivity.kt
class MainActivity : FlutterActivity() {
    private val CHANNEL = "com.example.app/battery"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL)
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "getBatteryLevel" -> {
                        val batteryLevel = getBatteryLevel()
                        if (batteryLevel != -1) {
                            result.success(batteryLevel)
                        } else {
                            result.error("UNAVAILABLE", "Battery level not available.", null)
                        }
                    }
                    else -> result.notImplemented()
                }
            }
    }

    private fun getBatteryLevel(): Int {
        val batteryManager = getSystemService(BATTERY_SERVICE) as BatteryManager
        return batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }
}
```

### Widget Tests

```dart
// test/screens/posts_screen_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockPostRepository extends Mock implements PostRepository {}

void main() {
  late MockPostRepository mockRepo;

  setUp(() {
    mockRepo = MockPostRepository();
  });

  testWidgets('displays loading indicator while fetching posts',
      (tester) async {
    when(() => mockRepo.fetchPosts())
        .thenAnswer((_) => Future.delayed(const Duration(seconds: 1), () => []));

    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          postRepositoryProvider.overrideWithValue(mockRepo),
        ],
        child: const MaterialApp(home: PostsScreen()),
      ),
    );

    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });

  testWidgets('displays posts when loaded', (tester) async {
    when(() => mockRepo.fetchPosts()).thenAnswer((_) async => [
      Post(id: '1', title: 'First Post', content: 'Content 1'),
      Post(id: '2', title: 'Second Post', content: 'Content 2'),
    ]);

    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          postRepositoryProvider.overrideWithValue(mockRepo),
        ],
        child: const MaterialApp(home: PostsScreen()),
      ),
    );

    await tester.pumpAndSettle();

    expect(find.text('First Post'), findsOneWidget);
    expect(find.text('Second Post'), findsOneWidget);
  });

  testWidgets('displays error with retry button on failure', (tester) async {
    when(() => mockRepo.fetchPosts()).thenThrow(Exception('Network error'));

    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          postRepositoryProvider.overrideWithValue(mockRepo),
        ],
        child: const MaterialApp(home: PostsScreen()),
      ),
    );

    await tester.pumpAndSettle();

    expect(find.text('Retry'), findsOneWidget);
  });
}
```

### Build Flavors

```dart
// lib/config/environment.dart
enum Environment { dev, staging, production }

class AppConfig {
  final Environment environment;
  final String apiBaseUrl;
  final String appName;

  const AppConfig({
    required this.environment,
    required this.apiBaseUrl,
    required this.appName,
  });

  static const dev = AppConfig(
    environment: Environment.dev,
    apiBaseUrl: 'https://api-dev.example.com',
    appName: 'MyApp DEV',
  );

  static const staging = AppConfig(
    environment: Environment.staging,
    apiBaseUrl: 'https://api-staging.example.com',
    appName: 'MyApp STG',
  );

  static const production = AppConfig(
    environment: Environment.production,
    apiBaseUrl: 'https://api.example.com',
    appName: 'MyApp',
  );
}
```

```bash
# Run with specific flavor
flutter run --dart-define=ENVIRONMENT=dev
flutter run --dart-define=ENVIRONMENT=staging
flutter run --dart-define=ENVIRONMENT=production
```
