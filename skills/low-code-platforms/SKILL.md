---
name: low-code-platforms
description: Low-code and internal tool platforms including Retool, Supabase, Appsmith, Tooljet, n8n, and Zapier. Use when building admin panels, internal tools, workflow automations, or integrating low-code platforms with custom code.
---

# Low-Code & Internal Tool Platforms

## Platform Selection

| Platform | Best For | Pricing Model |
|----------|----------|---------------|
| **Retool** | Internal tools, admin panels | Per-user |
| **Supabase** | Backend-as-a-service, auth, DB | Usage-based |
| **Appsmith** | Internal tools (open source) | Self-host free |
| **Tooljet** | Internal tools (open source) | Self-host free |
| **n8n** | Workflow automation (open source) | Self-host free |
| **Zapier** | SaaS-to-SaaS integrations | Per-task |

## Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth
const { data: { user } } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password',
});

// Database (auto-generated REST API from Postgres)
const { data, error } = await supabase
  .from('posts')
  .select('*, author:users(name)')
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(10);

// Real-time subscriptions
supabase.channel('posts')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => console.log('New post:', payload.new))
  .subscribe();

// Row Level Security (RLS)
// CREATE POLICY "Users can only see own posts"
//   ON posts FOR SELECT
//   USING (auth.uid() = user_id);

// Storage
const { data: upload } = await supabase.storage
  .from('avatars')
  .upload('user_123/avatar.png', file);

// Edge Functions (Deno)
// supabase/functions/hello/index.ts
Deno.serve(async (req) => {
  return new Response(JSON.stringify({ message: 'Hello!' }));
});
```

## Retool

```javascript
// Retool query (SQL)
SELECT * FROM orders
WHERE status = {{ statusDropdown.value }}
AND created_at >= {{ dateRange.start }}
ORDER BY created_at DESC
LIMIT {{ pagination.pageSize }}
OFFSET {{ (pagination.page - 1) * pagination.pageSize }}

// Retool transformer
const enriched = data.map(row => ({
  ...row,
  total_formatted: `$${row.total.toFixed(2)}`,
  status_color: row.status === 'paid' ? 'green' : 'red',
}));
return enriched;
```

## n8n Workflow Automation

```json
{
  "nodes": [
    { "type": "n8n-nodes-base.webhook", "name": "Webhook Trigger" },
    { "type": "n8n-nodes-base.httpRequest", "name": "Fetch Data" },
    { "type": "n8n-nodes-base.if", "name": "Check Condition" },
    { "type": "n8n-nodes-base.slack", "name": "Send Notification" }
  ]
}
```

## Integration Patterns
- **Custom code escape hatches:** When low-code hits limits, embed custom JS/Python
- **API-first backend:** Use Supabase/Firebase as backend, custom frontend
- **Hybrid architecture:** Low-code for admin panels, custom code for customer-facing
- **Data sync:** Webhook-triggered n8n/Zapier workflows between SaaS tools
- **Self-hosting:** Prefer Appsmith/Tooljet/n8n for data sovereignty requirements
