# agent-go-expert: Key Patterns

Part of the `agent-go-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Chi HTTP Service

```go
package main

import (
    "context"
    "encoding/json"
    "errors"
    "fmt"
    "log/slog"
    "net/http"
    "os"
    "os/signal"
    "time"

    "github.com/go-chi/chi/v5"
    "github.com/go-chi/chi/v5/middleware"
)

type UserService interface {
    GetUser(ctx context.Context, id string) (*User, error)
    CreateUser(ctx context.Context, input CreateUserInput) (*User, error)
    ListUsers(ctx context.Context, page, perPage int) ([]*User, error)
}

type UserHandler struct {
    service UserService
    logger  *slog.Logger
}

func NewUserHandler(service UserService, logger *slog.Logger) *UserHandler {
    return &UserHandler{service: service, logger: logger}
}

func (h *UserHandler) Routes() chi.Router {
    r := chi.NewRouter()
    r.Get("/", h.List)
    r.Post("/", h.Create)
    r.Get("/{id}", h.Get)
    return r
}

func (h *UserHandler) Get(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")

    user, err := h.service.GetUser(r.Context(), id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            writeJSON(w, http.StatusNotFound, map[string]string{
                "error": fmt.Sprintf("user %s not found", id),
            })
            return
        }
        h.logger.Error("failed to get user", "id", id, "error", err)
        writeJSON(w, http.StatusInternalServerError, map[string]string{
            "error": "internal error",
        })
        return
    }

    writeJSON(w, http.StatusOK, user)
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
    var input CreateUserInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        writeJSON(w, http.StatusBadRequest, map[string]string{
            "error": "invalid request body",
        })
        return
    }

    if err := input.Validate(); err != nil {
        writeJSON(w, http.StatusBadRequest, map[string]string{
            "error": err.Error(),
        })
        return
    }

    user, err := h.service.CreateUser(r.Context(), input)
    if err != nil {
        h.logger.Error("failed to create user", "error", err)
        writeJSON(w, http.StatusInternalServerError, map[string]string{
            "error": "internal error",
        })
        return
    }

    writeJSON(w, http.StatusCreated, user)
}

func (h *UserHandler) List(w http.ResponseWriter, r *http.Request) {
    page := queryInt(r, "page", 1)
    perPage := queryInt(r, "per_page", 20)
    if perPage > 100 {
        perPage = 100
    }

    users, err := h.service.ListUsers(r.Context(), page, perPage)
    if err != nil {
        h.logger.Error("failed to list users", "error", err)
        writeJSON(w, http.StatusInternalServerError, map[string]string{
            "error": "internal error",
        })
        return
    }

    writeJSON(w, http.StatusOK, users)
}

func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

    r := chi.NewRouter()
    r.Use(middleware.RequestID)
    r.Use(middleware.RealIP)
    r.Use(middleware.Logger)
    r.Use(middleware.Recoverer)
    r.Use(middleware.Timeout(30 * time.Second))

    userHandler := NewUserHandler(userService, logger)
    r.Mount("/api/users", userHandler.Routes())
    r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
        w.Write([]byte("ok"))
    })

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      r,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout:  60 * time.Second,
    }

    // Graceful shutdown
    go func() {
        sigCh := make(chan os.Signal, 1)
        signal.Notify(sigCh, os.Interrupt)
        <-sigCh

        ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
        defer cancel()

        logger.Info("shutting down server")
        if err := srv.Shutdown(ctx); err != nil {
            logger.Error("server shutdown error", "error", err)
        }
    }()

    logger.Info("starting server", "addr", srv.Addr)
    if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
        logger.Error("server error", "error", err)
        os.Exit(1)
    }
}

func writeJSON(w http.ResponseWriter, status int, v any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(v)
}
```

### Error Handling Patterns

```go
// Sentinel errors
var (
    ErrNotFound    = errors.New("not found")
    ErrConflict    = errors.New("conflict")
    ErrForbidden   = errors.New("forbidden")
)

