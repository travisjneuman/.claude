# react-native: Styling

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Styling

### StyleSheet

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android
  },
});
```

### NativeWind (Tailwind for RN)

```bash
npm install nativewind tailwindcss
```

```tsx
import { Text, View } from "react-native";

export function Card() {
  return (
    <View className="bg-white rounded-lg p-4 shadow-md">
      <Text className="text-lg font-bold text-gray-900">Card Title</Text>
      <Text className="text-gray-600 mt-2">Card content goes here</Text>
    </View>
  );
}
```

---
