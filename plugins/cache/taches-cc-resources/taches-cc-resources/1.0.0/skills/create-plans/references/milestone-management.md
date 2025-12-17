# Milestone Management & Greenfield/Brownfield Planning

Milestones mark shipped versions. They solve the "what happens after v1.0?" problem.

## The Core Problem

**After shipping v1.0:**
- Planning artifacts optimized for greenfield (starting from scratch)
- But now you have: existing code, users, constraints, shipped features
- Need brownfield awareness without losing planning structure

**Solution:** Milestone-bounded extensions with updated BRIEF.

## Three Planning Modes

### 1. Greenfield (v1.0 Initial Development)

**Characteristics:**
- No existing code
- No users
- No constraints from shipped versions
- Pure "build from scratch" mode

**Planning structure:**
```
.planning/
├── BRIEF.md              # Original vision
├── ROADMAP.md            # Phases 1-4
└── phases/
    ├── 01-foundation/
    ├── 02-features/
    ├── 03-polish/
    └── 04-launch/
```

**BRIEF.md looks like:**
```markdown
# Project Brief: AppName

**Vision:** Build a thing that does X

**Purpose:** Solve problem Y

**Scope:**
- Feature A
- Feature B
- Feature C

**Success:** Ships and works
```

**Workflow:** Normal planning → execution → transition flow

---

### 2. Brownfield Extensions (v1.1, v1.2 - Same Codebase)

**Characteristics:**
- v1.0 shipped and in use
- Adding features / fixing issues
- Same codebase, continuous evolution
- Existing code referenced in new plans

**Planning structure:**
```
.planning/
├── BRIEF.md              # Updated with "Current State"
├── ROADMAP.md            # Phases 1-6 (grouped by milestone)
├── MILESTONES.md         # v1.0 entry
└── phases/
    ├── 01-foundation/    # ✓ v1.0
    ├── 02-features/      # ✓ v1.0
    ├── 03-polish/        # ✓ v1.0
    ├── 04-launch/        # ✓ v1.0
    ├── 05-security/      # 🚧 v1.1 (in progress)
    └── 06-performance/   # 📋 v1.1 (planned)
```

**BRIEF.md updated:**
```markdown
# Project Brief: AppName

## Current State (Updated: 2025-12-01)

**Shipped:** v1.0 MVP (2025-11-25)
**Users:** 500 downloads, 50 daily actives
**Feedback:** Requesting dark mode, occasional crashes on network errors
**Codebase:** 2,450 lines Swift, macOS 13.0+, AppKit

## v1.1 Goals

**Vision:** Harden reliability and add dark mode based on user feedback

**Motivation:**
- 5 crash reports related to network errors
- 15 users requested dark mode
- Want to improve before marketing push

**Scope (v1.1):**
- Comprehensive error handling
- Dark mode support
- Crash reporting integration

---

<details>
<summary>Original Vision (v1.0 - Archived)</summary>

[Original brief content]

</details>
```

**ROADMAP.md updated:**
```markdown
# Roadmap: AppName

## Milestones

- ✅ **v1.0 MVP** - Phases 1-4 (shipped 2025-11-25)
- 🚧 **v1.1 Hardening** - Phases 5-6 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) - SHIPPED 2025-11-25</summary>

- [x] Phase 1: Foundation
- [x] Phase 2: Core Features
- [x] Phase 3: Polish
- [x] Phase 4: Launch

</details>

### 🚧 v1.1 Hardening (In Progress)

- [ ] Phase 5: Error Handling & Stability
- [ ] Phase 6: Dark Mode UI
```

**How plans become brownfield-aware:**

When planning Phase 5, the PLAN.md automatically gets context:

```markdown
<context>
@.planning/BRIEF.md                      # Knows: v1.0 shipped, codebase exists
@.planning/MILESTONES.md                 # Knows: what v1.0 delivered
@AppName/NetworkManager.swift            # Existing code to improve
@AppName/APIClient.swift                 # Existing code to fix
</context>

<tasks>
<task type="auto">
  <name>Add comprehensive error handling to NetworkManager</name>
  <files>AppName/NetworkManager.swift</files>
  <action>Existing NetworkManager has basic try/catch. Add: retry logic (3 attempts with exponential backoff), specific error types (NetworkError enum), user-friendly error messages. Maintain existing public API - internal improvements only.</action>
  <verify>Build succeeds, existing tests pass, new error tests pass</verify>
  <done>All network calls have retry logic, error messages are user-friendly</done>
</task>
```

**Key difference from greenfield:**
- PLAN references existing files in `<context>`
- Tasks say "update existing X" not "create X"
- Verify includes "existing tests pass" (regression check)
- Checkpoints may verify existing behavior still works

---

### 3. Major Iterations (v2.0+ - Still Same Codebase)

