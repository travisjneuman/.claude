# Mobile App Deployment Checklist

**When to use:** Deploying mobile apps to the App Store (iOS) or Google Play (Android), managing beta distribution, or setting up OTA updates.

---

## Versioning Strategy

### Semantic Versioning for Mobile

| Component      | Format                | Example        | When to Bump                          |
| -------------- | --------------------- | -------------- | ------------------------------------- |
| Marketing version | `MAJOR.MINOR.PATCH` | `2.4.1`       | User-facing changes                   |
| Build number   | Monotonically increasing | `147`        | Every build submitted to stores       |
| Internal code  | Platform-specific     | `versionCode` (Android), `CFBundleVersion` (iOS) | Every submission |

### Version Bump Rules

| Change Type                | Version Bump     | Example           |
| -------------------------- | ---------------- | ----------------- |
| Bug fix, minor patch       | Patch (+0.0.1)   | 2.4.1 -> 2.4.2   |
| New feature, UI change     | Minor (+0.1.0)   | 2.4.0 -> 2.5.0   |
| Breaking change, redesign  | Major (+1.0.0)   | 2.0.0 -> 3.0.0   |

- [ ] Marketing version updated in app config
- [ ] Build number incremented (never reuse for same marketing version)
- [ ] Version displayed somewhere in the app (Settings, About screen)
- [ ] `autoIncrement` configured in EAS or CI pipeline if using Expo

---

## iOS App Store Deployment

### Code Signing and Provisioning

```
Certificate Types:
├── Development       - Local testing on physical devices
├── Distribution      - App Store and Ad Hoc distribution
└── Apple Push (APNs) - Push notifications (if applicable)

Provisioning Profiles:
├── Development       - Tied to specific device UDIDs
├── Ad Hoc            - Limited distribution (up to 100 devices)
├── App Store         - App Store distribution (no device limit)
└── Enterprise        - In-house distribution (requires Enterprise account)
```

- [ ] Apple Developer account active ($99/year)
- [ ] Distribution certificate created and valid (not expired)
- [ ] App Store provisioning profile created with correct bundle ID
- [ ] Push notification entitlement configured (if using push)
- [ ] Keychain access configured on build machine (CI or local)
- [ ] Certificate and profile match (same team, same bundle ID)

### Expo / EAS Build (Recommended for React Native)

```bash
# Configure credentials (Expo manages signing automatically)
eas credentials

# Build for App Store
eas build --platform ios --profile production

# Submit to App Store Connect
eas submit --platform ios
```

### Manual Xcode Signing

```bash
# Archive the app
xcodebuild archive \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -archivePath build/MyApp.xcarchive

# Export for App Store
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportPath build/export \
  -exportOptionsPlist ExportOptions.plist

# Upload via altool or Transporter
xcrun altool --upload-app \
  -f build/export/MyApp.ipa \
  -t ios \
  -u "your@email.com" \
  -p "@keychain:AC_PASSWORD"
```

- [ ] Automatic signing enabled in Xcode (or EAS manages it)
- [ ] Correct team selected in signing settings
- [ ] No signing errors in build output
- [ ] Archive builds successfully before submission

### App Store Listing

- [ ] App name (30 characters max, unique on App Store)
- [ ] Subtitle (30 characters max)
- [ ] Description (up to 4000 characters)
- [ ] Keywords (100 characters max, comma-separated)
- [ ] Category and secondary category selected
- [ ] Privacy policy URL provided
- [ ] Support URL provided
- [ ] Marketing URL (optional but recommended)
- [ ] App icon (1024x1024 PNG, no alpha, no rounded corners)
- [ ] What's New text for update releases

### Screenshots

| Device          | Size (points)   | Required? |
| --------------- | --------------- | --------- |
| iPhone 6.9"     | 1320 x 2868    | Yes       |
| iPhone 6.7"     | 1290 x 2796    | Yes       |
| iPhone 6.5"     | 1284 x 2778    | Yes       |
| iPhone 5.5"     | 1242 x 2208    | Optional  |
| iPad Pro 13"    | 2048 x 2732    | If iPad   |
| iPad Pro 11"    | 1668 x 2388    | If iPad   |

