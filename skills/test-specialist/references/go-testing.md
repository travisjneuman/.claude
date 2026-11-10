# test-specialist: Go Testing

Part of the `test-specialist` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Go Testing

### Table-Driven Tests

```go
func TestCalculateDiscount(t *testing.T) {
    tests := []struct {
        name     string
        amount   float64
        code     string
        want     float64
        wantErr  bool
    }{
        {
            name:   "valid 10% discount",
            amount: 100.0,
            code:   "SAVE10",
            want:   90.0,
        },
        {
            name:   "no discount",
            amount: 100.0,
            code:   "",
            want:   100.0,
        },
        {
            name:    "invalid code",
            amount:  100.0,
            code:    "INVALID",
            wantErr: true,
        },
        {
            name:   "zero amount",
            amount: 0,
            code:   "SAVE10",
            want:   0,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := CalculateDiscount(tt.amount, tt.code)
            if (err != nil) != tt.wantErr {
                t.Errorf("CalculateDiscount() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if got != tt.want {
                t.Errorf("CalculateDiscount() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Testify Assertions and Mocks

```go
import (
    "testing"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
    "github.com/stretchr/testify/require"
)

// Mock
type MockUserRepo struct {
    mock.Mock
}

func (m *MockUserRepo) FindByID(id string) (*User, error) {
    args := m.Called(id)
    if args.Get(0) == nil {
        return nil, args.Error(1)
    }
    return args.Get(0).(*User), args.Error(1)
}

func TestGetUser(t *testing.T) {
    repo := new(MockUserRepo)
    repo.On("FindByID", "123").Return(&User{ID: "123", Name: "John"}, nil)

    service := NewUserService(repo)
    user, err := service.GetUser("123")

    require.NoError(t, err)
    assert.Equal(t, "John", user.Name)
    repo.AssertExpectations(t)
}

// HTTP handler testing
func TestGetUserHandler(t *testing.T) {
    req := httptest.NewRequest("GET", "/users/123", nil)
    w := httptest.NewRecorder()

    handler := NewHandler(mockService)
    handler.GetUser(w, req)

    assert.Equal(t, http.StatusOK, w.Code)

    var user User
    err := json.NewDecoder(w.Body).Decode(&user)
    require.NoError(t, err)
    assert.Equal(t, "123", user.ID)
}
```

---
