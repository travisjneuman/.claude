---
name: mobile-app-project
description: Mobile app starter with React Native + Expo, navigation, state management, push notifications, app store prep, CI/CD
---

# Mobile App Project Template

**Primary Stack:** React Native + Expo SDK 52+ + TypeScript + Expo Router + Zustand
**Alternative Stack:** Flutter + Dart + Riverpod + GoRouter

---

## Stack Selection

| Factor           | React Native / Expo                | Flutter / Dart                   |
| ---------------- | ---------------------------------- | -------------------------------- |
| Language         | TypeScript                         | Dart                             |
| UI approach      | Native components                  | Custom rendering (Skia)          |
| Hot reload       | Fast Refresh                       | Hot Reload                       |
| Web team synergy | High (React knowledge transfers)   | Moderate (new language)          |
| Performance      | Near-native                        | Near-native                      |
| Ecosystem        | npm (massive)                      | pub.dev (growing)                |
| Best for         | Teams with React/JS experience     | Teams wanting pixel-perfect UI   |

---

## React Native / Expo Directory Structure

```
project/
├── app/                           # Expo Router (file-based routing)
│   ├── _layout.tsx                # Root layout (providers, fonts, splash)
│   ├── index.tsx                  # Home / entry screen
│   ├── (auth)/                    # Auth screens (unauthenticated)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                    # Main tab navigation
│   │   ├── _layout.tsx            # Tab bar configuration
│   │   ├── index.tsx              # Home tab
│   │   ├── explore.tsx            # Explore tab
│   │   ├── notifications.tsx      # Notifications tab
│   │   └── profile.tsx            # Profile tab
│   ├── (stack)/                   # Stack-navigated screens
│   │   ├── _layout.tsx
│   │   ├── settings.tsx
│   │   ├── [id].tsx               # Dynamic route
│   │   └── modal.tsx              # Modal presentation
│   ├── (modals)/                  # Modal screens
│   │   └── settings.tsx
│   └── +not-found.tsx             # 404 screen
├── components/
│   ├── ui/                        # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Typography.tsx
│   │   └── LoadingSpinner.tsx
│   ├── layout/                    # Layout components
│   │   ├── SafeArea.tsx
│   │   ├── KeyboardAvoid.tsx
│   │   └── Header.tsx
│   ├── forms/                     # Form components
│   └── features/                  # Feature-specific components
├── hooks/                         # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   ├── useNotifications.ts
│   ├── useRefreshOnFocus.ts
│   ├── useTheme.ts
│   └── useColorScheme.ts
├── services/                      # API and business logic
│   ├── api.ts                     # API client (fetch/axios wrapper)
│   ├── auth.ts                    # Auth service
│   ├── notifications.ts           # Push notification service
│   └── storage.ts                 # Secure storage wrapper
├── stores/                        # State management (Zustand)
│   ├── auth.ts
│   ├── settings.ts
│   └── notifications.ts
├── lib/
│   ├── constants.ts               # App constants
│   ├── theme.ts                   # Theme tokens (colors, spacing, typography)
│   └── utils.ts                   # Shared utilities
├── types/                         # TypeScript type definitions
│   ├── api.ts                     # API response types
│   ├── navigation.ts              # Navigation param types
│   └── models.ts                  # Domain models
├── assets/                        # Static assets
│   ├── images/
│   ├── fonts/
│   └── icons/                     # SVG icons (via react-native-svg)
├── __tests__/                     # Test files
│   ├── components/
│   └── services/
├── app.json                       # Expo config
├── eas.json                       # EAS Build/Submit config
├── tsconfig.json
├── babel.config.js
├── metro.config.js
└── package.json
```

---

## Flutter Directory Structure

```
project/
├── lib/
│   ├── main.dart                  # App entry point
│   ├── app/
│   │   ├── app.dart               # MaterialApp + GoRouter setup
│   │   ├── routes.dart            # Route definitions (go_router)
│   │   └── theme.dart             # Theme configuration
│   ├── features/                  # Feature-first organization
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   │   ├── login_screen.dart
│   │   │   │   └── register_screen.dart
│   │   │   ├── widgets/
│   │   │   ├── providers/         # Riverpod providers
│   │   │   ├── models/
│   │   │   └── repositories/
│   │   ├── home/
│   │   │   ├── screens/
│   │   │   ├── widgets/
│   │   │   └── providers/
│   │   └── settings/
│   ├── core/
│   │   ├── constants/
│   │   ├── errors/
│   │   ├── network/               # Dio HTTP client
│   │   ├── storage/               # Local storage
│   │   └── utils/
│   └── shared/
│       ├── widgets/               # Reusable widgets
│       ├── models/                # Data models
│       └── providers/             # Global providers
├── test/
│   ├── unit/
│   ├── widget/
│   └── integration/
├── integration_test/              # Integration tests
├── assets/
│   ├── images/
│   ├── fonts/
│   └── translations/
├── android/
├── ios/
├── pubspec.yaml                   # Dependencies
└── analysis_options.yaml          # Lint rules
```

