# Networking

URLSession patterns for API calls, authentication, caching, and offline support.

<basic_requests>
<async_await>
```swift
actor NetworkService {
    private let session: URLSession
    private let decoder: JSONDecoder

    init(session: URLSession = .shared) {
        self.session = session
        self.decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
    }

    func fetch<T: Decodable>(_ request: URLRequest) async throws -> T {
        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.invalidResponse
        }

        guard 200..<300 ~= httpResponse.statusCode else {
            throw NetworkError.httpError(httpResponse.statusCode, data)
        }

        return try decoder.decode(T.self, from: data)
    }

    func fetchData(_ request: URLRequest) async throws -> Data {
        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              200..<300 ~= httpResponse.statusCode else {
            throw NetworkError.requestFailed
        }

        return data
    }
}

enum NetworkError: Error {
    case invalidResponse
    case httpError(Int, Data)
    case requestFailed
    case decodingError(Error)
}
```
</async_await>

<request_building>
```swift
struct Endpoint {
    let path: String
    let method: HTTPMethod
    let queryItems: [URLQueryItem]?
    let body: Data?
    let headers: [String: String]?

    enum HTTPMethod: String {
        case get = "GET"
        case post = "POST"
        case put = "PUT"
        case patch = "PATCH"
        case delete = "DELETE"
    }

    var request: URLRequest {
        var components = URLComponents()
        components.scheme = "https"
        components.host = "api.example.com"
        components.path = path
        components.queryItems = queryItems

        var request = URLRequest(url: components.url!)
        request.httpMethod = method.rawValue
        request.httpBody = body

        // Default headers
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        // Custom headers
        headers?.forEach { request.setValue($1, forHTTPHeaderField: $0) }

        return request
    }
}

// Usage
extension Endpoint {
    static func projects() -> Endpoint {
        Endpoint(path: "/v1/projects", method: .get, queryItems: nil, body: nil, headers: nil)
    }

    static func project(id: UUID) -> Endpoint {
        Endpoint(path: "/v1/projects/\(id)", method: .get, queryItems: nil, body: nil, headers: nil)
    }

    static func createProject(_ project: CreateProjectRequest) -> Endpoint {
        let body = try? JSONEncoder().encode(project)
        return Endpoint(path: "/v1/projects", method: .post, queryItems: nil, body: body, headers: nil)
    }
}
```
</request_building>
</basic_requests>

<authentication>
<bearer_token>
```swift
actor AuthenticatedNetworkService {
    private let session: URLSession
    private var token: String?

    init() {
        let config = URLSessionConfiguration.default
        config.httpAdditionalHeaders = [
            "User-Agent": "MyApp/1.0"
        ]
        self.session = URLSession(configuration: config)
    }

    func setToken(_ token: String) {
        self.token = token
    }

    func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        var request = endpoint.request

        if let token = token {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.invalidResponse
        }

        if httpResponse.statusCode == 401 {
            throw NetworkError.unauthorized
        }

        guard 200..<300 ~= httpResponse.statusCode else {
            throw NetworkError.httpError(httpResponse.statusCode, data)
        }

        return try JSONDecoder().decode(T.self, from: data)
    }
}
```
</bearer_token>

<oauth_refresh>
```swift
actor OAuthService {
    private var accessToken: String?
    private var refreshToken: String?
    private var tokenExpiry: Date?
    private var isRefreshing = false

    func validToken() async throws -> String {
        // Return existing valid token
        if let token = accessToken,
           let expiry = tokenExpiry,
           expiry > Date().addingTimeInterval(60) {
            return token
        }

        // Refresh if needed
        return try await refreshAccessToken()
    }

    private func refreshAccessToken() async throws -> String {
        guard !isRefreshing else {
            // Wait for in-progress refresh
            try await Task.sleep(for: .milliseconds(100))
            return try await validToken()
        }

        isRefreshing = true
        defer { isRefreshing = false }

        guard let refresh = refreshToken else {
            throw AuthError.noRefreshToken
        }

        let request = Endpoint.refreshToken(refresh).request
        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(TokenResponse.self, from: data)

        accessToken = response.accessToken
        refreshToken = response.refreshToken
        tokenExpiry = Date().addingTimeInterval(TimeInterval(response.expiresIn))

        // Save to keychain
        try saveTokens()

        return response.accessToken
    }
}
```
</oauth_refresh>
</authentication>

