# Workflow: Research Phase

<purpose>
Create and execute a research prompt for phases with unknowns.
Produces FINDINGS.md that informs PLAN.md creation.
</purpose>

<when_to_use>
- Technology choice unclear
- Best practices needed
- API/library investigation required
- Architecture decision pending
</when_to_use>

<process>

<step name="identify_unknowns">
Ask: What do we need to learn before we can plan this phase?
- Technology choices?
- Best practices?
- API patterns?
- Architecture approach?
</step>

<step name="create_research_prompt">
Use templates/research-prompt.md.
Write to `.planning/phases/XX-name/RESEARCH.md`

Include:
- Clear research objective
- Scoped include/exclude lists
- Source preferences (official docs, Context7, 2024-2025)
- Output structure for FINDINGS.md
</step>

<step name="execute_research">
Run the research prompt:
- Use web search for current info
- Use Context7 MCP for library docs
- Prefer 2024-2025 sources
- Structure findings per template
</step>

<step name="create_findings">
Write `.planning/phases/XX-name/FINDINGS.md`:
- Summary with recommendation
- Key findings with sources
- Code examples if applicable
- Metadata (confidence, dependencies, open questions, assumptions)
</step>

<step name="confidence_gate">
After creating FINDINGS.md, check confidence level.

If confidence is LOW:
  Use AskUserQuestion:
  - header: "Low Confidence"
  - question: "Research confidence is LOW: [reason]. How would you like to proceed?"
  - options:
    - "Dig deeper" - Do more research before planning
    - "Proceed anyway" - Accept uncertainty, plan with caveats
    - "Pause" - I need to think about this

If confidence is MEDIUM:
  Inline: "Research complete (medium confidence). [brief reason]. Proceed to planning?"

If confidence is HIGH:
  Proceed directly, just note: "Research complete (high confidence)."
</step>

<step name="open_questions_gate">
If FINDINGS.md has open_questions:

Present them inline:
"Open questions from research:
- [Question 1]
- [Question 2]

These may affect implementation. Acknowledge and proceed? (yes / address first)"

If "address first": Gather user input on questions, update findings.
</step>

<step name="offer_next">
```
Research complete: .planning/phases/XX-name/FINDINGS.md
Recommendation: [one-liner]
Confidence: [level]

What's next?
1. Create phase plan (PLAN.md) using findings
2. Refine research (dig deeper)
3. Review findings
```

NOTE: FINDINGS.md is NOT committed separately. It will be committed with phase completion.
</step>

</process>

<success_criteria>
- RESEARCH.md exists with clear scope
- FINDINGS.md created with structured recommendations
- Confidence level and metadata included
- Ready to inform PLAN.md creation
</success_criteria>
