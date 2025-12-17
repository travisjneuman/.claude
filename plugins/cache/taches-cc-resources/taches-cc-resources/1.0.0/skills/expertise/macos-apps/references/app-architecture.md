<overview>
State management, dependency injection, and app structure patterns for macOS apps. Use @Observable for shared state, environment for dependency injection, and structured async/await patterns for concurrency.
</overview>

<recommended_structure>
```
MyApp/
├── App/
│   ├── MyApp.swift              # @main entry point
│   ├── AppState.swift           # App-wide observable state
│   └── AppCommands.swift        # Menu bar commands
├── Models/
│   ├── Item.swift               # Data models
│   └── ItemStore.swift          # Data access layer
├── Views/
│   ├── ContentView.swift        # Main view
│   ├── Sidebar/
│   │   └── SidebarView.swift
│   ├── Detail/
│   │   └── DetailView.swift
│   └── Settings/
│       └── SettingsView.swift
├── Services/
│   ├── NetworkService.swift     # API calls
│   ├── StorageService.swift     # Persistence
│   └── NotificationService.swift
├── Utilities/
│   └── Extensions.swift
└── Resources/
    └── Assets.xcassets
```
</recommended_structure>

<state_management>
<observable_pattern>
Use `@Observable` (macOS 14+) for shared state:

```swift
@Observable
class AppState {
    // Published properties - UI updates automatically
    var items: [Item] = []
    var selectedItemID: UUID?
    var isLoading = false
    var error: AppError?

    // Computed properties
    var selectedItem: Item? {
        items.first { $0.id == selectedItemID }
    }

    var hasSelection: Bool {
        selectedItemID != nil
    }

    // Actions
    func selectItem(_ id: UUID?) {
        selectedItemID = id
    }

    func addItem(_ item: Item) {
        items.append(item)
        selectedItemID = item.id
    }

    func deleteSelected() {
        guard let id = selectedItemID else { return }
        items.removeAll { $0.id == id }
        selectedItemID = nil
    }
}
```
</observable_pattern>

<environment_injection>
Inject state at app level:

```swift
@main
struct MyApp: App {
    @State private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(appState)
        }
    }
}

// Access in any view
struct SidebarView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        List(appState.items, id: \.id) { item in
            Text(item.name)
        }
    }
}
```
</environment_injection>

<bindable_for_mutations>
Use `@Bindable` for two-way bindings:

```swift
struct DetailView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        @Bindable var appState = appState

        if let item = appState.selectedItem {
            TextField("Name", text: Binding(
                get: { item.name },
                set: { newValue in
                    if let index = appState.items.firstIndex(where: { $0.id == item.id }) {
                        appState.items[index].name = newValue
                    }
                }
            ))
        }
    }
}

// Or for direct observable property binding
struct SettingsView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        @Bindable var appState = appState

        Toggle("Show Hidden", isOn: $appState.showHidden)
    }
}
```
</bindable_for_mutations>

<multiple_state_objects>
Split state by domain:

```swift
@Observable
class UIState {
    var sidebarWidth: CGFloat = 250
    var inspectorVisible = true
    var selectedTab: Tab = .library
}

@Observable
class DataState {
    var items: [Item] = []
    var isLoading = false
}

@Observable
class NetworkState {
    var isConnected = true
    var lastSync: Date?
}

@main
struct MyApp: App {
    @State private var uiState = UIState()
    @State private var dataState = DataState()
    @State private var networkState = NetworkState()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(uiState)
                .environment(dataState)
                .environment(networkState)
        }
    }
}
```
</multiple_state_objects>
</state_management>

<dependency_injection>
<environment_keys>
Define custom environment keys for services:

