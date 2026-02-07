# Go Stack Guide

**When to use:** Any Go project (APIs, CLIs, microservices, system tools).

---

## Project Setup

### Initialize Module

```bash
# Create new module
go mod init github.com/username/project

# Download dependencies
go mod tidy

# Verify dependencies
go mod verify
```

### Common Commands

```bash
# Run
go run .
go run cmd/main.go

# Build
go build -o bin/app .
go build -ldflags="-s -w" -o bin/app .  # Stripped binary

# Test
go test ./...
go test -v ./...                         # Verbose
go test -cover ./...                     # Coverage
go test -race ./...                      # Race detector

# Format and lint
go fmt ./...
go vet ./...
golangci-lint run                        # Comprehensive linting
```

---

## Code Standards

### Naming Conventions

| Type       | Convention             | Example                       |
| ---------- | ---------------------- | ----------------------------- |
| Packages   | lowercase, single word | `http`, `user`, `config`      |
| Exported   | PascalCase             | `UserService`, `GetUser()`    |
| Unexported | camelCase              | `userService`, `getUser()`    |
| Constants  | PascalCase or ALL_CAPS | `MaxRetries`, `MAX_RETRIES`   |
| Interfaces | -er suffix             | `Reader`, `Writer`, `Handler` |

### Function Guidelines

- Single responsibility
- < 50 lines
- Return errors explicitly (no exceptions)
- Named return values for documentation

```go
// Good - clear error handling
func GetUser(id string) (*User, error) {
    user, err := db.FindUser(id)
    if err != nil {
        return nil, fmt.Errorf("failed to find user %s: %w", id, err)
    }
    return user, nil
}

// Bad - hiding errors
func GetUser(id string) *User {
    user, _ := db.FindUser(id)  // NEVER ignore errors
    return user
}
```

### Error Handling

```go
// Always wrap errors with context
if err != nil {
    return fmt.Errorf("operation failed: %w", err)
}

// Custom errors
var ErrNotFound = errors.New("not found")

func FindUser(id string) (*User, error) {
    user := db.Find(id)
    if user == nil {
        return nil, ErrNotFound
    }
    return user, nil
}

// Check specific errors
if errors.Is(err, ErrNotFound) {
    // Handle not found
}
```

---

## File Organization

```
project/
├── cmd/
│   └── app/
│       └── main.go          # Entry point
├── internal/                 # Private packages
│   ├── handler/             # HTTP handlers
│   ├── service/             # Business logic
│   ├── repository/          # Data access
│   └── model/               # Data structures
├── pkg/                     # Public packages
│   └── util/                # Shared utilities
├── api/                     # API definitions (OpenAPI, proto)
├── configs/                 # Configuration files
├── scripts/                 # Build/deploy scripts
├── go.mod
├── go.sum
└── README.md
```

---

## Testing

### Test Structure

```go
// user_test.go
package user

import (
    "testing"
)

func TestGetUser(t *testing.T) {
    tests := []struct {
        name    string
        id      string
        want    *User
        wantErr bool
    }{
        {
            name: "valid user",
            id:   "123",
            want: &User{ID: "123", Name: "John"},
        },
        {
            name:    "not found",
            id:      "invalid",
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := GetUser(tt.id)
            if (err != nil) != tt.wantErr {
                t.Errorf("GetUser() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("GetUser() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Benchmarks

```go
func BenchmarkGetUser(b *testing.B) {
    for i := 0; i < b.N; i++ {
        GetUser("123")
    }
}
```

---

## Common Patterns

### Dependency Injection

```go
// Define interface
type UserRepository interface {
    Find(id string) (*User, error)
    Save(user *User) error
}

// Service depends on interface
type UserService struct {
    repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}
```

### HTTP Handlers

```go
// Go 1.22+ enhanced ServeMux (stdlib is now sufficient for most routing)
mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", h.GetUser)
mux.HandleFunc("POST /users", h.CreateUser)
mux.HandleFunc("DELETE /users/{id}", h.DeleteUser)

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id") // Go 1.22+ path parameter extraction

    user, err := h.service.GetUser(id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            http.Error(w, "not found", http.StatusNotFound)
            return
        }
        http.Error(w, "internal error", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(user)
}

// Chi is still useful for middleware chains and subrouters
// but stdlib ServeMux is now sufficient for basic routing
```

### Context Usage

```go
func (s *Service) GetUser(ctx context.Context, id string) (*User, error) {
    // Check for cancellation
    select {
    case <-ctx.Done():
        return nil, ctx.Err()
    default:
    }

    return s.repo.Find(ctx, id)
}
```

---

## Concurrency

### Goroutines and Channels

```go
// Worker pool pattern
func ProcessItems(items []Item) {
    ch := make(chan Item, len(items))
    results := make(chan Result, len(items))

    // Start workers
    for i := 0; i < runtime.NumCPU(); i++ {
        go func() {
            for item := range ch {
                results <- process(item)
            }
        }()
    }

    // Send work
    for _, item := range items {
        ch <- item
    }
    close(ch)

    // Collect results
    for i := 0; i < len(items); i++ {
        <-results
    }
}
```

### Sync Primitives

```go
// Mutex for shared state
type SafeCounter struct {
    mu    sync.Mutex
    count int
}

