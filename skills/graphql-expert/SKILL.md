---
name: graphql-expert
description: GraphQL API design and implementation. Use when building GraphQL APIs, designing schemas, implementing resolvers, or optimizing GraphQL performance.
---

# GraphQL Expert

Comprehensive guide for designing and implementing GraphQL APIs.

## GraphQL Fundamentals

### What is GraphQL?

```
GraphQL is a query language for APIs that:
✓ Lets clients request exactly what they need
✓ Gets multiple resources in one request
✓ Uses a type system to describe data
✓ Provides introspection (self-documenting)

GraphQL vs REST:
┌─────────────────────────────────────────┐
│ REST: Multiple endpoints, fixed shapes  │
│ GET /users/1                            │
│ GET /users/1/posts                      │
│ GET /users/1/followers                  │
├─────────────────────────────────────────┤
│ GraphQL: Single endpoint, flexible      │
│ POST /graphql                           │
│ query { user(id: 1) {                   │
│   name                                  │
│   posts { title }                       │
│   followers { name }                    │
│ }}                                      │
└─────────────────────────────────────────┘
```

---

## Schema Design

### Type System

```graphql
# Scalar Types (built-in)
String, Int, Float, Boolean, ID

# Custom Scalar
scalar DateTime
scalar JSON

# Object Type
type User {
  id: ID!
  email: String!
  name: String
  createdAt: DateTime!
  posts: [Post!]!
}

# Enum
enum Role {
  ADMIN
  USER
  GUEST
}

# Interface
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  # ... other fields
}

# Union
union SearchResult = User | Post | Comment

# Input Type (for mutations)
input CreateUserInput {
  email: String!
  name: String!
  role: Role = USER
}
```

### Nullability

```graphql
# Field modifiers:
String      # Nullable string
String!     # Non-null string
[String]    # Nullable list of nullable strings
[String!]   # Nullable list of non-null strings
[String]!   # Non-null list of nullable strings
[String!]!  # Non-null list of non-null strings

# Best practice:
# - Make fields nullable by default
# - Use ! only when guaranteed non-null
# - Lists should usually be non-null: [Item!]!
```

### Schema Structure

```graphql
# Root Types
type Query {
  # Read operations
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  me: User
}

type Mutation {
  # Write operations
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
  deleteUser(id: ID!): Boolean!
}

type Subscription {
  # Real-time updates
  userCreated: User!
  messageReceived(roomId: ID!): Message!
}
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/graphql-expert/`).

| Topic | File | Covers |
| --- | --- | --- |
| Query Design | [`references/query-design.md`](references/query-design.md) | Basic Queries; Pagination; Filtering & Sorting |
| Mutations | [`references/mutations.md`](references/mutations.md) | Mutation Design; Batch Mutations |
| Resolvers | [`references/resolvers.md`](references/resolvers.md) | Basic Resolvers; Resolver Context |
| Performance Optimization | [`references/performance-optimization.md`](references/performance-optimization.md) | DataLoader (N+1 Solution); Query Complexity; Query Depth Limiting; Persisted Queries |
| Authentication & Authorization | [`references/authentication-and-authorization.md`](references/authentication-and-authorization.md) | Context-Based Auth; Directive-Based Auth |
| Error Handling | [`references/error-handling.md`](references/error-handling.md) | Error Types; Error Formatting |
| Subscriptions | [`references/subscriptions.md`](references/subscriptions.md) | Setup; With Filtering |
| Client Integration | [`references/client-integration.md`](references/client-integration.md) | Apollo Client Setup; React Hooks |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |

## Schema Checklist

- [ ] Types named descriptively (singular, PascalCase)
- [ ] Consistent nullability patterns
- [ ] Input types for all mutations
- [ ] Payload types with error handling
- [ ] Pagination for all lists
- [ ] Authentication/authorization considered
- [ ] Performance optimizations in place
