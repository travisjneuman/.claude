# Research Methodology Guide

**When to use:** Complex research tasks requiring systematic information gathering, analysis, and synthesis.

**Auto-activated for:** Research-heavy prompts with keywords like "investigate", "research", "find information about", "what are the options for", "compare approaches to".

---

## Overview

Research tasks benefit from structured methodology with competing hypotheses, confidence tracking, and multi-source verification. This approach ensures comprehensive coverage and calibrated conclusions.

---

## Structured Research Protocol

### 1. Define Success Criteria

Before starting research, establish clear success criteria:

- What specific question needs answering?
- What level of detail is required?
- What constitutes a complete answer?
- Are there time or scope constraints?

**Example:**

```
Question: "What's the best state management solution for a React app?"
Success criteria:
- Compare at least 3-4 major options
- Evaluate based on: bundle size, learning curve, ecosystem, performance
- Include 2024/2025 recommendations
- Consider both simple and complex use cases
```

---

### 2. Develop Competing Hypotheses

As you gather information, develop multiple competing hypotheses rather than converging on a single answer prematurely.

**Example Hypothesis Tree:**

```
Research Question: Best React state management?

Hypothesis A: "Zustand is best for most projects"
- Evidence for: Minimal boilerplate, small bundle, growing adoption
- Evidence against: Less mature ecosystem than Redux
- Confidence: 65%

Hypothesis B: "Redux Toolkit is best for complex apps"
- Evidence for: Proven at scale, extensive tooling, large ecosystem
- Evidence against: More boilerplate, steeper learning curve
- Confidence: 70%

Hypothesis C: "Built-in hooks are sufficient for simple apps"
- Evidence for: No dependencies, React native, simplest
- Evidence against: Doesn't scale well, prop drilling issues
- Confidence: 80%

Hypothesis D: "Context + useReducer is the sweet spot"
- Evidence for: No dependencies, scales reasonably, React patterns
- Evidence against: Performance concerns, re-render issues
- Confidence: 55%
```

---

### 3. Track Confidence Levels

Assign confidence levels to hypotheses and findings to improve calibration:

| Confidence | Meaning              | When to Use                                                 |
| ---------- | -------------------- | ----------------------------------------------------------- |
| 90-100%    | Near certain         | Multiple authoritative sources agree, personal verification |
| 70-89%     | Highly confident     | Strong evidence, some corroboration                         |
| 50-69%     | Moderately confident | Mixed evidence, or single strong source                     |
| 30-49%     | Low confidence       | Limited evidence, or conflicting sources                    |
| 0-29%      | Speculation          | Weak evidence, or extrapolation                             |

**Calibration Tips:**

- Start conservatively (50-60%) and adjust as evidence accumulates
- Actively look for disconfirming evidence to avoid confirmation bias
- Note when sources disagree - this should lower confidence
- Higher confidence requires multiple independent sources

---

### 4. Multi-Source Verification

Never rely on a single source for important conclusions. Use multiple search strategies:

**Search Strategy Checklist:**

- [ ] Official documentation
- [ ] Recent blog posts/articles (2024-2025)
- [ ] Community discussions (Reddit, HN, forums)
- [ ] GitHub activity (stars, recent commits, issues)
- [ ] Expert opinions/comparisons
- [ ] Performance benchmarks (if applicable)

**Cross-Verification:**

- Compare claims across sources
- Note when sources conflict
- Prefer primary sources over secondary
- Check publication dates (recent vs outdated)
- Consider author credibility

---

### 5. Regular Self-Critique

During research, periodically assess your approach:

**Self-Critique Questions:**

- Am I suffering from confirmation bias (only seeking evidence for one hypothesis)?
- Have I explored alternative explanations adequately?
- Are there obvious sources I haven't checked?
- Is my confidence calibrated appropriately?
- Am I answering the actual question or getting sidetracked?
- Do I need to refine my search strategy?

---

### 6. Maintain Research Progress Notes

Create a `research-notes.md` file to track progress transparently:

**Template Structure:**

```markdown
# Research: [Topic]

## Question

[Clear statement of what you're researching]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Hypotheses

### Hypothesis A: [Statement]

**Confidence:** 65%
**Evidence For:**

- Source 1: [finding]
- Source 2: [finding]
  **Evidence Against:**
- Source 3: [finding]

### Hypothesis B: [Statement]

**Confidence:** 70%
...

## Search Log

1. [Query] → [Results summary]
2. [Query] → [Results summary]

## Key Findings

- Finding 1
- Finding 2

## Remaining Questions

- Question 1
- Question 2

## Conclusion

[Synthesis of findings with confidence level]
```

---

### 7. Synthesis and Conclusion

After gathering evidence:

1. **Compare hypotheses** based on accumulated evidence
2. **Adjust confidence levels** based on total evidence
3. **Identify strongest hypothesis** with supporting reasoning
4. **Note caveats** and limitations of conclusion
5. **Provide actionable recommendation** if requested

