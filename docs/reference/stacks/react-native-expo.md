# React Native + Expo Stack Guide

**When to use:** Any mobile application built with React Native and Expo SDK 52+.

---

## Project Commands

```bash
# Development
npx expo start                    # Start Metro bundler
npx expo start --clear            # Clear cache and start
npx expo start --ios              # Start and open iOS simulator
npx expo start --android          # Start and open Android emulator

# Building (EAS)
eas build --platform ios          # Build iOS binary
eas build --platform android      # Build Android binary
eas build --platform all          # Build both platforms

# Submitting
eas submit --platform ios         # Submit to App Store
eas submit --platform android     # Submit to Google Play

# OTA Updates
eas update --branch production    # Push OTA update
eas update --branch preview       # Push preview update

# Testing
npm run test                      # Run Jest tests
npm run test -- --coverage        # With coverage
npm run type-check                # TypeScript validation
npm run lint                      # Lint code

# Prebuild (native code generation)
npx expo prebuild                 # Generate native projects
npx expo prebuild --clean         # Clean and regenerate
```

---

## Code Standards

### Component Structure

```typescript
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

export function ActionButton({ title, onPress, variant = "primary" }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#2563eb",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2563eb",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#2563eb",
  },
});
```

### TypeScript Rules

| Rule                 | Enforcement                           |
| -------------------- | ------------------------------------- |
| No `any`             | Use `unknown` for external data       |
| Props interfaces     | Required for all components           |
| Navigation types     | Typed routes with Expo Router         |
| Platform specifics   | Use `Platform.select` with type guard |

### Expo Router (File-Based Routing)

```typescript
// app/_layout.tsx - Root layout
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

// app/(tabs)/_layout.tsx - Tab layout
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// app/(tabs)/index.tsx - Home screen
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Link href="/profile" asChild>
        <Pressable>
          <Text>Go to Profile</Text>
        </Pressable>
      </Link>
    </View>
  );
}
```

### Navigation Patterns

```typescript
// Typed navigation with Expo Router
import { useRouter, useLocalSearchParams } from "expo-router";

export default function UserDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleEdit = () => {
    router.push(`/users/${id}/edit`);
  };

  const handleBack = () => {
    router.back();
  };

  return (/* ... */);
}
```

### State Management (Zustand)

```typescript
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
```

### Data Fetching (React Query)

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json() as Promise<User[]>;
    },
  });
}

function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create user");
      return response.json() as Promise<User>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

---

## File Organization

```
project/
├── app/                     # Expo Router file-based routes
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Home screen
│   ├── (tabs)/              # Tab group
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── profile.tsx
│   ├── (auth)/              # Auth group
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── [id].tsx             # Dynamic route
├── components/              # Reusable UI components
│   ├── ui/                  # Primitive components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── features/            # Feature-specific components
│       └── UserCard.tsx
├── hooks/                   # Custom hooks
│   ├── useAuth.ts
│   └── useTheme.ts
├── stores/                  # Zustand stores
│   └── authStore.ts
├── services/                # API and business logic
│   ├── api.ts
│   └── auth.ts
├── types/                   # Shared TypeScript types
│   └── user.ts
├── constants/               # App constants
│   ├── colors.ts
│   └── layout.ts
├── utils/                   # Utility functions
│   └── formatting.ts
├── assets/                  # Static assets
│   ├── images/
│   └── fonts/
├── app.json                 # Expo config
├── eas.json                 # EAS Build config
├── tsconfig.json
└── package.json
```

### File Naming

| Type       | Convention | Example            |
| ---------- | ---------- | ------------------ |
| Screens    | lowercase  | `profile.tsx`      |
| Components | PascalCase | `UserCard.tsx`     |
| Hooks      | use prefix | `useAuth.ts`       |
| Stores     | camelCase  | `authStore.ts`     |
| Types      | PascalCase | `User.ts`          |
| Tests      | .test.ts   | `UserCard.test.tsx`|

---

## New Architecture

### Fabric Renderer

Expo SDK 52+ uses the New Architecture by default. Key changes:

- Synchronous layout via Fabric
- Concurrent rendering support
- Improved gesture handling

### TurboModules and JSI

```typescript
// Custom Expo Module (Expo Modules API)
// modules/my-module/index.ts
import { requireNativeModule } from "expo-modules-core";

interface MyModuleInterface {
  getValue(): string;
  setValueAsync(value: string): Promise<void>;
}

export default requireNativeModule<MyModuleInterface>("MyModule");
```

---

## Testing

### Component Tests (Jest + React Native Testing Library)

```typescript
import { render, screen, fireEvent } from "@testing-library/react-native";
import { ActionButton } from "../ActionButton";

describe("ActionButton", () => {
  it("renders title text", () => {
    render(<ActionButton title="Submit" onPress={() => {}} />);
    expect(screen.getByText("Submit")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    render(<ActionButton title="Submit" onPress={onPress} />);
    fireEvent.press(screen.getByText("Submit"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility role", () => {
    render(<ActionButton title="Submit" onPress={() => {}} />);
    expect(screen.getByRole("button")).toBeTruthy();
  });
});
```

### E2E Tests (Maestro)

```yaml
# .maestro/login-flow.yaml
appId: com.myapp
---
- launchApp
- tapOn: "Email"
- inputText: "user@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Welcome back"
```

---

## Deployment

### EAS Build Configuration

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
      "channel": "preview"
    },
    "production": {
      "channel": "production",
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": { "ascAppId": "YOUR_APP_ID" },
      "android": { "serviceAccountKeyPath": "./google-sa.json" }
    }
  }
}
```

### OTA Updates

```bash
# Push update to production channel
eas update --branch production --message "Fix login button alignment"

# Push to preview for testing
eas update --branch preview --message "New profile screen"
```

---

## Related Skills

| Skill                             | When to Use            |
| --------------------------------- | ---------------------- |
| `generic-react-code-reviewer`     | Code review            |
| `generic-react-feature-developer` | Feature implementation |
| `generic-react-ux-designer`       | UX patterns            |
| `test-specialist`                 | Testing guidance       |
| `tech-debt-analyzer`              | Code health            |

### Invoke with:

```
Skill(generic-react-code-reviewer)
Skill(generic-react-feature-developer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/stacks/react-typescript.md` - React patterns (shared)
- `~/.claude/rules/checklists/ui-visual-changes.md` - Visual changes

---

## Anti-Patterns

- [ ] Using `any` type
- [ ] Inline styles for repeated patterns (use StyleSheet)
- [ ] Missing accessibility props (`accessibilityRole`, `accessibilityLabel`)
- [ ] Blocking the JS thread with heavy computation (use `InteractionManager`)
- [ ] Large images without resizing (use `expo-image` with proper sizing)
- [ ] Not testing on both iOS and Android
- [ ] Hardcoded dimensions instead of responsive layout
- [ ] Direct state mutation in stores

---

_React Native + Expo: one codebase, native performance, OTA updates._
