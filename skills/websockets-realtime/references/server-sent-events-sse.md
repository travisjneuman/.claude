# websockets-realtime: Server-Sent Events (SSE)

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Server-Sent Events (SSE)

### Server Implementation

```typescript
import express from "express";

const app = express();

app.get("/events", (req, res) => {
  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send initial event
  res.write("event: connected\n");
  res.write('data: {"status": "connected"}\n\n');

  // Send periodic updates
  const interval = setInterval(() => {
    const data = JSON.stringify({
      timestamp: Date.now(),
      value: Math.random(),
    });
    res.write(`data: ${data}\n\n`);
  }, 1000);

  // Cleanup on disconnect
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(3000);
```

### Client Implementation

```typescript
const eventSource = new EventSource("/events");

eventSource.onopen = () => {
  console.log("SSE connection opened");
};

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};

eventSource.addEventListener("connected", (event) => {
  console.log("Connected event:", event.data);
});

eventSource.onerror = (error) => {
  console.error("SSE error:", error);
  if (eventSource.readyState === EventSource.CLOSED) {
    // Reconnect logic if needed
  }
};

// Close connection
eventSource.close();
```

---
