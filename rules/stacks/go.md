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
// Chi or Gorilla Mux pattern
func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")

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

_Go: simple, explicit, and concurrent._
