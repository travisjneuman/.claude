# Claude 4 Best Practices Analysis

Comprehensive comparison of Anthropic's official Claude 4 best practices against our current workflow.

**Analysis Date:** 2026-01-03
**Source:** https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices

---

## ✅ What We Already Do Well

### Strong Coverage Areas

| Practice | Our Implementation | Location |
|----------|-------------------|----------|
| **Explicit Instructions** | "Explicit > clever — no magic" | `CLAUDE.md:13` |
| **Direct Communication** | "Direct communication — logic over feelings" | `CLAUDE.md:15` |
| **Extended Thinking** | ULTRATHINK as default for non-trivial tasks | `CLAUDE.md:17-20` |
| **Code Exploration** | "DO NOT propose changes to unread code" | `CLAUDE.md:103` |
| **Avoid Overengineering** | "DO NOT add features beyond what was requested" | `CLAUDE.md:106` |
| **Long-Horizon Reasoning** | GSD system with multi-phase project support | `CLAUDE.md:44`, `docs/GSD-TUTORIAL.md` |
| **State Tracking** | TodoWrite + git-based tracking | `CLAUDE.md:39`, workflow |
| **Subagent Orchestration** | Task tool with 36 specialized agents | `CLAUDE.md:56-57` |
| **Research Capabilities** | WebSearch always available | `CLAUDE.md:54` |
| **Parallel Tool Calling** | Built into Claude Code system prompt | (system default) |
| **Minimize Hallucinations** | Explicit file reading before code changes | `CLAUDE.md:103` |
| **Git for State** | Core workflow component | `CLAUDE.md:88-95` |

---

## 🔴 Significant Gaps to Address

### 1. Research & Information Gathering (HIGH PRIORITY)

**What Anthropic Recommends:**
```text
Search for this information in a structured way. As you gather data,
develop several competing hypotheses. Track your confidence levels in
your progress notes to improve calibration. Regularly self-critique your
approach and plan. Update a hypothesis tree or research notes file to
persist information and provide transparency.
```

**What We're Missing:**
- No structured research methodology with hypothesis tracking
- No confidence calibration guidance
- No example of research progress files (e.g., `research-notes.md`)
- No explicit multi-source verification pattern

**Impact:** Complex research tasks lack systematic approach and may miss competing explanations.

**Recommendation:** Create `rules/workflows/research-methodology.md` with:
- Hypothesis tree structure
- Confidence calibration framework
- Multi-source verification checklist
- Research progress file template

---

### 2. Tool Usage Behavior Configuration (HIGH PRIORITY)

**What Anthropic Recommends:**
Two competing patterns for different use cases:

**Pattern A - Proactive (default to action):**
```text
By default, implement changes rather than only suggesting them. If the
user's intent is unclear, infer the most useful likely action and proceed,
using tools to discover any missing details instead of guessing.
```

**Pattern B - Conservative (suggest first):**
```text
Do not jump into implementation or change files unless clearly instructed.
When the user's intent is ambiguous, default to providing information,
doing research, and providing recommendations rather than taking action.
```

**What We're Missing:**
- No configurable action behavior
- Users can't easily switch between proactive vs conservative modes
- No explicit guidance about when to suggest vs implement

**Impact:** May be too conservative for some users, too aggressive for others.

**Recommendation:** Create user-configurable setting:
- Add to `CLAUDE.md` or create `rules/workflows/action-policy.md`
- Provide both patterns as templates
- Let users choose their preferred default behavior
- Consider project-level overrides

---

### 3. Context Awareness & Multi-Window Workflows (MEDIUM PRIORITY)

**What Anthropic Recommends:**
```text
Your context window will be automatically compacted as it approaches its
limit, allowing you to continue working indefinitely. Therefore, do not
stop tasks early due to token budget concerns. As you approach your token
budget limit, save your current progress and state to memory before the
context window refreshes.
```

**Plus specific multi-window patterns:**
- First window: Set up framework (tests, scripts)
- Subsequent windows: Iterate on structured todo list
- Create `tests.json` in structured format
- Set up quality-of-life tools (`init.sh`)
- Verification tools (Playwright, integration tests)

**What We're Missing:**
- No explicit context compaction behavior prompt
- GSD has multi-phase support but could formalize window-specific patterns
- Missing structured test file pattern (`tests.json`)
- Missing setup script pattern (`init.sh`)

**Impact:** May artificially stop work near context limit; less efficient context transitions.

**Recommendation:**
- Add context awareness prompt to system config
- Formalize first-window vs subsequent-window patterns in GSD
- Add `tests.json` template to project initialization
- Encourage setup scripts for complex projects

---

### 4. Formatting Control (MEDIUM PRIORITY)

**What Anthropic Recommends:**
```text
When writing reports, documents, or long-form content, write in clear,
flowing prose using complete paragraphs. Avoid using **bold** and *italics*.
DO NOT use ordered or unordered lists unless presenting truly discrete items
or the user explicitly requests a list. Your goal is readable, flowing text
that guides the reader naturally through ideas rather than fragmenting
information into isolated points.
```

**What We're Missing:**
- No explicit prose vs bullet points preference
- No guidance about markdown overuse
- "Only use emojis if requested" but not broader formatting rules

**Impact:** May produce overly bulleted responses when prose would be better.

