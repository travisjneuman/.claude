# Concurrency Patterns

Modern Swift concurrency for responsive, safe macOS apps.

<async_await_basics>
<simple_async>
```swift
// Basic async function
func fetchData() async throws -> [Item] {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([Item].self, from: data)
}

// Call from view
struct ContentView: View {
    @State private var items: [Item] = []

    var body: some View {
        List(items) { item in
            Text(item.name)
        }
        .task {
            do {
                items = try await fetchData()
            } catch {
                // Handle error
            }
        }
    }
}
```
</simple_async>

<task_modifier>
```swift
struct ItemListView: View {
    @State private var items: [Item] = []
    let category: Category

    var body: some View {
        List(items) { item in
            Text(item.name)
        }
        // .task runs when view appears, cancels when disappears
        .task {
            await loadItems()
        }
        // .task(id:) re-runs when id changes
        .task(id: category) {
            await loadItems(for: category)
        }
    }

    func loadItems(for category: Category? = nil) async {
        // Automatically cancelled if view disappears
        items = await dataService.fetchItems(category: category)
    }
}
```
</task_modifier>
</async_await_basics>

<actors>
<basic_actor>
```swift
// Actor for thread-safe state
actor DataCache {
    private var cache: [String: Data] = [:]

    func get(_ key: String) -> Data? {
        cache[key]
    }

    func set(_ key: String, data: Data) {
        cache[key] = data
    }

    func clear() {
        cache.removeAll()
    }
}

// Usage (must await)
let cache = DataCache()
await cache.set("key", data: data)
let cached = await cache.get("key")
```
</basic_actor>

<service_actor>
```swift
actor NetworkService {
    private let session: URLSession
    private var pendingRequests: [URL: Task<Data, Error>] = [:]

    init(session: URLSession = .shared) {
        self.session = session
    }

    func fetch(_ url: URL) async throws -> Data {
        // Deduplicate concurrent requests for same URL
        if let existing = pendingRequests[url] {
            return try await existing.value
        }

        let task = Task {
            let (data, _) = try await session.data(from: url)
            return data
        }

        pendingRequests[url] = task

        defer {
            pendingRequests[url] = nil
        }

        return try await task.value
    }
}
```
</service_actor>

<nonisolated>
```swift
actor ImageProcessor {
    private var processedCount = 0

    // Synchronous access for non-isolated properties
    nonisolated let maxConcurrent = 4

    // Computed property that doesn't need isolation
    nonisolated var identifier: String {
        "ImageProcessor-\(ObjectIdentifier(self))"
    }

    func process(_ image: NSImage) async -> NSImage {
        processedCount += 1
        // Process image...
        return processedImage
    }

    func getCount() -> Int {
        processedCount
    }
}
```
</nonisolated>
</actors>

<main_actor>
<ui_updates>
```swift
// Mark entire class as @MainActor
@MainActor
@Observable
class AppState {
    var items: [Item] = []
    var isLoading = false
    var error: AppError?

    func loadItems() async {
        isLoading = true
        defer { isLoading = false }

        do {
            // This call might be on background, result delivered on main
            items = try await dataService.fetchAll()
        } catch {
            self.error = .loadFailed(error)
        }
    }
}

// Or mark specific functions
class DataProcessor {
    @MainActor
    func updateUI(with result: ProcessResult) {
        // Safe to update UI here
    }

    func processInBackground() async -> ProcessResult {
        // Heavy work here
        let result = await heavyComputation()

        // Update UI on main actor
        await updateUI(with: result)

        return result
    }
}
```
</ui_updates>

<main_actor_dispatch>
```swift
// From async context
await MainActor.run {
    self.items = newItems
}

// Assume main actor (when you know you're on main)
MainActor.assumeIsolated {
    self.tableView.reloadData()
}

// Task on main actor
Task { @MainActor in
    self.progress = 0.5
}
```
</main_actor_dispatch>
</main_actor>

<structured_concurrency>
<task_groups>
```swift
// Parallel execution with results
func loadAllCategories() async throws -> [Category: [Item]] {
    let categories = try await fetchCategories()

    return try await withThrowingTaskGroup(of: (Category, [Item]).self) { group in
        for category in categories {
            group.addTask {
                let items = try await self.fetchItems(for: category)
                return (category, items)
            }
        }

        var results: [Category: [Item]] = [:]
        for try await (category, items) in group {
            results[category] = items
        }
        return results
    }
}
```
</task_groups>

<limited_concurrency>
```swift
// Process with limited parallelism
func processImages(_ urls: [URL], maxConcurrent: Int = 4) async throws -> [ProcessedImage] {
    var results: [ProcessedImage] = []

    try await withThrowingTaskGroup(of: ProcessedImage.self) { group in
        var iterator = urls.makeIterator()

        // Start initial batch
        for _ in 0..<min(maxConcurrent, urls.count) {
            if let url = iterator.next() {
                group.addTask {
                    try await self.processImage(at: url)
                }
            }
        }

        // As each completes, add another
        for try await result in group {
            results.append(result)

            if let url = iterator.next() {
                group.addTask {
                    try await self.processImage(at: url)
                }
            }
        }
    }

    return results
}
```
</limited_concurrency>

