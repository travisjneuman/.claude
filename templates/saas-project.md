---
name: saas-project
description: SaaS starter with Next.js 15, Auth.js, Stripe, Prisma, Resend, PostHog, Tailwind CSS, Vercel deployment
---

# SaaS Project Template

**Stack:** Next.js 15 + TypeScript + Tailwind CSS + Prisma + Stripe + Auth.js + Resend

---

## Directory Structure

```
project/
├── app/
│   ├── (auth)/                    # Auth route group
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── verify-email/page.tsx
│   ├── (dashboard)/               # Protected dashboard
│   │   ├── layout.tsx             # Dashboard layout with sidebar
│   │   ├── page.tsx               # Dashboard home
│   │   ├── settings/
│   │   │   ├── page.tsx           # Account settings
│   │   │   ├── billing/page.tsx   # Billing & subscription
│   │   │   └── team/page.tsx      # Team management
│   │   └── [feature]/page.tsx     # Feature-specific pages
│   ├── (marketing)/               # Public marketing pages
│   │   ├── page.tsx               # Landing page
│   │   ├── pricing/page.tsx       # Pricing page
│   │   ├── blog/                  # Blog
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── changelog/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── webhooks/
│   │   │   └── stripe/route.ts    # Stripe webhooks
│   │   └── trpc/[trpc]/route.ts   # tRPC API (optional)
│   ├── layout.tsx                 # Root layout
│   └── globals.css
├── components/
│   ├── ui/                        # Shared UI primitives (shadcn/ui)
│   ├── layout/                    # Header, Footer, Sidebar, Nav
│   ├── forms/                     # Form components
│   ├── billing/                   # Pricing cards, subscription UI
│   └── marketing/                 # Landing page sections
├── lib/
│   ├── auth.ts                    # Auth.js configuration
│   ├── db.ts                      # Prisma client singleton
│   ├── stripe.ts                  # Stripe client & helpers
│   ├── email.ts                   # Resend email client
│   ├── analytics.ts               # Analytics (PostHog/Plausible)
│   └── utils.ts                   # Shared utilities
├── server/
│   ├── routers/                   # tRPC routers (if using tRPC)
│   └── services/                  # Business logic services
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── seed.ts                    # Seed data
│   └── migrations/
├── emails/                        # React Email templates
│   ├── welcome.tsx
│   ├── reset-password.tsx
│   ├── invoice.tsx
│   └── trial-ending.tsx
├── public/
├── .env.local                     # Local environment variables
├── .env.example                   # Example env template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Authentication ─────────────────────────────────

model User {
  id              String    @id @default(cuid())
  name            String?
  email           String    @unique
  emailVerified   DateTime?
  image           String?
  passwordHash    String?
  role            Role      @default(USER)

  // Relations
  accounts        Account[]
  sessions        Session[]
  subscription    Subscription?
  teamMembers     TeamMember[]
  invoices        Invoice[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([email])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

// ─── Billing ────────────────────────────────────────

model Plan {
  id              String    @id @default(cuid())
  name            String                          // "Starter", "Pro", "Enterprise"
  slug            String    @unique               // "starter", "pro", "enterprise"
  description     String?
  features        Json                            // ["Feature 1", "Feature 2"]
  priceMonthly    Int                             // In cents: 1999 = $19.99
  priceYearly     Int                             // In cents: 19990 = $199.90
  stripePriceIdMonthly  String?
  stripePriceIdYearly   String?
  limits          Json?                           // { "seats": 5, "storage": 10 }
  isActive        Boolean   @default(true)
  sortOrder       Int       @default(0)

  subscriptions   Subscription[]

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Subscription {
  id                    String    @id @default(cuid())
  userId                String    @unique
  planId                String
  stripeCustomerId      String?   @unique
  stripeSubscriptionId  String?   @unique
  stripePriceId         String?
  status                SubStatus @default(TRIALING)
  currentPeriodStart    DateTime?
  currentPeriodEnd      DateTime?
  cancelAtPeriodEnd     Boolean   @default(false)
  trialEndsAt           DateTime?

  user    User @relation(fields: [userId], references: [id], onDelete: Cascade)
  plan    Plan @relation(fields: [planId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([stripeCustomerId])
  @@index([stripeSubscriptionId])
}

enum SubStatus {
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
  INCOMPLETE
}

model Invoice {
  id                  String    @id @default(cuid())
  userId              String
  stripeInvoiceId     String?   @unique
  amountPaid          Int                           // In cents
  currency            String    @default("usd")
  status              String                        // "paid", "open", "void"
  invoiceUrl          String?
  pdfUrl              String?

  user    User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([userId])
}

// ─── Teams ──────────────────────────────────────────

model Team {
  id        String       @id @default(cuid())
  name      String
  slug      String       @unique
  members   TeamMember[]
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}

model TeamMember {
  id        String     @id @default(cuid())
  teamId    String
  userId    String
  role      TeamRole   @default(MEMBER)

  team  Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user  User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
}

enum TeamRole {
  OWNER
  ADMIN
  MEMBER
}
```

