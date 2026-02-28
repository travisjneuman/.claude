---
description: Generate and manage database migrations
arguments:
  - name: action
    description: "Migration action: create | run | rollback | status"
    required: true
  - name: name
    description: "Migration name (for create action, e.g. 'add-user-roles')"
    required: false
---

# Database Migration Manager

Detects the project's ORM, generates migrations, validates them, and manages the migration lifecycle.

---

## Execution Flow

### Step 1: Detect ORM

```bash
# Prisma
[ -d "prisma" ] && [ -f "prisma/schema.prisma" ] && echo "PRISMA"

# Drizzle
[ -f "drizzle.config.ts" ] || [ -f "drizzle.config.js" ] && echo "DRIZZLE"

# TypeORM
grep -q "typeorm" package.json 2>/dev/null && echo "TYPEORM"

# Sequelize
grep -q "sequelize" package.json 2>/dev/null && echo "SEQUELIZE"

# Django
[ -f "manage.py" ] && grep -q "django" requirements.txt 2>/dev/null && echo "DJANGO"

# Alembic (SQLAlchemy)
[ -f "alembic.ini" ] && echo "ALEMBIC"

# Knex
grep -q "knex" package.json 2>/dev/null && echo "KNEX"

# Golang (golang-migrate / goose)
[ -d "migrations" ] && ls migrations/*.sql &>/dev/null && echo "GO_MIGRATE"
```

---

### Step 2: Run Action

**Action:** `{{action}}`
**Name:** `{{name}}`

#### create - Generate a New Migration

**Prisma:**

```bash
npx prisma migrate dev --name {{name}} --create-only
```

Before running, read `prisma/schema.prisma` and validate:
- No destructive changes without explicit confirmation (dropping columns/tables)
- New required fields have defaults or are nullable
- Index names follow conventions
- Relations have proper onDelete behavior

**Drizzle:**

```bash
npx drizzle-kit generate:pg --name {{name}}
```

**TypeORM:**

```bash
npx typeorm migration:generate -n {{name}} -d src/data-source.ts
```

**Django:**

```bash
python manage.py makemigrations --name {{name}}
```

**Alembic:**

```bash
alembic revision --autogenerate -m "{{name}}"
```

**Knex:**

```bash
npx knex migrate:make {{name}}
```

**After generation:**

1. Read the generated migration file
2. Verify it matches intended changes
3. Check for destructive operations
4. Validate reversibility (down migration exists)

```
Migration Created
-----------------
File: prisma/migrations/20240115_add_user_roles/migration.sql
ORM:  Prisma

Changes detected:
  + CREATE TABLE "Role" (id, name, createdAt)
  + ALTER TABLE "User" ADD COLUMN "roleId" (FK -> Role.id)
  + CREATE INDEX "User_roleId_idx" ON "User"("roleId")

Safety check:
  [PASS] No destructive operations
  [PASS] New columns are nullable or have defaults
  [PASS] Foreign keys have ON DELETE behavior
  [PASS] Indexes added for foreign keys

Ready to apply with: /migrate run
```

#### run - Apply Pending Migrations

**Prisma:**

```bash
# Development
npx prisma migrate dev

# Production (no interactive prompts)
npx prisma migrate deploy
```

**Drizzle:**

```bash
npx drizzle-kit push:pg
```

**TypeORM:**

```bash
npx typeorm migration:run -d src/data-source.ts
```

**Django:**

```bash
python manage.py migrate
```

**Alembic:**

```bash
alembic upgrade head
```

**Knex:**

```bash
npx knex migrate:latest
```

**After running:**

```
Migration Applied
-----------------
Applied: 1 migration(s)

  1. 20240115_add_user_roles
     + Created table: Role
     + Added column: User.roleId
     + Created index: User_roleId_idx

Duration: 0.3s
```

#### rollback - Revert Last Migration

**Safety check first:** Read the migration to understand what will be reversed.

**Prisma:** Does not support direct rollback. Alternatives:

```bash
# Option 1: Reset to clean state (development only)
npx prisma migrate reset

# Option 2: Create a reverse migration
npx prisma migrate dev --name undo_{{name}}
```

**TypeORM:**

```bash
npx typeorm migration:revert -d src/data-source.ts
```

**Django:**

```bash
python manage.py migrate <app_name> <previous_migration_number>
```

**Alembic:**

```bash
alembic downgrade -1
```

**Knex:**

```bash
npx knex migrate:rollback
```

**After rollback:**

```
Migration Rolled Back
---------------------
Reverted: 20240115_add_user_roles

Reversed operations:
  - Dropped index: User_roleId_idx
  - Dropped column: User.roleId
  - Dropped table: Role

Current state: 20240110_initial_schema
```

#### status - Show Migration Status

**Prisma:**

```bash
npx prisma migrate status
```

**Django:**

```bash
python manage.py showmigrations
```

**Alembic:**

```bash
alembic current
alembic history
```

**Knex:**

```bash
npx knex migrate:status
```

**Report format:**

```
Migration Status
----------------
ORM:      Prisma

Applied (12):
  1. 20240101_initial_schema
  2. 20240105_add_posts_table
  ...
  12. 20240115_add_user_roles

Pending (0):
  (none)

Schema drift: None detected
Last applied: 2024-01-15 14:30:00
```

---

### Step 3: Safety Validations

For all migration operations, check:

| Check                          | Action if Failed                                      |
| ------------------------------ | ----------------------------------------------------- |
| Destructive operation detected | Warn user, require explicit confirmation               |
| No down migration              | Warn that rollback will not be possible                |
| Data loss risk                 | Suggest backup command before proceeding               |
| Large table alteration         | Warn about potential lock time in production           |
| Production environment         | Require explicit confirmation                          |

**Destructive operation patterns to flag:**

- DROP TABLE or DROP COLUMN
- ALTER COLUMN with type change
- TRUNCATE
- DELETE FROM without WHERE

---

## Quick Reference

```
/migrate status                    # Check current state
/migrate create add-user-roles     # Generate new migration
/migrate run                       # Apply pending migrations
/migrate rollback                  # Revert last migration
```

---

## Related Documentation

- `~/.claude/docs/reference/stacks/fullstack-nextjs-nestjs.md` - Prisma patterns
- `~/.claude/docs/reference/stacks/python.md` - Python ORM patterns

---

_Part of the Ultimate Claude Code Toolkit_