**Characteristics:**
- Large rewrites within same codebase
- 8-15+ phases planned
- Breaking changes, new architecture
- Still continuous from v1.x

**Planning structure:**
```
.planning/
├── BRIEF.md              # Updated for v2.0 vision
├── ROADMAP.md            # Phases 1-14 (grouped)
├── MILESTONES.md         # v1.0, v1.1 entries
└── phases/
    ├── 01-foundation/    # ✓ v1.0
    ├── 02-features/      # ✓ v1.0
    ├── 03-polish/        # ✓ v1.0
    ├── 04-launch/        # ✓ v1.0
    ├── 05-security/      # ✓ v1.1
    ├── 06-performance/   # ✓ v1.1
    ├── 07-swiftui-core/  # 🚧 v2.0 (in progress)
    ├── 08-swiftui-views/ # 📋 v2.0 (planned)
    ├── 09-new-arch/      # 📋 v2.0
    └── ...               # Up to 14
```

**ROADMAP.md:**
```markdown
## Milestones

- ✅ **v1.0 MVP** - Phases 1-4 (shipped 2025-11-25)
- ✅ **v1.1 Hardening** - Phases 5-6 (shipped 2025-12-10)
- 🚧 **v2.0 SwiftUI Redesign** - Phases 7-14 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4)</summary>
[Collapsed]
</details>

<details>
<summary>✅ v1.1 Hardening (Phases 5-6)</summary>
[Collapsed]
</details>

### 🚧 v2.0 SwiftUI Redesign (In Progress)

- [ ] Phase 7: SwiftUI Core Migration
- [ ] Phase 8: SwiftUI Views
- [ ] Phase 9: New Architecture
- [ ] Phase 10: Widget Support
- [ ] Phase 11: iOS Companion
- [ ] Phase 12: Performance
- [ ] Phase 13: Testing
- [ ] Phase 14: Launch
```

**Same rules apply:** Continuous phase numbering, milestone groupings, brownfield-aware plans.

---

## When to Archive and Start Fresh

**Archive ONLY for these scenarios:**

### Scenario 1: Separate Codebase

**Example:**
- Built: WeatherBar (macOS app) ✓ shipped
- Now building: WeatherBar-iOS (separate Xcode project, different repo or workspace)

**Action:**
```
.planning/
├── archive/
│   └── v1-macos/
│       ├── BRIEF.md
│       ├── ROADMAP.md
│       ├── MILESTONES.md
│       └── phases/
├── BRIEF.md              # Fresh: iOS app
├── ROADMAP.md            # Fresh: starts at phase 01
└── phases/
    └── 01-ios-foundation/
```

**Why:** Different codebase = different planning context. Old planning doesn't help with iOS-specific decisions.

### Scenario 2: Complete Rewrite (Different Repo)

**Example:**
- Built: AppName v1 (AppKit, shipped) ✓
- Now building: AppName v2 (complete SwiftUI rewrite, new git repo)

**Action:** Same as Scenario 1 - archive v1, fresh planning for v2

**Why:** New repo, starting from scratch, v1 planning doesn't transfer.

### Scenario 3: Different Product

**Example:**
- Built: WeatherBar (weather app) ✓
- Now building: TaskBar (task management app)

**Action:** New project entirely, new `.planning/` directory

**Why:** Completely different product, no relationship.

---

## Decision Tree

```
Starting new work?
│
├─ Same codebase/repo?
│  │
│  ├─ YES → Extend existing roadmap
│  │        ├─ Add phases 5-6+ to ROADMAP
│  │        ├─ Update BRIEF "Current State"
│  │        ├─ Plans reference existing code in @context
│  │        └─ Continue normal workflow
│  │
│  └─ NO → Is it a separate platform/codebase for same product?
│           │
│           ├─ YES (e.g., iOS version of Mac app)
│           │    └─ Archive existing planning
│           │         └─ Start fresh with new BRIEF/ROADMAP
│           │              └─ Reference original in "Context" section
│           │
│           └─ NO (completely different product)
│                └─ New project, new planning directory
│
└─ Is this v1.0 initial delivery?
   └─ YES → Greenfield mode
            └─ Just follow normal workflow
```

---

## Milestone Workflow Triggers

### When completing v1.0 (first ship):

**User:** "I'm ready to ship v1.0"

**Action:**
1. Verify phases 1-4 complete (all summaries exist)
2. `/milestone:complete "v1.0 MVP"`
3. Creates MILESTONES.md entry
4. Updates BRIEF with "Current State"
5. Reorganizes ROADMAP with milestone grouping
6. Git tag v1.0
7. Commit milestone changes

**Result:** Historical record created, ready for v1.1 work

### When adding v1.1 work:

**User:** "Add dark mode and notifications"

