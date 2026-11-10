---
name: react-native
description: Cross-platform mobile development with React Native and Expo. Use when building iOS/Android apps with JavaScript/TypeScript, implementing native features, or optimizing mobile performance.
---

# React Native Development

Build native iOS and Android apps with React Native and Expo.

## Framework Options

| Framework                | Use When                                        |
| ------------------------ | ----------------------------------------------- |
| **Expo** (Recommended)   | Most apps, faster development, managed workflow |
| **React Native CLI**     | Need custom native modules, brownfield apps     |
| **Expo with Dev Client** | Best of both - Expo DX with native modules      |

---

## Project Setup

### Expo (Recommended)

```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

### React Native CLI

```bash
npx @react-native-community/cli init MyApp
cd MyApp
npx react-native run-ios  # or run-android
```

---

## Core Components

### Basic Structure

```tsx
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hello World</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
```

### Common Components

```tsx
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
  Switch,
} from 'react-native';

// Touchable with feedback
<Pressable
  onPress={handlePress}
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed,
  ]}
>
  <Text>Press Me</Text>
</Pressable>

// Text Input
<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Enter text"
  style={styles.input}
  autoCapitalize="none"
  keyboardType="email-address"
  returnKeyType="done"
  onSubmitEditing={handleSubmit}
/>

// Image
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/react-native/`).

| Topic | File | Covers |
| --- | --- | --- |
| Navigation | [`references/navigation.md`](references/navigation.md) | React Navigation Setup; Stack Navigation; Tab Navigation |
| State Management | [`references/state-management.md`](references/state-management.md) | Zustand (Recommended); React Query |
| Styling | [`references/styling.md`](references/styling.md) | StyleSheet; NativeWind (Tailwind for RN) |
| Native Features | [`references/native-features.md`](references/native-features.md) | Camera (Expo); Push Notifications (Expo); Location |
| Performance | [`references/performance.md`](references/performance.md) | FlatList Optimization; Image Optimization |
| Testing | [`references/testing.md`](references/testing.md) | Jest + React Native Testing Library |
| App Store Deployment | [`references/app-store-deployment.md`](references/app-store-deployment.md) | Expo EAS Build; app.json Configuration |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| New Architecture (React Native 0.76+) | [`references/new-architecture-react-native-0-76.md`](references/new-architecture-react-native-0-76.md) | Core Components; Enabling New Architecture; TurboModules (Type-Safe Native Modules); Fabric Components (New Renderer) |
| Expo Router (File-Based Routing) | [`references/expo-router-file-based-routing.md`](references/expo-router-file-based-routing.md) | File Structure; Layout and Navigation |
| EAS Update (OTA Updates) | [`references/eas-update-ota-updates.md`](references/eas-update-ota-updates.md) | 29 lines |
| Hermes Engine | [`references/hermes-engine.md`](references/hermes-engine.md) | 19 lines |
| Expo SDK 52+ Features | [`references/expo-sdk-52-features.md`](references/expo-sdk-52-features.md) | 12 lines |

## React 19 Compatibility

React Native supports React 19 features when using New Architecture:

- **use() hook** for reading promises and context
- **ref as prop** (no forwardRef needed)
- **React Compiler** support for auto-memoization
- **useActionState** and **useOptimistic** for form handling

---