<caching>
<urlcache>
```swift
// Configure cache in URLSession
let config = URLSessionConfiguration.default
config.urlCache = URLCache(
    memoryCapacity: 50 * 1024 * 1024,  // 50 MB memory
    diskCapacity: 100 * 1024 * 1024,   // 100 MB disk
    diskPath: "network_cache"
)
config.requestCachePolicy = .returnCacheDataElseLoad

let session = URLSession(configuration: config)
```
</urlcache>

<custom_cache>
```swift
actor ResponseCache {
    private var cache: [String: CachedResponse] = [:]
    private let maxAge: TimeInterval

    init(maxAge: TimeInterval = 300) {  // 5 minutes default
        self.maxAge = maxAge
    }

    func get<T: Decodable>(_ key: String) -> T? {
        guard let cached = cache[key],
              Date().timeIntervalSince(cached.timestamp) < maxAge else {
            cache[key] = nil
            return nil
        }

        return try? JSONDecoder().decode(T.self, from: cached.data)
    }

    func set<T: Encodable>(_ value: T, for key: String) {
        guard let data = try? JSONEncoder().encode(value) else { return }
        cache[key] = CachedResponse(data: data, timestamp: Date())
    }

    func invalidate(_ key: String) {
        cache[key] = nil
    }

    func clear() {
        cache.removeAll()
    }
}

struct CachedResponse {
    let data: Data
    let timestamp: Date
}

// Usage
actor CachedNetworkService {
    private let network: NetworkService
    private let cache = ResponseCache()

    func fetchProjects(forceRefresh: Bool = false) async throws -> [Project] {
        let cacheKey = "projects"

        if !forceRefresh, let cached: [Project] = await cache.get(cacheKey) {
            return cached
        }

        let projects: [Project] = try await network.fetch(Endpoint.projects().request)
        await cache.set(projects, for: cacheKey)

        return projects
    }
}
```
</custom_cache>
</caching>

<offline_support>
```swift
@Observable
class OfflineAwareService {
    private let network: NetworkService
    private let storage: LocalStorage
    var isOnline = true

    init(network: NetworkService, storage: LocalStorage) {
        self.network = network
        self.storage = storage
        monitorConnectivity()
    }

    func fetchProjects() async throws -> [Project] {
        if isOnline {
            do {
                let projects = try await network.fetch(Endpoint.projects().request)
                try storage.save(projects, for: "projects")
                return projects
            } catch {
                // Fall back to cache on network error
                if let cached = try? storage.load("projects") as [Project] {
                    return cached
                }
                throw error
            }
        } else {
            // Offline: use cache
            guard let cached = try? storage.load("projects") as [Project] else {
                throw NetworkError.offline
            }
            return cached
        }
    }

    private func monitorConnectivity() {
        let monitor = NWPathMonitor()
        monitor.pathUpdateHandler = { [weak self] path in
            Task { @MainActor in
                self?.isOnline = path.status == .satisfied
            }
        }
        monitor.start(queue: .global())
    }
}
```
</offline_support>

<upload_download>
<file_upload>
```swift
actor UploadService {
    func upload(file: URL, to endpoint: Endpoint) async throws -> UploadResponse {
        var request = endpoint.request

        let boundary = UUID().uuidString
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

        let data = try Data(contentsOf: file)
        let body = createMultipartBody(
            data: data,
            filename: file.lastPathComponent,
            boundary: boundary
        )
        request.httpBody = body

        let (responseData, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(UploadResponse.self, from: responseData)
    }

    private func createMultipartBody(data: Data, filename: String, boundary: String) -> Data {
        var body = Data()

        body.append("--\(boundary)\r\n".data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\"file\"; filename=\"\(filename)\"\r\n".data(using: .utf8)!)
        body.append("Content-Type: application/octet-stream\r\n\r\n".data(using: .utf8)!)
        body.append(data)
        body.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)

        return body
    }
}
```
</file_upload>

