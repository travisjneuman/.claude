# UX Principles

Shared reference for user psychology, design thinking, and interaction patterns.

## Design Thinking Process

1. **Empathize**: Understand user needs, identify pain points, map journeys
2. **Define**: Problem statements, personas, success metrics, constraints
3. **Ideate**: Brainstorm solutions, explore alternatives, consider edge cases
4. **Prototype**: Low-fidelity first, test assumptions, iterate quickly
5. **Test**: Usability testing, A/B testing, analytics, iterate on data

## UX Research Methods

| Method | Usage (UXPA 2024) | When to Use |
|--------|-------------------|-------------|
| User interviews | 75% | Discover needs, validate assumptions |
| Usability testing | 69% | Test prototypes, find friction |
| Heuristic evaluation | 50% | Quick expert review, early feedback |
| Surveys | 45% | Quantitative data, large sample |
| Analytics | 40% | Behavior patterns, usage metrics |

### Decision Guidance
**Full research** (interviews + testing): New features, major changes, unclear requirements
**Quick critique** (heuristics): Minor updates, iteration, time-constrained

**Quantitative** (surveys, analytics): What and how many
**Qualitative** (interviews, testing): Why and how

## Heuristic Evaluation Framework

Nielsen's 10 Usability Heuristics (quick reference):
1. **Visibility**: System status always clear
2. **Match**: Real-world language, familiar concepts
3. **Control**: User in control, undo/redo available
4. **Consistency**: Same actions = same results
5. **Prevention**: Prevent errors before they occur
6. **Recognition**: Show options, don't rely on memory
7. **Flexibility**: Shortcuts for experts, easy for novices
8. **Aesthetics**: Clean, focused, no clutter
9. **Recovery**: Clear error messages, easy recovery
10. **Help**: Contextual help when needed

## Usability Testing Process

1. **Prepare**: Define tasks, recruit 5 users, prepare prototype
2. **Facilitate**: Think-aloud protocol, observe, don't lead
3. **Document**: Notes on friction, confusion, success
4. **Analyze**: Common patterns, severity of issues
5. **Iterate**: Fix critical issues, retest if needed

## User Psychology Laws

### Hick's Law
Decision time increases with number of choices. Limit to 3-5 primary actions.

### Fitts's Law
Time to target depends on distance and size. Make important targets large and close.

### Miller's Law
Working memory holds 7±2 items. Chunk information into groups.

### Jakob's Law
Users prefer interfaces that work like ones they already know.

## Cognitive Load Reduction

- Reduce choices (progressive disclosure)
- Chunk information into groups
- Recognition over recall (show options)
- Use smart defaults
- Maintain consistency

## Quick Critique Framework

Use for rapid UX evaluation (< 10 minutes):

| Aspect | Question | Pass Criteria |
|--------|----------|---------------|
| **Clarity** | Understand in <3 seconds? | Purpose immediately clear |
| **Efficiency** | Minimum steps? | No unnecessary clicks/fields |
| **Consistency** | Matches existing patterns? | Follows established conventions |
| **Accessibility** | Everyone can use? | Keyboard nav, contrast, labels |

## Interaction Patterns

### Navigation
| Pattern | Use Case |
|---------|----------|
| Top nav | Simple sites, < 7 items |
| Side nav | Complex apps, many sections |
| Bottom nav | Mobile, < 5 items |
| Tabs | Related content sections |
| Breadcrumbs | Deep hierarchies |

### Forms
| Pattern | Benefit |
|---------|---------|
| Single column | Faster completion |
| Inline validation | Immediate feedback |
| Smart defaults | Reduced effort |
| Progress indicator | Clear expectations |

### Feedback
| Pattern | Use Case |
|---------|----------|
| Toast | Non-blocking info |
| Modal | Blocking/important |
| Inline | Contextual feedback |
| Skeleton | Loading states |

## Mobile UX

### Touch Targets
- Minimum 44x44px (WCAG 2.1)
- 8px spacing between targets
- Thumb-friendly placement (bottom half)

### Gestures
- Tap: Primary action
- Swipe: Navigate/reveal
- Long press: Secondary actions
- Pinch: Zoom (if applicable)

## Common UX States

### Empty States
1. Explain what goes here
2. Guide to first action
3. Show example content

### Loading States
1. Skeleton screens > spinners
2. Progress for long ops (>2s)
3. Optimistic UI when safe

### Error States
1. Explain what happened
2. Suggest how to fix
3. Provide recovery action
4. Don't blame user

### Success States
1. Confirm completion
2. Show next steps
3. Celebrate achievements

## Content Strategy

### Microcopy
- Be concise (< 65 chars per line)
- Use active voice
- Avoid jargon
- Guide action

### Error Messages
- Specific problem ("Email already exists")
- How to fix ("Try logging in instead")
- No technical jargon ("500 error" = "Something went wrong")

## Design Critique Framework

| Aspect | Questions |
|--------|-----------|
| Usability | Can users complete tasks? |
| Clarity | Is purpose immediately clear? |
| Consistency | Follows established patterns? |
| Hierarchy | Most important stands out? |
| Feedback | Users know system state? |
| Accessibility | Works for everyone? |

## UX Metrics

| Metric | Target | Measure |
|--------|--------|---------|
| Task success rate | >90% | % completing without help |
| Time on task | Baseline → -20% | Average completion time |
| Error rate | <5% | % making mistakes |
| Completion rate | >80% | % finishing flow |
| User satisfaction | NPS >50 | Survey after use |