---

## Authentication Flow

1. **Registration:** Email/password or OAuth (Google, GitHub)
2. **Email verification:** Send verification link via Resend
3. **Login:** Credentials or OAuth provider
4. **Session management:** JWT or database sessions via Auth.js
5. **Password reset:** Token-based reset flow via email
6. **Protected routes:** Middleware checks session, redirects if unauthenticated

**Auth.js configuration checklist:**

- [ ] Configure providers (Google, GitHub, Credentials)
- [ ] Set up Prisma adapter
- [ ] Configure JWT strategy or database sessions
- [ ] Set up callbacks (session, jwt, signIn)
- [ ] Create middleware for route protection
- [ ] Set NEXTAUTH_SECRET environment variable
- [ ] Configure allowed redirect URLs

---

## Payment Integration Checklist (Stripe)

### Setup

- [ ] Create Stripe account and get API keys
- [ ] Install `stripe` and `@stripe/stripe-js`
- [ ] Configure webhook endpoint (`/api/webhooks/stripe`)
- [ ] Set up Stripe CLI for local webhook testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Products & Pricing

- [ ] Create products in Stripe Dashboard or via API
- [ ] Create price objects (monthly + yearly for each plan)
- [ ] Sync Stripe price IDs to Plan table
- [ ] Build pricing page with plan comparison

### Checkout Flow

- [ ] Create Checkout Session for new subscriptions
- [ ] Handle successful checkout (redirect + webhook)
- [ ] Create Customer Portal session for self-service management
- [ ] Implement upgrade/downgrade flow
- [ ] Handle trial periods

### Webhooks to Handle

- [ ] `checkout.session.completed` - Activate subscription
- [ ] `customer.subscription.updated` - Plan changes
- [ ] `customer.subscription.deleted` - Cancellation
- [ ] `invoice.payment_succeeded` - Record invoice
- [ ] `invoice.payment_failed` - Handle failed payment

### Billing UI

- [ ] Pricing page with plan cards
- [ ] Current plan display in settings
- [ ] Upgrade/downgrade buttons
- [ ] Cancel subscription flow
- [ ] Invoice history
- [ ] Usage meters (if usage-based)

---

## Email System (Resend)

### Transactional Emails

- [ ] Welcome email (after registration)
- [ ] Email verification
- [ ] Password reset
- [ ] Subscription confirmation
- [ ] Invoice/receipt
- [ ] Trial ending warning (3 days before)
- [ ] Payment failed notification
- [ ] Team invitation

### Configuration

```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) {
  return resend.emails.send({
    from: 'Your App <noreply@yourdomain.com>',
    to,
    subject,
    react,
  });
}
```

---

## Analytics Setup

- [ ] Choose provider: PostHog (recommended, self-hostable) or Plausible
- [ ] Install SDK and configure
- [ ] Track key events:
  - User registration
  - Subscription started
  - Plan upgraded/downgraded
  - Feature usage (per feature)
  - Churn (subscription canceled)
- [ ] Set up conversion funnels:
  - Landing page -> Register -> Verify -> First action -> Subscribe
- [ ] Configure dashboards for key metrics:
  - MRR, ARR, Churn rate, LTV, CAC

---

## Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/myapp"

# Auth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

---

## Deployment Checklist

### Pre-Launch

- [ ] All environment variables set in production
- [ ] Database migrations applied
- [ ] Stripe webhooks pointed to production URL
- [ ] Email domain verified in Resend
- [ ] SSL certificate configured
- [ ] Error tracking configured (Sentry)
- [ ] Rate limiting on auth endpoints
- [ ] CORS configured properly

### Launch Day

- [ ] Switch Stripe to live mode
- [ ] Verify webhook signatures working
- [ ] Test full signup -> subscribe -> cancel flow
- [ ] Monitor error rates
- [ ] Check email deliverability

### Post-Launch

- [ ] Set up uptime monitoring
- [ ] Configure database backups
- [ ] Set up log aggregation
- [ ] Review security headers
- [ ] Performance audit (Lighthouse)

---

## Related Global Rules

Load these `~/.claude/` files when relevant:

- `rules/stacks/fullstack-nextjs-nestjs.md` for full-stack patterns
- `rules/stacks/react-typescript.md` for React/TypeScript patterns
- `rules/checklists/ui-visual-changes.md` for frontend changes
- `rules/checklists/verification-template.md` for completion verification

---

_SaaS template: auth, billing, email, analytics -- everything you need to launch._