**Action:**
1. Check BRIEF "Current State" - sees v1.0 shipped
2. Ask: "Add phases 5-6 to existing roadmap? (yes / archive and start fresh)"
3. User: "yes"
4. Update BRIEF with v1.1 goals
5. Add Phase 5-6 to ROADMAP under "v1.1" milestone heading
6. Continue normal planning workflow

**Result:** Phases 5-6 added, brownfield-aware through updated BRIEF

### When completing v1.1:

**User:** "Ship v1.1"

**Action:**
1. Verify phases 5-6 complete
2. `/milestone:complete "v1.1 Security"`
3. Add v1.1 entry to MILESTONES.md (prepended, newest first)
4. Update BRIEF current state to v1.1
5. Collapse phases 5-6 in ROADMAP
6. Git tag v1.1

**Result:** v1.0 and v1.1 both in MILESTONES.md, ROADMAP shows history

---

## Brownfield Plan Patterns

**How a brownfield plan differs from greenfield:**

### Greenfield Plan (v1.0):
```markdown
<objective>
Create authentication system from scratch.
</objective>

<context>
@.planning/BRIEF.md
@.planning/ROADMAP.md
</context>

<tasks>
<task type="auto">
  <name>Create User model</name>
  <files>src/models/User.ts</files>
  <action>Create User interface with id, email, passwordHash, createdAt fields. Export from models/index.</action>
  <verify>TypeScript compiles, User type exported</verify>
  <done>User model exists and is importable</done>
</task>
```

### Brownfield Plan (v1.1):
```markdown
<objective>
Add MFA to existing authentication system.
</objective>

<context>
@.planning/BRIEF.md              # Shows v1.0 shipped, auth exists
@.planning/MILESTONES.md         # Shows what v1.0 delivered
@src/models/User.ts              # Existing User model
@src/auth/AuthService.ts         # Existing auth logic
</context>

<tasks>
<task type="auto">
  <name>Add MFA fields to User model</name>
  <files>src/models/User.ts</files>
  <action>Add to existing User interface: mfaEnabled (boolean), mfaSecret (string | null), mfaBackupCodes (string[]). Maintain backward compatibility - all new fields optional or have defaults.</action>
  <verify>TypeScript compiles, existing User usages still work</verify>
  <done>User model has MFA fields, no breaking changes</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>MFA enrollment flow</what-built>
  <how-to-verify>
    1. Run: npm run dev
    2. Login as existing user (test@example.com)
    3. Navigate to Settings → Security
    4. Click "Enable MFA" - should show QR code
    5. Scan with authenticator app (Google Authenticator)
    6. Enter code - should enable successfully
    7. Logout, login again - should prompt for MFA code
    8. Verify: existing users without MFA can still login (backward compat)
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues</resume-signal>
</task>
```

**Key differences:**
1. **@context** includes existing code files
2. **Actions** say "add to existing" / "update existing" / "maintain backward compat"
3. **Verification** includes regression checks ("existing X still works")
4. **Checkpoints** may verify existing user flows still work

---

## BRIEF Current State Section

The "Current State" section in BRIEF.md is what makes plans brownfield-aware.

**After v1.0 ships:**

```markdown
## Current State (Updated: 2025-11-25)

**Shipped:** v1.0 MVP (2025-11-25)
**Status:** Production
**Users:** 500 downloads, 50 daily actives, growing 10% weekly
**Feedback:**
- "Love the simplicity" (common theme)
- 15 requests for dark mode
- 5 crash reports on network errors
- 3 requests for multiple accounts

**Codebase:**
- 2,450 lines of Swift
- macOS 13.0+ (AppKit)
- OpenWeather API integration
- Auto-refresh every 30 min
- Signed and notarized

**Known Issues:**
- Network errors crash app (no retry logic)
- Memory leak in auto-refresh timer
- No dark mode support
```

When planning Phase 5 (v1.1), Claude reads this and knows:
- Code exists (2,450 lines Swift)
- Users exist (500 downloads)
- Feedback exists (15 want dark mode)
- Issues exist (network crashes, memory leak)

Plans automatically become brownfield-aware because BRIEF says "this is what we have."

---

## Summary

**Greenfield (v1.0):**
- Fresh BRIEF with vision
- Phases 1-4 (or however many)
- Plans create from scratch
- Ship → complete milestone

**Brownfield (v1.1+):**
- Update BRIEF "Current State"
- Add phases 5-6+ to ROADMAP
- Plans reference existing code
- Plans include regression checks
- Ship → complete milestone

**Archive (rare):**
- Only for separate codebases or different products
- Move `.planning/` to `.planning/archive/v1-name/`
- Start fresh with new BRIEF/ROADMAP
- New planning references old in context

**Key insight:** Same roadmap, continuous phase numbering (01-99), milestone groupings keep it organized. BRIEF "Current State" makes everything brownfield-aware automatically.

This scales from "hello world" to 100 shipped versions.
