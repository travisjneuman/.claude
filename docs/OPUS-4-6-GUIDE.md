---
name: Opus 4.6 Guide
description: Leveraging Claude Opus 4.6 capabilities in the toolkit — 1M context, agent teams, adaptive thinking.
category: reference
---

# Opus 4.6 Feature Guide

How this toolkit leverages Claude Opus 4.6 capabilities released February 2026.

**Last Updated:** February 2026 (v2.6.0)

---

## Key Capabilities

### 1M Context Window

Opus 4.6 supports up to 1 million tokens of context, enabling:

- **Full codebase analysis** — read entire projects without summarization loss
- **Longer agent sessions** — teammates maintain full context throughout complex tasks
- **Deep research** — synthesize information from many sources in a single session
- **Multi-file refactoring** — hold entire dependency graphs in context simultaneously

**Toolkit integration:** Agent teammates and subagents each get their own context window (up to 1M with Opus), documented in `docs/AGENT-TEAMS.md` and `agents/README.md`.

### Adaptive Thinking

Opus 4.6 introduces effort controls for extended thinking:

| Effort Level | Use Case | Configured In |
|-------------|----------|---------------|
| Standard | Routine tasks, file operations, simple edits | Default behavior |
| Extended | Architecture decisions, complex debugging, multi-step reasoning | CLAUDE.md Identity section |

**Toolkit integration:** The `CLAUDE.md` Identity section configures adaptive effort: "use extended thinking for architecture and complex debugging, standard for routine tasks."

### Agent Teams

Full peer-to-peer agent coordination with shared task lists and messaging:

| Feature | Description |
|---------|-------------|
| TeamCreate | Spawn coordinated teams with shared task lists |
| SendMessage | Direct messages and broadcasts between teammates |
| TaskCreate/Update/List | Shared task management with dependencies |
| Shutdown protocol | Graceful teammate lifecycle management |

**Toolkit integration:** See `docs/AGENT-TEAMS.md` for templates, `rules/workflows/agent-teams.md` for decision framework, `skills/agent-teams/SKILL.md` for composition knowledge.

### Context Compaction

Automatic context compression when approaching limits:

- Sessions continue indefinitely without manual intervention
- Prior messages compressed while preserving key information
- Task state may need re-sending after compaction (documented in `docs/AGENT-TEAMS.md` limitations)

**Toolkit integration:** `rules/workflows/context-management.md` covers context hygiene and state persistence strategies.

### Enhanced Agentic Coding

Opus 4.6 excels at autonomous multi-step coding:

- More reliable tool use chains
- Better at maintaining coherence across many file edits
- Improved error recovery and self-correction
- Stronger at following complex instruction sets (like this toolkit's CLAUDE.md)

---

## What Changed in the Toolkit for Opus 4.6

### Updated Files

| File | Change |
|------|--------|
| `CLAUDE.md` | Identity section: adaptive effort instead of "ULTRATHINK" |
| `CLAUDE.md` | Expanded auto-routing table (~30 entries covering all new domains) |
| `agents/README.md` | Updated context window reference to 1M |
| `docs/AGENT-TEAMS.md` | Updated context window reference to 1M |
| `docs/ARCHITECTURE.md` | Updated skill categories and rules inventory |

### New Components Added

| Category | Count | Highlights |
|----------|-------|------------|
| Agents | +13 | auth-specialist, payment-billing-specialist, next-js-expert, cloud-architect, data-engineer |
| Skills | +16 | llm-app-development, monitoring-observability, authentication-patterns, payment-integration |
| Stack guides | +5 | django-fastapi, react-native-expo, flutter-dart, vue-nuxt, svelte-sveltekit |
| Checklists | +4 | api-development, database-design, security-hardening, performance-optimization |
| Workflows | +1 | deployment-cicd |
| Commands | +7 | deploy, test-suite, scaffold, security-scan, deps-update, perf-audit, migrate |
| Templates | +4 | saas-project, mobile-app-project, api-project, landing-page-project |

### Updated Existing Content

| Component | Updates |
|-----------|---------|
| Stack guides (5) | react-typescript (React 19), python (uv/ruff/Pydantic v2), go (1.22+), rust (2024 edition), fullstack (Next.js 15) |
| Skills (9) | react-native (New Architecture), flutter (Riverpod 3), ios (visionOS), ai-ml (LLM apps), android (KMP), api-design (gRPC/tRPC), database-expert (vector DBs), security (OWASP examples), test-specialist (multi-language) |
| Agents (2 merged) | devops-engineer + devops-specialist, database-architect + database-expert |
| Agents (5 fixed) | Added missing tools to security-auditor, test-generator, architecture-analyst, accessibility-expert, code-explainer |

---

## Using Opus 4.6 Features

### Agent Teams for Parallel Work

```
Create an agent team for [task]:
- Researcher: investigate approach options
- Implementer: write the code
- Tester: write and run tests
```

See `docs/AGENT-TEAMS.md` for full templates and best practices.

### Leveraging 1M Context

For large codebases, Opus 4.6 can hold more files in context:

- Use subagents with `model: opus` for complex analysis tasks
- Agent team teammates get full independent context windows
- `/compact` is less urgent but still good practice at 50% usage

### Adaptive Thinking in Practice

The toolkit configures this automatically. For manual control:

- Complex architecture: Claude uses extended thinking automatically
- Simple file edits: Standard thinking for speed
- Debugging: Extended thinking engaged for root cause analysis

---

## Model Selection Guide

| Task | Recommended Model | Reason |
|------|------------------|--------|
| Agent team lead | opus | Needs coordination, synthesis, complex reasoning |
| Agent team researchers | sonnet | Good balance of speed and quality |
| Simple subagents (formatting, listing) | haiku | Fast, cheap, sufficient quality |
| Complex subagents (architecture, security) | sonnet or opus | Needs deeper reasoning |
| Interactive coding session | opus | Best for following complex instructions |

---

## See Also

- [AGENT-TEAMS.md](./AGENT-TEAMS.md) — Team coordination guide
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System architecture overview
- [SETUP-GUIDE.md](./SETUP-GUIDE.md) — Installation and configuration
- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) — Development workflow patterns

---

_Opus 4.6: 1M context, agent teams, adaptive thinking — all integrated into the toolkit._
