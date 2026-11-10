# react-native: New Architecture (React Native 0.76+)

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## New Architecture (React Native 0.76+)

React Native's New Architecture replaces the legacy bridge with a more performant, synchronous layer.

### Core Components

| Component          | Replaces     | Benefit                                        |
| ------------------ | ------------ | ---------------------------------------------- |
| **Fabric**         | Paper        | Synchronous rendering, concurrent features     |
| **TurboModules**   | Native Modules | Lazy loading, synchronous access, type safety |
| **JSI**            | Bridge       | Direct JS-to-native communication, no JSON     |
| **Bridgeless Mode** | Bridge      | Removes bridge entirely, lower memory usage    |

### Enabling New Architecture

```json
// app.json (Expo)
{
  "expo": {
    "newArchEnabled": true
  }
}
```

```ruby
# ios/Podfile (bare React Native)
ENV['RCT_NEW_ARCH_ENABLED'] = '1'
```

### TurboModules (Type-Safe Native Modules)

```typescript
// NativeCalculator.ts
import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  add(a: number, b: number): number; // Synchronous!
  fetchData(url: string): Promise<string>; // Async
}

export default TurboModuleRegistry.getEnforcing<Spec>("NativeCalculator");
```

### Fabric Components (New Renderer)

Fabric enables concurrent rendering features from React 18/19, including Suspense for data fetching, transitions, and automatic batching.

---
