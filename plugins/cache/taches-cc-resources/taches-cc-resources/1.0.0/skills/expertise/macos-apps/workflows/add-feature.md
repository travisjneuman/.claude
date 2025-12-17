# Workflow: Add a Feature to an Existing App

<required_reading>
**Read these reference files NOW:**
1. references/app-architecture.md
2. references/swiftui-patterns.md

**Plus relevant refs based on feature type** (see Step 2).
</required_reading>

<process>
## Step 1: Understand the Feature

Ask the user:
- What should the feature do?
- Where in the app does it belong?
- Any specific requirements or constraints?

## Step 2: Read Relevant References

Based on feature type, read additional references:

| Feature Type | Additional References |
|--------------|----------------------|
| Data persistence | references/data-persistence.md |
| Networking/API | references/networking.md |
| File handling | references/document-apps.md |
| Background tasks | references/concurrency-patterns.md |
| System integration | references/system-apis.md |
| Menu bar | references/menu-bar-apps.md |
| Extensions | references/app-extensions.md |
| UI polish | references/design-system.md, references/macos-polish.md |

## Step 3: Understand Existing Code

Read the relevant parts of the existing codebase:
- App entry point (usually AppName.swift or AppNameApp.swift)
- State management (AppState, models)
- Existing views related to the feature area

Identify:
- How state flows through the app
- Existing patterns to follow
- Where the new feature fits

## Step 4: Plan the Implementation

Before writing code:
1. Identify new files/types needed
2. Identify existing files to modify
3. Plan the data flow
4. Consider edge cases

## Step 5: Implement with TDD

Follow test-driven development:
1. Write failing test for new behavior
2. Run → RED
3. Implement minimal code
4. Run → GREEN
5. Refactor
6. Repeat

## Step 6: Integrate

- Wire up new views to navigation
- Connect to existing state management
- Add menu items/shortcuts if applicable
- Handle errors gracefully

## Step 7: Build and Test

```bash
# Build
xcodebuild -project AppName.xcodeproj -scheme AppName build 2>&1 | xcsift

# Run tests
xcodebuild test -project AppName.xcodeproj -scheme AppName

# Launch for manual testing
open ./build/Build/Products/Debug/AppName.app
```

## Step 8: Polish

- Add keyboard shortcuts (references/macos-polish.md)
- Ensure accessibility
- Match existing UI patterns
</process>

<integration_patterns>
**Adding to state:**
```swift
// In AppState
@Observable
class AppState {
    // Add new property
    var newFeatureData: [NewType] = []

    // Add new methods
    func performNewFeature() { ... }
}
```

**Adding a new view:**
```swift
struct NewFeatureView: View {
    @Environment(AppState.self) private var appState

    var body: some View {
        // Use existing patterns from app
    }
}
```

**Adding to navigation:**
```swift
// In existing NavigationSplitView or similar
NavigationLink("New Feature", destination: NewFeatureView())
```

**Adding menu command:**
```swift
struct AppCommands: Commands {
    var body: some Commands {
        CommandGroup(after: .newItem) {
            Button("New Feature Action") {
                // action
            }
            .keyboardShortcut("N", modifiers: [.command, .shift])
        }
    }
}
```
</integration_patterns>

<success_criteria>
Feature is complete when:
- Functionality works as specified
- Tests pass
- Follows existing code patterns
- UI matches app style
- Keyboard shortcuts work
- No regressions in existing features
</success_criteria>
