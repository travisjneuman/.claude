# Workflow: Complete Milestone

<required_reading>
**Read these files NOW:**
1. templates/milestone.md
2. `.planning/ROADMAP.md`
3. `.planning/BRIEF.md`
</required_reading>

<purpose>
Mark a shipped version (v1.0, v1.1, v2.0) as complete. This creates a historical record in MILESTONES.md, updates BRIEF.md with current state, reorganizes ROADMAP.md with milestone groupings, and tags the release in git.

This is the ritual that separates "development" from "shipped."
</purpose>

<process>

<step name="verify_readiness">
Check if milestone is truly complete:

```bash
cat .planning/ROADMAP.md
ls .planning/phases/*/SUMMARY.md 2>/dev/null | wc -l
```

**Questions to ask:**
- Which phases belong to this milestone?
- Are all those phases complete (all plans have summaries)?
- Has the work been tested/validated?
- Is this ready to ship/tag?

Present:
```
Milestone: [Name from user, e.g., "v1.0 MVP"]

Appears to include:
- Phase 1: Foundation (2/2 plans complete)
- Phase 2: Authentication (2/2 plans complete)
- Phase 3: Core Features (3/3 plans complete)
- Phase 4: Polish (1/1 plan complete)

Total: 4 phases, 8 plans, all complete

Ready to mark this milestone as shipped?
(yes / wait / adjust scope)
```

Wait for confirmation.

If "adjust scope": Ask which phases should be included.
If "wait": Stop, user will return when ready.
</step>

<step name="gather_stats">
Calculate milestone statistics:

```bash
# Count phases and plans in milestone
# (user specified or detected from roadmap)

# Find git range
git log --oneline --grep="feat(" | head -20

# Count files modified in range
git diff --stat FIRST_COMMIT..LAST_COMMIT | tail -1

# Count LOC (adapt to language)
find . -name "*.swift" -o -name "*.ts" -o -name "*.py" | xargs wc -l 2>/dev/null

# Calculate timeline
git log --format="%ai" FIRST_COMMIT | tail -1  # Start date
git log --format="%ai" LAST_COMMIT | head -1   # End date
```

Present summary:
```
Milestone Stats:
- Phases: [X-Y]
- Plans: [Z] total
- Tasks: [N] total (estimated from phase summaries)
- Files modified: [M]
- Lines of code: [LOC] [language]
- Timeline: [Days] days ([Start] → [End])
- Git range: feat(XX-XX) → feat(YY-YY)
```

Confirm before proceeding.
</step>

<step name="extract_accomplishments">
Read all phase SUMMARY.md files in milestone range:

```bash
cat .planning/phases/01-*/01-*-SUMMARY.md
cat .planning/phases/02-*/02-*-SUMMARY.md
# ... for each phase in milestone
```

From summaries, extract 4-6 key accomplishments.

Present:
```
Key accomplishments for this milestone:
1. [Achievement from phase 1]
2. [Achievement from phase 2]
3. [Achievement from phase 3]
4. [Achievement from phase 4]
5. [Achievement from phase 5]

Does this capture the milestone? (yes / adjust)
```

If "adjust": User can add/remove/edit accomplishments.
</step>

<step name="create_milestone_entry">
Create or update `.planning/MILESTONES.md`.

If file doesn't exist:
```markdown
# Project Milestones: [Project Name from BRIEF]

[New entry]
```

If exists, prepend new entry (reverse chronological order).

Use template from `templates/milestone.md`:

```markdown
## v[Version] [Name] (Shipped: YYYY-MM-DD)

**Delivered:** [One sentence from user]

**Phases completed:** [X-Y] ([Z] plans total)

**Key accomplishments:**
- [List from previous step]

**Stats:**
- [Files] files created/modified
- [LOC] lines of [language]
- [Phases] phases, [Plans] plans, [Tasks] tasks
- [Days] days from [start milestone or start project] to ship

**Git range:** `feat(XX-XX)` → `feat(YY-YY)`

**What's next:** [Ask user: what's the next goal?]

---
```

Confirm entry looks correct.
</step>

<step name="update_brief">
Update `.planning/BRIEF.md` to reflect current state.

Add/update "Current State" section at top (after YAML if present):

```markdown
# Project Brief: [Name]

## Current State (Updated: YYYY-MM-DD)

**Shipped:** v[X.Y] [Name] (YYYY-MM-DD)
**Status:** [Production / Beta / Internal]
**Users:** [If known, e.g., "~500 downloads, 50 DAU" or "Internal use only"]
**Feedback:** [Key themes from users, or "Initial release, gathering feedback"]
**Codebase:** [LOC] [language], [key tech stack], [platform/deployment target]

## [Next Milestone] Goals

**Vision:** [What's the goal for next version?]

**Motivation:**
- [Why this next work matters]
- [User feedback driving it]
- [Technical debt or improvements needed]

**Scope (v[X.Y]):**
- [Feature/improvement 1]
- [Feature/improvement 2]
- [Feature/improvement 3]

---

<details>
<summary>Original Vision (v1.0 - Archived for reference)</summary>

[Move original brief content here]

</details>
```

