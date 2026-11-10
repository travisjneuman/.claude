# microservices-architecture: Testing Strategies

Part of the `microservices-architecture` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing Strategies

### Test Pyramid for Microservices

```
              /\
             /  \  E2E Tests
            /────\  (Few, slow, brittle)
           /      \
          /────────\  Contract Tests
         /          \  (Service boundaries)
        /────────────\
       /              \  Integration Tests
      /────────────────\  (With dependencies)
     /                  \
    /────────────────────\  Unit Tests
   /                      \  (Many, fast, isolated)
  /________________________\
```

### Contract Testing

```typescript
// Consumer test (Order Service)
describe("User Service Contract", () => {
  it("returns user by ID", async () => {
    // Define expected interaction
    await provider.addInteraction({
      state: "user 123 exists",
      uponReceiving: "a request for user 123",
      withRequest: {
        method: "GET",
        path: "/users/123",
      },
      willRespondWith: {
        status: 200,
        body: {
          id: "123",
          name: like("John"),
          email: like("john@example.com"),
        },
      },
    });

    // Test passes if consumer expectations match
  });
});
```

---
