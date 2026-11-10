# android-development: Platform-Specific

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Platform-Specific

### Android TV

```kotlin
// Focus management
@Composable
fun TvButton(
    onClick: () -> Unit,
    content: @Composable () -> Unit
) {
    var isFocused by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .onFocusChanged { isFocused = it.isFocused }
            .focusable()
            .clickable(onClick = onClick)
            .background(
                if (isFocused) MaterialTheme.colorScheme.primary
                else MaterialTheme.colorScheme.surface
            )
    ) {
        content()
    }
}
```

### Wear OS

```kotlin
@Composable
fun WearApp() {
    MaterialTheme {
        ScalingLazyColumn(
            modifier = Modifier.fillMaxSize(),
            anchorType = ScalingLazyListAnchorType.ItemCenter
        ) {
            item { TimeText() }
            item {
                Chip(
                    onClick = { },
                    label = { Text("Action") }
                )
            }
        }
    }
}
```

---
