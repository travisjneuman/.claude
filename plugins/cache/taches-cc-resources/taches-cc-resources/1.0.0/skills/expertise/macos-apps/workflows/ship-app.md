# Workflow: Ship/Release a macOS App

<required_reading>
**Read these reference files NOW:**
1. references/security-code-signing.md
2. references/cli-workflow.md
</required_reading>

<process>
## Step 1: Prepare for Release

Ensure the app is ready:
- All features complete and tested
- No debug code or test data
- Version and build numbers updated in Info.plist
- App icon and assets finalized

```bash
# Verify build succeeds
xcodebuild -project AppName.xcodeproj -scheme AppName -configuration Release build
```

## Step 2: Choose Distribution Method

| Method | Use When | Requires |
|--------|----------|----------|
| Direct distribution | Sharing with specific users, beta testing | Developer ID signing + notarization |
| App Store | Public distribution, paid apps | App Store Connect account, review |
| TestFlight | Beta testing at scale | App Store Connect |

## Step 3: Code Signing

**For Direct Distribution (Developer ID):**
```bash
# Archive
xcodebuild -project AppName.xcodeproj \
  -scheme AppName \
  -configuration Release \
  -archivePath ./build/AppName.xcarchive \
  archive

# Export with Developer ID
xcodebuild -exportArchive \
  -archivePath ./build/AppName.xcarchive \
  -exportPath ./build/export \
  -exportOptionsPlist ExportOptions.plist
```

ExportOptions.plist for Developer ID:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>developer-id</string>
    <key>signingStyle</key>
    <string>automatic</string>
</dict>
</plist>
```

**For App Store:**
```xml
<key>method</key>
<string>app-store</string>
```

## Step 4: Notarization (Direct Distribution)

Required for apps distributed outside the App Store:

```bash
# Submit for notarization
xcrun notarytool submit ./build/export/AppName.app.zip \
  --apple-id "your@email.com" \
  --team-id "TEAMID" \
  --password "@keychain:AC_PASSWORD" \
  --wait

# Staple the ticket
xcrun stapler staple ./build/export/AppName.app
```

## Step 5: Create DMG (Direct Distribution)

```bash
# Create DMG
hdiutil create -volname "AppName" \
  -srcfolder ./build/export/AppName.app \
  -ov -format UDZO \
  ./build/AppName.dmg

# Notarize the DMG too
xcrun notarytool submit ./build/AppName.dmg \
  --apple-id "your@email.com" \
  --team-id "TEAMID" \
  --password "@keychain:AC_PASSWORD" \
  --wait

xcrun stapler staple ./build/AppName.dmg
```

## Step 6: App Store Submission

```bash
# Validate
xcrun altool --validate-app \
  -f ./build/export/AppName.pkg \
  -t macos \
  --apiKey KEY_ID \
  --apiIssuer ISSUER_ID

# Upload
xcrun altool --upload-app \
  -f ./build/export/AppName.pkg \
  -t macos \
  --apiKey KEY_ID \
  --apiIssuer ISSUER_ID
```

Then complete submission in App Store Connect.

## Step 7: Verify Release

**For direct distribution:**
```bash
# Verify signature
codesign -dv --verbose=4 ./build/export/AppName.app

# Verify notarization
spctl -a -vv ./build/export/AppName.app
```

**For App Store:**
- Check App Store Connect for review status
- Test TestFlight build if applicable
</process>

<checklist>
Before shipping:
- [ ] Version number incremented
- [ ] Release notes written
- [ ] Debug logging disabled or minimized
- [ ] All entitlements correct and minimal
- [ ] Privacy descriptions in Info.plist
- [ ] App icon complete (all sizes)
- [ ] Screenshots prepared (if App Store)
- [ ] Tested on clean install
</checklist>

<common_issues>
| Issue | Cause | Fix |
|-------|-------|-----|
| Notarization fails | Unsigned frameworks, hardened runtime issues | Check all embedded binaries are signed |
| "App is damaged" | Not notarized or stapled | Run notarytool and stapler |
| Gatekeeper blocks | Missing Developer ID | Sign with Developer ID certificate |
| App Store rejection | Missing entitlement descriptions, privacy issues | Add usage descriptions to Info.plist |
</common_issues>
