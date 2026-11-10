---
name: websockets-realtime
description: Real-time communication with WebSockets, Server-Sent Events, and related technologies. Use when building chat, live updates, collaborative features, or any real-time functionality.
---

# WebSockets & Real-Time

Comprehensive guide for building real-time applications.

## Real-Time Technologies

### Comparison

| Technology             | Direction               | Use Case                    |
| ---------------------- | ----------------------- | --------------------------- |
| **WebSocket**          | Bidirectional           | Chat, gaming, collaboration |
| **Server-Sent Events** | Server → Client         | Live feeds, notifications   |
| **Long Polling**       | Simulated bidirectional | Fallback, simple updates    |
| **WebRTC**             | Peer-to-peer            | Video calls, file sharing   |

### When to Use What

```
WEBSOCKETS:
✓ Chat applications
✓ Real-time collaboration
✓ Gaming
✓ Financial trading
✓ IoT dashboards
✓ Any bidirectional communication

SERVER-SENT EVENTS (SSE):
✓ Live feeds (news, sports)
✓ Notifications
✓ Progress updates
✓ Server-initiated updates only

LONG POLLING:
✓ Fallback when WebSocket unavailable
✓ Simple, infrequent updates
✓ Behind strict firewalls

WEBRTC:
✓ Video/audio calls
✓ Screen sharing
✓ Peer-to-peer file transfer
```

---

## WebSocket Fundamentals

### How WebSockets Work

```
HTTP Upgrade Handshake:
┌──────┐                      ┌──────┐
│Client│  GET /ws HTTP/1.1    │Server│
│      │  Upgrade: websocket  │      │
│      │ ──────────────────>  │      │
│      │                      │      │
│      │  HTTP/1.1 101        │      │
│      │  Switching Protocols │      │
│      │ <──────────────────  │      │
└──────┘                      └──────┘

After handshake:
┌──────┐                      ┌──────┐
│Client│ <═══════════════════>│Server│
│      │  Full-duplex TCP     │      │
│      │  Binary or text      │      │
└──────┘                      └──────┘
```

### Client Implementation

```typescript
// Basic WebSocket client
const ws = new WebSocket("wss://api.example.com/ws");

ws.onopen = () => {
  console.log("Connected");
  ws.send(JSON.stringify({ type: "subscribe", channel: "updates" }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};

ws.onclose = (event) => {
  console.log("Disconnected:", event.code, event.reason);
};

// Send message
ws.send(JSON.stringify({ type: "message", content: "Hello!" }));

// Close connection
ws.close(1000, "Normal closure");
```

### Reconnection Logic

```typescript
class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log("Connected");
      this.reconnectAttempts = 0;
    };

    this.ws.onclose = (event) => {
      if (event.code !== 1000) {
        this.reconnect();
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(
      `Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`,
    );

    setTimeout(() => this.connect(), delay);
  }

  send(data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/websockets-realtime/`).

| Topic | File | Covers |
| --- | --- | --- |
| Server Implementation (Node.js) | [`references/server-implementation-node-js.md`](references/server-implementation-node-js.md) | ws Library; Socket.IO |
| Server-Sent Events (SSE) | [`references/server-sent-events-sse.md`](references/server-sent-events-sse.md) | Server Implementation; Client Implementation |
| Message Protocols | [`references/message-protocols.md`](references/message-protocols.md) | JSON Message Format; Binary Protocols |
| Scaling WebSockets | [`references/scaling-websockets.md`](references/scaling-websockets.md) | Architecture; Redis Pub/Sub for Cross-Server Messages; Socket.IO with Redis Adapter |
| React Integration | [`references/react-integration.md`](references/react-integration.md) | Custom Hook; Socket.IO Client |
| Security | [`references/security.md`](references/security.md) | Authentication; Rate Limiting |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Troubleshooting | [`references/troubleshooting.md`](references/troubleshooting.md) | Common Issues; Debug Logging |
