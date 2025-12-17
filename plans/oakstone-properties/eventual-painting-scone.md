# OakStone Properties - Project Initialization Plan

## Executive Summary

Initialize a new rental property website project for OakStone Properties with:
- **Mobile-first** static site on Astro + Tailwind
- **Non-technical admin** portal via Decap CMS
- **Free hosting** on Cloudflare Pages (GitHub-backed)
- **Google SSO** for admin access (no GitHub account needed)
- **Google/Facebook SSO** for end users (optional, for favorites)
- **Stripe Payment Links** for application fees
- **Application flow** TBD by owner (RentSpree vs custom)

**Owner:** Non-technical, desktop primary, no GitHub/Cloudflare access, has Google account
**End Users:** Non-technical, mobile primary, browsing/applying for rentals
**Developer:** You (Travis) - full access to GitHub/Cloudflare accounts you manage
**Domain:** TBD - owner will purchase

---

## Hosting Costs Clarification

**Why this setup is safe from surprise bills:**

| Service | Cost Model | Risk |
|---------|------------|------|
| **Cloudflare Pages** | 100% free (500 builds/mo) | ZERO - no metered billing |
| **GitHub** | Free (public or private repos) | ZERO |
| **Cloudflare Workers** | Free tier 100k req/day | Low risk - contact form only |
| **Cloudflare D1** | Free tier limits | Low risk - small data |
| **Cloudflare R2** | AVOID unless needed | This is where billing surprises happen |

**Strategy:** Keep images in Git repo (<25MB each, compressed). Avoid R2 unless portfolio exceeds 1GB of images. For a typical 10-50 property site, Git repo storage is sufficient.

