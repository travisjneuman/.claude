# websockets-realtime: Security

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Security

### Authentication

```typescript
// Token-based authentication
const ws = new WebSocket("wss://api.example.com/ws");

ws.onopen = () => {
  // Send auth message immediately
  ws.send(
    JSON.stringify({
      type: "auth",
      token: localStorage.getItem("token"),
    }),
  );
};

// Server-side validation
wss.on("connection", (ws, request) => {
  let authenticated = false;
  const authTimeout = setTimeout(() => {
    if (!authenticated) {
      ws.close(4001, "Authentication timeout");
    }
  }, 5000);

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === "auth") {
      if (validateToken(message.token)) {
        authenticated = true;
        clearTimeout(authTimeout);
        ws.send(JSON.stringify({ type: "auth_success" }));
      } else {
        ws.close(4002, "Invalid token");
      }
    } else if (!authenticated) {
      ws.close(4003, "Not authenticated");
    }
  });
});
```

### Rate Limiting

```typescript
const rateLimits = new Map<WebSocket, { count: number; timestamp: number }>();

function checkRateLimit(ws: WebSocket): boolean {
  const now = Date.now();
  const limit = rateLimits.get(ws);

  if (!limit || now - limit.timestamp > 1000) {
    rateLimits.set(ws, { count: 1, timestamp: now });
    return true;
  }

  if (limit.count >= 10) {
    // 10 messages per second
    return false;
  }

  limit.count++;
  return true;
}

ws.on("message", (data) => {
  if (!checkRateLimit(ws)) {
    ws.send(JSON.stringify({ type: "error", message: "Rate limit exceeded" }));
    return;
  }
  // Process message
});
```

---
