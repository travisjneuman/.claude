# graphql-expert: Mutations

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Mutations

### Mutation Design

```graphql
# Input types for mutations
input CreatePostInput {
  title: String!
  content: String!
  published: Boolean = false
  categoryIds: [ID!]
}

input UpdatePostInput {
  title: String
  content: String
  published: Boolean
}

# Mutation payloads (recommended)
type CreatePostPayload {
  post: Post
  errors: [Error!]!
}

type Error {
  field: String
  message: String!
}

type Mutation {
  createPost(input: CreatePostInput!): CreatePostPayload!
  updatePost(id: ID!, input: UpdatePostInput!): UpdatePostPayload!
  deletePost(id: ID!): DeletePostPayload!
}

# Usage
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    post {
      id
      title
    }
    errors {
      field
      message
    }
  }
}
```

### Batch Mutations

```graphql
# For multiple operations
type Mutation {
  bulkDeletePosts(ids: [ID!]!): BulkDeletePayload!
  bulkUpdatePosts(updates: [PostUpdate!]!): BulkUpdatePayload!
}

input PostUpdate {
  id: ID!
  input: UpdatePostInput!
}
```

---