func (c *SafeCounter) Inc() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.count++
}

// WaitGroup for coordination
var wg sync.WaitGroup
for _, item := range items {
    wg.Add(1)
    go func(i Item) {
        defer wg.Done()
        process(i)
    }(item)
}
wg.Wait()
```

---

## Related Skills

| Skill                     | When to Use       |
| ------------------------- | ----------------- |
| `test-specialist`         | Testing guidance  |
| `security`                | Security patterns |
| `microservices-architect` | Service design    |
| `api-designer`            | API design        |

### Invoke with:

```
Skill(test-specialist)
Skill(api-designer)
```

---

## Anti-Patterns

- [ ] Ignoring errors with `_`
- [ ] Not using `context.Context` for cancellation
- [ ] Global state instead of dependency injection
- [ ] Not closing resources (files, connections)
- [ ] Naked goroutines without error handling
- [ ] Using `panic` for error handling
- [ ] Not running race detector in tests

---

## Performance Tips

```bash
# Profile CPU
go test -cpuprofile cpu.prof -bench .
go tool pprof cpu.prof

# Profile memory
go test -memprofile mem.prof -bench .
go tool pprof -alloc_objects mem.prof

# Escape analysis
go build -gcflags="-m" .
```

---

## Go 1.22+ Features

### Range Over Functions (Iterators)

```go
// Go 1.22+ supports range over func types for custom iterators
func Filter[T any](items []T, predicate func(T) bool) iter.Seq[T] {
    return func(yield func(T) bool) {
        for _, item := range items {
            if predicate(item) {
                if !yield(item) {
                    return
                }
            }
        }
    }
}

// Usage
for item := range Filter(users, func(u User) bool { return u.Active }) {
    fmt.Println(item.Name)
}
```

### Enhanced ServeMux Routing

```go
// Method-based routing with path parameters (no third-party router needed)
mux := http.NewServeMux()
mux.HandleFunc("GET /api/v1/users", listUsers)
mux.HandleFunc("GET /api/v1/users/{id}", getUser)
mux.HandleFunc("POST /api/v1/users", createUser)
mux.HandleFunc("PUT /api/v1/users/{id}", updateUser)
mux.HandleFunc("DELETE /api/v1/users/{id}", deleteUser)

// Wildcard matching
mux.HandleFunc("GET /static/{path...}", serveStatic)
```

### Structured Logging (slog)

```go
import "log/slog"

// Replace log package with slog for structured logging
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
    Level: slog.LevelInfo,
}))

logger.Info("processing request",
    slog.String("method", r.Method),
    slog.String("path", r.URL.Path),
    slog.Int("status", statusCode),
    slog.Duration("duration", elapsed),
)

logger.Error("failed to process",
    slog.String("user_id", userID),
    slog.Any("error", err),
)

// Set as default logger
slog.SetDefault(logger)
```

---

## Generics Patterns

```go
// Common generic utilities
func Map[T, U any](items []T, fn func(T) U) []U {
    result := make([]U, len(items))
    for i, item := range items {
        result[i] = fn(item)
    }
    return result
}

func Filter[T any](items []T, predicate func(T) bool) []T {
    var result []T
    for _, item := range items {
        if predicate(item) {
            result = append(result, item)
        }
    }
    return result
}

func Contains[T comparable](items []T, target T) bool {
    for _, item := range items {
        if item == target {
            return true
        }
    }
    return false
}

// Generic repository pattern
type Repository[T any] interface {
    FindByID(ctx context.Context, id string) (T, error)
    FindAll(ctx context.Context) ([]T, error)
    Create(ctx context.Context, entity T) error
    Update(ctx context.Context, entity T) error
    Delete(ctx context.Context, id string) error
}
```

---

## Type-Safe SQL with sqlc

```yaml
# sqlc.yaml
version: "2"
sql:
  - engine: "postgresql"
    queries: "queries/"
    schema: "schema/"
    gen:
      go:
        package: "db"
        out: "internal/db"
```

```sql
-- queries/users.sql
-- name: GetUser :one
SELECT * FROM users WHERE id = $1;

-- name: ListUsers :many
SELECT * FROM users ORDER BY created_at DESC LIMIT $1;

-- name: CreateUser :one
INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;
```

```go
// Generated code is type-safe and ready to use
user, err := queries.GetUser(ctx, userID)
users, err := queries.ListUsers(ctx, 20)
newUser, err := queries.CreateUser(ctx, db.CreateUserParams{
    Name:  "John",
    Email: "john@example.com",
})
```

---

## connect-go for gRPC-Compatible APIs

```go
// connect-go provides gRPC, gRPC-Web, and Connect protocols
// Works with standard net/http, no special gRPC server needed
import "connectrpc.com/connect"

func main() {
    mux := http.NewServeMux()
    path, handler := userv1connect.NewUserServiceHandler(&userServer{})
    mux.Handle(path, handler)

    http.ListenAndServe(":8080", h2c.NewHandler(mux, &http2.Server{}))
}
```

---

_Go: simple, explicit, and concurrent._
