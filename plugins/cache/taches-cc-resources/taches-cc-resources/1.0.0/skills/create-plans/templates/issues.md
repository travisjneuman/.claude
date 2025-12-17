# ISSUES.md Template

This file is auto-created when Rule 5 (Log non-critical enhancements) is first triggered during execution.

Location: `.planning/ISSUES.md`

```markdown
# Project Issues Log

Non-critical enhancements discovered during execution. Address in future phases when appropriate.

## Open Enhancements

### ISS-001: [Brief description]
- **Discovered:** Phase [X] Plan [Y] Task [Z] (YYYY-MM-DD)
- **Type:** [Performance / Refactoring / UX / Testing / Documentation / Accessibility]
- **Description:** [What could be improved and why it would help]
- **Impact:** Low (works correctly, this would enhance)
- **Effort:** [Quick (<1hr) / Medium (1-4hr) / Substantial (>4hr)]
- **Suggested phase:** [Phase number where this makes sense, or "Future"]

### ISS-002: Add connection pooling for Redis
- **Discovered:** Phase 2 Plan 3 Task 6 (2025-11-23)
- **Type:** Performance
- **Description:** Redis client creates new connection per request. Connection pooling would reduce latency and handle connection failures better. Currently works but suboptimal under load.
- **Impact:** Low (works correctly, ~20ms overhead per request)
- **Effort:** Medium (2-3 hours - need to configure ioredis pool, test connection reuse)
- **Suggested phase:** Phase 5 (Performance optimization)

### ISS-003: Refactor UserService into smaller modules
- **Discovered:** Phase 1 Plan 2 Task 3 (2025-11-22)
- **Type:** Refactoring
- **Description:** UserService has grown to 400 lines with mixed concerns (auth, profile, settings). Would be cleaner as separate services (AuthService, ProfileService, SettingsService). Currently works but harder to test and reason about.
- **Impact:** Low (works correctly, just organizational)
- **Effort:** Substantial (4-6 hours - need to split, update imports, ensure no breakage)
- **Suggested phase:** Phase 7 (Code health milestone)

## Closed Enhancements

### ISS-XXX: [Brief description]
- **Status:** Resolved in Phase [X] Plan [Y] (YYYY-MM-DD)
- **Resolution:** [What was done]
- **Benefit:** [How it improved the codebase]

---

**Summary:** [X] open, [Y] closed
**Priority queue:** [List ISS numbers in priority order, or "Address as time permits"]
```

## Usage Guidelines

**When issues are added:**
- Auto-increment ISS numbers (ISS-001, ISS-002, etc.)
- Always include discovery context (Phase/Plan/Task and date)
- Be specific about impact and effort
- Suggested phase helps with roadmap planning

**When issues are resolved:**
- Move to "Closed Enhancements" section
- Document resolution and benefit
- Keeps history for reference

**Prioritization:**
- Quick wins (Quick effort, visible benefit) → Earlier phases
- Substantial refactors (Substantial effort, organizational benefit) → Dedicated "code health" phases
- Nice-to-haves (Low impact, high effort) → "Future" or never

**Integration with roadmap:**
- When planning new phases, scan ISSUES.md for relevant items
- Can create phases specifically for addressing accumulated issues
- Example: "Phase 8: Code Health - Address ISS-003, ISS-007, ISS-012"

## Example: Issues Driving Phase Planning

```markdown
# Roadmap excerpt

### Phase 6: Performance Optimization (Planned)

**Milestone Goal:** Address performance issues discovered during v1.0 usage

**Includes:**
- ISS-002: Redis connection pooling (Medium effort)
- ISS-015: Database query optimization (Quick)
- ISS-021: Image lazy loading (Medium)

**Excludes ISS-003 (refactoring):** Saving for dedicated code health phase
```

This creates traceability: enhancement discovered → logged → planned → addressed → documented.
