# android-development: Baseline Profiles for Startup Performance

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Baseline Profiles for Startup Performance

```kotlin
// baselineprofile/build.gradle.kts
dependencies {
    implementation("androidx.benchmark:benchmark-macro-junit4:1.3.0")
}

// BaselineProfileGenerator.kt
@RunWith(AndroidJUnit4::class)
class BaselineProfileGenerator {
    @get:Rule
    val rule = BaselineProfileRule()

    @Test
    fun generateBaselineProfile() {
        rule.collect(packageName = "com.example.app") {
            // Critical user journey
            pressHome()
            startActivityAndWait()
            device.findObject(By.text("Login")).click()
            device.wait(Until.hasObject(By.text("Dashboard")), 5000)
        }
    }
}
```

```groovy
// app/build.gradle.kts
android {
    buildTypes {
        release {
            // Baseline profiles improve startup by 15-30%
            baselineProfile.automaticGenerationDuringBuild = true
        }
    }
}
```

---