**Horror story prevention:** Cloudflare's billing issues come from:
1. R2 storage with high bandwidth (we won't use R2)
2. Workers with uncapped API calls (we'll use minimal workers)
3. Enterprise features accidentally enabled (we use free tier only)

A static site on Pages with occasional Pages Functions has **no metered billing whatsoever**.

---

## Phase 1: Workspace Initialization

### 1.1 Create CLAUDE.md
**File:** `oakstone.properties/CLAUDE.md`

Content structure:
```markdown
# OakStone Properties - Project Configuration

## Project Overview
- Company: OakStone Properties
- Type: Rental property listing website
- Stack: Astro + Tailwind + Decap CMS
- Hosting: Cloudflare Pages (free tier)
- Domain: oakstoneproperties.com (or chosen domain)

## Target Users
- **End Users:** Mobile-first renters (non-technical)
- **Admin/Owner:** Desktop-primary property manager (non-technical)

## Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Astro 5.x |
| Styling | Tailwind CSS 4.x |
| CMS | Decap CMS (Git-based) |
| Hosting | Cloudflare Pages |
| CDN/DNS | Cloudflare |
| Forms | Cloudflare Turnstile + Pages Functions |
| Payments | Stripe Payment Links |
| Screening | RentSpree (outsourced) |
| Images | Git repo (compressed, <25MB each) |

## Architecture Principles
1. **Static-first** - Pre-build all property pages
2. **Mobile-first** - 320px minimum, progressive enhancement
3. **Offline-capable** - Service worker for cached listings
4. **Zero PII storage** - Outsource sensitive data collection
5. **Git-based content** - Properties as Markdown files

## Performance Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |
| Bundle size | <50KB gzipped |

## Security Requirements
- [ ] Turnstile on all public forms
- [ ] No PII in codebase or D1
- [ ] Secrets in Cloudflare environment variables
- [ ] Admin behind Cloudflare Access
- [ ] No innerHTML usage

## Accessibility (WCAG AA)
- [ ] Touch targets >= 48px (mobile)
- [ ] Color contrast >= 4.5:1
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators
```

### 1.2 Create .claude Directory Structure
```
oakstone.properties/.claude/
├── settings.json          # Project-specific hooks/permissions
├── commands/              # Custom slash commands
│   ├── property.md        # Add/edit property workflow
│   ├── deploy.md          # Build and deploy check
│   ├── cms-sync.md        # Validate Decap config
│   └── seo-check.md       # SEO audit for listings
├── agents/                # Specialized subagents
│   ├── frontend-ui.md     # Component/layout specialist
│   ├── cms-admin.md       # Decap CMS specialist
│   ├── cf-worker.md       # Cloudflare Functions specialist
│   └── security.md        # Security review specialist
└── prompts/               # Reusable task prompts
    └── 001-initial-setup.md
```

### 1.3 Project Slash Commands

**`/property`** - Property content workflow
```markdown
# Add/Edit Property

Steps:
1. Validate property data schema
2. Create/update Markdown file in content/properties/
3. Optimize and place images in public/images/properties/
4. Update Decap CMS preview
5. Test property page rendering
```

**`/deploy`** - Deployment verification
```markdown
# Deploy Check

Steps:
1. Run npm run build
2. Verify no TypeScript errors
3. Check Lighthouse scores
4. Validate sitemap.xml
5. Confirm Cloudflare Pages settings
```

**`/cms-sync`** - CMS configuration
```markdown
# CMS Sync

Steps:
1. Validate config.yml against schema
2. Check all collections have required fields
3. Verify preview templates work
4. Test OAuth flow
```

**`/seo-check`** - SEO audit
```markdown
# SEO Check

Steps:
1. Validate meta tags on all pages
2. Check Open Graph images
3. Verify Schema.org PropertyListing markup
4. Confirm robots.txt and sitemap.xml
5. Test Core Web Vitals
```

### 1.4 Project Subagents

**`frontend-ui`**
- Focus: Astro components, Tailwind styling, responsive layouts
- Tools: Glob, Grep, Read, Edit, Write
- Expertise: Mobile-first design, accessibility, performance

**`cms-admin`**
- Focus: Decap CMS configuration, content modeling, editorial UX
- Tools: Read, Edit, Write
- Expertise: Git-based CMS, Markdown schemas, preview templates

**`cf-worker`**
- Focus: Cloudflare Pages Functions, Turnstile, D1/R2 bindings
- Tools: Bash, Read, Edit, Write
- Expertise: Edge functions, serverless, Cloudflare ecosystem

**`security`**
- Focus: Auth flows, secrets management, input validation
- Tools: Grep, Read
- Expertise: OWASP, Cloudflare Access, threat modeling

---

## Phase 2: Project Scaffolding

### 2.1 Initialize Astro Project
```bash
npm create astro@latest oakstone.properties -- --template minimal
cd oakstone.properties
npm install
```

### 2.2 Add Dependencies
```bash
# Styling
npm install -D tailwindcss @astrojs/tailwind

# CMS
npm install decap-cms-app

# Cloudflare
npm install -D @cloudflare/workers-types wrangler

# Image optimization
npm install -D @astrojs/image sharp

# SEO
npm install astro-seo astro-robots-txt @astrojs/sitemap
```

### 2.3 Directory Structure
```
oakstone.properties/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── MobileNav.astro
│   │   ├── property/
│   │   │   ├── PropertyCard.astro
│   │   │   ├── PropertyGallery.astro
│   │   │   ├── PropertyDetails.astro
│   │   │   └── PropertyFilters.astro
│   │   ├── forms/
│   │   │   ├── ContactForm.astro
│   │   │   └── ApplicationButton.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       └── Badge.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PropertyLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Homepage with featured listings
│   │   ├── properties/
│   │   │   ├── index.astro      # All properties with filters
│   │   │   └── [slug].astro     # Individual property page
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── apply.astro          # Application info page
│   │   └── faq.astro
│   ├── content/
│   │   ├── config.ts            # Content collections schema
│   │   └── properties/          # Property Markdown files
│   │       └── example-property.md
│   └── styles/
│       └── global.css           # Tailwind + custom properties
├── public/
│   ├── admin/
│   │   ├── index.html           # Decap CMS entry
│   │   └── config.yml           # Decap CMS configuration
│   ├── images/
│   │   └── properties/          # Property photos
│   └── favicon.svg
├── functions/                    # Cloudflare Pages Functions
│   └── api/
│       ├── contact.ts           # Contact form handler
│       └── _middleware.ts       # Turnstile verification
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── CLAUDE.md
└── .claude/
```

### 2.4 Property Content Schema
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const properties = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    status: z.enum(['available', 'pending', 'rented']),
    featured: z.boolean().default(false),

    // Pricing
    rent: z.number(),
    deposit: z.number(),

    // Property details
    beds: z.number(),
    baths: z.number(),
    sqft: z.number().optional(),
    propertyType: z.enum(['apartment', 'house', 'townhome', 'condo', 'duplex']),

    // Location (masked for privacy)
    neighborhood: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zipCode: z.string().optional(),

    // Features
    features: z.array(z.string()).default([]),
    petPolicy: z.enum(['no-pets', 'cats-only', 'dogs-only', 'cats-dogs', 'negotiable']).default('no-pets'),
    parking: z.enum(['none', 'street', 'lot', 'garage', 'covered']).default('none'),
    laundry: z.enum(['none', 'shared', 'in-unit', 'hookups']).default('none'),

    // Media
    photos: z.array(z.string()),
    virtualTourUrl: z.string().url().optional(),

    // Application
    applyUrl: z.string().url(),
    applicationFee: z.number().optional(),
    stripePaymentLink: z.string().url().optional(),

    // Dates
    availableDate: z.date().optional(),
    publishedDate: z.date(),
    updatedDate: z.date().optional(),
  }),
});

