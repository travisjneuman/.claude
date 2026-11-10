# android-development: Kotlin Multiplatform (KMP) / Compose Multiplatform (CMP)

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Kotlin Multiplatform (KMP) / Compose Multiplatform (CMP)

### Shared Business Logic with KMP

```kotlin
// shared/src/commonMain/kotlin/UserRepository.kt
expect class PlatformContext

class UserRepository(private val api: ApiService, private val db: Database) {
    suspend fun getUsers(): List<User> {
        return try {
            val remote = api.fetchUsers()
            db.saveUsers(remote)
            remote
        } catch (e: Exception) {
            db.getCachedUsers()
        }
    }
}

// shared/src/androidMain/kotlin/PlatformContext.kt
actual class PlatformContext(val context: Context)

// shared/src/iosMain/kotlin/PlatformContext.kt
actual class PlatformContext
```

### Compose Multiplatform (Shared UI)

```kotlin
// shared/src/commonMain/kotlin/App.kt
@Composable
fun App() {
    MaterialTheme {
        var users by remember { mutableStateOf<List<User>>(emptyList()) }
        val repository = remember { UserRepository() }

        LaunchedEffect(Unit) {
            users = repository.getUsers()
        }

        LazyColumn {
            items(users) { user ->
                UserCard(user)
            }
        }
    }
}

// Runs natively on Android, iOS, Desktop, and Web
```

### KMP Project Structure

```
project/
├── shared/
│   └── src/
│       ├── commonMain/     # Shared Kotlin code
│       ├── androidMain/    # Android-specific
│       ├── iosMain/        # iOS-specific
│       └── desktopMain/    # Desktop-specific
├── androidApp/             # Android entry point
├── iosApp/                 # iOS entry point (Swift/SwiftUI)
└── desktopApp/             # Desktop entry point
```

---