**If this is v1.0 (first milestone):**
Just add "Current State" section, no need to archive original vision yet.

**If this is v1.1+:**
Collapse previous version's content into `<details>` section.

Show diff, confirm changes.
</step>

<step name="reorganize_roadmap">
Update `.planning/ROADMAP.md` to group completed milestone phases.

Add milestone headers and collapse completed work:

```markdown
# Roadmap: [Project Name]

## Milestones

- ✅ **v1.0 MVP** - Phases 1-4 (shipped YYYY-MM-DD)
- 🚧 **v1.1 Security** - Phases 5-6 (in progress)
- 📋 **v2.0 Redesign** - Phases 7-10 (planned)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) - SHIPPED YYYY-MM-DD</summary>

- [x] Phase 1: Foundation (2/2 plans) - completed YYYY-MM-DD
- [x] Phase 2: Authentication (2/2 plans) - completed YYYY-MM-DD
- [x] Phase 3: Core Features (3/3 plans) - completed YYYY-MM-DD
- [x] Phase 4: Polish (1/1 plan) - completed YYYY-MM-DD

</details>

### 🚧 v[Next] [Name] (In Progress / Planned)

- [ ] Phase 5: [Name] ([N] plans)
- [ ] Phase 6: [Name] ([N] plans)

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 2/2 | Complete | YYYY-MM-DD |
| 2. Authentication | v1.0 | 2/2 | Complete | YYYY-MM-DD |
| 3. Core Features | v1.0 | 3/3 | Complete | YYYY-MM-DD |
| 4. Polish | v1.0 | 1/1 | Complete | YYYY-MM-DD |
| 5. Security Audit | v1.1 | 0/1 | Not started | - |
| 6. Hardening | v1.1 | 0/2 | Not started | - |
```

Show diff, confirm changes.
</step>

<step name="git_tag">
Create git tag for milestone:

```bash
git tag -a v[X.Y] -m "$(cat <<'EOF'
v[X.Y] [Name]

Delivered: [One sentence]

Key accomplishments:
- [Item 1]
- [Item 2]
- [Item 3]

See .planning/MILESTONES.md for full details.
EOF
)"
```

Confirm: "Tagged: v[X.Y]"

Ask: "Push tag to remote? (y/n)"

If yes:
```bash
git push origin v[X.Y]
```
</step>

<step name="git_commit_milestone">
Commit milestone completion (MILESTONES.md + BRIEF.md + ROADMAP.md updates):

```bash
git add .planning/MILESTONES.md
git add .planning/BRIEF.md
git add .planning/ROADMAP.md
git commit -m "$(cat <<'EOF'
chore: milestone v[X.Y] [Name] shipped

- Added MILESTONES.md entry
- Updated BRIEF.md current state
- Reorganized ROADMAP.md with milestone grouping
- Tagged v[X.Y]
EOF
)"
```

Confirm: "Committed: chore: milestone v[X.Y] shipped"
</step>

<step name="offer_next">
```
✅ Milestone v[X.Y] [Name] complete

Shipped:
- [N] phases ([M] plans, [P] tasks)
- [One sentence of what shipped]

Summary: .planning/MILESTONES.md
Tag: v[X.Y]

Next steps:
1. Plan next milestone work (add phases to roadmap)
2. Archive and start fresh (for major rewrite/new codebase)
3. Take a break (done for now)
```

Wait for user decision.

If "1": Route to workflows/plan-phase.md (but ask about milestone scope first)
If "2": Route to workflows/archive-planning.md (to be created)
</step>

</process>

<milestone_naming>
**Version conventions:**
- **v1.0** - Initial MVP
- **v1.1, v1.2, v1.3** - Minor updates, new features, fixes
- **v2.0, v3.0** - Major rewrites, breaking changes, significant new direction

**Name conventions:**
- v1.0 MVP
- v1.1 Security
- v1.2 Performance
- v2.0 Redesign
- v2.0 iOS Launch

Keep names short (1-2 words describing the focus).
</milestone_naming>

<what_qualifies>
**Create milestones for:**
- Initial release (v1.0)
- Public releases
- Major feature sets shipped
- Before archiving planning

**Don't create milestones for:**
- Every phase completion (too granular)
- Work in progress (wait until shipped)
- Internal dev iterations (unless truly shipped internally)

If uncertain, ask: "Is this deployed/usable/shipped in some form?"
If yes → milestone. If no → keep working.
</what_qualifies>

<success_criteria>
Milestone completion is successful when:
- [ ] MILESTONES.md entry created with stats and accomplishments
- [ ] BRIEF.md updated with current state
- [ ] ROADMAP.md reorganized with milestone grouping
- [ ] Git tag created (v[X.Y])
- [ ] Milestone commit made
- [ ] User knows next steps
</success_criteria>