---

## Setup Steps

### React Native (Expo)

```bash
# Create Expo project
npx create-expo-app@latest project-name --template tabs

# Install core dependencies
npx expo install expo-router expo-linking expo-constants expo-status-bar
npx expo install @react-native-async-storage/async-storage
npx expo install expo-secure-store
npx expo install expo-notifications expo-device
npm install zustand @tanstack/react-query
npm install -D @testing-library/react-native jest-expo
```

### Flutter

```bash
# Create Flutter project
flutter create --org com.yourcompany project_name

# Add core dependencies
flutter pub add flutter_riverpod go_router dio
flutter pub add shared_preferences flutter_secure_storage
flutter pub add firebase_messaging flutter_local_notifications
flutter pub add freezed_annotation json_annotation
flutter pub add --dev freezed json_serializable build_runner
```

---

## Navigation Patterns

### React Native (Expo Router)

```typescript
// app/_layout.tsx - Root layout with auth gate
import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
      <Stack.Screen name="(stack)" />
    </Stack>
  );
}

// app/(tabs)/_layout.tsx - Tab navigation
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

### Flutter (go_router)

```dart
// lib/app/routes.dart
final router = GoRouter(
  routes: [
    ShellRoute(
      builder: (context, state, child) => MainShell(child: child),
      routes: [
        GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
        GoRoute(path: '/explore', builder: (_, __) => const ExploreScreen()),
        GoRoute(path: '/profile', builder: (_, __) => const ProfileScreen()),
      ],
    ),
    GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
    GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),
    GoRoute(
      path: '/item/:id',
      builder: (_, state) => ItemScreen(id: state.pathParameters['id']!),
    ),
  ],
);
```

---

## State Management

### React Native: Zustand + React Query

```typescript
// stores/auth.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

// API calls: use @tanstack/react-query
// const { data, isLoading } = useQuery({ queryKey: ['user'], queryFn: fetchUser });
```

### Flutter: Riverpod

```dart
// features/auth/providers/auth_provider.dart
@riverpod
class Auth extends _$Auth {
  @override
  AuthState build() => const AuthState.unauthenticated();

  Future<void> login(String email, String password) async {
    state = const AuthState.loading();
    try {
      final user = await ref.read(authRepositoryProvider).login(email, password);
      state = AuthState.authenticated(user);
    } catch (e) {
      state = AuthState.error(e.toString());
    }
  }
}
```

---

## API Integration

### React Native

```typescript
// services/api.ts
import { useAuthStore } from '@/stores/auth';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    useAuthStore.getState().clearAuth();
    throw new Error('Session expired');
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
```

### Flutter

```dart
// core/network/api_client.dart
class ApiClient {
  late final Dio _dio;

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: Environment.apiUrl,
      connectTimeout: const Duration(seconds: 10),
    ));
    _dio.interceptors.add(AuthInterceptor());
    _dio.interceptors.add(LogInterceptor());
  }
}
```

---

## Push Notifications

### Setup Checklist

- [ ] Configure push notification service (FCM for both platforms)
- [ ] Request notification permissions at appropriate time (not on first launch)
- [ ] Register device token with backend
- [ ] Handle notification taps (deep linking)
- [ ] Handle foreground notifications (in-app banner)
- [ ] Handle background notifications
- [ ] Set up notification channels (Android)
- [ ] Configure notification categories (iOS)

### React Native (expo-notifications)

```typescript
// services/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}
```

### Flutter (firebase_messaging)

```yaml
# pubspec.yaml
dependencies:
  firebase_messaging: ^14.0.0
  flutter_local_notifications: ^17.0.0
```

---

## Platform-Specific Setup

### iOS

```bash
# Install CocoaPods dependencies
cd ios && pod install && cd ..

