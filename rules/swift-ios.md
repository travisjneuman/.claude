# Swift/iOS Rules
SwiftUI: prefer `@State` for local, `@Binding` for child, `@Observable` (iOS 17+) over `ObservableObject`.
Architecture: use Swift concurrency (`async`/`await`, `actor`) over Combine for new code. Structured concurrency with `TaskGroup`.
Types: leverage enums with associated values, protocol-oriented design, generics with `some`/`any`.
Error handling: typed throws (Swift 6+), `Result` for async callbacks, never force-unwrap optionals in production.
UIKit: composition over inheritance. Coordinator pattern for navigation. Diffable data sources over reload.
Testing: XCTest with `async` test methods. Use `#Preview` macros for SwiftUI previews.
