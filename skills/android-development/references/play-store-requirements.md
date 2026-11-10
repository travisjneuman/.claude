# android-development: Play Store Requirements

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Play Store Requirements

### Required

- Privacy policy
- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots (min 2)
- Target API 34+

### App Bundle

```groovy
android {
    bundle {
        language {
            enableSplit = true
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}
```

---