```swift
// Define protocol
protocol DataStoreProtocol {
    func fetchAll() async throws -> [Item]
    func save(_ item: Item) async throws
    func delete(_ id: UUID) async throws
}

// Live implementation
class LiveDataStore: DataStoreProtocol {
    func fetchAll() async throws -> [Item] {
        // Real implementation
    }
    // ...
}

// Environment key
struct DataStoreKey: EnvironmentKey {
    static let defaultValue: DataStoreProtocol = LiveDataStore()
}

extension EnvironmentValues {
    var dataStore: DataStoreProtocol {
        get { self[DataStoreKey.self] }
        set { self[DataStoreKey.self] = newValue }
    }
}

// Inject
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.dataStore, LiveDataStore())
        }
    }
}

// Use
struct ItemListView: View {
    @Environment(\.dataStore) private var dataStore
    @State private var items: [Item] = []

    var body: some View {
        List(items) { item in
            Text(item.name)
        }
        .task {
            items = try? await dataStore.fetchAll() ?? []
        }
    }
}
```
</environment_keys>

<testing_with_mocks>
```swift
// Mock for testing
class MockDataStore: DataStoreProtocol {
    var itemsToReturn: [Item] = []
    var shouldThrow = false

    func fetchAll() async throws -> [Item] {
        if shouldThrow { throw TestError.mockError }
        return itemsToReturn
    }
    // ...
}

// In preview or test
#Preview {
    let mockStore = MockDataStore()
    mockStore.itemsToReturn = [
        Item(name: "Test 1"),
        Item(name: "Test 2")
    ]

    return ItemListView()
        .environment(\.dataStore, mockStore)
}
```
</testing_with_mocks>

<service_container>
For apps with many services:

```swift
@Observable
class ServiceContainer {
    let dataStore: DataStoreProtocol
    let networkService: NetworkServiceProtocol
    let authService: AuthServiceProtocol

    init(
        dataStore: DataStoreProtocol = LiveDataStore(),
        networkService: NetworkServiceProtocol = LiveNetworkService(),
        authService: AuthServiceProtocol = LiveAuthService()
    ) {
        self.dataStore = dataStore
        self.networkService = networkService
        self.authService = authService
    }

    // Convenience for testing
    static func mock() -> ServiceContainer {
        ServiceContainer(
            dataStore: MockDataStore(),
            networkService: MockNetworkService(),
            authService: MockAuthService()
        )
    }
}

// Inject container
@main
struct MyApp: App {
    @State private var services = ServiceContainer()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(services)
        }
    }
}
```
</service_container>
</dependency_injection>

<app_lifecycle>
<app_delegate>
Use AppDelegate for lifecycle events:

```swift
@main
struct MyApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        // Setup logging, register defaults, etc.
        registerDefaults()
    }

    func applicationWillTerminate(_ notification: Notification) {
        // Cleanup, save state
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        // Return true for utility apps
        return false
    }

    func applicationDockMenu(_ sender: NSApplication) -> NSMenu? {
        // Custom dock menu
        return createDockMenu()
    }

    private func registerDefaults() {
        UserDefaults.standard.register(defaults: [
            "defaultName": "Untitled",
            "showWelcome": true
        ])
    }
}
```
</app_delegate>

<scene_phase>
React to app state changes:

```swift
struct ContentView: View {
    @Environment(\.scenePhase) private var scenePhase
    @Environment(AppState.self) private var appState

    var body: some View {
        MainContent()
            .onChange(of: scenePhase) { oldPhase, newPhase in
                switch newPhase {
                case .active:
                    // App became active
                    Task { await appState.refresh() }
                case .inactive:
                    // App going to background
                    appState.saveState()
                case .background:
                    // App in background
                    break
                @unknown default:
                    break
                }
            }
    }
}
```
</scene_phase>
</app_lifecycle>

<coordinator_pattern>
For complex navigation flows:

