# User Gates Reference

User gates prevent Claude from charging ahead at critical decision points.

## Question Types

### AskUserQuestion Tool
Use for **structured choices** (2-4 options):
- Selecting from distinct approaches
- Domain/type selection
- When user needs to see options to decide

Examples:
- "What type of project?" (macos-app / iphone-app / web-app / other)
- "Research confidence is low. How to proceed?" (dig deeper / proceed anyway / pause)
- "Multiple valid approaches exist:" (Option A / Option B / Option C)

### Inline Questions
Use for **simple confirmations**:
- Yes/no decisions
- "Does this look right?"
- "Ready to proceed?"

Examples:
- "Here's the task breakdown: [list]. Does this look right?"
- "Proceed with this approach?"
- "I'll initialize a git repo. OK?"

## Decision Gate Loop

After gathering context, ALWAYS offer:

```
Ready to [action], or would you like me to ask more questions?

1. Proceed - I have enough context
2. Ask more questions - There are details to clarify
3. Let me add context - I want to provide additional information
```

Loop continues until user selects "Proceed".

## Mandatory Gate Points

| Location | Gate Type | Trigger |
|----------|-----------|---------|
| plan-phase | Inline | Confirm task breakdown |
| plan-phase | AskUserQuestion | Multiple valid approaches |
| plan-phase | AskUserQuestion | Decision gate before writing |
| research-phase | AskUserQuestion | Low confidence findings |
| research-phase | Inline | Open questions acknowledgment |
| execute-phase | Inline | Verification failure |
| execute-phase | Inline | Issues review before proceeding |
| execute-phase | AskUserQuestion | Previous phase had issues |
| create-brief | AskUserQuestion | Decision gate before writing |
| create-roadmap | Inline | Confirm phase breakdown |
| create-roadmap | AskUserQuestion | Decision gate before writing |
| handoff | Inline | Handoff acknowledgment |

## Good vs Bad Gating

### Good
- Gate before writing artifacts (not after)
- Gate when genuinely ambiguous
- Gate when issues affect next steps
- Quick inline for simple confirmations

### Bad
- Asking obvious choices ("Should I save the file?")
- Multiple gates for same decision
- AskUserQuestion for yes/no
- Gates after the fact