export const collections = { properties };
```

---

## Phase 3: Decap CMS Integration

### 3.1 CMS Configuration
```yaml
# public/admin/config.yml
backend:
  name: github
  repo: owner/oakstone-properties
  branch: main
  base_url: https://your-oauth-proxy.workers.dev  # Cloudflare Worker OAuth

media_folder: public/images/properties
public_folder: /images/properties

collections:
  - name: properties
    label: Properties
    folder: src/content/properties
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title, label: Title, widget: string }
      - { name: slug, label: URL Slug, widget: string }
      - { name: status, label: Status, widget: select, options: [available, pending, rented] }
      - { name: featured, label: Featured, widget: boolean, default: false }
      - { name: rent, label: Monthly Rent, widget: number, value_type: int }
      - { name: deposit, label: Security Deposit, widget: number, value_type: int }
      - { name: beds, label: Bedrooms, widget: number, value_type: int }
      - { name: baths, label: Bathrooms, widget: number, value_type: float }
      - { name: sqft, label: Square Feet, widget: number, required: false }
      - { name: propertyType, label: Property Type, widget: select, options: [apartment, house, townhome, condo, duplex] }
      - { name: neighborhood, label: Neighborhood, widget: string }
      - { name: city, label: City, widget: string }
      - { name: state, label: State, widget: string }
      - { name: features, label: Features, widget: list }
      - { name: petPolicy, label: Pet Policy, widget: select, options: [no-pets, cats-only, dogs-only, cats-dogs, negotiable] }
      - { name: parking, label: Parking, widget: select, options: [none, street, lot, garage, covered] }
      - { name: laundry, label: Laundry, widget: select, options: [none, shared, in-unit, hookups] }
      - { name: photos, label: Photos, widget: list, field: { name: photo, widget: image } }
      - { name: applyUrl, label: Application URL, widget: string }
      - { name: applicationFee, label: Application Fee, widget: number, required: false }
      - { name: stripePaymentLink, label: Stripe Payment Link, widget: string, required: false }
      - { name: availableDate, label: Available Date, widget: datetime, required: false }
      - { name: publishedDate, label: Published Date, widget: datetime }
      - { name: body, label: Description, widget: markdown }

  - name: pages
    label: Pages
    files:
      - name: about
        label: About Page
        file: src/content/pages/about.md
        fields:
          - { name: title, label: Title, widget: string }
          - { name: body, label: Content, widget: markdown }
      - name: faq
        label: FAQ
        file: src/content/pages/faq.md
        fields:
          - { name: title, label: Title, widget: string }
          - { name: questions, label: Questions, widget: list, fields: [
              { name: question, label: Question, widget: string },
              { name: answer, label: Answer, widget: markdown }
            ]}

  - name: settings
    label: Site Settings
    files:
      - name: contact
        label: Contact Information
        file: src/content/settings/contact.json
        fields:
          - { name: phone, label: Phone, widget: string }
          - { name: email, label: Email, widget: string }
          - { name: address, label: Office Address, widget: text, required: false }
          - { name: hours, label: Office Hours, widget: string }
