# android-development: Data Layer

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Data Layer

### Room Database

```kotlin
@Entity(tableName = "items")
data class ItemEntity(
    @PrimaryKey val id: String,
    val name: String,
    val createdAt: Long
)

@Dao
interface ItemDao {
    @Query("SELECT * FROM items ORDER BY createdAt DESC")
    fun getItems(): Flow<List<ItemEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItems(items: List<ItemEntity>)

    @Delete
    suspend fun deleteItem(item: ItemEntity)
}

@Database(entities = [ItemEntity::class], version = 1)
abstract class AppDatabase : RoomDatabase() {
    abstract fun itemDao(): ItemDao
}
```

### Retrofit API

```kotlin
interface ApiService {
    @GET("items")
    suspend fun getItems(): List<ItemDto>

    @POST("items")
    suspend fun createItem(@Body item: CreateItemRequest): ItemDto

    @DELETE("items/{id}")
    suspend fun deleteItem(@Path("id") id: String)
}

data class ItemDto(
    val id: String,
    val name: String,
    @SerializedName("created_at") val createdAt: String
)
```

### Repository Pattern

```kotlin
interface ItemRepository {
    fun getItems(): Flow<List<Item>>
    suspend fun refreshItems()
    suspend fun deleteItem(id: String)
}

class ItemRepositoryImpl @Inject constructor(
    private val apiService: ApiService,
    private val itemDao: ItemDao
) : ItemRepository {

    override fun getItems(): Flow<List<Item>> {
        return itemDao.getItems().map { entities ->
            entities.map { it.toDomain() }
        }
    }

    override suspend fun refreshItems() {
        val items = apiService.getItems()
        itemDao.insertItems(items.map { it.toEntity() })
    }
}
```

---
