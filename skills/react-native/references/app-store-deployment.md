# react-native: App Store Deployment

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## App Store Deployment

### Expo EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### app.json Configuration

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.mycompany.myapp",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.mycompany.myapp",
      "versionCode": 1
    }
  }
}
```

---
