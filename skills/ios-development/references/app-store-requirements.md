# ios-development: App Store Requirements

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## App Store Requirements

### Required Assets

- App icon (1024x1024)
- Screenshots for each device size
- Privacy policy URL
- App description (4000 char max)

### Privacy

```xml
<!-- Info.plist -->
<key>NSCameraUsageDescription</key>
<string>We need camera access to...</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo access to...</string>
```

### App Transport Security

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
</dict>
```

---
