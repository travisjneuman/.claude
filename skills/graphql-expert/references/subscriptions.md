# graphql-expert: Subscriptions

Part of the `graphql-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Subscriptions

### Setup

```graphql
type Subscription {
  messageCreated(roomId: ID!): Message!
  userStatusChanged(userId: ID!): UserStatus!
}
```

```typescript
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    sendMessage: async (_, { input }, context) => {
      const message = await createMessage(input);

      pubsub.publish(`MESSAGE_CREATED_${input.roomId}`, {
        messageCreated: message,
      });

      return message;
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: (_, { roomId }) => {
        return pubsub.asyncIterator(`MESSAGE_CREATED_${roomId}`);
      },
    },
  },
};
```

### With Filtering

```typescript
import { withFilter } from "graphql-subscriptions";

const resolvers = {
  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("MESSAGE_CREATED"),
        (payload, variables, context) => {
          // Only send to users in the room
          return (
            payload.messageCreated.roomId === variables.roomId &&
            context.user.rooms.includes(variables.roomId)
          );
        },
      ),
    },
  },
};
```

---