<async_let>
```swift
// Concurrent bindings
func loadDashboard() async throws -> Dashboard {
    async let user = fetchUser()
    async let projects = fetchProjects()
    async let notifications = fetchNotifications()

    // All three run concurrently, await results together
    return try await Dashboard(
        user: user,
        projects: projects,
        notifications: notifications
    )
}
```
</async_let>
</structured_concurrency>

<async_sequences>
<for_await>
```swift
// Iterate async sequence
func monitorChanges() async {
    for await change in fileMonitor.changes {
        await processChange(change)
    }
}

// With notifications
func observeNotifications() async {
    let notifications = NotificationCenter.default.notifications(named: .dataChanged)

    for await notification in notifications {
        guard !Task.isCancelled else { break }
        await handleNotification(notification)
    }
}
```
</for_await>

<custom_async_sequence>
```swift
struct CountdownSequence: AsyncSequence {
    typealias Element = Int
    let start: Int

    struct AsyncIterator: AsyncIteratorProtocol {
        var current: Int

        mutating func next() async -> Int? {
            guard current > 0 else { return nil }
            try? await Task.sleep(for: .seconds(1))
            defer { current -= 1 }
            return current
        }
    }

    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator(current: start)
    }
}

// Usage
for await count in CountdownSequence(start: 10) {
    print(count)
}
```
</custom_async_sequence>

<async_stream>
```swift
// Bridge callback-based API
func fileChanges(at path: String) -> AsyncStream<FileChange> {
    AsyncStream { continuation in
        let monitor = FileMonitor(path: path) { change in
            continuation.yield(change)
        }

        monitor.start()

        continuation.onTermination = { _ in
            monitor.stop()
        }
    }
}

// Throwing version
func networkEvents() -> AsyncThrowingStream<NetworkEvent, Error> {
    AsyncThrowingStream { continuation in
        let connection = NetworkConnection()

        connection.onEvent = { event in
            continuation.yield(event)
        }

        connection.onError = { error in
            continuation.finish(throwing: error)
        }

        connection.onComplete = {
            continuation.finish()
        }

        connection.start()

        continuation.onTermination = { _ in
            connection.cancel()
        }
    }
}
```
</async_stream>
</async_sequences>

<cancellation>
<checking_cancellation>
```swift
func processLargeDataset(_ items: [Item]) async throws -> [Result] {
    var results: [Result] = []

    for item in items {
        // Check for cancellation
        try Task.checkCancellation()

        // Or check without throwing
        if Task.isCancelled {
            break
        }

        let result = await process(item)
        results.append(result)
    }

    return results
}
```
</checking_cancellation>

<cancellation_handlers>
```swift
func downloadFile(_ url: URL) async throws -> Data {
    let task = URLSession.shared.dataTask(with: url)

    return try await withTaskCancellationHandler {
        try await withCheckedThrowingContinuation { continuation in
            task.completionHandler = { data, _, error in
                if let error = error {
                    continuation.resume(throwing: error)
                } else if let data = data {
                    continuation.resume(returning: data)
                }
            }
            task.resume()
        }
    } onCancel: {
        task.cancel()
    }
}
```
</cancellation_handlers>

<task_cancellation>
```swift
class ViewModel {
    private var loadTask: Task<Void, Never>?

    func load() {
        // Cancel previous load
        loadTask?.cancel()

        loadTask = Task {
            await performLoad()
        }
    }

    func cancel() {
        loadTask?.cancel()
        loadTask = nil
    }

    deinit {
        loadTask?.cancel()
    }
}
```
</task_cancellation>
</cancellation>

<sendable>
<sendable_types>
```swift
// Value types are Sendable by default if all properties are Sendable
struct Item: Sendable {
    let id: UUID
    let name: String
    let count: Int
}

// Classes must be explicitly Sendable
final class ImmutableConfig: Sendable {
    let apiKey: String
    let baseURL: URL

    init(apiKey: String, baseURL: URL) {
        self.apiKey = apiKey
        self.baseURL = baseURL
    }
}

// Actors are automatically Sendable
actor Counter: Sendable {
    var count = 0
}

// Mark as @unchecked Sendable when you manage thread safety yourself
final class ThreadSafeCache: @unchecked Sendable {
    private let lock = NSLock()
    private var storage: [String: Data] = [:]

    func get(_ key: String) -> Data? {
        lock.lock()
        defer { lock.unlock() }
        return storage[key]
    }
}
```
</sendable_types>

<sending_closures>
```swift
// Closures that cross actor boundaries must be @Sendable
func processInBackground(work: @Sendable @escaping () async -> Void) {
    Task.detached {
        await work()
    }
}

// Capture only Sendable values
let items = items  // Must be Sendable
Task {
    await process(items)
}
```
</sending_closures>
</sendable>

<best_practices>
<do>
- Use `.task` modifier for view-related async work
- Use actors for shared mutable state
- Mark UI-updating code with `@MainActor`
- Check `Task.isCancelled` in long operations
- Use structured concurrency (task groups, async let) over unstructured
- Cancel tasks when no longer needed
</do>

<avoid>
- Creating detached tasks unnecessarily (loses structured concurrency benefits)
- Blocking actors with synchronous work
- Ignoring cancellation in long-running operations
- Passing non-Sendable types across actor boundaries
- Using `DispatchQueue` when async/await works
</avoid>
</best_practices>
