# database-expert: Redis

Part of the `database-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Redis

### Data Structures

```redis
# Strings
SET user:1:name "John Doe"
GET user:1:name
SETEX session:abc123 3600 "user_data"
INCR page:home:views

# Hashes
HSET user:1 name "John" email "john@example.com"
HGETALL user:1

# Lists (queues)
LPUSH queue:jobs '{"type":"email"}'
RPOP queue:jobs

# Sets
SADD user:1:roles admin editor
SISMEMBER user:1:roles admin

# Sorted Sets (leaderboards)
ZADD leaderboard 1000 "player1" 1500 "player2"
ZREVRANGE leaderboard 0 9 WITHSCORES

# Streams (event log)
XADD events * type "user_login" user_id "123"
XREAD COUNT 10 STREAMS events 0
```

### Caching Patterns

```typescript
// Cache-aside pattern
async function getUser(userId: string): Promise<User> {
  const cacheKey = `user:${userId}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const user = await db.users.findById(userId);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}

// Rate limiting
async function checkRateLimit(
  userId: string,
  limit: number,
  window: number,
): Promise<boolean> {
  const key = `ratelimit:${userId}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, window);
  }

  return current <= limit;
}

// Distributed lock
async function acquireLock(
  resource: string,
  ttl: number,
): Promise<string | null> {
  const lockId = crypto.randomUUID();
  const acquired = await redis.set(`lock:${resource}`, lockId, "NX", "EX", ttl);
  return acquired ? lockId : null;
}

// Release lock with Lua script (atomic operation)
// Use EVALSHA with pre-loaded script for production
const releaseLockScript = `
  if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
  else
    return 0
  end
`;
```

### Pub/Sub

```typescript
// Publisher
async function publishEvent(channel: string, event: object): Promise<void> {
  await redis.publish(channel, JSON.stringify(event));
}

// Subscriber
const subscriber = redis.duplicate();
subscriber.subscribe("events");
subscriber.on("message", (channel, message) => {
  const event = JSON.parse(message);
  handleEvent(event);
});
```

---