```

### 3.2 OAuth Proxy Worker
Deploy a Cloudflare Worker to handle GitHub OAuth for Decap CMS:
- Use `decap-server-cloudflare-worker` template
- Configure OAuth app in GitHub
- Point Decap `base_url` to Worker URL

---

## Phase 4: Authentication & Payments

### 4.1 Admin Access (Cloudflare Access + Google SSO)
- Create Cloudflare Access application for `/admin/*`
- Configure Google as identity provider
- Allow only owner's Google email
- Owner logs in with Google account - no GitHub needed
- Decap CMS authenticates via Cloudflare Access (not GitHub OAuth)

**Alternative Admin Auth (if Google doesn't work):**
Use Decap's GitHub OAuth via Cloudflare Worker proxy - but owner would need a GitHub account.

### 4.2 End User Auth (Optional - for favorites/saved searches)
**Browse without login:** Yes - all property browsing is public

**Optional authenticated features:**
- Save favorite properties
- Save search preferences
- Get email alerts for new listings

**Implementation:**
- Cloudflare Access with Google + Facebook identity providers
- Store preferences in browser localStorage (no D1 needed)
- Email alerts via Cloudflare Email Workers (phase 2 enhancement)

### 4.3 Payment Integration
- Stripe Payment Links for application fees
- Owner creates links in Stripe Dashboard (no code)
- Links stored in property content via Decap CMS
- No Stripe API integration needed

### 4.4 Application Flow (OWNER DECISION NEEDED)

| Option | Pros | Cons |
|--------|------|------|
| **A: RentSpree** | Zero PII liability, professional screening, applicant pays | Less control, external redirect |
| **B: Custom Forms + D1** | Full control, integrated UX | You store PII, security responsibility |
| **C: Launch simple, decide later** | Fastest to MVP | Delays application flow |

**Recommendation:** Start with Option C (contact form only), then add Option A (RentSpree) when owner is ready. Avoid Option B unless there's a specific business requirement.

---

## Phase 5: Forms & Serverless

### 5.1 Contact Form
```typescript
// functions/api/contact.ts
import { verifyTurnstile } from '../_middleware';

export async function onRequestPost({ request, env }) {
  const formData = await request.formData();
  const turnstileToken = formData.get('cf-turnstile-response');

  // Verify Turnstile
  const isValid = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET);
  if (!isValid) {
    return new Response('Invalid captcha', { status: 403 });
  }

  // Send email via Cloudflare Email
  // Or store in D1 for owner dashboard

  return new Response('Message sent', { status: 200 });
}
```

### 5.2 Turnstile Integration
- Add Turnstile widget to contact form
- Verify server-side in Pages Function
- Free unlimited verifications

---

## Phase 6: SEO & Performance

### 6.1 SEO Implementation
- Schema.org `RentalListing` markup on property pages
- Open Graph images auto-generated
- Dynamic sitemap with all properties
- robots.txt allowing all crawlers
- Local SEO optimization for property locations

### 6.2 Performance Optimization
- Image optimization via Sharp
- Lazy loading for photo galleries
- Preload critical assets
- Service worker for offline browsing
- Cloudflare caching headers

---

## Decision Points (Resolved + Outstanding)

### Resolved Decisions

| Decision | Answer |
|----------|--------|
| **Domain** | TBD - owner will purchase |
| **Admin Auth** | Google SSO via Cloudflare Access |
| **End User Auth** | Google + Facebook SSO (optional, for favorites) |
| **Application Flow** | TBD - owner decides (RentSpree vs custom) |
| **Image Storage** | Git repo (avoid R2 to prevent billing surprises) |
| **Hosting** | Cloudflare Pages (free, no metered billing) |

### Outstanding Decisions (Need from Owner)

1. **Domain name** - What domain to purchase?
2. **Application flow** - RentSpree (recommended) vs custom forms?
3. **Branding:**
   - Primary brand color?
   - Logo available?
   - Any existing brand guidelines?
4. **Initial content:**
   - How many properties to list at launch?
   - Any existing property data to migrate?
   - Photos available?

---

## Implementation Order

### Milestone 1: Foundation (Phase 1-2)
- [ ] Create CLAUDE.md and .claude/ structure
- [ ] Initialize Astro project with Tailwind
- [ ] Setup content collections and property schema
- [ ] Create base layouts and navigation

### Milestone 2: Property Listings (Phase 2)
- [ ] Build PropertyCard component
- [ ] Build PropertyDetails page
- [ ] Implement filtering/search
- [ ] Add sample property data

### Milestone 3: Admin Portal (Phase 3)
- [ ] Configure Decap CMS
- [ ] Deploy OAuth proxy Worker
- [ ] Test content editing workflow
- [ ] Write admin documentation

### Milestone 4: Forms & Integration (Phase 4-5)
- [ ] Implement contact form with Turnstile
- [ ] Configure Cloudflare Access for /admin
- [ ] Setup RentSpree integration
- [ ] Add Stripe Payment Link fields

### Milestone 5: Polish & Deploy (Phase 6)
- [ ] SEO implementation
- [ ] Performance optimization
- [ ] Lighthouse audit
- [ ] Deploy to Cloudflare Pages
- [ ] Connect domain

---

## Files to Create (Summary)

**Workspace Setup:**
1. `oakstone.properties/CLAUDE.md`
2. `oakstone.properties/.claude/settings.json`
3. `oakstone.properties/.claude/commands/property.md`
4. `oakstone.properties/.claude/commands/deploy.md`
5. `oakstone.properties/.claude/commands/cms-sync.md`
6. `oakstone.properties/.claude/commands/seo-check.md`
7. `oakstone.properties/.claude/agents/frontend-ui.md`
8. `oakstone.properties/.claude/agents/cms-admin.md`
9. `oakstone.properties/.claude/agents/cf-worker.md`
10. `oakstone.properties/.claude/agents/security.md`

**Then project scaffolding as outlined in Phase 2.**

---

## Cost Summary

| Service | Cost | Notes |
|---------|------|-------|
| Domain | ~$10-15/year | Only guaranteed cost |
| Cloudflare Pages | **$0** | No metered billing |
| Cloudflare Workers | **$0** | 100k req/day free (contact form only) |
| Cloudflare Access | **$0** | 50 users free (admin + end users) |
| Cloudflare Turnstile | **$0** | Unlimited free |
| GitHub | **$0** | Private repos free |
| Stripe | ~2.9% + $0.30 | Only when payments occur |
| RentSpree | **$0** for owner | Applicant pays screening fees |
| **Cloudflare R2** | **NOT USED** | Avoided to prevent billing risk |
| **Total Ongoing** | **~$10-15/year** | Domain only + payment processing fees |

### What We're Avoiding

| Service | Why Avoided |
|---------|-------------|
| Cloudflare R2 | Metered billing - keep images in Git instead |
| Cloudflare D1 heavy usage | Free tier has limits - use localStorage instead |
| Custom screening | PII liability - use RentSpree instead |
| Netlify | More complex free tier limits |
| Vercel | Build minutes can be consumed quickly |
