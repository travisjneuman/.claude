---
name: landing-page-project
description: Landing page starter with Next.js 15 static export or Astro, Tailwind CSS, SEO, analytics, contact form, Lighthouse 95+
---

# Landing Page Project Template

**Primary Stack:** Next.js 15 (static export or server) + TypeScript + Tailwind CSS
**Alternative Stack:** Astro + TypeScript + Tailwind CSS

---

## Directory Structure (Next.js)

```
project/
├── app/
│   ├── layout.tsx                 # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                   # Landing page (imports sections)
│   ├── globals.css                # Tailwind + custom styles
│   ├── privacy/page.tsx           # Privacy policy
│   ├── terms/page.tsx             # Terms of service
│   ├── blog/
│   │   ├── page.tsx               # Blog index
│   │   └── [slug]/page.tsx        # Blog post
│   ├── api/
│   │   ├── subscribe/route.ts     # Email capture endpoint
│   │   └── contact/route.ts       # Contact form endpoint
│   ├── sitemap.ts                 # Dynamic sitemap generation
│   ├── robots.ts                  # Robots.txt generation
│   ├── manifest.ts                # Web manifest
│   └── opengraph-image.tsx        # OG image generation (via @vercel/og)
├── components/
│   ├── sections/                  # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   ├── Stats.tsx
│   │   └── Footer.tsx
│   ├── layout/
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Footer.tsx             # Site footer
│   │   └── MobileMenu.tsx         # Mobile navigation
│   ├── ui/                        # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Container.tsx
│   ├── forms/
│   │   ├── EmailCapture.tsx       # Newsletter signup
│   │   └── ContactForm.tsx        # Contact form
│   ├── StructuredData.tsx         # JSON-LD schema components
│   └── Analytics.tsx              # Analytics script loader
├── content/                       # Content as data (easily editable)
│   ├── features.ts                # Feature list data
│   ├── pricing.ts                 # Pricing tier data
│   ├── testimonials.ts            # Testimonial data
│   ├── faq.ts                     # FAQ data
│   └── posts/                     # Blog posts (MDX)
│       └── first-post.mdx
├── lib/
│   ├── metadata.ts                # SEO metadata helpers
│   ├── analytics.ts               # PostHog / GA4 setup
│   ├── email.ts                   # Resend integration
│   ├── jsonld.ts                  # Structured data helpers
│   └── utils.ts                   # Utility functions (cn, etc.)
├── public/
│   ├── favicon.ico
│   ├── icon.svg                   # SVG favicon
│   ├── apple-touch-icon.png       # 180x180
│   ├── og-image.png               # 1200x630 fallback OG image
│   └── images/
│       ├── hero/
│       ├── features/
│       └── testimonials/
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Directory Structure (Astro Alternative)

```
project/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro       # HTML shell, head, analytics
│   ├── pages/
│   │   ├── index.astro            # Landing page
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   ├── Pricing.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQ.astro
│   │   ├── ContactForm.tsx        # React island for interactivity
│   │   └── Header.astro
│   ├── content/
│   │   └── blog/                  # Markdown/MDX blog posts
│   └── styles/
│       └── global.css
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Setup Steps

### Next.js

```bash
# Create project
npx create-next-app@latest project-name --typescript --tailwind --eslint --app

# Install dependencies
npm install clsx tailwind-merge
npm install -D @tailwindcss/typography

# For static export, configure next.config.ts:
```

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',           // Static HTML export (remove if using server features)
  images: {
    unoptimized: true,        // Required for static export
  },
  trailingSlash: true,        // Better for static hosting
};

export default nextConfig;
```

### Astro

```bash
# Create project
npm create astro@latest -- --template basics

# Add integrations
npx astro add tailwind
npx astro add react           # For interactive islands
npx astro add sitemap

# Build static site
npm run build                 # Output in dist/
```

---

## SEO Optimization

### Metadata Configuration

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: 'Your Product - Tagline That Sells',
    template: '%s | Your Product',
  },
  description: 'A compelling description under 160 characters that includes your primary keyword and a clear value proposition for searchers.',
  keywords: ['primary keyword', 'secondary keyword', 'long-tail keyword'],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Your Product',
    title: 'Your Product - Tagline That Sells',
    description: 'Compelling OG description for social sharing.',
    images: [
      { url: '/og-image.png', width: 1200, height: 630, alt: 'Your Product' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Product - Tagline That Sells',
    description: 'Compelling Twitter description.',
    images: ['/og-image.png'],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};
```

### Structured Data (JSON-LD)

```typescript
// components/StructuredData.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://github.com/yourorg',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Sitemap

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.com';
  const routes = ['', '/privacy', '/terms', '/blog'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
```

