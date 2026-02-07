# Rust Stack Guide

**When to use:** Any Rust project (systems, CLIs, WebAssembly, performance-critical code).

---

## Project Setup

### Create New Project

```bash
# Binary project
cargo new project-name

# Library project
cargo new --lib project-name

# Initialize in existing directory
cargo init
```

### Common Commands

```bash
# Build
cargo build                    # Debug build
cargo build --release         # Release build

# Run
cargo run
cargo run --release

# Test
cargo test
cargo test -- --nocapture     # Show println! output
cargo test test_name          # Run specific test

# Check (fast compile check)
cargo check

# Format and lint
cargo fmt
cargo clippy
cargo clippy -- -D warnings   # Treat warnings as errors
```

---

## Code Standards

### Naming Conventions

| Type         | Convention           | Example                        |
| ------------ | -------------------- | ------------------------------ |
| Modules      | snake_case           | `user_service`, `http_handler` |
| Functions    | snake_case           | `get_user`, `process_data`     |
| Types/Traits | PascalCase           | `UserService`, `Serialize`     |
| Constants    | SCREAMING_SNAKE_CASE | `MAX_CONNECTIONS`              |
| Lifetimes    | short lowercase      | `'a`, `'static`                |

### Function Guidelines

````rust
// Good - clear result types
fn get_user(id: &str) -> Result<User, UserError> {
    let user = db.find(id)
        .ok_or(UserError::NotFound)?;
    Ok(user)
}

// With documentation
/// Gets a user by their unique identifier.
///
/// # Arguments
/// * `id` - The user's unique identifier
///
/// # Returns
/// * `Ok(User)` - The user if found
/// * `Err(UserError::NotFound)` - If user doesn't exist
///
/// # Examples
/// ```
/// let user = get_user("123")?;
/// ```
fn get_user(id: &str) -> Result<User, UserError> {
    // ...
}
````

### Error Handling

```rust
// Custom error type
#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("user not found: {0}")]
    NotFound(String),

    #[error("database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("validation failed: {0}")]
    Validation(String),
}

// Usage with ? operator
fn process() -> Result<(), AppError> {
    let user = get_user("123")?;  // Propagates error
    validate(&user)?;
    Ok(())
}

// Pattern matching on errors
match get_user("123") {
    Ok(user) => println!("Found: {}", user.name),
    Err(AppError::NotFound(id)) => println!("User {} not found", id),
    Err(e) => return Err(e),
}
```

---

## File Organization

```
project/
├── src/
│   ├── main.rs              # Binary entry point
│   ├── lib.rs               # Library entry point
│   ├── config.rs            # Configuration
│   ├── error.rs             # Error types
│   ├── handlers/            # Request handlers
│   │   ├── mod.rs
│   │   └── user.rs
│   ├── services/            # Business logic
│   │   ├── mod.rs
│   │   └── user.rs
│   └── models/              # Data structures
│       ├── mod.rs
│       └── user.rs
├── tests/                   # Integration tests
│   └── integration_test.rs
├── benches/                 # Benchmarks
│   └── benchmark.rs
├── Cargo.toml
├── Cargo.lock
└── README.md
```

---

## Testing

### Unit Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_user_valid() {
        let user = get_user("123").unwrap();
        assert_eq!(user.name, "John");
    }

    #[test]
    fn test_get_user_not_found() {
        let result = get_user("invalid");
        assert!(matches!(result, Err(AppError::NotFound(_))));
    }

    #[test]
    #[should_panic(expected = "invalid id")]
    fn test_panics_on_empty_id() {
        get_user("");
    }
}
```

### Async Tests

```rust
#[tokio::test]
async fn test_async_operation() {
    let result = fetch_user("123").await;
    assert!(result.is_ok());
}
```

### Property-Based Testing

```rust
use proptest::prelude::*;

proptest! {
    #[test]
    fn test_parse_then_format(s in "[a-z]+") {
        let parsed = parse(&s)?;
        let formatted = format(&parsed);
        prop_assert_eq!(s, formatted);
    }
}
```

---

## Common Patterns

### Builder Pattern

```rust
#[derive(Default)]
pub struct RequestBuilder {
    url: String,
    headers: HashMap<String, String>,
    timeout: Option<Duration>,
}

impl RequestBuilder {
    pub fn new(url: impl Into<String>) -> Self {
        Self {
            url: url.into(),
            ..Default::default()
        }
    }

    pub fn header(mut self, key: &str, value: &str) -> Self {
        self.headers.insert(key.to_string(), value.to_string());
        self
    }

    pub fn timeout(mut self, duration: Duration) -> Self {
        self.timeout = Some(duration);
        self
    }

    pub fn build(self) -> Request {
        Request { /* ... */ }
    }
}

// Usage
let request = RequestBuilder::new("https://api.example.com")
    .header("Authorization", "Bearer token")
    .timeout(Duration::from_secs(30))
    .build();
```

### Trait Objects

```rust
// Define trait
trait Repository {
    fn find(&self, id: &str) -> Option<User>;
    fn save(&mut self, user: &User) -> Result<(), Error>;
}

// Use trait object for runtime polymorphism
fn process(repo: &dyn Repository) {
    if let Some(user) = repo.find("123") {
        // ...
    }
}

// Or use generics for compile-time polymorphism
fn process<R: Repository>(repo: &R) {
    if let Some(user) = repo.find("123") {
        // ...
    }
}
```

### Iterators

```rust
let names: Vec<String> = users
    .iter()
    .filter(|u| u.active)
    .map(|u| u.name.clone())
    .collect();

