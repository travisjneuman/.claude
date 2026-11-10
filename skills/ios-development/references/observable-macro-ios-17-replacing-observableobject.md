# ios-development: @Observable Macro (iOS 17+, Replacing ObservableObject)

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## @Observable Macro (iOS 17+, Replacing ObservableObject)

```swift
import Observation

// New pattern: @Observable macro (replaces ObservableObject + @Published)
@Observable
class UserViewModel {
    var user: User?
    var isLoading = false
    var errorMessage: String?

    func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            user = try await fetchUser()
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}

// In View: no @StateObject/@ObservedObject wrappers needed
struct UserView: View {
    @State private var viewModel = UserViewModel()

    var body: some View {
        Group {
            if viewModel.isLoading {
                ProgressView()
            } else if let user = viewModel.user {
                Text(user.name)
            }
        }
        .task { await viewModel.load() }
    }
}

// @Bindable for two-way bindings
struct EditView: View {
    @Bindable var viewModel: EditViewModel

    var body: some View {
        TextField("Name", text: $viewModel.name)
    }
}
```

### Migration from ObservableObject

| Old (ObservableObject)     | New (@Observable)         |
| -------------------------- | ------------------------- |
| `class: ObservableObject`  | `@Observable class`       |
| `@Published var`           | `var` (automatic)         |
| `@StateObject`             | `@State`                  |
| `@ObservedObject`          | Direct reference          |
| `@EnvironmentObject`       | `@Environment(TypeName.self)` |

---