- [ ] Screenshots provided for all required device sizes
- [ ] Screenshots show actual app functionality (not misleading)
- [ ] Screenshots localized for target markets (if applicable)
- [ ] App preview video uploaded (optional, 15-30 seconds)
- [ ] No screenshots contain placeholder or debug content

### App Review Guidelines Compliance

- [ ] No private API usage
- [ ] No hidden features or undocumented functionality
- [ ] In-app purchases use Apple's payment system (no external payment links)
- [ ] Login functionality works (provide test account if needed)
- [ ] No references to competing platforms ("Also on Android")
- [ ] Content ratings accurate (age rating, IDFA usage)
- [ ] App Tracking Transparency prompt implemented if collecting IDFA
- [ ] Privacy nutrition labels accurately reflect data collection
- [ ] Data deletion mechanism available if collecting user data

### TestFlight Beta Distribution

```bash
# Upload build to App Store Connect
# (via EAS, Xcode, or altool)

# Then in App Store Connect:
# 1. Select build under TestFlight tab
# 2. Add internal testers (up to 100, instant access)
# 3. Submit for external beta review (up to 10,000 testers)
# 4. Create public link (optional, up to 10,000 testers)
```

- [ ] Internal testing group configured (team members)
- [ ] External testing group configured (beta users)
- [ ] Beta app description and feedback email set
- [ ] Build submitted for external beta review (if using external testers)
- [ ] Crash reports and feedback monitored in TestFlight
- [ ] Expired builds replaced before 90-day TestFlight limit

---

## Google Play Deployment

### App Signing

```
Key Types:
├── Upload key        - Signs the AAB you upload (you keep this)
└── App signing key   - Google signs the final APK (Google keeps this)

Google Play App Signing (mandatory for new apps):
- You upload AAB signed with your upload key
- Google re-signs with the app signing key for distribution
- If you lose your upload key, you can reset it (app signing key stays)
```

- [ ] Google Play Developer account active ($25 one-time fee)
- [ ] App signing key enrolled in Google Play App Signing
- [ ] Upload key generated and securely stored
- [ ] Keystore file backed up in secure location (not in source control)
- [ ] Key alias, password, and store password documented securely

### Build Format

```bash
# Android App Bundle (AAB) - required for Play Store
# Smaller downloads via dynamic delivery

# Expo / EAS
eas build --platform android --profile production

# Gradle (native)
./gradlew bundleRelease

# Output: app/build/outputs/bundle/release/app-release.aab
```

- [ ] AAB format used (not APK) for Play Store submission
- [ ] ProGuard/R8 minification enabled for release builds
- [ ] Native debug symbols included (for crash symbolication)
- [ ] App size within acceptable limits (base APK < 150 MB)

### Store Listing

- [ ] App title (50 characters max)
- [ ] Short description (80 characters max)
- [ ] Full description (4000 characters max)
- [ ] Feature graphic (1024 x 500 PNG or JPEG)
- [ ] App icon (512 x 512 PNG, 32-bit with alpha)
- [ ] Phone screenshots (minimum 2, up to 8, 16:9 or 9:16)
- [ ] 7-inch tablet screenshots (if targeting tablets)
- [ ] 10-inch tablet screenshots (if targeting tablets)
- [ ] Privacy policy URL
- [ ] Category and tags selected

### Content Rating and Compliance

- [ ] Content rating questionnaire completed (IARC)
- [ ] Target audience and content declaration filled
- [ ] Data safety section completed (data collection, sharing, security)
- [ ] Ads declaration accurate (contains ads / does not contain ads)
- [ ] Government apps declaration (if applicable)
- [ ] Financial features declaration (if applicable)
- [ ] App access instructions provided for reviewers (if login required)

