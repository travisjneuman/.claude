# graphql-expert: Resolvers

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Resolvers

### Basic Resolvers

```typescript
// TypeScript resolver implementation
const resolvers = {
  Query: {
    user: async (_, { id }, context) => {
      return context.dataSources.users.findById(id);
    },

    users: async (_, { filter, sort, first, after }, context) => {
      return context.dataSources.users.findMany({
        filter,
        sort,
        first,
        after,
      });
    },
  },

  Mutation: {
    createUser: async (_, { input }, context) => {
      // Validate
      const errors = validateCreateUser(input);
      if (errors.length) {
        return { user: null, errors };
      }

      // Create
      const user = await context.dataSources.users.create(input);
      return { user, errors: [] };
    },
  },

  // Field resolvers
  User: {
    posts: async (user, _, context) => {
      return context.dataSources.posts.findByUserId(user.id);
    },

    fullName: (user) => {
      return `${user.firstName} ${user.lastName}`;
    },
  },
};
```

### Resolver Context

```typescript
// Context setup
interface Context {
  user: User | null;
  dataSources: {
    users: UserDataSource;
    posts: PostDataSource;
  };
  loaders: {
    userLoader: DataLoader<string, User>;
    postLoader: DataLoader<string, Post>;
  };
}

// In server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUserFromToken(req.headers.authorization),
    dataSources: {
      users: new UserDataSource(db),
      posts: new PostDataSource(db),
    },
    loaders: createLoaders(),
  }),
});
```

---
