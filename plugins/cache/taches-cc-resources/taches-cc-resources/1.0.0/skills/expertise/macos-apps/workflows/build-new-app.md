# Workflow: Build a New macOS App

<required_reading>
**Read these reference files NOW before writing any code:**
1. references/project-scaffolding.md
2. references/cli-workflow.md
3. references/app-architecture.md
4. references/swiftui-patterns.md
</required_reading>

<process>
## Step 1: Clarify Requirements

Ask the user:
- What does the app do? (core functionality)
- What type of app? (document-based, shoebox/library, menu bar utility, single-window)
- Any specific features needed? (persistence, networking, system integration)

## Step 2: Choose App Archetype

Based on requirements, select:

| Type | When to Use | Reference |
|------|-------------|-----------|
| Document-based | User creates/saves files | references/document-apps.md |
| Shoebox/Library | Internal database, no explicit save | references/shoebox-apps.md |
| Menu bar utility | Background functionality, quick actions | references/menu-bar-apps.md |
| Single-window | Focused task, simple UI | (use base patterns) |

Read the relevant app type reference if not single-window.

## Step 3: Scaffold Project

Use XcodeGen (recommended):

```bash
# Create project structure
mkdir -p AppName/Sources
cd AppName

# Create project.yml (see references/project-scaffolding.md for template)
# Create Swift files
# Generate xcodeproj
xcodegen generate
```

## Step 4: Implement with TDD

Follow test-driven development:
1. Write failing test
2. Run → RED
3. Implement minimal code
4. Run → GREEN
5. Refactor
6. Repeat

See references/testing-tdd.md for patterns.

## Step 5: Build and Verify

```bash
# Build
xcodebuild -project AppName.xcodeproj -scheme AppName build 2>&1 | xcsift

# Run
open ./build/Build/Products/Debug/AppName.app
```

## Step 6: Polish

Read references/macos-polish.md for:
- Keyboard shortcuts
- Menu bar integration
- Accessibility
- State restoration
</process>

<anti_patterns>
Avoid:
- Massive view models - views ARE the view model in SwiftUI
- Fighting SwiftUI - use declarative patterns
- Ignoring platform conventions - standard shortcuts, menus, windows
- Blocking main thread - async/await for all I/O
- Hard-coded paths - use FileManager APIs
- Retain cycles - use `[weak self]` in escaping closures
</anti_patterns>

<success_criteria>
A well-built macOS app:
- Follows macOS conventions (menu bar, shortcuts, window behavior)
- Uses SwiftUI for UI with AppKit integration where needed
- Manages state with @Observable and environment
- Persists data appropriately
- Handles errors gracefully
- Supports accessibility
- Builds and runs from CLI without opening Xcode
- Feels native and responsive
</success_criteria>
