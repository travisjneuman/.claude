# Decision Framework Reference

Load this file when decision-making signals detected.

## Decision Detection Signals

Task contains: "should I", "which", "compare", "choose", "decide", "vs", "or", "better", "best"

## Framework Selection

| Decision Type | Keywords | Framework Command |
|---------------|----------|-------------------|
| Root cause analysis | "why", "cause", "reason", "happening" | `/taches-cc-resources:consider/5-whys` |
| Prioritization | "priority", "first", "important", "urgent" | `/taches-cc-resources:consider/eisenhower-matrix` |
| Technical choice | "which", "vs", "compare", "better" | `/taches-cc-resources:consider/first-principles` |
| Consequence analysis | "impact", "effect", "result", "if I" | `/taches-cc-resources:consider/second-order` |
| Simplification | "simplify", "reduce", "essential", "minimal" | `/taches-cc-resources:consider/occams-razor` |
| Trade-off analysis | "trade-off", "pros cons", "swot", "advantages" | `/taches-cc-resources:consider/swot` |

## Framework Descriptions

### 5-Whys
Drill down to root cause by asking "why" repeatedly. Best for: debugging, understanding failures, finding systemic issues.

### Eisenhower Matrix
Categorize by urgency vs importance. Best for: task prioritization, workload management, deciding what to do first.

### First Principles
Break down to fundamental truths, rebuild from there. Best for: technical decisions, architectural choices, evaluating options.

### Second-Order Thinking
Consider consequences of consequences. Best for: strategic decisions, understanding long-term impact.

### Occam's Razor
Simplest solution is usually correct. Best for: reducing complexity, choosing between equivalent options.

### SWOT Analysis
Strengths, Weaknesses, Opportunities, Threats. Best for: competitive analysis, evaluating trade-offs.

## Routing Rule

**After invoking a decision framework, EXIT** - the framework handles the rest of the interaction.