<file_download>
```swift
actor DownloadService {
    func download(from url: URL, to destination: URL) async throws {
        let (tempURL, response) = try await URLSession.shared.download(from: url)

        guard let httpResponse = response as? HTTPURLResponse,
              200..<300 ~= httpResponse.statusCode else {
            throw NetworkError.downloadFailed
        }

        // Move to destination
        let fileManager = FileManager.default
        if fileManager.fileExists(atPath: destination.path) {
            try fileManager.removeItem(at: destination)
        }
        try fileManager.moveItem(at: tempURL, to: destination)
    }

    func downloadWithProgress(from url: URL) -> AsyncThrowingStream<DownloadProgress, Error> {
        AsyncThrowingStream { continuation in
            let task = URLSession.shared.downloadTask(with: url) { tempURL, response, error in
                if let error = error {
                    continuation.finish(throwing: error)
                    return
                }

                guard let tempURL = tempURL else {
                    continuation.finish(throwing: NetworkError.downloadFailed)
                    return
                }

                continuation.yield(.completed(tempURL))
                continuation.finish()
            }

            // Observe progress
            let observation = task.progress.observe(\.fractionCompleted) { progress, _ in
                continuation.yield(.progress(progress.fractionCompleted))
            }

            continuation.onTermination = { _ in
                observation.invalidate()
                task.cancel()
            }

            task.resume()
        }
    }
}

enum DownloadProgress {
    case progress(Double)
    case completed(URL)
}
```
</file_download>
</upload_download>

<error_handling>
```swift
enum NetworkError: LocalizedError {
    case invalidResponse
    case httpError(Int, Data)
    case unauthorized
    case offline
    case timeout
    case decodingError(Error)

    var errorDescription: String? {
        switch self {
        case .invalidResponse:
            return "Invalid server response"
        case .httpError(let code, _):
            return "Server error: \(code)"
        case .unauthorized:
            return "Authentication required"
        case .offline:
            return "No internet connection"
        case .timeout:
            return "Request timed out"
        case .decodingError(let error):
            return "Data error: \(error.localizedDescription)"
        }
    }

    var isRetryable: Bool {
        switch self {
        case .httpError(let code, _):
            return code >= 500
        case .timeout, .offline:
            return true
        default:
            return false
        }
    }
}

// Retry logic
func fetchWithRetry<T: Decodable>(
    _ request: URLRequest,
    maxAttempts: Int = 3
) async throws -> T {
    var lastError: Error?

    for attempt in 1...maxAttempts {
        do {
            return try await network.fetch(request)
        } catch let error as NetworkError where error.isRetryable {
            lastError = error
            let delay = pow(2.0, Double(attempt - 1))  // Exponential backoff
            try await Task.sleep(for: .seconds(delay))
        } catch {
            throw error
        }
    }

    throw lastError ?? NetworkError.requestFailed
}
```
</error_handling>

<testing>
```swift
// Mock URLProtocol for testing
class MockURLProtocol: URLProtocol {
    static var requestHandler: ((URLRequest) throws -> (HTTPURLResponse, Data))?

    override class func canInit(with request: URLRequest) -> Bool {
        true
    }

    override class func canonicalRequest(for request: URLRequest) -> URLRequest {
        request
    }

    override func startLoading() {
        guard let handler = MockURLProtocol.requestHandler else {
            fatalError("Handler not set")
        }

        do {
            let (response, data) = try handler(request)
            client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .notAllowed)
            client?.urlProtocol(self, didLoad: data)
            client?.urlProtocolDidFinishLoading(self)
        } catch {
            client?.urlProtocol(self, didFailWithError: error)
        }
    }

    override func stopLoading() {}
}

// Test setup
func testFetchProjects() async throws {
    let config = URLSessionConfiguration.ephemeral
    config.protocolClasses = [MockURLProtocol.self]
    let session = URLSession(configuration: config)

    MockURLProtocol.requestHandler = { request in
        let response = HTTPURLResponse(
            url: request.url!,
            statusCode: 200,
            httpVersion: nil,
            headerFields: nil
        )!
        let data = try JSONEncoder().encode([Project(name: "Test")])
        return (response, data)
    }

    let service = NetworkService(session: session)
    let projects: [Project] = try await service.fetch(Endpoint.projects().request)

    XCTAssertEqual(projects.count, 1)
}
```
</testing>
