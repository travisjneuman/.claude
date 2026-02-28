# Full-Stack Guide (Next.js + NestJS)

**When to use:** Full-stack applications with Next.js frontend and NestJS backend.

---

## Project Structure

```
monorepo/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Client utilities
│   └── api/              # NestJS backend
│       ├── src/
│       │   ├── modules/  # Feature modules
│       │   ├── common/   # Shared utilities
│       │   └── main.ts   # Entry point
│       └── prisma/       # Database schema
├── packages/
│   └── shared/           # Shared types/utils
└── package.json          # Workspace root
```

---

## Common Commands

```bash
# Development
npm run dev              # Start all services
npm run dev:web          # Frontend only
npm run dev:api          # Backend only

# Testing
npm run test             # All tests
npm run test:web         # Frontend tests
npm run test:api         # Backend tests

# Build
npm run build            # Build all
npm run type-check       # TypeScript validation

# Database (Prisma)
npx prisma migrate dev   # Run migrations
npx prisma generate      # Generate client
npx prisma studio        # Database GUI
```

---

## Next.js Patterns

### App Router Structure (Next.js 15)

```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── loading.tsx          # Loading UI (Suspense boundary)
├── error.tsx            # Error boundary
├── (auth)/              # Route group
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx       # Dashboard layout
│   ├── page.tsx         # Dashboard home
│   ├── [id]/page.tsx    # Dynamic route
│   └── actions.ts       # Server Actions
└── api/                 # API routes (BFF)
    └── [...]/route.ts
```

### Server Components (Default)

```typescript
// app/users/page.tsx - Server Component
async function UsersPage() {
  const users = await fetchUsers(); // Direct data fetch

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Client Components

```typescript
// components/Counter.tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## NestJS Patterns

### Module Structure

```typescript
// src/modules/users/users.module.ts
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

### Controller

```typescript
// src/modules/users/users.controller.ts
@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
```

### Service

```typescript
// src/modules/users/users.service.ts
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: dto });
  }
}
```

### DTOs with Validation

```typescript
// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

---

## Prisma Patterns

### Schema

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
}
```

### Migrations

```bash
# Create migration
npx prisma migrate dev --name add_user_table

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

---

## API Communication

### Shared Types

```typescript
// packages/shared/types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}
```

### Frontend API Client

```typescript
// apps/web/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
```

---

## Authentication Flow

```
1. User submits credentials → Next.js API route
2. API route forwards to NestJS auth endpoint
3. NestJS validates, returns JWT
4. Next.js sets HTTP-only cookie
5. Subsequent requests include cookie
6. NestJS AuthGuard validates JWT
```

### Auth.js v5 (Recommended)

```typescript
// auth.ts (formerly NextAuth)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const user = await verifyUser(credentials);
        return user ?? null;
      },
    }),
  ],
});

// app/api/auth/[...nextauth]/route.ts
export { handlers as GET, handlers as POST } from "@/auth";

// Middleware for protected routes
// middleware.ts
export { auth as middleware } from "@/auth";
export const config = { matcher: ["/dashboard/:path*"] };
```

---

## Related Skills

| Skill                                 | When to Use             |
| ------------------------------------- | ----------------------- |
| `generic-fullstack-code-reviewer`     | Code review             |
| `generic-fullstack-design-system`     | Design patterns         |
| `generic-fullstack-feature-developer` | Feature implementation  |
| `generic-fullstack-ux-designer`       | UX design               |
| `generic-react-*`                     | React-specific patterns |
| `security`                            | Auth, validation        |
| `test-specialist`                     | Testing guidance        |

### Invoke with:

```
Skill(generic-fullstack-code-reviewer)
Skill(generic-fullstack-feature-developer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/stacks/react-typescript.md` - React patterns

---

## Anti-Patterns

### Frontend

- [ ] Using `any` type
- [ ] Missing error boundaries
- [ ] Not using server components when possible
- [ ] Exposing sensitive env vars

### Backend

- [ ] No input validation
- [ ] Missing auth guards
- [ ] Raw SQL queries (use Prisma)
- [ ] Secrets in code

### Database

- [ ] No migrations (manual schema changes)
- [ ] Missing indexes on query fields
- [ ] N+1 queries (use includes)

---

## Next.js 15 Features

### Server Actions

```typescript
// app/dashboard/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createItem(formData: FormData) {
  const name = formData.get('name') as string;
  await db.items.create({ data: { name } });
  revalidatePath('/dashboard');
}

// Usage in component (no API route needed)
export default function CreateForm() {
  return (
    <form action={createItem}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

### Turbopack (Dev Server)

```bash
# Use Turbopack for faster dev server (default in Next.js 15)
next dev --turbopack
```

### Partial Prerendering

```typescript
// Combine static and dynamic content in one route
// Static shell renders instantly, dynamic parts stream in
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <StaticHeader />           {/* Pre-rendered at build */}
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />       {/* Streams in at request time */}
      </Suspense>
    </div>
  );
}
```

---

## tRPC for Type-Safe APIs

```typescript
// packages/api/src/router.ts
import { router, publicProcedure, protectedProcedure } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return db.user.findUnique({ where: { id: input.id } });
    }),
  createUser: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      return db.user.create({ data: input });
    }),
});

export type AppRouter = typeof appRouter;

// apps/web/lib/trpc.ts - Client usage (fully typed)
const user = trpc.getUser.useQuery({ id: '123' });
const mutation = trpc.createUser.useMutation();
```

---

## Drizzle ORM (Prisma Alternative)

```typescript
// drizzle/schema.ts
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Usage - SQL-like but type-safe
const allUsers = await db.select().from(users).where(eq(users.email, email));
await db.insert(users).values({ name, email });
```

---

## Turborepo for Monorepo

```bash
# Initialize with Turborepo
npx create-turbo@latest

# Run tasks in parallel with caching
turbo run build
turbo run test --filter=./apps/web
turbo run lint --filter=./packages/*
```

```json
// turbo.json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "test": { "dependsOn": ["build"] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

---

## Docker Patterns

```dockerfile
# Dockerfile (multi-stage for full-stack)
FROM node:20-alpine AS base
RUN npm install -g turbo

FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN npm ci
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=web

FROM base AS runner
WORKDIR /app
RUN addgroup --system nodejs && adduser --system nextjs
COPY --from=installer /app/apps/web/.next/standalone ./
COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer /app/apps/web/public ./apps/web/public
USER nextjs
CMD ["node", "apps/web/server.js"]
```

---

_Full-stack: type-safe from database to UI._