### Release Tracks

| Track              | Purpose                           | Audience              |
| ------------------ | --------------------------------- | --------------------- |
| Internal testing   | Quick iteration, no review needed | Up to 100 testers     |
| Closed testing     | Targeted beta with feedback       | Managed tester lists  |
| Open testing       | Public beta, anyone can join      | Unlimited testers     |
| Production         | Full release                      | All users             |

### Staged Rollouts

```
Recommended rollout percentages:
  1% → Monitor for 24 hours (crashes, ANRs, reviews)
  5% → Monitor for 24 hours
 25% → Monitor for 24-48 hours
 50% → Monitor for 24 hours
100% → Full release

Halt rollout immediately if:
- Crash rate exceeds 2%
- ANR rate exceeds 0.5%
- Significant negative reviews appear
- Critical bug discovered
```

- [ ] Staged rollout configured (start at 1-5%)
- [ ] Monitoring dashboard ready before rollout begins
- [ ] Rollback plan documented (halt rollout + previous version available)
- [ ] Crash-free rate threshold defined (target > 99%)
- [ ] ANR rate threshold defined (target < 0.2%)

---

## Shared Deployment Concerns

### Pre-Submission Checklist

- [ ] App tested on physical devices (not just simulators/emulators)
- [ ] All environments point to production APIs (not staging/dev)
- [ ] Debug logging disabled in release builds
- [ ] API keys are production keys (not development/test keys)
- [ ] Deep links and universal links configured and tested
- [ ] Push notifications working end-to-end
- [ ] Analytics events firing correctly
- [ ] Offline behavior tested and graceful
- [ ] App handles no-network state properly
- [ ] Permissions requested at appropriate times (not on launch)
- [ ] Background tasks do not drain battery excessively
- [ ] Memory leaks checked (especially on navigation)
- [ ] Minimum OS version set appropriately (iOS 16+, Android API 24+)

### OTA Updates (Expo / CodePush)

```bash
# Expo Updates (for Expo/React Native)
eas update --branch production --message "Fix login button alignment"

# Check current update channel
eas update:list

# Roll back to previous update
eas update:rollback --branch production
```

| Update Type    | OTA Eligible? | Requires Store Submission? |
| -------------- | ------------- | -------------------------- |
| JS bundle fix  | Yes           | No                         |
| Asset changes  | Yes           | No                         |
| Native module  | No            | Yes                        |
| SDK upgrade    | No            | Yes                        |
| Permission add | No            | Yes                        |

- [ ] OTA update channel configured (production, staging)
- [ ] Update policy defined (automatic, on-launch, or manual)
- [ ] Fallback to embedded bundle if update download fails
- [ ] Critical updates force immediate install
- [ ] Non-critical updates install on next launch
- [ ] OTA update size monitored (warn if > 5 MB)

### Crash Monitoring

```
Recommended tools:
├── Sentry         - Cross-platform, source maps, breadcrumbs
├── Firebase Crashlytics - Free, Google ecosystem integration
├── Bugsnag        - Stability scoring, release tracking
└── Expo Updates   - Built-in crash detection for managed workflow
```

- [ ] Crash reporting SDK integrated and initialized
- [ ] Source maps / dSYMs uploaded for symbolicated stack traces
- [ ] Release version tagged in crash reporting tool
- [ ] Alert thresholds set (crash-free rate < 99.5%)
- [ ] Crash reports reviewed within 24 hours of release
- [ ] Top crash grouped and prioritized for next release

### Analytics Setup

- [ ] Analytics SDK initialized (Firebase Analytics, Amplitude, Mixpanel)
- [ ] Core events tracked:
  - [ ] `app_open` / session start
  - [ ] `sign_up` / `login`
  - [ ] Key feature usage events
  - [ ] `purchase` / conversion events (if applicable)
  - [ ] `error` events for user-facing failures
