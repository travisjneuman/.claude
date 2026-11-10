# database-expert: MongoDB

Part of the `database-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## MongoDB

### Schema Design Patterns

```javascript
// Embedding (for 1:few relationships)
const userSchema = {
  _id: ObjectId,
  email: String,
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
  },
  addresses: [
    {
      type: String,
      street: String,
      city: String,
    },
  ],
};

// Referencing (for 1:many relationships)
const postSchema = {
  _id: ObjectId,
  authorId: ObjectId,
  title: String,
  content: String,
  tags: [String],
};
```

### Aggregation Pipeline

```javascript
// Complex aggregation
db.orders.aggregate([
  {
    $match: {
      status: "completed",
      createdAt: { $gte: ISODate("2024-01-01") },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $group: {
      _id: { month: { $month: "$createdAt" } },
      totalRevenue: { $sum: "$total" },
      orderCount: { $sum: 1 },
    },
  },
  { $sort: { totalRevenue: -1 } },
]);
```

### Indexes

```javascript
// Compound index
db.posts.createIndex({ authorId: 1, createdAt: -1 });

// Text index
db.posts.createIndex(
  { title: "text", content: "text" },
  { weights: { title: 10, content: 1 } },
);

// Partial index
db.orders.createIndex(
  { createdAt: 1 },
  { partialFilterExpression: { status: "pending" } },
);

// TTL index (auto-expire)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

---
