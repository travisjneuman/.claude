# android-development: API 35 (Android 15) Features

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## API 35 (Android 15) Features

| Feature                    | Description                                           |
| -------------------------- | ----------------------------------------------------- |
| **Edge-to-edge enforced**  | Apps must handle insets properly                       |
| **Predictive back**        | System back gesture with preview animations           |
| **Private Space**          | User-controlled hidden app profile                    |
| **Satellite connectivity** | SMS/MMS over satellite                                |
| **App archival**           | Auto-archive unused apps, preserve data               |
| **Health Connect**         | Updated health data APIs                              |

```kotlin
// Edge-to-edge (required on API 35+)
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    setContent {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            contentWindowInsets = ScaffoldDefaults.contentWindowInsets,
        ) { innerPadding ->
            MainContent(modifier = Modifier.padding(innerPadding))
        }
    }
}

// Predictive back with Compose
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(onBack: () -> Unit) {
    BackHandler(onBack = onBack)
    // Content renders with predictive back animation automatically
}
```

---
