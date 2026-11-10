# websockets-realtime: Server Implementation (Node.js)

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Server Implementation (Node.js)

### ws Library

```typescript
import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";

const server = createServer();
const wss = new WebSocketServer({ server });

// Track connected clients
const clients = new Set<WebSocket>();

wss.on("connection", (ws, request) => {
  console.log("Client connected");
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({ type: "connected", clientCount: clients.size }));

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());
      handleMessage(ws, message);
    } catch (error) {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Heartbeat to detect stale connections
  ws.isAlive = true;
  ws.on("pong", () => {
    ws.isAlive = true;
  });
});

// Heartbeat interval
const heartbeatInterval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on("close", () => {
  clearInterval(heartbeatInterval);
});

function handleMessage(ws: WebSocket, message: any) {
  switch (message.type) {
    case "broadcast":
      broadcast(message.content);
      break;
    case "private":
      // Handle private messages
      break;
    default:
      ws.send(
        JSON.stringify({ type: "error", message: "Unknown message type" }),
      );
  }
}

function broadcast(content: any) {
  const message = JSON.stringify({ type: "broadcast", content });
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

server.listen(3000);
```

### Socket.IO

```typescript
import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
  },
});

// Namespace for chat
const chat = io.of("/chat");

chat.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room
  socket.on("join", (room: string) => {
    socket.join(room);
    socket.to(room).emit("user_joined", { userId: socket.id });
  });

  // Handle message
  socket.on("message", (data: { room: string; content: string }) => {
    chat.to(data.room).emit("message", {
      from: socket.id,
      content: data.content,
      timestamp: Date.now(),
    });
  });

  // Leave room
  socket.on("leave", (room: string) => {
    socket.leave(room);
    socket.to(room).emit("user_left", { userId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (validateToken(token)) {
    socket.data.user = decodeToken(token);
    next();
  } else {
    next(new Error("Authentication error"));
  }
});

httpServer.listen(3000);
```

---