```swift
@Observable
class AppCoordinator {
    enum Route: Hashable {
        case home
        case detail(Item)
        case settings
        case onboarding
    }

    var path = NavigationPath()
    var sheet: Route?
    var alert: AlertState?

    func navigate(to route: Route) {
        path.append(route)
    }

    func present(_ route: Route) {
        sheet = route
    }

    func dismiss() {
        sheet = nil
    }

    func popToRoot() {
        path = NavigationPath()
    }

    func showError(_ error: Error) {
        alert = AlertState(
            title: "Error",
            message: error.localizedDescription
        )
    }
}

struct ContentView: View {
    @Environment(AppCoordinator.self) private var coordinator

    var body: some View {
        @Bindable var coordinator = coordinator

        NavigationStack(path: $coordinator.path) {
            HomeView()
                .navigationDestination(for: AppCoordinator.Route.self) { route in
                    switch route {
                    case .home:
                        HomeView()
                    case .detail(let item):
                        DetailView(item: item)
                    case .settings:
                        SettingsView()
                    case .onboarding:
                        OnboardingView()
                    }
                }
        }
        .sheet(item: $coordinator.sheet) { route in
            // Sheet content
        }
    }
}
```
</coordinator_pattern>

<error_handling>
<error_types>
Define domain-specific errors:

```swift
enum AppError: LocalizedError {
    case networkError(underlying: Error)
    case dataCorrupted
    case unauthorized
    case notFound(String)
    case validationFailed(String)

    var errorDescription: String? {
        switch self {
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .dataCorrupted:
            return "Data is corrupted and cannot be loaded"
        case .unauthorized:
            return "You are not authorized to perform this action"
        case .notFound(let item):
            return "\(item) not found"
        case .validationFailed(let message):
            return message
        }
    }

    var recoverySuggestion: String? {
        switch self {
        case .networkError:
            return "Check your internet connection and try again"
        case .dataCorrupted:
            return "Try restarting the app or contact support"
        case .unauthorized:
            return "Please sign in again"
        case .notFound:
            return nil
        case .validationFailed:
            return "Please correct the issue and try again"
        }
    }
}
```
</error_types>

<error_presentation>
Present errors to user:

```swift
struct ErrorAlert: ViewModifier {
    @Binding var error: AppError?

    func body(content: Content) -> some View {
        content
            .alert(
                "Error",
                isPresented: Binding(
                    get: { error != nil },
                    set: { if !$0 { error = nil } }
                ),
                presenting: error
            ) { _ in
                Button("OK", role: .cancel) {}
            } message: { error in
                VStack {
                    Text(error.localizedDescription)
                    if let recovery = error.recoverySuggestion {
                        Text(recovery)
                            .font(.caption)
                    }
                }
            }
    }
}

extension View {
    func errorAlert(_ error: Binding<AppError?>) -> some View {
        modifier(ErrorAlert(error: error))
    }
}

// Usage
struct ContentView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        @Bindable var appState = appState

        MainContent()
            .errorAlert($appState.error)
    }
}
```
</error_presentation>
</error_handling>

<async_patterns>
<task_management>
```swift
struct ItemListView: View {
    @Environment(AppState.self) private var appState
    @State private var loadTask: Task<Void, Never>?

    var body: some View {
        List(appState.items) { item in
            Text(item.name)
        }
        .task {
            await loadItems()
        }
        .refreshable {
            await loadItems()
        }
        .onDisappear {
            loadTask?.cancel()
        }
    }

    private func loadItems() async {
        loadTask?.cancel()
        loadTask = Task {
            await appState.loadItems()
        }
        await loadTask?.value
    }
}
```
</task_management>

<async_sequences>
```swift
@Observable
class NotificationListener {
    var notifications: [AppNotification] = []

    func startListening() async {
        for await notification in NotificationCenter.default.notifications(named: .dataChanged) {
            guard !Task.isCancelled else { break }

            if let userInfo = notification.userInfo,
               let appNotification = AppNotification(userInfo: userInfo) {
                await MainActor.run {
                    notifications.append(appNotification)
                }
            }
        }
    }
}
```
</async_sequences>
</async_patterns>

<best_practices>
<do>
- Use `@Observable` for shared state (macOS 14+)
- Inject dependencies through environment
- Keep views focused - they ARE the view model in SwiftUI
- Use protocols for testability
- Handle errors at appropriate levels
- Cancel tasks when views disappear
</do>

<avoid>
- Massive centralized state objects
- Passing state through init parameters (use environment)
- Business logic in views (use services)
- Ignoring task cancellation
- Retaining strong references to self in async closures
</avoid>
</best_practices>
