# websockets-realtime: React Integration

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## React Integration

### Custom Hook

```typescript
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: any) => void;
  reconnect?: boolean;
}

export function useWebSocket(options: UseWebSocketOptions) {
  const { url, onMessage, reconnect = true } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
      onMessage?.(data);
    };

    ws.onclose = () => {
      setIsConnected(false);
      if (reconnect) {
        setTimeout(connect, 3000);
      }
    };

    wsRef.current = ws;
  }, [url, onMessage, reconnect]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { isConnected, lastMessage, send };
}

// Usage
function ChatComponent() {
  const { isConnected, lastMessage, send } = useWebSocket({
    url: 'wss://api.example.com/chat',
    onMessage: (data) => {
      console.log('New message:', data);
    },
  });

  return (
    <div>
      <span>Status: {isConnected ? 'Connected' : 'Disconnected'}</span>
      <button onClick={() => send({ type: 'message', content: 'Hello!' })}>
        Send
      </button>
    </div>
  );
}
```

### Socket.IO Client

```typescript
import { io, Socket } from 'socket.io-client';
import { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('https://api.example.com', {
      auth: { token: getAuthToken() },
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return socket;
}

// Usage
function ChatRoom({ roomId }: { roomId: string }) {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('join', roomId);

    socket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.emit('leave', roomId);
      socket.off('message');
    };
  }, [socket, roomId]);

  const sendMessage = (content: string) => {
    socket.emit('message', { room: roomId, content });
  };

  return (/* render messages */);
}
```

---