// Parallel iteration with rayon
use rayon::prelude::*;
let results: Vec<_> = items
    .par_iter()
    .map(|item| process(item))
    .collect();
```

---

## Async Rust

### Tokio Runtime

```rust
use tokio;

#[tokio::main]
async fn main() {
    let result = fetch_data().await;
    println!("{:?}", result);
}

async fn fetch_data() -> Result<Data, Error> {
    let response = reqwest::get("https://api.example.com")
        .await?
        .json()
        .await?;
    Ok(response)
}
```

### Concurrent Tasks

```rust
use tokio::join;

async fn fetch_all() -> (User, Posts) {
    let (user, posts) = join!(
        fetch_user("123"),
        fetch_posts("123")
    );
    (user.unwrap(), posts.unwrap())
}
```

---

## Memory Management

### Ownership Rules

```rust
// Move semantics
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved, no longer valid
// println!("{}", s1);  // ERROR!

// Clone for explicit copy
let s1 = String::from("hello");
let s2 = s1.clone();
println!("{} {}", s1, s2);  // OK

// Borrowing
fn print_length(s: &String) {  // Borrow, don't take ownership
    println!("{}", s.len());
}

// Mutable borrowing
fn append(s: &mut String) {
    s.push_str(" world");
}
```

### Lifetimes

```rust
// Explicit lifetime annotation
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Struct with references
struct Parser<'a> {
    input: &'a str,
}

impl<'a> Parser<'a> {
    fn parse(&self) -> Token<'a> {
        // ...
    }
}
```

---

## Related Skills

| Skill                   | When to Use        |
| ----------------------- | ------------------ |
| `test-specialist`       | Testing guidance   |
| `security`              | Security patterns  |
| `performance-optimizer` | Performance tuning |

### Invoke with:

```
Skill(test-specialist)
Skill(performance-optimizer)
```

---

## Anti-Patterns

- [ ] Using `.unwrap()` in production code
- [ ] Cloning when borrowing would work
- [ ] Not using `clippy` for linting
- [ ] Ignoring lifetime elision rules
- [ ] Using `unsafe` without justification
- [ ] Not documenting public APIs
- [ ] Blocking in async code

---

## Performance Tips

```bash
# Release build with optimizations
cargo build --release

# Profile with flamegraph
cargo install flamegraph
cargo flamegraph

# Check binary size
cargo bloat --release

# LLVM optimizations
# In Cargo.toml:
[profile.release]
lto = true
codegen-units = 1
```

---

## Useful Crates

| Category      | Crate                 | Purpose               |
| ------------- | --------------------- | --------------------- |
| Async         | `tokio`               | Async runtime         |
| HTTP          | `reqwest`             | HTTP client           |
| Web           | `axum`, `actix-web`   | Web frameworks        |
| Full-stack    | `leptos`, `dioxus`    | Full-stack Rust web   |
| Serialization | `serde`               | Serialize/deserialize |
| CLI           | `clap`                | Argument parsing      |
| Error         | `thiserror`, `anyhow` | Error handling        |
| Logging       | `tracing`             | Structured logging    |
| Testing       | `proptest`            | Property testing      |
| Test runner   | `cargo-nextest`       | Faster test execution |
| Database      | `sqlx`                | Async SQL (compile-time checked) |
| ORM           | `sea-orm`, `diesel`   | Full ORMs             |

---

## Rust 2024 Edition Features

### Async Functions in Traits (Stabilized)

```rust
// No more async-trait crate needed for most cases
trait Repository {
    async fn find(&self, id: &str) -> Result<User, Error>;
    async fn save(&self, user: &User) -> Result<(), Error>;
}

struct PostgresRepo { pool: PgPool }

impl Repository for PostgresRepo {
    async fn find(&self, id: &str) -> Result<User, Error> {
        sqlx::query_as!(User, "SELECT * FROM users WHERE id = $1", id)
            .fetch_one(&self.pool)
            .await
            .map_err(Into::into)
    }

    async fn save(&self, user: &User) -> Result<(), Error> {
        sqlx::query!("INSERT INTO users (id, name) VALUES ($1, $2)", user.id, user.name)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
```

### cargo-nextest (Faster Test Runner)

```bash
# Install
cargo install cargo-nextest

# Run tests (up to 3x faster than cargo test)
cargo nextest run
cargo nextest run --no-capture    # Show output
cargo nextest run -E 'test(user)' # Filter by name

# JUnit XML output for CI
cargo nextest run --profile ci
```

---

## Full-Stack Rust Web

### Leptos (SSR + Client Hydration)

```rust
use leptos::*;

#[component]
fn App() -> impl IntoView {
    let (count, set_count) = create_signal(0);

    view! {
        <h1>"Count: " {count}</h1>
        <button on:click=move |_| set_count.update(|n| *n += 1)>
            "Increment"
        </button>
    }
}

#[component]
fn UserList() -> impl IntoView {
    let users = create_resource(|| (), |_| async { fetch_users().await });

    view! {
        <Suspense fallback=move || view! { <p>"Loading..."</p> }>
            {move || users.get().map(|data| view! {
                <ul>
                    {data.into_iter().map(|user| view! {
                        <li>{user.name}</li>
                    }).collect_view()}
                </ul>
            })}
        </Suspense>
    }
}
```

### Dioxus (React-like, Multi-platform)

```rust
use dioxus::prelude::*;

fn App() -> Element {
    let mut count = use_signal(|| 0);

    rsx! {
        h1 { "Count: {count}" }
        button { onclick: move |_| count += 1, "Increment" }
    }
}
```

---

_Rust: safe, fast, and fearless concurrency._
