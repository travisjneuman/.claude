# Fix Post-to-X Multiple Posting Issue

## Problem Summary

The Post-to-X GitHub Action is posting multiple times in single runs, not respecting the intended 5x daily schedule (8am, 9am, 12pm, 2pm, 6pm EST).

**Evidence:**
- December 1st: 3 posts at 12:02pm, 2:16pm, 6:01pm EST
- Recent PR #53 added concurrency guards but with incorrect configuration
- News Monitor is working correctly and scheduled around Post-to-X times

## Root Cause

**The `cancel-in-progress: false` setting defeats the concurrency guard.**

In `.github/workflows/post-to-x.yml` (lines 24-26):
```yaml
concurrency:
  group: post-to-x-${{ github.ref }}
  cancel-in-progress: false  # ← PROBLEM: allows queueing
```

**How this causes multiple posts:**

1. Post-to-X has 5 cron schedules (8am, 9am, 12pm, 2pm, 6pm EST)
2. When GitHub Actions has delays (15-30 min typical), multiple scheduled jobs can queue
3. With `cancel-in-progress: false`, queued jobs execute sequentially instead of being cancelled
4. Each execution runs the Python script once, but multiple executions = multiple posts
5. The 30-minute cooldown check (`was_post_recent()`) runs INSIDE each job, so it can't prevent GitHub from starting the workflow

**Example scenario:**
- 12pm cron fires at 11:55am UTC but runs 20 minutes late
- By the time it finishes, 2pm cron (1:55pm UTC) has already fired and queued
- 2pm job starts immediately after 12pm finishes
- Result: 2 posts within 30 minutes

## Solution

**Single-line fix:** Change `cancel-in-progress: false` to `cancel-in-progress: true`

### File to Modify

**`.github/workflows/post-to-x.yml`** - Line 26

Change:
```yaml
concurrency:
  group: post-to-x-${{ github.ref }}
  cancel-in-progress: false  # OLD
```

To:
```yaml
concurrency:
  group: post-to-x-${{ github.ref }}
  cancel-in-progress: true  # NEW - prevents queueing
```

### How This Fixes It

With `cancel-in-progress: true`:
- Only one Post-to-X workflow can be active at a time
- If a new cron trigger fires while one is running, it cancels the previous run
- No queueing of multiple posts
- Combined with the existing 30-minute cooldown check in `generate_post.py`, guarantees at most 1 post per 30 minutes
- Still allows all 5 daily scheduled times to work (they won't overlap if running normally)

### Why This Is Safe

1. **Idempotent Script:** `generate_post.py` is designed to run once and post once per execution
2. **Cooldown Protection:** Even if a job isn't cancelled, `was_post_recent()` prevents posting within 30 minutes
3. **No Data Loss:** Cancelling a queued workflow just prevents duplicate posts - no content is lost
4. **Aligns with Intent:** PR #53's goal was to prevent duplicates, this completes that fix

## Testing Plan

1. Make the one-line change to `.github/workflows/post-to-x.yml`
2. Commit and push
3. Monitor next 2-3 scheduled runs (check GitHub Actions logs)
4. Verify only 1 post per scheduled time
5. Confirm posts respect 30-minute minimum gap

## Alternative Considered (Not Recommended)

**Disable Post-to-X entirely** - Would stop duplicate posts but loses the core educational content strategy. News Monitor alone doesn't provide consistent daily content.

## News Monitor Status

**No changes needed.** News Monitor is:
- Working correctly ✅
- Already scheduled to avoid Post-to-X times ✅
- Posting 3x max per day ✅
- Checking for duplicate news ✅

---

## Implementation Steps

1. Edit `.github/workflows/post-to-x.yml` line 26
2. Change `cancel-in-progress: false` → `cancel-in-progress: true`
3. Commit with message: `fix: Prevent Post-to-X workflow queueing with cancel-in-progress`
4. Push to master
5. Monitor next scheduled run

**Estimated Time:** 2 minutes
**Risk Level:** Low (one-line config change, easily revertable)