# In Xcode:
# - Set Team, Bundle Identifier, Provisioning Profile
# - Enable "Push Notifications" capability
# - Create APNs key in Apple Developer portal
# - Upload to Expo: eas credentials
```

### Android

```bash
# Create upload keystore
keytool -genkey -v -keystore upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# For push notifications:
# - Set up Firebase Cloud Messaging (FCM)
# - Download google-services.json to android/app/
# - Configure in eas.json
```

### Deep Linking

```json
// app.json
{
  "expo": {
    "scheme": "yourapp",
    "plugins": [
      ["expo-router", { "root": "./app" }]
    ]
  }
}
```

---

## App Store Submission Checklist

### iOS (App Store)

- [ ] Apple Developer account ($99/year)
- [ ] App Store Connect listing created
- [ ] App icons (1024x1024 required)
- [ ] Screenshots for all required device sizes (6.7", 6.5", 5.5")
- [ ] Privacy policy URL
- [ ] App description, keywords, categories
- [ ] Review guidelines compliance check
- [ ] TestFlight beta testing completed
- [ ] App Tracking Transparency (if tracking)
- [ ] Sign in with Apple (if using third-party auth)
- [ ] Export compliance questionnaire

### Android (Google Play)

- [ ] Google Play Developer account ($25 one-time)
- [ ] Play Console listing created
- [ ] App icons and feature graphic
- [ ] Screenshots for phone and tablet
- [ ] Privacy policy URL
- [ ] Content rating questionnaire completed
- [ ] App signing key configured (Play App Signing)
- [ ] Internal/closed testing completed
- [ ] Data safety form completed
- [ ] Target API level compliance (latest -1)

### Both Platforms

- [ ] Version number and build number set
- [ ] Splash screen configured
- [ ] All test/debug code removed
- [ ] Crash reporting configured (Sentry/Crashlytics)
- [ ] Analytics configured
- [ ] Deep links configured and tested
- [ ] Offline behavior tested
- [ ] Performance tested on low-end devices
- [ ] Accessibility tested (VoiceOver/TalkBack)
- [ ] Support URL or email provided

---

## CI/CD Pipeline

### React Native (EAS Build)

```json
// eas.json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": false },
      "android": { "buildType": "apk" }
    },
    "production": {
      "ios": { "autoIncrement": true },
      "android": { "autoIncrement": true }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "XXXXXXXXXX"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

```bash
# Build commands
eas build --profile development --platform all
eas build --profile preview --platform all
eas build --profile production --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android

# OTA update (skip app store review)
eas update --branch production --message "Bug fix"
```

### Flutter (Fastlane)

```ruby
# ios/fastlane/Fastfile
default_platform(:ios)
platform :ios do
  lane :beta do
    build_app(workspace: "Runner.xcworkspace", scheme: "Runner")
    upload_to_testflight
  end
  lane :release do
    build_app(workspace: "Runner.xcworkspace", scheme: "Runner")
    upload_to_app_store
  end
end
```

### GitHub Actions

```yaml
# .github/workflows/build.yml
name: Build
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test  # or: flutter test

  build-ios:
    needs: test
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build iOS
        run: eas build --platform ios --non-interactive

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Android
        run: eas build --platform android --non-interactive
```

---

## Offline Support

```typescript
// React Native: sync React Query with network state
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});
```

---

## Testing Strategy

```bash
# Unit tests
npm test

# Component tests (React Native Testing Library)
npm test -- --testPathPattern=components

# E2E tests (Maestro or Detox)
maestro test flows/
detox test --configuration ios.sim.debug
```

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '@/app/(auth)/login';

describe('LoginScreen', () => {
  it('shows validation error for empty email', () => {
    const { getByText, getByTestId } = render(<LoginScreen />);
    fireEvent.press(getByTestId('login-button'));
    expect(getByText('Email is required')).toBeTruthy();
  });
});
```

---

## Environment Variables

```bash
# React Native (.env or app.json)
EXPO_PUBLIC_API_URL="https://api.example.com"
EXPO_PUBLIC_SENTRY_DSN=""
EXPO_PUBLIC_POSTHOG_KEY=""

# Flutter (--dart-define or .env)
API_URL=https://api.example.com
SENTRY_DSN=
```

---

## Related Global Rules

Load these `~/.claude/` files when relevant:

- `rules/stacks/react-typescript.md` for React Native/TypeScript patterns
- `rules/stacks/react-native-expo.md` for React Native specifics (if available)
- `rules/stacks/flutter-dart.md` for Flutter specifics (if available)
- `rules/checklists/ui-visual-changes.md` for UI work
- `rules/checklists/verification-template.md` for completion verification

---

_Mobile app template: navigation, state, APIs, push notifications, store submission, CI/CD -- ready to ship._
