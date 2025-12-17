# thedeadrobot Automation Optimization Plan

**Date:** December 13, 2025
**Goal:** Maximum X engagement with minimal GitHub Actions usage + better news awareness
**Status:** December quota exhausted, 19 days until reset - time to plan and prepare

---

## Table of Contents
1. [Optimal Posting Schedule](#deep-research-optimal-twitterx-posting-times-2025)
2. [GitHub Actions Budget](#github-actions-budget-after-changes)
3. [Alternative Provider Options](#alternative-provider-options)
4. [News Awareness Gap Analysis](#news-awareness-gap-analysis)
5. [Implementation Plan](#implementation-plan)

---

## Deep Research: Optimal Twitter/X Posting Times (2025)

### Sources Analyzed
- [Buffer](https://buffer.com/resources/best-time-to-post-on-twitter-x/): 1 million+ tweets analyzed
- [Sprout Social](https://sproutsocial.com/insights/best-times-to-post-on-twitter/): 2.7 billion engagements, 470K profiles
- [Metricool](https://metricool.com/twitter-study/): 23,561 accounts, 2.1M posts
- [Hootsuite](https://blog.hootsuite.com/best-time-to-post-on-social-media/): Industry research

### Key Findings: Best Times to Post

| Rank | Time (EST) | Day | Source |
|------|------------|-----|--------|
| **#1** | **9:00 AM** | **Wednesday** | Buffer (1M tweets) |
| #2 | 8:00 AM | Tuesday | Buffer |
| #3 | 8:00 AM | Monday | Buffer |
| #4 | 9:00 AM | Thursday | Buffer |
| #5 | 8:00 AM | Friday | Buffer |

### Best Days (Ranked)
1. **Wednesday** - highest engagement
2. **Tuesday** - second best
3. **Thursday** - third best
4. **Monday** - decent (avoid before 10am)
5. **Friday** - decent (morning only)
6. **Saturday/Sunday** - AVOID (lowest engagement)

### Tech/Software Industry Specific
- **Early morning:** 7-9 AM (devs checking updates before work)
- **Late afternoon:** 4-6 PM (after-work scrolling)
- **B2B sweet spot:** 12-2 PM (lunch break engagement)

### Algorithm Insights (2025)
> "Engagement within the first 30 minutes is the single biggest predictor of long-tail reach."
> — [SocialBee](https://socialbee.com/blog/twitter-algorithm/)

- Tweets get ~15-20 minutes of peak visibility
- Early likes/retweets = wider distribution
- Retweets worth 2x a like for algorithm scoring
- Text posts outperform video by 30%

---

## SCHEDULE COMPARISON

### Previous Schedule (5x/day)
```
🌅 8am EST (Tue-Fri) - Early morning
⭐ 9am EST (Tue-Thu) - Peak engagement
🌤️ 12pm EST (Mon-Fri) - Lunch peak
🌆 2pm EST (Mon-Fri) - Afternoon
🌙 6pm EST (Mon-Fri) - After-work
```
**Usage:** ~25 runs/week = ~109 min/month
**Problem:** Research shows >5 tweets/day has diminishing returns, 34% of users unfollow for over-posting

### Research Findings on Frequency
- **Optimal:** 3-5 tweets/day ([Rival IQ study](https://www.rivaliq.com/))
- **Sweet spot:** 1-5x/day for best engagement ([Sprout Social](https://sproutsocial.com/insights/best-times-to-post-on-twitter/))
- **Risk zone:** >7x/day sees steep engagement drop ([Hootsuite](https://blog.hootsuite.com/how-often-to-post-on-social-media/))
- **Unfollow risk:** 34% users unfollow brands posting too frequently

---

## THE OPTIMAL SCHEDULE (FINAL)

Based on research, **3x/day at peak times** is the sweet spot:

| Slot | Time (EST) | Time (UTC) | Days | Cron (offset 5min) | Why |
|------|------------|------------|------|---------------------|-----|
| **Morning Peak** | 9:00 AM | 14:00 | Mon-Fri | `55 13 * * 1-5` | #1 engagement time |
| **Lunch Peak** | 12:00 PM | 17:00 | Mon-Fri | `55 16 * * 1-5` | B2B sweet spot |
| **After-Work** | 6:00 PM | 23:00 | Mon-Fri | `55 22 * * 1-5` | Tech audience peak |

**Usage:** 15 runs/week = ~66 min/month (3.3% of free tier)

### Why This Is Better Than 5x/day
1. **Quality over quantity** - 3 posts at optimal times > 5 posts scattered
2. **Algorithm friendly** - X prioritizes engagement velocity, not volume
3. **No unfollow risk** - Stays well under the "too many" threshold
4. **Resource efficient** - Uses 40% less GitHub Actions

### Cron Schedule for monitor-news.yml (with 5-min offset)
```yaml
schedule:
  # 9:00 AM EST (14:00 UTC) - offset to 8:55 AM for GH Actions delay
  - cron: '55 13 * * 1-5'
  # 12:00 PM EST (17:00 UTC) - offset to 11:55 AM
  - cron: '55 16 * * 1-5'
  # 6:00 PM EST (23:00 UTC) - offset to 5:55 PM
  - cron: '55 22 * * 1-5'
```

---

## GitHub Actions Budget After Changes

### Current State (Dec 1-13)
| Repo | Workflow | Monthly Minutes |
|------|----------|-----------------|
| tdr.portfolio | monitor-news (every 15 min) | ~1,400 |
| tdr.portfolio | post-to-x (disabled, but was broken) | ~670 (when running) |
| tkl.home | yahoo-sync | ~481 |
| lzg repos | ci.yml | ~360 |
| **Total** | | **~2,911** (over budget!) |

### After Optimization
| Repo | Workflow | New Schedule | Monthly Minutes |
|------|----------|--------------|-----------------|
| tdr.portfolio | monitor-news | **3x/day, Mon-Fri** | **~66** |
| tdr.portfolio | post-to-x | DISABLED (stays off) | **0** |
| tkl.home | yahoo-sync (you handle) | 4x/day? | ~120 |
| lzg repos | ci.yml (you handle) | Disabled? | 0 |
| **Total** | | | **~186** (9.3% of quota!) |

**Savings for tdr.portfolio: 1,334 min/month (95% reduction!)**

---

## Alternative Provider Options

### Option 1: Cloudflare Workers (RECOMMENDED for $0 GitHub Actions)

**Free Tier:**
- 100,000 requests/day (we'd use ~15)
- 3 cron triggers per Worker
- 30 second CPU time per scheduled job (<1hr interval)
- 15 minute CPU time (≥1hr interval)
- KV storage: 1GB free
- **Cost: $0/month**

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│                  Cloudflare Workers (FREE)              │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────┐     ┌─────────────────┐           │
│  │ Scheduled Post  │────▶│ Groq API (FREE) │           │
│  │ (cron: 3x/day)  │     │ Generate post   │           │
│  └─────────────────┘     └────────┬────────┘           │
│           │                       ▼                     │
│           │              ┌─────────────────┐           │
│           └─────────────▶│ Twitter API     │           │
│                          │ Post to X       │           │
│                          └─────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

**Pros:**
- Zero GitHub Actions usage
- Reliable cron timing (no 15-30 min delays)
- KV store for seen articles / deduplication
- Native fetch API for RSS feeds

**Cons:**
- Requires rewriting Python → JavaScript
- New platform to learn/maintain
- Secrets management different from GitHub

---

#### Complete Cloudflare Workers Migration Guide

**Step 1: Create Cloudflare Account**
```bash
# Go to https://dash.cloudflare.com/sign-up
# Sign up with email (free, no credit card required)
# Verify email
```

**Step 2: Install Wrangler CLI**
```bash
npm install -g wrangler

# Login to Cloudflare
wrangler login
# Opens browser to authenticate
```

**Step 3: Create Worker Project**
```bash
# Create new project directory
mkdir thedeadrobot-worker
cd thedeadrobot-worker

# Initialize Worker
wrangler init
# Choose: "Hello World" worker
# Choose: TypeScript (recommended) or JavaScript
```

**Step 4: Configure wrangler.toml**
```toml
name = "thedeadrobot-poster"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Cron triggers (3x/day at optimal times)
[triggers]
crons = [
  "55 13 * * 1-5",  # 8:55 AM EST (target 9am)
  "55 16 * * 1-5",  # 11:55 AM EST (target 12pm)
  "55 22 * * 1-5"   # 5:55 PM EST (target 6pm)
]

# KV namespace for deduplication
[[kv_namespaces]]
binding = "NEWS_ARCHIVE"
id = "your-kv-namespace-id"
```

**Step 5: Create KV Namespace**
```bash
# Create KV namespace for storing seen articles
wrangler kv:namespace create "NEWS_ARCHIVE"
# Copy the ID into wrangler.toml

# For local development
wrangler kv:namespace create "NEWS_ARCHIVE" --preview
```

**Step 6: Add Secrets**
```bash
# Add API keys as secrets (not in code!)
wrangler secret put GROQ_API_KEY
# Paste your Groq API key when prompted

wrangler secret put TWITTER_API_KEY
wrangler secret put TWITTER_API_SECRET
wrangler secret put TWITTER_ACCESS_TOKEN
wrangler secret put TWITTER_ACCESS_TOKEN_SECRET
```

**Step 7: Basic Worker Structure**
```typescript
// src/index.ts
export interface Env {
  NEWS_ARCHIVE: KVNamespace;
  GROQ_API_KEY: string;
  TWITTER_API_KEY: string;
  TWITTER_API_SECRET: string;
  TWITTER_ACCESS_TOKEN: string;
  TWITTER_ACCESS_TOKEN_SECRET: string;
}

export default {
  // Cron trigger handler
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    console.log(`Cron triggered at ${new Date().toISOString()}`);

    // 1. Fetch RSS feeds
    const newsItems = await fetchRssFeeds();

    // 2. Filter breaking news
    const breakingNews = filterBreakingNews(newsItems);

    // 3. Check deduplication in KV
    const newItems = await deduplicateNews(breakingNews, env.NEWS_ARCHIVE);

    // 4. Select best item
    const bestItem = selectBestNewsItem(newItems);

    if (!bestItem) {
      console.log("No new breaking news to post");
      return;
    }

    // 5. Generate AI response via Groq
    const post = await generatePost(bestItem, env.GROQ_API_KEY);

    // 6. Post to Twitter
    await postToTwitter(post, env);

    // 7. Save to KV archive
    await saveToArchive(bestItem, env.NEWS_ARCHIVE);
  },

  // HTTP handler (for testing)
  async fetch(request: Request, env: Env) {
    return new Response("thedeadrobot poster worker");
  }
};
```

**Step 8: Deploy Worker**
```bash
# Deploy to Cloudflare
wrangler deploy

# View logs
wrangler tail

# Local development
wrangler dev
```

**Step 9: Test Cron Trigger**
```bash
# Manually trigger a cron event for testing
wrangler dev
# Then in another terminal:
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

**Step 10: Migration Checklist**
```
[ ] Create Cloudflare account
[ ] Install wrangler CLI
[ ] Create worker project
[ ] Set up KV namespace
[ ] Add all secrets
[ ] Port RSS feed fetching (fetch API)
[ ] Port news filtering logic
[ ] Port Groq API integration
[ ] Port Twitter OAuth 1.0a posting
[ ] Port deduplication to KV
[ ] Test locally with wrangler dev
[ ] Deploy with wrangler deploy
[ ] Verify cron triggers working
[ ] Delete GitHub Actions workflows
```

---

#### Porting Python to JavaScript/TypeScript

**RSS Fetching (Python → JS):**
```python
# Python (feedparser)
import feedparser
feed = feedparser.parse("https://example.com/feed")
items = feed.entries

# JavaScript (fetch + xml parser)
const response = await fetch("https://example.com/feed");
const xml = await response.text();
const items = parseXML(xml); // Use fast-xml-parser or similar
```

**Groq API (Python → JS):**
```python
# Python (requests)
import requests
response = requests.post(
    "https://api.groq.com/openai/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}"},
    json={"model": "llama-3.1-8b-instant", "messages": [...]}
)

# JavaScript (fetch)
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [...]
    })
});
```

**Twitter OAuth 1.0a (Python → JS):**
```typescript
// Use twitter-api-v2 package or oauth-1.0a
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: env.TWITTER_API_KEY,
    appSecret: env.TWITTER_API_SECRET,
    accessToken: env.TWITTER_ACCESS_TOKEN,
    accessSecret: env.TWITTER_ACCESS_TOKEN_SECRET,
});

await client.v2.tweet(postText);
```

---

#### Cloudflare Workers for Other Projects

**This same pattern works for any scheduled automation:**

1. **Toker League (Yahoo Fantasy)**
   - Same architecture
   - Different cron schedule (every 6 hours)
   - KV for storing game data

2. **Any API polling**
   - RSS feeds, webhooks, status checks
   - KV for state persistence
   - Cron for scheduling

**Template wrangler.toml:**
```toml
name = "your-project-name"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[triggers]
crons = ["0 */6 * * *"]  # Every 6 hours

[[kv_namespaces]]
binding = "STATE"
id = "your-kv-id"
```

---

### Option 2: cron-job.org (External Trigger)

**Free Tier:**
- Unlimited cron jobs (fair use)
- 30 second timeout per request
- Up to 1-minute frequency
- Email notifications on failure
- **Cost: $0/month**

**How It Works:**
1. Keep code in GitHub, disable cron schedule
2. Set up cron-job.org to call GitHub API
3. Trigger `workflow_dispatch` at optimal times

**Pros:**
- No code changes to Python scripts
- Keep everything in GitHub
- Reliable timing

**Cons:**
- Still uses GitHub Actions minutes (just fewer)
- External dependency
- Need GitHub PAT for API access

---

### Option 3: Vercel Cron Jobs

**Free Tier (Hobby):**
- 2 cron jobs max
- Once per day minimum frequency
- 10 second timeout
- **Cost: $0/month**

**Limitation:** Only 2 cron jobs and daily minimum - not suitable for 3x/day posting.

---

### Option 4: Deno Deploy

**Free Tier:**
- 100,000 requests/day
- 10ms CPU time per request
- GitHub integration
- **Cost: $0/month**

**Pros:**
- TypeScript native
- GitHub Actions-like deployment
- Good for simple cron jobs

**Cons:**
- 10ms CPU limit is very tight
- Would need to split into multiple requests

---

### Provider Comparison

| Provider | Free Requests | Cron Triggers | CPU Time | Best For |
|----------|--------------|---------------|----------|----------|
| **Cloudflare Workers** | 100k/day | 3 per worker | 30s-15min | Full migration |
| GitHub Actions | 2000 min/mo | Unlimited | Unlimited | Current setup |
| cron-job.org | Unlimited | Unlimited | 30s | External trigger |
| Vercel | N/A | 2 max | 10s | Daily only |
| Deno Deploy | 100k/day | Via cron lib | 10ms | Simple tasks |

**Recommendation:** Stay with GitHub Actions for now (3x/day = 66 min/month is fine), consider Cloudflare Workers if you want zero GitHub usage later.

---

## News Awareness Gap Analysis

### The Problem: Major Releases Get Buried

**Examples:** ChatGPT 5.2 release missed, Gemini 3.0 Pro missed
**Root Cause:** The priority system favors security over EVERYTHING else

### Current System Architecture (monitor_news.py)

The system uses a **4-layer ranking** to select which story to post:

```
Layer 1: Priority Level (high=0, medium=100 points)
Layer 2: News Type (1-19 ranking, lower = better)
Layer 3: Source Authority (1-43 ranking, lower = better)
Layer 4: Recency (tiebreaker only)
```

**The Problem:** Layer 2 (News Type) puts security at 1-4, everything else lower.

### Complete Current Priority Ranking (Lines 364-385)

| Priority | News Type | What's Missed |
|----------|-----------|---------------|
| 1 | critical_security | - |
| 2 | data_breach | - |
| 3 | malware_threat | - |
| 4 | security_advisory | - |
| **5** | **ai_model_release** | ChatGPT 5.2, Gemini 3.0 |
| **6** | **ai_company_news** | OpenAI announcements |
| 7 | ai_research | Breakthrough papers |
| 8 | major_outage | AWS/GitHub down |
| 9 | chip_news | NVIDIA new GPUs |
| 10 | hardware_announcement | Apple M4, AMD chips |
| 11 | cloud_announcement | AWS new services |
| 12 | ai_tools | Copilot updates |
| 13 | tech_acquisition | Big acquisitions |
| 14 | major_release | Docker, K8s releases |
| 15 | framework_release | React, Next.js |
| 16 | database_release | PostgreSQL, Redis |
| 17 | language_release | Rust, Go, Python |
| 18 | devtools_release | VSCode, GitHub |
| 19 | tech_layoffs | Company layoffs |

**Any security story (1-4) will ALWAYS beat ANY other category.**

### Complete News Sources

**RSS Feeds (27 sources):**
```
HIGH PRIORITY (Security):
- BleepingComputer, The Hacker News, Krebs on Security
- SecurityWeek, Dark Reading, Threatpost

HIGH PRIORITY (AI/ML):
- OpenAI Blog, Anthropic News, Google AI Blog
- Hugging Face Blog, VentureBeat AI, MIT Tech Review AI

MEDIUM PRIORITY (Tech):
- TechCrunch, Ars Technica, The Verge, Wired
- Hacker News (Best), ZDNet, Engadget

MEDIUM PRIORITY (Cloud/Dev):
- AWS News Blog, Azure Updates, Google Cloud Blog
- GitHub Blog, Docker Blog, Kubernetes Blog

HIGH PRIORITY (Hardware):
- NVIDIA Blog

MEDIUM PRIORITY (Hardware):
- AnandTech, Tom's Hardware
```

**Reddit (13 subreddits, score thresholds):**
```
AI/ML:
- r/MachineLearning (500+), r/ClaudeAI (300+), r/LocalLLaMA (500+)
- r/ChatGPT (1000+), r/artificial (500+)

Security:
- r/netsec (500+), r/cybersecurity (500+), r/sysadmin (500+)

Dev/Ops:
- r/programming (500+), r/devops (300+)
- r/selfhosted (500+), r/homelab (500+)

Linux:
- r/linux (500+)
```

**X Accounts: DISABLED** (Twitter API v2 requires $100/month)

### Current Keyword Detection (Lines 252-355)

Each news type has **keywords** and **required_words** - BOTH must match:

```python
# Example: ai_model_release
"keywords": ["gpt-", "claude", "gemini", "grok", "llama", "mistral", "opus", "sonnet", "haiku"]
"required_words": ["released", "releasing", "announcing", "available", "launched", "introduces", "unveils"]

# Example: critical_security
"keywords": ["cve-", "zero-day", "critical vulnerability", "rce", "exploit", "0-day"]
"required_words": ["critical", "patch", "vulnerability", "actively exploited", "urgent"]
```

### Why Stories Get Missed

| Issue | Impact | Example |
|-------|--------|---------|
| **Priority too rigid** | Security ALWAYS wins | ChatGPT 5.2 loses to any CVE |
| **Keywords too narrow** | "ChatGPT" vs "gpt-" | "ChatGPT 5.2 launches" may not match |
| **No engagement boost** | 1000 upvotes = 10 upvotes | Viral posts don't rank higher |
| **No recency boost** | Old + new treated same | Breaking news has no advantage |
| **Only 1 post per run** | Best only, rest discarded | Multiple big stories = miss some |

### Recommended Priority Rebalancing

**Option A: Mixed Priority (Recommended)**
```python
NEWS_TYPE_PRIORITY = {
    "ai_model_release": 1,      # MAJOR AI releases (GPT, Claude, Gemini)
    "critical_security": 2,     # Zero-days, active exploits
    "ai_company_news": 3,       # OpenAI, Anthropic announcements
    "data_breach": 4,           # Major breaches
    "chip_news": 5,             # NVIDIA/AMD new chips
    "major_outage": 6,          # AWS/GitHub down
    "malware_threat": 7,
    "security_advisory": 8,
    "hardware_announcement": 9,
    "cloud_announcement": 10,
    "ai_research": 11,
    "ai_tools": 12,
    "tech_acquisition": 13,
    "major_release": 14,
    "framework_release": 15,
    "database_release": 16,
    "language_release": 17,
    "devtools_release": 18,
    "tech_layoffs": 19,
}
```

**Option B: Time-Based Category Rotation**
```python
# Morning (9am): AI/Tech focus
# Lunch (12pm): Mixed/trending
# Evening (6pm): Security/Dev focus
```

**Option C: Engagement-Based Scoring**
```python
# Reddit upvotes boost priority
# >1000 upvotes = -2 priority levels
# >5000 upvotes = -4 priority levels
```

### Expanded Keywords Needed

**AI Model Releases (add to line 256):**
```python
["gpt-", "claude", "gemini", "grok", "llama", "mistral", "opus", "sonnet", "haiku",
 # ADD THESE:
 "chatgpt", "gpt-5", "gpt-4", "gpt4o", "gpt-4o", "o1", "o3", "o1-pro",
 "claude-3", "claude-4", "gemini-2", "gemini-3", "gemini pro", "gemini ultra",
 # Google AI
 "google ai", "google gemini", "google antigravity", "bard", "palm", "palm-2",
 "copilot", "cursor", "windsurf", "devin", "sora", "dall-e", "midjourney"]
```

**AI Company News (add to line 261):**
```python
# ADD TO ai_company_news keywords:
"google ai", "google deepmind", "google gemini", "google antigravity"
```

**Hardware (add to line 336):**
```python
# ADD THESE:
"ryzen", "epyc", "threadripper", "b650", "x670", "zen 5",
"blackwell", "hopper", "h200", "b100", "b200"
```

### Files to Modify

| File | Line | Changes Needed |
|------|------|----------------|
| `monitor_news.py` | 364-385 | Rebalance NEWS_TYPE_PRIORITY |
| `monitor_news.py` | 256 | Add AI model keywords |
| `monitor_news.py` | 336 | Add hardware keywords |
| `monitor_news.py` | (new) | Optional: engagement boost logic |

---

## Implementation Plan

### Phase 1: Update Schedule (This Session)
- [x] Deep research on optimal posting times ✓
- [x] Compare with previous schedule ✓
- [x] Calculate GitHub Actions budget ✓
- [x] Document alternative providers ✓
- [x] Analyze news awareness gaps ✓
- [ ] Update monitor-news.yml with new cron schedule
- [ ] Improve AI news priority in monitor_news.py
- [ ] Add missing AI keywords
- [ ] Delete temp CSV file

### Files to Modify

| File | Change | Priority |
|------|--------|----------|
| `.github/workflows/monitor-news.yml` | Update cron schedule to 3x/day optimal times | High |
| `.github/scripts/monitor_news.py` | Boost AI priority (1-2 instead of 5-7) | High |
| `.github/scripts/monitor_news.py` | Add missing AI keywords | High |
| `tests/github_actions_usage.csv` | Delete (temp analysis file) | Low |

---

### Change 1: New Cron Schedule (monitor-news.yml)
```yaml
schedule:
  # 9:00 AM EST (14:00 UTC) Mon-Fri - #1 Peak engagement time
  # Offset 5 min early (8:55 AM) to account for GitHub Actions delay
  - cron: '55 13 * * 1-5'

  # 12:00 PM EST (17:00 UTC) Mon-Fri - B2B lunch peak
  # Offset 5 min early (11:55 AM)
  - cron: '55 16 * * 1-5'

  # 6:00 PM EST (23:00 UTC) Mon-Fri - After-work tech audience
  # Offset 5 min early (5:55 PM)
  - cron: '55 22 * * 1-5'
```

---

### Change 2: Priority Rebalancing (monitor_news.py)

**Current (line ~648-701):**
```python
NEWS_TYPE_PRIORITY = {
    "critical_security": 1,    # Was top
    "data_breach": 2,
    "malware_threat": 3,
    "security_advisory": 4,
    "ai_model_release": 5,     # Was too low
    "ai_company_news": 6,
    ...
}
```

**New Priority Order:**
```python
NEWS_TYPE_PRIORITY = {
    "ai_model_release": 1,     # PROMOTED - major AI releases
    "critical_security": 2,    # Still high for zero-days
    "ai_company_news": 3,      # PROMOTED - OpenAI/Anthropic news
    "data_breach": 4,
    "malware_threat": 5,
    "security_advisory": 6,
    "major_outage": 7,
    "ai_research": 8,
    "chip_news": 9,
    ...
}
```

---

### Change 3: Expanded AI Keywords (monitor_news.py)

**Add to BREAKING_NEWS_PATTERNS (line ~708-727):**
```python
"ai_model_release": {
    "keywords": [
        # Current
        "gpt-", "claude", "gemini", "grok", "llama", "mistral",
        "opus", "sonnet", "haiku",
        # NEW - specific model names
        "chatgpt", "gpt-5", "gpt-4", "gpt4o", "gpt-4o",
        "o1", "o3", "o1-pro",
        "claude-3", "claude-4",
        # NEW - AI tools/companies
        "anthropic", "openai", "deepmind", "meta ai",
        "copilot", "github copilot", "cursor", "windsurf", "devin",
        # NEW - releases
        "sora", "dall-e", "midjourney", "stable diffusion"
    ],
    "required": ["released", "launching", "announcing", "available", "launched", "unveils", "introduces"],
    "priority": "high"
}
```

---

## Summary

| Metric | Before (every 15 min) | After (3x/day) | Change |
|--------|----------------------|----------------|--------|
| Runs/month | ~2,880 | ~66 | -97.7% |
| Minutes/month | ~1,400 | ~66 | -95.3% |
| Posts/day | Up to 96 | 3 | Quality focus |
| Days with posts | 7/week | 5/week | Weekdays only |
| Timing | Random | Research-backed | Better engagement |
| AI news priority | 5-7 (low) | 1-3 (high) | Won't miss releases |

### What This Fixes
1. **Schedule:** Posts at optimal engagement times (9am, 12pm, 6pm EST)
2. **Resource usage:** 95% reduction in GitHub Actions minutes
3. **AI awareness:** Major releases like ChatGPT 5.2 will now rank #1
4. **Keywords:** Better detection of AI model announcements

### Schedule Comparison
| Old (Every 15 min) | New (3x Optimal Times) |
|-------------------|------------------------|
| Random throughout day | 9am, 12pm, 6pm EST |
| Includes weekends | Mon-Fri only |
| Same time every day | Peak engagement windows |
| Over-posting risk | Sweet spot (3x/day) |
| Security dominates | AI/Security balanced |

---

## Next Steps After Approval

1. **Update cron schedule** in monitor-news.yml
2. **Rebalance priorities** in monitor_news.py
3. **Add AI keywords** in monitor_news.py
4. **Delete temp CSV** from tests folder
5. **Commit and push** (won't run until January due to quota)
6. **Monitor results** after quota resets

**Ready to implement when you approve!**
