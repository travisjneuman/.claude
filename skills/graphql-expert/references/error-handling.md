# graphql-expert: Error Handling

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Error Handling

### Error Types

```typescript
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server";

// Validation errors
throw new UserInputError("Invalid email format", {
  field: "email",
});

// Auth errors
throw new AuthenticationError("Must be logged in");
throw new ForbiddenError("Not authorized to view this resource");

// Custom errors
class NotFoundError extends ApolloError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND");
  }
}
```

### Error Formatting

```typescript
const server = new ApolloServer({
  formatError: (error) => {
    // Log internal errors
    if (error.extensions?.code === "INTERNAL_SERVER_ERROR") {
      console.error(error);
      return new Error("Internal server error");
    }

    // Mask sensitive info
    if (error.message.includes("password")) {
      return new Error("An error occurred");
    }

    return error;
  },
});
```

---
