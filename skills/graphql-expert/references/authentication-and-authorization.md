# graphql-expert: Authentication & Authorization

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Authentication & Authorization

### Context-Based Auth

```typescript
// Add user to context
const context = async ({ req }) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = token ? await verifyToken(token) : null;
  return { user };
};

// Check in resolvers
const resolvers = {
  Query: {
    me: (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      return context.user;
    },
  },
};
```

### Directive-Based Auth

```graphql
directive @auth(requires: Role = USER) on FIELD_DEFINITION

type Query {
  publicPosts: [Post!]!
  me: User @auth
  adminDashboard: Dashboard @auth(requires: ADMIN)
}
```

```typescript
// Directive implementation
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const requiredRole = this.args.requires;

    field.resolve = async function (...args) {
      const context = args[2];

      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      if (requiredRole && context.user.role !== requiredRole) {
        throw new ForbiddenError("Not authorized");
      }

      return resolve.apply(this, args);
    };
  }
}
```

---
