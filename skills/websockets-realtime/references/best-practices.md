# websockets-realtime: Best Practices

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Best Practices

### DO:

- Use WSS (WebSocket Secure) in production
- Implement heartbeat/ping-pong
- Handle reconnection gracefully
- Authenticate connections
- Validate all incoming messages
- Use message IDs for acknowledgment
- Implement backpressure handling
- Monitor connection health

### DON'T:

- Trust client data without validation
- Send sensitive data without encryption
- Keep connections open indefinitely
- Ignore disconnection handling
- Block the message handler
- Send unbounded data
- Forget about horizontal scaling

---
