# API Development Checklist

**When to use:** Designing, building, or reviewing REST or GraphQL APIs.

---

## REST API Design

### Resource Naming

| Pattern                        | Example                | Rule                                |
| ------------------------------ | ---------------------- | ----------------------------------- |
| Plural nouns                   | `/users`, `/orders`    | Resources are collections           |
| Nested resources               | `/users/123/orders`    | Express ownership, max 2 levels     |
| No verbs in URLs               | `/users` not `/getUsers` | HTTP methods express the action   |
| Kebab-case                     | `/user-profiles`       | Consistent URL casing               |
| Query params for filtering     | `/users?role=admin`    | Never encode filters in the path    |

### HTTP Methods

| Method   | Purpose           | Idempotent | Request Body | Response               |
| -------- | ----------------- | ---------- | ------------ | ---------------------- |
| `GET`    | Read resource(s)  | Yes        | No           | Resource or collection  |
| `POST`   | Create resource   | No         | Yes          | Created resource (201)  |
| `PUT`    | Full replace      | Yes        | Yes          | Updated resource (200)  |
| `PATCH`  | Partial update    | Yes*       | Yes          | Updated resource (200)  |
| `DELETE` | Remove resource   | Yes        | No           | Empty (204) or confirmation |

### Status Codes

```
2xx Success
├── 200 OK              - General success, GET/PUT/PATCH
├── 201 Created         - POST success (include Location header)
├── 204 No Content      - DELETE success, or PUT with no response body

3xx Redirection
├── 301 Moved Permanently
└── 304 Not Modified    - Conditional GET (ETag match)

4xx Client Error
├── 400 Bad Request     - Validation error, malformed body
├── 401 Unauthorized    - Missing or invalid authentication
├── 403 Forbidden       - Authenticated but insufficient permissions
├── 404 Not Found       - Resource does not exist
├── 409 Conflict        - Duplicate resource, state conflict
├── 422 Unprocessable   - Semantically invalid request
└── 429 Too Many Requests - Rate limit exceeded

5xx Server Error
├── 500 Internal Server Error - Unexpected server failure
├── 502 Bad Gateway     - Upstream service failure
└── 503 Service Unavailable - Maintenance or overload
```

### Error Response Format (RFC 7807)

```json
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 422,
  "detail": "The email field is not a valid email address.",
  "instance": "/users",
  "errors": [
    {
      "field": "email",
      "message": "Must be a valid email address",
      "value": "not-an-email"
    }
  ]
}
```

- [ ] All error responses follow a consistent format
- [ ] Error messages are helpful but do not leak internals
- [ ] Validation errors list all failing fields (not just the first)

---

## Versioning

| Strategy       | Example                          | Pros                        | Cons                    |
| -------------- | -------------------------------- | --------------------------- | ----------------------- |
| URL path       | `/api/v1/users`                  | Explicit, easy to route     | URL pollution           |
| Header         | `Accept: application/vnd.api+json;version=2` | Clean URLs      | Less discoverable       |
| Query param    | `/api/users?version=2`           | Simple                      | Caching complications   |

Recommended: URL path versioning for simplicity. Increment only on breaking changes.

---

## Pagination

### Cursor-Based (Recommended)

```json
// Request
GET /api/users?limit=20&after=eyJpZCI6MTAwfQ

// Response
{
  "data": [...],
  "pagination": {
    "has_next": true,
    "has_previous": true,
    "next_cursor": "eyJpZCI6MTIwfQ",
    "previous_cursor": "eyJpZCI6MTAxfQ"
  }
}
```

### Offset-Based (Simpler)

```json
// Request
GET /api/users?page=3&per_page=20

// Response
{
  "data": [...],
  "pagination": {
    "page": 3,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

| Factor                | Cursor           | Offset          |
| --------------------- | ---------------- | --------------- |
| Large datasets        | Fast (O(1))      | Slow (OFFSET N) |
| Real-time data        | Stable           | Inconsistent    |
| Jump to page N        | Not supported    | Supported       |
| Implementation        | More complex     | Simpler         |

- [ ] Pagination implemented for all list endpoints
- [ ] Default and maximum page sizes enforced
- [ ] Pagination metadata included in response

---

## Rate Limiting

```
Headers to include:
X-RateLimit-Limit: 100       # Max requests per window
X-RateLimit-Remaining: 47    # Remaining requests
X-RateLimit-Reset: 1625140800 # Window reset timestamp (Unix)
Retry-After: 30              # Seconds until retry (on 429)
```

- [ ] Rate limiting applied to all public endpoints
- [ ] Rate limit headers included in responses
- [ ] 429 response includes `Retry-After` header
- [ ] Different limits for authenticated vs anonymous
- [ ] Rate limits documented in API docs

---

## Authentication

### API Key

```
# Header-based (preferred)
Authorization: ApiKey sk_live_abc123def456

