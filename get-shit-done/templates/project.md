# PROJECT.md Template

Template for `.planning/PROJECT.md` - the full project context captured during initialization.

## Greenfield Project (v1.0)

```markdown
# [Project Name]

## Vision

[What this is and why it matters. 2-4 paragraphs capturing the full picture.
Use the user's language and framing. Include motivation, not just description.
This should feel like the user explaining their project to a smart collaborator.]

## Problem

[What problem exists, who has it, why it matters, what the current state is.
Be specific - vague problems lead to vague solutions.
Include the pain, the gap, or the opportunity that makes this worth building.]

## Success Criteria

How we know this worked:

- [ ] [Measurable outcome 1 - specific, verifiable]
- [ ] [Measurable outcome 2 - specific, verifiable]
- [ ] [Measurable outcome 3 - specific, verifiable]
- [ ] [Add as many as genuinely needed]

## Scope

### Building
- [Feature/capability 1]
- [Feature/capability 2]
- [Feature/capability 3]

### Not Building
- [Explicit exclusion 1 - prevents scope creep]
- [Explicit exclusion 2 - clarifies boundaries]
- [Explicit exclusion 3 - manages expectations]

## Context

[Background information that informs implementation:
- Current state (greenfield)
- Relevant prior work or experience
- Technical environment or ecosystem context
- Explored alternatives and why they were rejected]

## Constraints

- **[Constraint type]**: [What] - [Why]
- **[Constraint type]**: [What] - [Why]
- **[Constraint type]**: [What] - [Why]

Common types: Tech stack, Timeline, Resources, Dependencies, Compatibility, Performance, Security

## Decisions Made

Key decisions from project exploration:

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Area/Topic] | [What we decided] | [Why this choice] |
| [Area/Topic] | [What we decided] | [Why this choice] |

## Open Questions

Things to figure out during execution:

- [ ] [Question 1 - known unknown to resolve]
- [ ] [Question 2 - decision to make later]
- [ ] [Question 3 - area needing research]

---
*Initialized: [date]*
```

## Brownfield Project (v1.1+)

After shipping v1.0, update PROJECT.md to include current state:

```markdown
# [Project Name]

## Current State (Updated: YYYY-MM-DD)

**Shipped:** v[X.Y] [Name] (YYYY-MM-DD)
**Status:** [Production / Beta / Internal / Live with users]
**Users:** [If known: "~500 downloads, 50 DAU" or "Internal use only" or "N/A"]
**Feedback:** [Key themes from user feedback, or "Initial release, gathering feedback"]

**Codebase:**
- [X,XXX] lines of [primary language]
- [Key tech stack: framework, platform, deployment target]
- [Notable dependencies or architecture]

**Known Issues:**
- [Issue 1 from v1.x that needs addressing]
- [Issue 2]
- [Or "None" if clean slate]

## v[Next] Goals

**Vision:** [What's the goal for this next iteration?]

**Motivation:**
- [Why this work matters now]
- [User feedback driving it]
- [Technical debt or improvements needed]

**Scope (v[X.Y]):**
- [Feature/improvement 1]
- [Feature/improvement 2]
- [Feature/improvement 3]

**Success Criteria:**
- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

**Not Building (this version):**
- [Not doing X in this version]
- [Not doing Y in this version]

## Constraints

- **[Constraint type]**: [What] - [Why]
- **[Constraint type]**: [What] - [Why]

## Open Questions

- [ ] [Question for this version]
- [ ] [Question for this version]

---

<details>
<summary>Original Vision (v1.0 - Archived)</summary>

## Vision

[Original vision content]

## Problem

[Original problem statement]

## Success Criteria

- [x] [Outcome 1] - Achieved
- [x] [Outcome 2] - Achieved
- [x] [Outcome 3] - Achieved

## Scope

### Built
- [What was built]

### Not Built
- [What was excluded]

## Context

[Original context]

## Constraints

[Original constraints]

## Decisions Made

[Original decisions table]

</details>
```

<guidelines>
**Greenfield:**
- Don't compress - capture everything from questioning
- Use user's words - preserve their language and framing
- Be specific - vague inputs create vague outputs
- Include rationale - "what" without "why" loses context
- Mark unknowns - open questions are valuable, not failures

**Brownfield:**
- Current State shows real-world context (shipped, users, feedback)
- v[Next] Goals focuses on the upcoming work
- Original Vision collapsed in `<details>` for reference
- Checkboxes marked [x] for achieved goals
- This makes all plans brownfield-aware automatically
</guidelines>

<state_summary>
When creating STATE.md, extract a summary from PROJECT.md:

**Building:** [One-liner from Vision]

**Core requirements:**
- [Top 3 from Success Criteria]

**Constraints:**
- [Key constraints]

This goes in STATE.md's immutable "Project Summary" section.
</state_summary>