// Rich error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s: %s", e.Field, e.Message)
}

// Error wrapping with context
func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
    user, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("get user %s: %w", id, err)
    }
    if user == nil {
        return nil, fmt.Errorf("get user %s: %w", id, ErrNotFound)
    }
    return user, nil
}

// Checking errors in callers
user, err := svc.GetUser(ctx, id)
if err != nil {
    if errors.Is(err, ErrNotFound) {
        // Handle not found
    }
    var validErr *ValidationError
    if errors.As(err, &validErr) {
        // Handle validation error
    }
    // Handle other errors
}
```

### Worker Pool with errgroup

```go
import "golang.org/x/sync/errgroup"

func ProcessItems(ctx context.Context, items []Item) error {
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(10) // Max 10 concurrent workers

    for _, item := range items {
        g.Go(func() error {
            return processItem(ctx, item)
        })
    }

    return g.Wait()
}
```

### Pipeline Pattern

```go
func Pipeline(ctx context.Context, input <-chan int) <-chan int {
    doubled := stage(ctx, input, func(n int) int { return n * 2 })
    filtered := filter(ctx, doubled, func(n int) bool { return n > 10 })
    return filtered
}

func stage[T, U any](ctx context.Context, in <-chan T, fn func(T) U) <-chan U {
    out := make(chan U)
    go func() {
        defer close(out)
        for v := range in {
            select {
            case out <- fn(v):
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func filter[T any](ctx context.Context, in <-chan T, pred func(T) bool) <-chan T {
    out := make(chan T)
    go func() {
        defer close(out)
        for v := range in {
            if pred(v) {
                select {
                case out <- v:
                case <-ctx.Done():
                    return
                }
            }
        }
    }()
    return out
}
```

### Table-Driven Tests

```go
func TestParseAmount(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        want    int64
        wantErr bool
    }{
        {name: "valid dollars", input: "$10.50", want: 1050},
        {name: "valid no cents", input: "$10", want: 1000},
        {name: "zero", input: "$0.00", want: 0},
        {name: "invalid format", input: "abc", wantErr: true},
        {name: "negative", input: "-$5.00", wantErr: true},
        {name: "empty", input: "", wantErr: true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParseAmount(tt.input)
            if (err != nil) != tt.wantErr {
                t.Errorf("ParseAmount(%q) error = %v, wantErr %v", tt.input, err, tt.wantErr)
                return
            }
            if got != tt.want {
                t.Errorf("ParseAmount(%q) = %d, want %d", tt.input, got, tt.want)
            }
        })
    }
}
```

### HTTP Handler Testing

```go
func TestGetUser(t *testing.T) {
    // Setup mock service
    mockSvc := &MockUserService{
        GetUserFunc: func(ctx context.Context, id string) (*User, error) {
            if id == "123" {
                return &User{ID: "123", Name: "Test"}, nil
            }
            return nil, ErrNotFound
        },
    }

    handler := NewUserHandler(mockSvc, slog.Default())
    r := chi.NewRouter()
    r.Mount("/users", handler.Routes())

    // Test success case
    req := httptest.NewRequest("GET", "/users/123", nil)
    w := httptest.NewRecorder()
    r.ServeHTTP(w, req)

    if w.Code != http.StatusOK {
        t.Errorf("expected 200, got %d", w.Code)
    }

    var user User
    json.NewDecoder(w.Body).Decode(&user)
    if user.Name != "Test" {
        t.Errorf("expected name 'Test', got %q", user.Name)
    }

    // Test not found case
    req = httptest.NewRequest("GET", "/users/unknown", nil)
    w = httptest.NewRecorder()
    r.ServeHTTP(w, req)

    if w.Code != http.StatusNotFound {
        t.Errorf("expected 404, got %d", w.Code)
    }
}
```
