# react-native: Expo Router (File-Based Routing)

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Expo Router (File-Based Routing)

```bash
npx create-expo-app@latest --template tabs
```

### File Structure

```
app/
├── _layout.tsx          # Root layout
├── index.tsx            # Home screen (/)
├── (tabs)/              # Tab group
│   ├── _layout.tsx      # Tab navigator
│   ├── index.tsx        # First tab
│   └── settings.tsx     # Settings tab
├── [id].tsx             # Dynamic route (/123)
├── modal.tsx            # Modal screen
└── +not-found.tsx       # 404 screen
```

### Layout and Navigation

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

// Navigate with type-safe links
import { Link, router } from "expo-router";

<Link href="/settings">Settings</Link>
<Link href={{ pathname: "/[id]", params: { id: "123" } }}>Details</Link>

// Programmatic navigation
router.push("/settings");
router.replace("/login");
router.back();
```

---
