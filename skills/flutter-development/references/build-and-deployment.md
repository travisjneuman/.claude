# flutter-development: Build and Deployment

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Build and Deployment

### Fastlane

```ruby
# fastlane/Fastfile
platform :ios do
  lane :beta do
    build_flutter_app
    upload_to_testflight
  end
end

platform :android do
  lane :beta do
    build_flutter_app
    upload_to_play_store(track: 'internal')
  end
end
```

### Codemagic CI/CD

```yaml
# codemagic.yaml
workflows:
  flutter-release:
    name: Flutter Release
    environment:
      flutter: stable
    scripts:
      - name: Build
        script: flutter build appbundle --release
    artifacts:
      - build/**/outputs/**/*.aab
    publishing:
      google_play:
        credentials: $GCLOUD_SERVICE_ACCOUNT
        track: internal
```

### EAS Build (for Expo/RN comparison reference)

Flutter apps typically use Fastlane, Codemagic, or GitHub Actions for CI/CD rather than EAS.
