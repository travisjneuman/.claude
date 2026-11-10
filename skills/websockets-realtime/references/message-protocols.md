# websockets-realtime: Message Protocols

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Message Protocols

### JSON Message Format

```typescript
// Define message types
interface BaseMessage {
  type: string;
  timestamp: number;
  id: string;
}

interface ChatMessage extends BaseMessage {
  type: "chat";
  room: string;
  content: string;
  sender: string;
}

interface PresenceMessage extends BaseMessage {
  type: "presence";
  status: "online" | "offline" | "away";
  userId: string;
}

interface ErrorMessage extends BaseMessage {
  type: "error";
  code: string;
  message: string;
}

type Message = ChatMessage | PresenceMessage | ErrorMessage;

// Type-safe message handling
function handleMessage(data: string) {
  const message: Message = JSON.parse(data);

  switch (message.type) {
    case "chat":
      displayChatMessage(message);
      break;
    case "presence":
      updateUserPresence(message);
      break;
    case "error":
      handleError(message);
      break;
  }
}
```

### Binary Protocols

```typescript
// For high-performance needs, use binary formats

// MessagePack
import { encode, decode } from "@msgpack/msgpack";

const encoded = encode({ type: "position", x: 100, y: 200 });
ws.send(encoded);

ws.onmessage = (event) => {
  const data = decode(event.data);
};

// Protocol Buffers
// Define schema in .proto file, generate types
// Smaller messages, faster serialization
```

---
