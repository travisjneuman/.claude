# websockets-realtime: Troubleshooting

Part of the `websockets-realtime` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Troubleshooting

### Common Issues

| Problem              | Cause                | Solution               |
| -------------------- | -------------------- | ---------------------- |
| Connection drops     | Idle timeout         | Implement heartbeat    |
| Messages lost        | No acknowledgment    | Add message IDs + acks |
| High latency         | Large messages       | Use binary, compress   |
| Memory leak          | Unclosed connections | Proper cleanup         |
| Cross-origin blocked | Missing CORS         | Configure server CORS  |

### Debug Logging

```typescript
// Development logging
if (process.env.NODE_ENV === "development") {
  ws.on("message", (data) => {
    console.log("← Received:", JSON.parse(data.toString()));
  });

  const originalSend = ws.send.bind(ws);
  ws.send = (data: string) => {
    console.log("→ Sending:", JSON.parse(data));
    originalSend(data);
  };
}
```