**Example Conclusion:**

```
Based on research across 8 sources (official docs, 3 comparison articles,
2 Reddit discussions, GitHub metrics, benchmark data), I have high confidence
(75%) that Zustand is the best choice for your use case because:

1. Minimal bundle size (1.2kb vs Redux 15kb)
2. Simple API with minimal boilerplate
3. Good TypeScript support
4. Sufficient for medium-complexity apps

However, consider Redux Toolkit if:
- App will definitely grow very large
- Team already knows Redux
- You need time-travel debugging

Confidence level accounts for: project context assumptions (medium complexity),
recent but not extensive adoption data (2023-2024), and limited long-term
production reports compared to Redux.
```

---

## Research Notes File Structure

Use this template for complex research tasks:

```markdown
# Research Progress: [Topic]

**Started:** [Date/Time]
**Status:** In Progress / Complete
**Confidence in Conclusion:** [%]

---

## Research Question

[Clear, specific question]

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2

---

## Hypothesis Tree

### H1: [Hypothesis Statement]

- **Confidence:** X%
- **For:** [Evidence]
- **Against:** [Evidence]
- **Sources:** [Links/citations]

### H2: [Hypothesis Statement]

- **Confidence:** X%
- **For:** [Evidence]
- **Against:** [Evidence]
- **Sources:** [Links/citations]

---

## Search Log

1. **Query:** "react state management 2024"
   - **Results:** Found comparison article, official docs
   - **Key info:** [Summary]

2. **Query:** "zustand vs redux performance"
   - **Results:** Benchmark data, Reddit discussion
   - **Key info:** [Summary]

---

## Synthesis

[Integration of findings across hypotheses]

---

## Conclusion

[Final answer with confidence level and reasoning]

---

## Remaining Uncertainties

- [What's still unclear]
- [Where more research would help]
```

---

## Integration with Skills & Tools

Research methodology automatically leverages:

**Tools:**

- `WebSearch` - Primary research tool
- `WebFetch` - Deep dive into specific sources
- `Task` tool with `Explore` agent - Codebase research
- `Memory` tool - Save research findings for future reference

**Skills:**

- Domain expert skills provide specialized research patterns
- `data-science` skill for data-driven research
- Stack-specific skills for technology research

---

## When to Use This Methodology

**Always use for:**

- Complex research questions with no clear answer
- Technology/tool selection decisions
- Investigating multiple competing solutions
- Research requiring synthesis from many sources
- Questions where confidence calibration matters

**Optional for:**

- Simple factual lookups (single source sufficient)
- Well-established best practices (documented clearly)
- Quick reference questions

---

## Example Research Workflows

### Example 1: Technology Selection

```
Task: "What's the best way to handle authentication in a Next.js app?"

1. Define success criteria:
   - Evaluate 3-4 major approaches
   - Consider security, ease of use, scalability
   - Must work with Next.js App Router
   - Include 2024 recommendations

2. Initial hypotheses:
   - H1: NextAuth.js (Auth.js) - 70% confidence
   - H2: Clerk - 40% confidence
   - H3: Auth0 - 60% confidence
   - H4: Custom implementation - 30% confidence

3. Search strategy:
   - Official Next.js docs on authentication
   - Each library's documentation
   - Recent comparison articles (2024)
   - GitHub activity metrics
   - Reddit/HN discussions

4. Track findings in research-notes.md

5. Adjust confidence as evidence accumulates

6. Synthesize conclusion with reasoning
```

### Example 2: Debugging Investigation

```
Task: "Why is our React app re-rendering excessively?"

1. Define success criteria:
   - Identify root cause of re-renders
   - Provide actionable fix
   - Understand why it's happening

2. Hypotheses:
   - H1: Component state causing cascading updates
   - H2: Context provider too high in tree
   - H3: Missing memoization
   - H4: Props changing on every render

3. Investigation approach:
   - Use React DevTools Profiler (primary data)
   - Review code for common patterns
   - Search for similar issues
   - Test hypotheses systematically

4. Adjust confidence based on profiler data

5. Provide fix with explanation
```

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core workflow (Always Available → WebSearch)
- `~/.claude/commands/start-task.md` - Auto-activates research for relevant prompts
- `~/.claude/skills/README.md` - Domain expert skills for specialized research

---

## Quick Reference

**Research Checklist:**

- [ ] Define clear success criteria
- [ ] Develop 2-4 competing hypotheses
- [ ] Assign initial confidence levels
- [ ] Use multiple search strategies
- [ ] Verify across multiple sources
- [ ] Track progress in research-notes.md
- [ ] Self-critique approach periodically
- [ ] Adjust confidence as evidence accumulates
- [ ] Synthesize findings with final confidence level
- [ ] Note caveats and limitations

---

_Systematic research prevents premature conclusions and improves answer quality through structured hypothesis testing and confidence calibration._
