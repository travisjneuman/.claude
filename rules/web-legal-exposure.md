---
paths:
  - "**/*.{html,htm,astro,vue,svelte,jsx,tsx,css,scss,sass,less,mdx}"
  - "**/{layout,_document,_app,root,head,app}.{ts,tsx,js,jsx}"
  - "**/{next,nuxt,astro,vite,svelte}.config.*"
  - "**/{instrumentation,instrumentation-client,sentry}*.{ts,js}"
  - "**/*{analytics,posthog,tracking,telemetry,consent}*"
  - "**/{email,emails,mail,mailer,newsletter,templates}/**"
  - "**/*{checkout,billing,subscription,subscribe,pricing,paywall,storekit}*"
  - "**/*{signup,sign-up,register,onboarding,auth}*"
  - "**/*{upload,uploads,media,attachment}*"
  - "**/{privacy,terms,legal,dmca,copyright}*"
---

# Web App Legal Exposure Rules
Cheap defaults that keep shipped apps out of statutory-damages territory. Not legal advice.
Fonts/assets: self-host (next/font, @fontsource, local woff2). Never link fonts.googleapis.com, fonts.gstatic.com, or CDN CSS/JS on page view; it sends visitor IPs to a third party (GDPR; a German court awarded damages per visitor). Maps, video, and social embeds load on click or consent.
Session replay: off by default. No Sentry Replay session sampling, PostHog/Hotjar/Clarity/LogRocket/FullStory recording, or keystroke capture unless the owner approves it, consent comes first, and every input is masked (California CIPA wiretap claims, $5,000 per violation).
Marketing email: unsubscribe link, List-Unsubscribe header, valid postal address, prompt opt-out (CAN-SPAM). Keep transactional and marketing streams separate. Never invent an address.
Subscriptions: price, period, "renews until cancelled", and how to cancel sit next to the subscribe button; record express consent; online cancellation; renewal reminders (California Automatic Renewal Law). App Store apps also follow guideline 3.1.2.
Signup: state a minimum age in Terms/Privacy; never knowingly collect data from under-13s (COPPA); child-directed or age-restricted products need an owner decision.
User uploads visible to others: DMCA notice-and-takedown page, repeat-infringer policy, and a registered designated agent (owner files it).
Before a launch or launch email, report each of these as OK, risk, or N/A with file evidence.