# Query param (avoid - appears in logs)
GET /api/users?api_key=sk_live_abc123def456  # NOT RECOMMENDED
```

### JWT (Bearer Token)

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

### OAuth 2.0 Flow

```
1. Client redirects user to /oauth/authorize
2. User authenticates and consents
3. Authorization server redirects with code
4. Client exchanges code for tokens at /oauth/token
5. Client uses access token for API requests
6. Client uses refresh token when access token expires
```

- [ ] Authentication required on all non-public endpoints
- [ ] Tokens have appropriate expiration times
- [ ] Refresh token rotation implemented
- [ ] API keys are scoped (read-only, read-write)
- [ ] Secrets never appear in URLs or logs

---

## GraphQL Design

### Schema-First

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts(first: Int, after: String): PostConnection!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: DateTime!
}

type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}

type PostEdge {
  cursor: String!
  node: Post!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}

type Query {
  user(id: ID!): User
  users(first: Int, after: String, filter: UserFilter): UserConnection!
}

input UserFilter {
  role: Role
  isActive: Boolean
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}
```

### N+1 Prevention (DataLoader)

```typescript
import DataLoader from "dataloader";

const userLoader = new DataLoader<string, User>(async (ids) => {
  const users = await db.user.findMany({
    where: { id: { in: [...ids] } },
  });

  const userMap = new Map(users.map((u) => [u.id, u]));
  return ids.map((id) => userMap.get(id) ?? new Error(`User ${id} not found`));
});

// Resolver
const resolvers = {
  Post: {
    author: (post: Post) => userLoader.load(post.authorId),
  },
};
```

- [ ] Query complexity/depth limits enforced
- [ ] DataLoaders used for relationship resolution
- [ ] Introspection disabled in production
- [ ] Input validation on all mutations
- [ ] Proper error handling with extensions

---

## Documentation

### OpenAPI/Swagger

```yaml
openapi: 3.1.0
info:
  title: Users API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: per_page
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        "200":
          description: Success
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserListResponse"
        "401":
          $ref: "#/components/responses/Unauthorized"
```

- [ ] OpenAPI spec maintained and up to date
- [ ] All endpoints documented with examples
- [ ] Request/response schemas defined
- [ ] Error responses documented
- [ ] Authentication requirements specified

---

## Testing Checklist

### Unit Tests

- [ ] Each endpoint has success case tests
- [ ] Each endpoint has validation error tests
- [ ] Authentication/authorization tests for each endpoint
- [ ] Edge cases tested (empty results, max pagination, etc.)

### Integration Tests

- [ ] Full CRUD flow tested
- [ ] Authentication flow tested end-to-end
- [ ] Rate limiting behavior verified
- [ ] Error responses match documented format

### Contract Tests

- [ ] API responses match OpenAPI schema
- [ ] Breaking changes detected before deployment
- [ ] Backward compatibility verified

---

## Pre-Deployment Checklist

- [ ] All endpoints require authentication (unless intentionally public)
- [ ] Input validation on all request bodies and query params
- [ ] Rate limiting configured
- [ ] CORS configured for allowed origins only
- [ ] Request/response logging (without sensitive data)
- [ ] Error responses do not leak stack traces or internal details
- [ ] API versioning strategy implemented
- [ ] Health check endpoint (`/health` or `/api/health`)
- [ ] OpenAPI documentation generated and accessible

---

## Related Skills

| Skill                | When to Use           |
| -------------------- | --------------------- |
| `api-designer`       | API design patterns   |
| `security`           | Auth, validation      |
| `test-specialist`    | Testing guidance      |
| `tech-debt-analyzer` | API code quality      |

### Invoke with:

```
Skill(api-designer)
Skill(security)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/security-hardening.md` - Security checklist
- `~/.claude/docs/reference/checklists/database-design.md` - Database patterns
- `~/.claude/docs/reference/stacks/django-fastapi.md` - Python API frameworks

---

## Anti-Patterns

- [ ] Verbs in resource URLs (`/getUsers`, `/deleteUser`)
- [ ] Inconsistent error response formats across endpoints
- [ ] Missing pagination on list endpoints
- [ ] Exposing internal IDs or database structure
- [ ] No input validation (trusting client data)
- [ ] Returning 200 for errors with error info in body
- [ ] Missing CORS configuration
- [ ] No rate limiting on public endpoints

---

_APIs are contracts. Design them carefully, document them thoroughly, test them rigorously._