- [ ] User properties set (platform, app version, user tier)
- [ ] Retention tracking configured (D1, D7, D30)
- [ ] Funnel analysis set up for critical user flows
- [ ] Real-time dashboard for launch day monitoring

### Performance Monitoring

| Metric               | iOS Target      | Android Target   |
| -------------------- | --------------- | ---------------- |
| Cold start time      | < 2 seconds     | < 3 seconds      |
| Time to interactive  | < 3 seconds     | < 4 seconds      |
| Frame rate           | 60 fps          | 60 fps           |
| JS bundle size       | < 5 MB          | < 5 MB           |
| App binary size      | < 50 MB         | < 30 MB (base)   |
| Memory usage         | < 200 MB        | < 150 MB         |

- [ ] Startup time profiled and within targets
- [ ] Frame drops identified and fixed (use Perf Monitor)
- [ ] Bundle size analyzed (Metro bundle visualizer, Android size analyzer)
- [ ] Large assets compressed or loaded lazily
- [ ] Network requests profiled (no waterfall blocking on launch)

---

## Post-Submission Monitoring

### First 48 Hours After Release

- [ ] Crash-free rate monitored (target > 99.5%)
- [ ] ANR rate monitored (Android, target < 0.2%)
- [ ] User reviews monitored for new issues
- [ ] Analytics dashboards checked for anomalies
- [ ] Key conversion funnels verified working
- [ ] Push notification delivery rates normal
- [ ] API error rates stable (no spike from new app version)
- [ ] OTA update mechanism verified (if applicable)

### Ongoing Monitoring

- [ ] Weekly crash report review
- [ ] Monthly performance review (startup time, frame rate)
- [ ] Quarterly dependency audit (security vulnerabilities)
- [ ] Store listing A/B tests (screenshots, descriptions)
- [ ] User review sentiment tracking
- [ ] Competitor app feature tracking

---

## CI/CD Pipeline for Mobile

### GitHub Actions Example

```yaml
# .github/workflows/mobile-deploy.yml
name: Mobile Deploy

on:
  push:
    tags:
      - "v*"

jobs:
  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform ios --profile production --non-interactive

  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform android --profile production --non-interactive
```

- [ ] CI pipeline builds both platforms on tag push
- [ ] Secrets stored securely (not in repo)
- [ ] Build artifacts archived
- [ ] Automated submission configured (optional, via `eas submit`)
- [ ] Build notifications sent to team (Slack, email)

---

## Related Skills

| Skill                             | When to Use                     |
| --------------------------------- | ------------------------------- |
| `generic-react-feature-developer` | React Native feature work       |
| `test-specialist`                 | Mobile testing strategy         |
| `security`                        | Mobile security hardening       |
| `tech-debt-analyzer`              | Mobile app code quality         |

### Invoke with:

```
Skill(generic-react-feature-developer)
Skill(test-specialist)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/stacks/react-native-expo.md` - React Native patterns
- `~/.claude/docs/reference/stacks/flutter-dart.md` - Flutter patterns
- `~/.claude/docs/reference/workflows/deployment-cicd.md` - General CI/CD patterns
- `~/.claude/docs/reference/checklists/security-hardening.md` - Security checklist

---

## Anti-Patterns

- [ ] Submitting with debug/staging API endpoints
- [ ] Forgetting to increment build number (store rejects duplicate)
- [ ] Skipping staged rollout (100% on day one)
- [ ] No crash monitoring in place before release
- [ ] Hardcoded secrets in the app bundle (use runtime config)
- [ ] Testing only on simulators, never on physical devices
- [ ] Ignoring store review guidelines until rejection
- [ ] No rollback plan if critical issues surface post-release
- [ ] Uploading APK instead of AAB to Google Play
- [ ] Missing privacy policy (both stores require it)
- [ ] Not uploading debug symbols/source maps (unreadable crash reports)
- [ ] Releasing on Friday without on-call coverage

---

_Mobile deployment is a multi-step process with platform-specific requirements. Automate what you can, check what you cannot._
