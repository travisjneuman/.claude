# Research Prompt Template

For phases requiring research before planning:

```markdown
---
phase: XX-name
type: research
topic: [research-topic]
---

<session_initialization>
Before beginning research, verify today's date:
!`date +%Y-%m-%d`

Use this date when searching for "current" or "latest" information.
Example: If today is 2025-11-22, search for "2025" not "2024".
</session_initialization>

<research_objective>
Research [topic] to inform [phase name] implementation.

Purpose: [What decision/implementation this enables]
Scope: [Boundaries]
Output: FINDINGS.md with structured recommendations
</research_objective>

<research_scope>
<include>
- [Question to answer]
- [Area to investigate]
- [Specific comparison if needed]
</include>

<exclude>
- [Out of scope for this research]
- [Defer to implementation phase]
</exclude>

<sources>
Official documentation (with exact URLs when known):
- https://example.com/official-docs
- https://example.com/api-reference

Search queries for WebSearch:
- "[topic] best practices {current_year}"
- "[topic] latest version"

Context7 MCP for library docs
Prefer current/recent sources (check date above)
</sources>
</research_scope>

<verification_checklist>
{If researching configuration/architecture with known components:}
□ Enumerate ALL known options/scopes (list them explicitly):
  □ Option/Scope 1: [description]
  □ Option/Scope 2: [description]
  □ Option/Scope 3: [description]
□ Document exact file locations/URLs for each option
□ Verify precedence/hierarchy rules if applicable
□ Check for recent updates or changes to documentation

{For all research:}
□ Verify negative claims ("X is not possible") with official docs
□ Confirm all primary claims have authoritative sources
□ Check both current docs AND recent updates/changelogs
□ Test multiple search queries to avoid missing information
□ Check for environment/tool-specific variations
</verification_checklist>

<research_quality_assurance>
Before completing research, perform these checks:

<completeness_check>
- [ ] All enumerated options/components documented with evidence
- [ ] Official documentation cited for critical claims
- [ ] Contradictory information resolved or flagged
</completeness_check>

<blind_spots_review>
Ask yourself: "What might I have missed?"
- [ ] Are there configuration/implementation options I didn't investigate?
- [ ] Did I check for multiple environments/contexts?
- [ ] Did I verify claims that seem definitive ("cannot", "only", "must")?
- [ ] Did I look for recent changes or updates to documentation?
</blind_spots_review>

<critical_claims_audit>
For any statement like "X is not possible" or "Y is the only way":
- [ ] Is this verified by official documentation?
- [ ] Have I checked for recent updates that might change this?
- [ ] Are there alternative approaches I haven't considered?
</critical_claims_audit>
</research_quality_assurance>

<incremental_output>
**CRITICAL: Write findings incrementally to prevent token limit failures**

Instead of generating full FINDINGS.md at the end:
1. Create FINDINGS.md with structure skeleton
2. Write each finding as you discover it (append immediately)
3. Add code examples as found (append immediately)
4. Finalize summary and metadata at end

This ensures zero lost work if token limits are hit.

<workflow>
Step 1 - Initialize:
```bash
# Create skeleton file
cat > .planning/phases/XX-name/FINDINGS.md <<'EOF'
# [Topic] Research Findings

## Summary
[Will complete at end]

## Recommendations
[Will complete at end]

## Key Findings
[Append findings here as discovered]

## Code Examples
[Append examples here as found]

## Metadata
[Will complete at end]
EOF
```

Step 2 - Append findings as discovered:
After researching each aspect, immediately append to Key Findings section

Step 3 - Finalize at end:
Complete Summary, Recommendations, and Metadata sections
</workflow>
</incremental_output>

<output_structure>
Create `.planning/phases/XX-name/FINDINGS.md`:

# [Topic] Research Findings

## Summary
[2-3 paragraph executive summary]

## Recommendations

### Primary Recommendation
[What to do and why]

### Alternatives Considered
[What else was evaluated]

## Key Findings

### [Category 1]
- Finding with source URL
- Relevance to our case

### [Category 2]
- Finding with source URL
- Relevance

## Code Examples
[Relevant patterns, if applicable]

## Metadata

<metadata>
<confidence level="high|medium|low">
[Why this confidence level]
</confidence>

<dependencies>
[What's needed to proceed]
</dependencies>

<open_questions>
[What couldn't be determined]
</open_questions>

<assumptions>
[What was assumed]
</assumptions>

<quality_report>
  <sources_consulted>
    [List URLs of official documentation and primary sources]
  </sources_consulted>
  <claims_verified>
    [Key findings verified with official sources]
  </claims_verified>
  <claims_assumed>
    [Findings based on inference or incomplete information]
  </claims_assumed>
  <confidence_by_finding>
    - Finding 1: High (official docs + multiple sources)
    - Finding 2: Medium (single source)
    - Finding 3: Low (inferred, requires verification)
  </confidence_by_finding>
</quality_report>
</metadata>
</output_structure>

<success_criteria>
- All scope questions answered
- All verification checklist items completed
- Sources are current and authoritative
- Clear primary recommendation
- Metadata captures uncertainties
- Quality report distinguishes verified from assumed
- Ready to inform PLAN.md creation
</success_criteria>
```

<when_to_use>
Create RESEARCH.md before PLAN.md when:
- Technology choice unclear
- Best practices needed for unfamiliar domain
- API/library investigation required
- Architecture decision pending
- Multiple valid approaches exist
</when_to_use>

<example>
```markdown
---
phase: 02-auth
type: research
topic: JWT library selection for Next.js App Router
---

<research_objective>
Research JWT libraries to determine best option for Next.js 14 App Router authentication.

Purpose: Select JWT library before implementing auth endpoints
Scope: Compare jose, jsonwebtoken, and @auth/core for our use case
Output: FINDINGS.md with library recommendation
</research_objective>

<research_scope>
<include>
- ESM/CommonJS compatibility with Next.js 14
- Edge runtime support
- Token creation and validation patterns
- Community adoption and maintenance
</include>

<exclude>
- Full auth framework comparison (NextAuth vs custom)
- OAuth provider configuration
- Session storage strategies
</exclude>

<sources>
Official documentation (prioritize):
- https://github.com/panva/jose
- https://github.com/auth0/node-jsonwebtoken

Context7 MCP for library docs
Prefer current/recent sources
</sources>
</research_scope>

<success_criteria>
- Clear recommendation with rationale
- Code examples for selected library
- Known limitations documented
- Verification checklist completed
</success_criteria>
```
</example>
