# agent-go-expert: Go Project Structure

Part of the `agent-go-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Go Project Structure

```
project/
├── cmd/
│   └── server/
│       └── main.go           # Entry point, wiring
├── internal/
│   ├── handler/              # HTTP handlers
│   │   ├── user.go
│   │   └── user_test.go
│   ├── service/              # Business logic
│   │   ├── user.go
│   │   └── user_test.go
│   ├── repository/           # Data access
│   │   ├── user.go
│   │   └── user_test.go
│   ├── model/                # Domain types
│   │   └── user.go
│   └── middleware/            # HTTP middleware
│       └── auth.go
├── pkg/                      # Public packages (if any)
├── migrations/               # SQL migrations
├── go.mod
├── go.sum
└── Makefile
```
