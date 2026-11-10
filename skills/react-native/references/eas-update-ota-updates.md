# react-native: EAS Update (OTA Updates)

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## EAS Update (OTA Updates)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure updates
eas update:configure

# Push an OTA update (no app store review)
eas update --branch production --message "Bug fix for login"
eas update --branch preview --message "New feature preview"
```

```typescript
// Check for updates in app
import * as Updates from "expo-updates";

async function checkForUpdates() {
  const update = await Updates.checkForUpdateAsync();
  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync(); // Apply update
  }
}
```

---
