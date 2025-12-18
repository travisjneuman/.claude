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

### App Router Structure

```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── (auth)/              # Route group
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/
│   ├── layout.tsx       # Dashboard layout
│   ├── page.tsx         # Dashboard home
│   └── [id]/page.tsx    # Dynamic route
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
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
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
import { IsEmail, IsString, MinLength } from 'class-validator';

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
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
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

---

## Related Skills

| Skill | When to Use |
|-------|-------------|
| `generic-fullstack-code-reviewer` | Code review |
| `generic-fullstack-design-system` | Design patterns |
| `generic-fullstack-feature-developer` | Feature implementation |
| `generic-fullstack-ux-designer` | UX design |
| `generic-react-*` | React-specific patterns |
| `security` | Auth, validation |
| `test-specialist` | Testing guidance |

### Invoke with:
```
Skill(generic-fullstack-code-reviewer)
Skill(generic-fullstack-feature-developer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/stacks/react-typescript.md` - React patterns

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

*Full-stack: type-safe from database to UI.*
