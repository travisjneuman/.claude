# ios-development: Networking

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Networking

### URLSession

```swift
actor NetworkService {
    func fetch<T: Decodable>(_ type: T.Type, from url: URL) async throws -> T {
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }

        return try JSONDecoder().decode(T.self, from: data)
    }
}
```

---
