# websockets-realtime: Scaling WebSockets

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Scaling WebSockets

### Architecture

```
                    Load Balancer
                   (Sticky Sessions)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ Server 1│      │ Server 2│      │ Server 3│
   │ (Node)  │      │ (Node)  │      │ (Node)  │
   └────┬────┘      └────┬────┘      └────┬────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                    ┌─────────┐
                    │  Redis  │
                    │ Pub/Sub │
                    └─────────┘
```

### Redis Pub/Sub for Cross-Server Messages

```typescript
import Redis from "ioredis";
import { WebSocketServer } from "ws";

const pub = new Redis();
const sub = new Redis();

const wss = new WebSocketServer({ port: 3000 });

// Subscribe to channel
sub.subscribe("broadcast");

// Forward Redis messages to local clients
sub.on("message", (channel, message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});

// Publish messages to Redis
function broadcast(message: object) {
  pub.publish("broadcast", JSON.stringify(message));
}

// Receive from WebSocket, publish to Redis
wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    broadcast(JSON.parse(data.toString()));
  });
});
```

### Socket.IO with Redis Adapter

```typescript
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

await Promise.all([pubClient.connect(), subClient.connect()]);

const io = new Server();
io.adapter(createAdapter(pubClient, subClient));

// Now messages are automatically synchronized across servers
io.emit("notification", { message: "Hello all servers!" });
```

---