### Robots.txt

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

### SEO Checklist

- [ ] Title tag unique and < 60 characters
- [ ] Meta description unique and < 155 characters
- [ ] H1 tag present and unique per page
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Canonical URLs set
- [ ] Sitemap.xml generated
- [ ] robots.txt configured
- [ ] JSON-LD structured data (Organization, FAQ, Product)
- [ ] Alt text on all images
- [ ] Internal linking between pages
- [ ] Google Search Console configured

---

## Analytics

### PostHog (Recommended)

```typescript
// components/Analytics.tsx
'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  posthog.capture(name, properties);
}
```

### GA4 (Alternative)

```typescript
// components/Analytics.tsx
import Script from 'next/script';

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
```

### Key Events to Track

- [ ] Page views (automatic)
- [ ] CTA button clicks
- [ ] Contact form submissions
- [ ] Email capture (newsletter signup)
- [ ] Pricing plan selection
- [ ] Scroll depth (25%, 50%, 75%, 100%)
- [ ] External link clicks
- [ ] FAQ question expansion
- [ ] Feature section visibility (intersection observer)

---

## Contact Form

### Server Handler

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Contact Form <noreply@yoursite.com>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
```

### Client Form Component

```typescript
// components/forms/ContactForm.tsx
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return <p className="text-green-600">Message sent. We will be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" required className="..." />
      <input name="email" type="email" placeholder="Email" required className="..." />
      <textarea name="message" placeholder="Message" required rows={4} className="..." />
      <button type="submit" disabled={status === 'sending'} className="...">
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && <p className="text-red-600">Failed to send. Try again.</p>}
    </form>
  );
}
```

### Email Capture (Newsletter)

```typescript
// app/api/subscribe/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  });

  await resend.emails.send({
    from: 'Your Product <hello@yoursite.com>',
    to: email,
    subject: 'Welcome to Your Product!',
    html: '<p>Thanks for signing up...</p>',
  });

  return NextResponse.json({ success: true });
}
```

---

## Performance Targets (Lighthouse 95+)

### Core Web Vitals

| Metric | Target  | How to Achieve                                            |
| ------ | ------- | --------------------------------------------------------- |
| LCP    | < 2.5s  | Preload hero image, font-display: swap, static generation |
| FID    | < 100ms | Minimize JS, defer non-critical scripts, no long tasks    |
| CLS    | < 0.1   | Set explicit width/height on images, reserve async space  |
| INP    | < 200ms | Optimize event handlers, minimize main thread work        |

### Performance Checklist

- [ ] Images optimized (WebP format, proper dimensions, lazy loaded)
- [ ] Fonts subset and preloaded (next/font)
- [ ] Above-the-fold content loads without JS
- [ ] Lazy load below-fold sections
- [ ] CSS purged of unused styles (Tailwind handles this)
- [ ] No layout shift (explicit width/height on images)
- [ ] Preconnect to external origins
- [ ] Bundle size < 150KB gzipped first load
- [ ] Total page weight under 500KB (excluding images)

### Font Loading

```typescript
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Section Templates

### Hero Section

Key elements:
- Headline: Clear value proposition (5-10 words)
- Subheadline: Supporting detail (1-2 sentences)
- Primary CTA button (high contrast, action verb)
- Secondary CTA (lower commitment: "Learn more", "See demo")
- Social proof element (logos, user count, rating)
- Hero visual (screenshot, illustration, or video)

### Features Section

Key elements:
- Section heading
- 3-6 feature cards with icon, title, description
- Optional: feature screenshot or illustration per card
- Consider alternating layout (text-left/image-right pattern)

### Pricing Section

Key elements:
- 2-4 plan cards (recommended plan highlighted)
- Monthly/yearly toggle
- Feature comparison per plan
- CTA per plan
- FAQ about pricing below
- "Enterprise" option with "Contact us"

### Testimonials Section

Key elements:
- 3-6 customer quotes
- Name, title, company, avatar
- Company logos
- Star ratings (if applicable)
- Consider carousel for mobile

### FAQ Section

Key elements:
- 6-10 common questions
- Expandable accordion pattern
- Schema markup for FAQ (JSON-LD)
- Link to support/docs for more

### CTA Section (Final)

Key elements:
- Compelling headline (urgency or value)
- Repeat primary CTA
- Remove all other distractions
- Optional: guarantee badge, trust signals

---

## A/B Testing (PostHog Feature Flags)

