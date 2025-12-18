# Claude Code Subagents

Specialized AI agents for focused, expert-level assistance across all domains.

## Available Agents

### Code Quality
| Agent | Purpose | Model |
|-------|---------|-------|
| `deep-code-reviewer` | Comprehensive 6-aspect code review | opus |
| `security-auditor` | OWASP Top 10 and security analysis | sonnet |
| `refactoring-specialist` | Safe, incremental code improvement | sonnet |
| `performance-optimizer` | Bottleneck identification and optimization | sonnet |

### Development
| Agent | Purpose | Model |
|-------|---------|-------|
| `test-generator` | TDD-focused test suite generation | sonnet |
| `api-designer` | REST/GraphQL API design | sonnet |
| `database-expert` | Schema design and query optimization | sonnet |
| `devops-specialist` | CI/CD, containers, infrastructure | sonnet |

### Architecture
| Agent | Purpose | Model |
|-------|---------|-------|
| `architecture-analyst` | System design and pattern analysis | opus |
| `debugging-specialist` | Systematic 4-phase debugging | sonnet |
| `graphql-architect` | GraphQL schema and resolver design | sonnet |
| `microservices-architect` | Distributed systems and service design | sonnet |
| `realtime-specialist` | WebSockets and live data systems | sonnet |

### Language Experts
| Agent | Purpose | Model |
|-------|---------|-------|
| `typescript-expert` | Type system mastery | sonnet |
| `python-expert` | Python best practices | sonnet |
| `react-expert` | React patterns and hooks | sonnet |

### Platform Development
| Agent | Purpose | Model |
|-------|---------|-------|
| `ios-developer` | iOS/iPadOS/tvOS with Swift and SwiftUI | sonnet |
| `android-developer` | Android with Kotlin and Jetpack Compose | sonnet |
| `mobile-architect` | Cross-platform mobile architecture decisions | sonnet |
| `desktop-developer` | Electron and desktop app development | sonnet |
| `i18n-specialist` | Internationalization and localization | sonnet |

### Creative & Design
| Agent | Purpose | Model |
|-------|---------|-------|
| `graphic-designer` | Visual design, color, typography | sonnet |
| `video-producer` | Video production and editing | sonnet |
| `audio-engineer` | Audio production and sound design | sonnet |
| `brand-strategist` | Brand identity and positioning | sonnet |
| `motion-designer` | UI animation and micro-interactions | sonnet |

### Business & Strategy
| Agent | Purpose | Model |
|-------|---------|-------|
| `startup-advisor` | Startup launch and validation | sonnet |
| `monetization-expert` | Revenue models and pricing strategy | sonnet |

### Infrastructure & Specialized
| Agent | Purpose | Model |
|-------|---------|-------|
| `devops-engineer` | AWS, GCP, Azure, Kubernetes, Terraform, CI/CD | sonnet |
| `ml-engineer` | PyTorch, TensorFlow, LLM integration, MLOps | sonnet |
| `game-developer` | Unity, Unreal Engine, Godot game development | sonnet |
| `macos-developer` | Native macOS AppKit, Catalyst development | sonnet |
| `database-architect` | PostgreSQL, MongoDB, Redis schema and optimization | sonnet |

### Support
| Agent | Purpose | Model |
|-------|---------|-------|
| `documentation-writer` | Docs, READMEs, API specs | haiku |
| `code-explainer` | Clear code explanations | haiku |
| `accessibility-expert` | WCAG compliance | sonnet |

## Usage

Agents are automatically invoked by Claude when their description matches the task.

### Explicit Invocation
```
Use the security-auditor agent to review this authentication code
Use the ios-developer agent to help me build the Swift UI
Use the startup-advisor agent to help me validate my idea
Use the devops-engineer agent to set up my Kubernetes deployment
Use the ml-engineer agent to help integrate the OpenAI API
Use the database-architect agent to optimize my PostgreSQL queries
```

### Via Task Tool
Claude will spawn these as subagents when appropriate for parallel work.

## Model Selection Guide
- **opus**: Complex analysis, architecture, thorough reviews
- **sonnet**: Standard development tasks, balanced speed/quality
- **haiku**: Quick tasks, documentation, explanations

## Creating New Agents

1. Create `.md` file in `~/.claude/agents/`
2. Include YAML frontmatter:
   ```yaml
   ---
   name: agent-name
   description: When to use this agent
   tools:
     - Read
     - Write
     - Grep
     - Glob
   model: sonnet
   ---
   ```
3. Write system prompt below frontmatter

## Best Practices
- One expertise area per agent
- Minimal tool access (only what's needed)
- Clear, actionable output formats
- Include reference skills where helpful
- Match model to task complexity

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Global constitution (Skills & Agents trigger guide)
- `~/.claude/skills/MASTER_INDEX.md` - Complete skills navigation
- `~/.claude/skills/README.md` - Skills usage guide
- `~/.claude/README.md` - Installation guide

---

*Agents execute tasks. Skills provide knowledge. Use agents for doing, skills for guidance.*
