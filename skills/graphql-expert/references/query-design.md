# graphql-expert: Query Design

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Query Design

### Basic Queries

```graphql
# Simple query
query GetUser {
  user(id: "1") {
    name
    email
  }
}

# With variables
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}

# Multiple queries
query Dashboard {
  me {
    name
    notifications {
      count
    }
  }
  recentPosts(limit: 5) {
    title
    createdAt
  }
}
```

### Pagination

```graphql
# Offset-based (simple, but has issues)
type Query {
  users(limit: Int!, offset: Int!): [User!]!
}

# Cursor-based (recommended)
type Query {
  users(first: Int, after: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Usage
query {
  users(first: 10, after: "cursor123") {
    edges {
      cursor
      node {
        name
        email
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Filtering & Sorting

```graphql
input UserFilter {
  name: StringFilter
  email: StringFilter
  role: Role
  createdAt: DateFilter
}

input StringFilter {
  equals: String
  contains: String
  startsWith: String
}

input DateFilter {
  before: DateTime
  after: DateTime
}

enum UserSortField {
  NAME
  EMAIL
  CREATED_AT
}

input UserSort {
  field: UserSortField!
  direction: SortDirection!
}

enum SortDirection {
  ASC
  DESC
}

type Query {
  users(
    filter: UserFilter
    sort: UserSort
    first: Int
    after: String
  ): UserConnection!
}
```

---
