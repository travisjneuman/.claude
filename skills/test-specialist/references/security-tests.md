# test-specialist: Security Tests

Part of the `test-specialist` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Security Tests

```typescript
test("prevents SQL injection", async () => {
  const malicious = "'; DROP TABLE users; --";
  await expect(search(malicious)).resolves.not.toThrow();
});

test("sanitizes XSS", () => {
  const xss = '<script>alert("xss")</script>';
  expect(sanitize(xss)).not.toContain("<script>");
});

test("requires auth", async () => {
  await request(app).post("/api/items").expect(401);
});
```
