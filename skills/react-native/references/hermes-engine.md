# react-native: Hermes Engine

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Hermes Engine

Hermes is the default JS engine for React Native, optimized for mobile:

- **Faster startup** via bytecode precompilation
- **Lower memory** usage than JavaScriptCore
- **Better debugging** with Chrome DevTools Protocol

```json
// app.json - Hermes is enabled by default in Expo SDK 52+
{
  "expo": {
    "jsEngine": "hermes"
  }
}
```

---
