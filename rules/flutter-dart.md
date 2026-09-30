---
paths:
  - "**/*.dart"
  - "**/pubspec.yaml"
---

# Flutter/Dart Rules
State management: Riverpod preferred. Use `ref.watch` in build, `ref.read` in callbacks. Avoid `setState` beyond simple local state.
Widgets: const constructors everywhere possible. Extract widgets into separate classes at 50+ lines. Keys for list items.
Navigation: GoRouter for declarative routing. Use `StatefulShellRoute` for nested navigation.
Dart: strong typing, no `dynamic`. Use `sealed class` for union types. `extension type` for zero-cost wrappers.
Platform: use `MethodChannel` for native code. Prefer `dart:ffi` for C interop. Use `build.yaml` for code generation.
Tests (only when the user asks for them): widget tests with `pumpWidget`, golden tests for visual regression, integration tests with `patrol` or `integration_test`.
