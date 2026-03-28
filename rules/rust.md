# Rust Rules
Ownership: prefer borrowing over cloning. Use `&str` for function params, `String` for owned data.
Error handling: use `thiserror` for library errors, `anyhow` for application errors. Never `unwrap()` in production code.
Async: use `tokio` runtime. Prefer `async fn` over manual `Future` impl. Use `tokio::select!` for concurrent operations.
Types: leverage the type system for correctness — newtype pattern, enums over booleans, `NonZero*` types.
Unsafe: avoid unless strictly necessary. Document safety invariants with `// SAFETY:` comments.
