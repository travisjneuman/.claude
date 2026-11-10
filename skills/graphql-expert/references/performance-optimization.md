# graphql-expert: Performance Optimization

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Performance Optimization

### DataLoader (N+1 Solution)

```typescript
import DataLoader from "dataloader";

// Create loader
const userLoader = new DataLoader<string, User>(async (ids) => {
  const users = await db.users.findMany({
    where: { id: { in: ids } },
  });

  // Return in same order as input ids
  const userMap = new Map(users.map((u) => [u.id, u]));
  return ids.map((id) => userMap.get(id) || null);
});

// Use in resolver
const resolvers = {
  Post: {
    author: (post, _, context) => {
      return context.loaders.userLoader.load(post.authorId);
    },
  },
};
```

### Query Complexity

```typescript
import { createComplexityLimitRule } from "graphql-validation-complexity";

// Limit query complexity
const complexityLimitRule = createComplexityLimitRule(1000, {
  scalarCost: 1,
  objectCost: 10,
  listFactor: 10,
});

// Or field-level costs
const typeDefs = gql`
  type Query {
    users: [User!]! @complexity(value: 10, multipliers: ["first"])
    user(id: ID!): User @complexity(value: 1)
  }
`;
```

### Query Depth Limiting

```typescript
import depthLimit from "graphql-depth-limit";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(10)],
});
```

### Persisted Queries

```typescript
// Client sends hash instead of full query
// Reduces bandwidth, enables whitelisting

// Apollo Client setup
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";

const link = createPersistedQueryLink({ sha256 }).concat(httpLink);

// Server validates against known queries
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new RedisCache(),
  },
});
```

---
