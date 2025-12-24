# Roadmap: Universal Intelligent Router & Documentation Overhaul

## Phase Overview

| Phase | Focus | Plans | Est. Time |
|-------|-------|-------|-----------|
| 1 | Universal Router (start-task.md v2.0) | 2 | Core |
| 2 | Documentation Updates | 2 | Secondary |
| 3 | Validation | 1 | Final |

**Total Plans:** 5

---

## Phase 1: Universal Router (start-task.md v2.0)

**Goal:** Create an all-encompassing intelligent router that handles ANY prompt.

### Plan 1-01: Router Architecture & Domain Detection
- Design comprehensive detection system for ALL domains
- Add scientific domain detection (125+ skills worth)
- Add business domain detection (16 expert skills)
- Add creative domain detection
- Add meta/admin task detection
- Add research need detection

### Plan 1-02: Resource Loading & Routing Logic
- Implement resource auto-loading for all 15 marketplaces
- Add memory integration (claude-mem check)
- Add research integration (WebSearch trigger)
- Add skill generation detection (skill-seekers)
- Implement complexity scoring
- Implement routing logic (GSD/Plan/Direct)
- Add post-work automation

**Deliverable:** Complete start-task.md v2.0

---

## Phase 2: Documentation Updates

**Goal:** All documentation reflects current state accurately.

### Plan 2-01: Core Documentation
- Update CLAUDE.md (15 marketplaces)
- Update README.md (69 skills, 37 agents, 15 marketplaces)
- Add marketplace capabilities section

### Plan 2-02: Skills & Supporting Docs
- Update skills/README.md (69 skills)
- Update skills/MASTER_INDEX.md (69 skills + marketplace reference)
- Update docs/README.md (add marketplace info)

**Deliverable:** All documentation accurate and comprehensive

---

## Phase 3: Validation

**Goal:** Verify everything works correctly.

### Plan 3-01: Testing & Verification
- Test router with 20+ diverse prompts
- Verify scientific domain detection
- Verify research integration
- Verify routing accuracy
- Final documentation review

**Deliverable:** Validated, working system

---

## Dependencies

```
Phase 1 (Router) ──────► Phase 2 (Docs) ──────► Phase 3 (Validation)
     │                        │
     │                        └── Can start after 1-02 complete
     │
     └── 1-01 must complete before 1-02
```

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Router too large (token bloat) | Use tiered loading, reference external files |
| Missing edge cases | Extensive testing in Phase 3 |
| Marketplace changes | Reference by name, not hardcoded paths |