```typescript
import { useFeatureFlag } from 'posthog-js/react';

function Hero() {
  const variant = useFeatureFlag('hero-headline');

  const headlines: Record<string, string> = {
    control: 'Ship Faster with AI',
    variant_a: 'Build Products 10x Faster',
    variant_b: 'The AI-Powered Dev Platform',
  };

  return <h1>{headlines[variant as string] || headlines.control}</h1>;
}
```

### What to A/B Test

- [ ] Hero headline (value proposition)
- [ ] CTA button text ("Get Started" vs "Try Free" vs "Start Building")
- [ ] CTA button color
- [ ] Pricing page layout
- [ ] Social proof placement
- [ ] Number of pricing tiers shown

---

## Animation Patterns (Framer Motion)

```typescript
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

function Features({ items }: Props) {
  return (
    <motion.div {...staggerContainer}>
      {items.map((item) => (
        <motion.div key={item.id} {...fadeInUp}>
          {item.title}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## Deployment

### Vercel (Recommended for Next.js)

```bash
npm i -g vercel
vercel              # Preview deploy
vercel --prod       # Production deploy

# Environment variables
vercel env add RESEND_API_KEY
vercel env add NEXT_PUBLIC_POSTHOG_KEY
```

### Cloudflare Pages (Recommended for Astro)

```bash
# Build: npm run build
# Output: dist (Astro) or out (Next.js static)
npx wrangler pages deploy dist
```

### Static Export

```bash
# Next.js
npm run build       # Outputs to out/
npx serve out       # Preview locally

# Astro
npm run build       # Outputs to dist/
npx serve dist      # Preview locally
```

---

## Environment Variables

```bash
# .env.example

# Site
NEXT_PUBLIC_SITE_URL="https://yoursite.com"
NEXT_PUBLIC_SITE_NAME="Your Product"

# Contact Form
CONTACT_EMAIL="hello@yoursite.com"
RESEND_API_KEY="re_..."
RESEND_AUDIENCE_ID=""

# Or external form service
FORMSPREE_FORM_ID=""

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
# Or GA4
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# CMS (optional)
CONTENTFUL_SPACE_ID=""
CONTENTFUL_ACCESS_TOKEN=""
```

---

## Pre-Launch Checklist

### Content

- [ ] All copy reviewed and proofread
- [ ] CTA text is action-oriented and clear
- [ ] Pricing is accurate and up to date
- [ ] Privacy policy and terms of service pages exist
- [ ] Contact information is correct

### SEO

- [ ] Title tags unique and under 60 characters per page
- [ ] Meta descriptions under 160 characters per page
- [ ] OG images generated (1200x630)
- [ ] Structured data validates (test at schema.org/validator)
- [ ] Sitemap.xml generated and accessible
- [ ] Robots.txt allows crawling
- [ ] Canonical URLs set
- [ ] Google Search Console configured

### Performance

- [ ] Lighthouse Performance score 95+
- [ ] Lighthouse Accessibility score 95+
- [ ] Lighthouse Best Practices score 95+
- [ ] Lighthouse SEO score 95+
- [ ] All images optimized (WebP, proper dimensions)
- [ ] Fonts loaded with display: swap
- [ ] No render-blocking resources
- [ ] Total page weight under 500KB (excluding images)

### Analytics

- [ ] Analytics tracking verified (check real-time dashboard)
- [ ] Key events firing correctly
- [ ] Contact form submissions tracked
- [ ] CTA clicks tracked

### Accessibility

- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested (at least VoiceOver or NVDA)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] All images have alt text
- [ ] Focus indicators visible

### Technical

- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Redirects set up (www to non-www or vice versa)
- [ ] 404 page exists and is styled
- [ ] Contact form tested end-to-end
- [ ] Environment variables set in production
- [ ] No console errors or warnings
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile tested (375px, 768px, 1024px)
- [ ] Social sharing tested (paste URL in Twitter/LinkedIn/Slack)
- [ ] Cookie consent (if required by jurisdiction)

### Post-Launch

- [ ] Submit to Google Search Console
- [ ] Submit sitemap to Google
- [ ] Set up uptime monitoring
- [ ] Monitor Core Web Vitals
- [ ] Set up A/B tests for key conversion points
- [ ] Monitor email capture conversion rate
- [ ] Set up weekly analytics review

---

## Related Global Rules

Load these `~/.claude/` files when relevant:

- `docs/reference/stacks/react-typescript.md` for React/TypeScript patterns
- `docs/reference/checklists/ui-visual-changes.md` for visual design quality
- `docs/reference/checklists/static-sites.md` for static site standards
- `docs/reference/checklists/performance-optimization.md` for performance tuning
- `rules/checklists/verification-template.md` for completion verification

---

_Landing page template: SEO-optimized, performant, analytics-ready, accessible -- convert visitors from day one._