**Recommendation:** Add to `CLAUDE.md` or communication guidelines:
- Default to prose paragraphs for explanations
- Reserve bullets for truly discrete items
- Minimize bold/italics unless user requests emphasis
- Use code formatting appropriately

---

### 5. Frontend Design Aesthetics (MEDIUM PRIORITY)

**What Anthropic Recommends:**
Detailed guidance to avoid "AI slop" aesthetic:
- Typography: Avoid generic fonts (Arial, Inter)
- Color: Commit to cohesive aesthetic, avoid purple gradients on white
- Motion: GPU-accelerated animations, staggered reveals
- Backgrounds: Layer gradients, geometric patterns, contextual effects
- Vary aesthetics across projects (not always Space Grotesk)

**What We Have:**
- `frontend-enhancer` skill exists
- Basic UI/visual changes checklist

**What We're Missing:**
- Detailed anti-generic-AI aesthetics guidance
- Specific font/color/animation patterns
- "Think outside the box" encouragement for design

**Impact:** May produce generic-looking frontends without user intervention.

**Recommendation:**
- Enhance `frontend-enhancer` skill with full Anthropic guidance
- Add to `rules/checklists/ui-visual-changes.md`
- Include in frontend-related stack files

---

### 6. Test Solution Quality (MEDIUM PRIORITY)

**What Anthropic Recommends:**
```text
Implement a solution that works correctly for all valid inputs, not just
the test cases. Do not hard-code values or create solutions that only work
for specific test inputs. Tests are there to verify correctness, not to
define the solution. Provide a principled implementation that follows best
practices.
```

**What We're Missing:**
- No explicit "solve generally, not just for tests" instruction
- No warning about hard-coding test values

**Impact:** May produce brittle solutions that pass tests but fail on edge cases.

**Recommendation:** Add to:
- `rules/checklists/verification-template.md`
- Stack-specific test guidance files
- Test-specialist skill

---

### 7. Structured State Formats (LOW PRIORITY)

**What Anthropic Recommends:**
- Use JSON for structured data (tests, metrics, status)
- Use plain text for progress notes
- Example: `tests.json` with schema

**What We Have:**
- GSD uses markdown files
- TodoWrite uses structured format
- Git for state tracking

**What We're Missing:**
- Explicit guidance about when to use JSON vs markdown
- `tests.json` pattern example

**Impact:** Minor - current approach works but could be more formalized.

**Recommendation:** Document pattern in workflow guide:
- Structured data → JSON
- Progress notes → Markdown
- State checkpoints → Git commits

---

## 🟡 Minor Gaps

### 1. Balance Verbosity After Tool Use

**Recommendation:**
```text
After completing a task that involves tool use, provide a quick summary
of the work you've done.
```

**Action:** Consider adding to communication guidelines if users want more visibility.

---

### 2. Context for Instructions (WHY)

**Current:** Implicit in mindset
**Enhancement:** Make more explicit - "Always explain WHY behind architectural decisions"

**Action:** Add to `CLAUDE.md` Core Mindset section.

---

### 3. Temporary File Cleanup

**Recommendation:**
```text
If you create any temporary new files, scripts, or helper files for
iteration, clean up these files by removing them at the end of the task.
```

**Action:** Add to verification checklist as optional best practice.

---

### 4. Vision Crop Tool

**Recommendation:** Mention crop tool/skill for image analysis tasks with multiple regions.

**Action:** Add to vision/image-related skills or tooling documentation.

---

### 5. Document Creation Guidance

**Recommendation:** Explicit guidance for presentations, animations, visual documents.

**Action:** Create skill or add to relevant domain (creative/business).

---

## 📊 Priority Implementation Plan

### Phase 1: High Impact (Immediate)

1. **Research Methodology** - Add structured research approach with hypothesis tracking
2. **Action Policy Configuration** - Add proactive vs conservative behavior options
3. **Test Solution Quality** - Add "solve generally" guidance

### Phase 2: Workflow Enhancement (Next)

4. **Context Awareness** - Add explicit context management prompting
5. **Formatting Control** - Add prose vs bullets preferences
6. **Frontend Aesthetics** - Enhance frontend design guidance

### Phase 3: Polish (Later)

7. **Structured State Formats** - Formalize JSON vs markdown patterns
8. **Minor Enhancements** - Tool summaries, temp file cleanup, vision crop

---

## 🎯 Recommended New Files

1. `rules/workflows/research-methodology.md` - Structured research approach
2. `rules/workflows/action-policy.md` - Proactive vs conservative configuration
3. `rules/workflows/context-management.md` - Context awareness best practices
4. `templates/tests.json` - Structured test tracking template
5. `templates/research-notes.md` - Research progress template

---

## 💡 Key Takeaways

### We're Already Strong At:
- Core engineering practices (explicit, avoid overengineering)
- Long-horizon reasoning via GSD
- State tracking and git workflows
- Code exploration and hallucination prevention
- Subagent orchestration

### We Need to Add:
- Structured research methodology
- Configurable action behavior
- Better context awareness prompting
- Formatting preferences
- Enhanced frontend design guidance
- General test solution quality emphasis

### Philosophy Alignment:
Our workflow already aligns well with Claude 4.5's capabilities. The gaps are mostly about:
1. Making implicit practices explicit
2. Adding configurability for different user preferences
3. Formalizing advanced patterns (research, multi-window workflows)

---

**Next Steps:** Review this analysis and prioritize which gaps to address based on your actual usage patterns and pain points.
