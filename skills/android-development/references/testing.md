# android-development: Testing

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing

### Unit Tests

```kotlin
@Test
fun `getItems returns mapped domain objects`() = runTest {
    val repository = ItemRepositoryImpl(
        apiService = FakeApiService(),
        itemDao = FakeItemDao()
    )

    val items = repository.getItems().first()

    assertEquals(2, items.size)
    assertEquals("Item 1", items[0].name)
}
```

### Compose UI Tests

```kotlin
@HiltAndroidTest
class MainScreenTest {
    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun displayItems_whenLoaded() {
        composeTestRule.onNodeWithText("Item 1").assertIsDisplayed()
        composeTestRule.onNodeWithText("Item 2").assertIsDisplayed()
    }

    @Test
    fun navigateToDetail_onItemClick() {
        composeTestRule.onNodeWithText("Item 1").performClick()
        composeTestRule.onNodeWithText("Item Details").assertIsDisplayed()
    }
}
```

---
