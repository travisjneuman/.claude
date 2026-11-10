# android-development: Modern Android Architecture

Part of the `android-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Modern Android Architecture

### Clean Architecture Layers

```
app/
├── data/
│   ├── local/
│   │   ├── AppDatabase.kt
│   │   └── ItemDao.kt
│   ├── remote/
│   │   ├── ApiService.kt
│   │   └── ItemDto.kt
│   └── repository/
│       └── ItemRepositoryImpl.kt
├── domain/
│   ├── model/
│   │   └── Item.kt
│   ├── repository/
│   │   └── ItemRepository.kt
│   └── usecase/
│       └── GetItemsUseCase.kt
├── presentation/
│   ├── home/
│   │   ├── HomeScreen.kt
│   │   └── HomeViewModel.kt
│   └── navigation/
│       └── AppNavigation.kt
└── di/
    └── AppModule.kt
```

### Dependency Injection (Hilt)

```kotlin
@HiltAndroidApp
class MyApplication : Application()

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "app_database"
        ).build()
    }

    @Provides
    @Singleton
    fun provideApiService(): ApiService {
        return Retrofit.Builder()
            .baseUrl("https://api.example.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideItemRepository(
        apiService: ApiService,
        database: AppDatabase
    ): ItemRepository {
        return ItemRepositoryImpl(apiService, database.itemDao())
    }
}
```

---
