# flutter-development: Networking

Part of the `flutter-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Networking

### Dio HTTP Client

```dart
class ApiService {
  final Dio _dio;

  ApiService() : _dio = Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  )) {
    _dio.interceptors.add(LogInterceptor());
  }

  Future<List<Item>> getItems() async {
    try {
      final response = await _dio.get('/items');
      return (response.data as List)
          .map((json) => Item.fromJson(json))
          .toList();
    } on DioException catch (e) {
      throw ApiException(e.message ?? 'Unknown error');
    }
  }
}
```

---
