# android-development: Navigation 3 (Type-Safe Navigation)

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Navigation 3 (Type-Safe Navigation)

```kotlin
// Define routes as serializable data classes
@Serializable
data object Home

@Serializable
data class Detail(val itemId: String)

@Serializable
data class Settings(val section: String? = null)

// Navigation setup
@Composable
fun AppNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController = navController, startDestination = Home) {
        composable<Home> {
            HomeScreen(onItemClick = { id ->
                navController.navigate(Detail(itemId = id))
            })
        }
        composable<Detail> { backStackEntry ->
            val detail: Detail = backStackEntry.toRoute()
            DetailScreen(itemId = detail.itemId)
        }
        composable<Settings> { backStackEntry ->
            val settings: Settings = backStackEntry.toRoute()
            SettingsScreen(section = settings.section)
        }
    }
}
```

---
