# Auto-Claude Integration Guide

Complete setup and usage guide for Auto-Claude autonomous coding framework.

**Last Updated:** January 2026 (v2.2)

---

## What is Auto-Claude?

Autonomous multi-agent coding framework that:

- Analyzes codebases and generates implementation specs
- Creates isolated git worktrees for safe development
- Implements features autonomously with QA validation
- Uses Graphiti memory for semantic context retention

**Repository:** https://github.com/AndyMik90/Auto-Claude
**Integration:** Read-only git submodule in `plugins/marketplaces/auto-claude/`

---

## Setup

### Prerequisites

✅ Python 3.12+ installed (verified: 3.12.8)
✅ Claude Code CLI installed
✅ Git repository for your project

### Installation Verification

```bash
# Check Python version
python --version  # Should be 3.12+

# Check Auto-Claude backend accessible
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend
python -c "import sys; sys.path.insert(0, '.'); from run import main; print('✓ Backend accessible')"
```

### Configuration

**Location:** `~/.auto-claude/.env`

**Get OAuth Token:**

1. Open Claude Code
2. Run `/settings`
3. Copy OAuth token
4. Paste into `CLAUDE_CODE_OAUTH_TOKEN=` in `.env`

**Example .env:**

```bash
CLAUDE_CODE_OAUTH_TOKEN=your-token-here
DEFAULT_BRANCH=master
GRAPHITI_ENABLED=true
GOOGLE_API_KEY=your-gemini-api-key  # Or use Ollama (local)
```

---

## Usage

### Via Slash Command (Recommended)

```bash
/auto-claude Add user profile page with avatar upload
```

### Via Direct CLI

```bash
# From any project directory
python ~/.claude/plugins/marketplaces/auto-claude/apps/backend/run.py

# Run existing spec
python ~/.claude/plugins/marketplaces/auto-claude/apps/backend/spec_runner.py ~/.auto-claude/specs/feature.json
```

---

## Decision Guide: When to Use Auto-Claude

| Factor              | Use Auto-Claude                    | Use Manual (/start-task)    | Use GSD                      |
| ------------------- | ---------------------------------- | --------------------------- | ---------------------------- |
| **Complexity**      | 3-4 (well-defined, multiple files) | 1-2 (clear, few files)      | 5+ (multi-phase)             |
| **Specification**   | Clear requirements                 | Exploratory/research needed | High-level vision            |
| **Codebase**        | Established patterns exist         | New or changing rapidly     | Greenfield or major refactor |
| **Time preference** | Autonomous (review later)          | Step-by-step control        | Long-term project            |
| **Risk tolerance**  | Medium (isolated worktree)         | Low (manual approval)       | Medium (phased approach)     |

**Examples:**

| Task                                       | Best Workflow         | Why                                                  |
| ------------------------------------------ | --------------------- | ---------------------------------------------------- |
| "Fix typo in README"                       | Manual                | Too simple for Auto-Claude                           |
| "Add user authentication with JWT"         | **Auto-Claude**       | Well-defined, multiple files, QA validation valuable |
| "Explore best approach for real-time sync" | Manual                | Needs research first                                 |
| "Build entire e-commerce platform"         | GSD                   | Multi-phase, needs project management                |
| "Implement dark mode toggle"               | Auto-Claude or Manual | Either works - preference based                      |
| "Refactor API to GraphQL"                  | **Auto-Claude**       | Complex, clear goal, benefits from QA loops          |

---

## Workflow Example

**1. User Request:**

```
/auto-claude Add real-time notifications with WebSocket support
```

**2. Auto-Claude Analyzes:**

- Scans project structure
- Identifies WebSocket libraries
- Generates implementation spec

**3. Creates Worktree:**

```
.worktrees/notifications-feature/
```

**4. Autonomous Implementation:**

- Multi-agent coordination
- Implements WebSocket server
- Adds client-side handlers
- Creates tests

**5. QA Validation:**

- Runs test suite
- Validates acceptance criteria
- Iterates until passing

**6. Review & Merge:**

```bash
cd .worktrees/notifications-feature
git diff master
npm test

# If satisfied:
git checkout master
git merge notifications-feature
git worktree remove .worktrees/notifications-feature
```

---

## Output Directory

**Location:** `~/.auto-claude/` (gitignored)

**Contents:**

- `baselines/` - Codebase analysis
- `specs/` - Implementation specifications
- `insights/` - Discovered patterns
- `roadmap/` - Implementation plans
- `.env` - Configuration (NEVER commit)

---

## Troubleshooting

### OAuth Token Not Set

**Error:** `CLAUDE_CODE_OAUTH_TOKEN not found`

**Fix:**

1. Run `/settings` in Claude Code
2. Copy OAuth token
3. Edit `~/.auto-claude/.env`
4. Paste token: `CLAUDE_CODE_OAUTH_TOKEN=paste-here`

### Python Dependencies Missing

**Error:** `ModuleNotFoundError: No module named 'claude'`

**Fix:**

```bash
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend
pip install -r requirements.txt
```

### Git Worktree Already Exists

**Error:** `fatal: 'worktree-name' already exists`

**Fix:**

```bash
git worktree list
git worktree remove worktree-name --force
```

---

## Integration with .claude/ Workflows

| Workflow           | When to Use                                   |
| ------------------ | --------------------------------------------- |
| `/start-task`      | Manual implementation, planning first         |
| `/auto-claude`     | Autonomous implementation of defined features |
| `/gsd:new-project` | Multi-phase project management                |

**Recommended Flow:**

1. Use `/start-task` for planning and exploration
2. Use `/auto-claude` for implementation of complex features
3. Use `/gsd:new-project` for multi-phase projects

---

## Memory System

Auto-Claude uses Graphiti for semantic memory across sessions.

### Embedding Provider Options

**1. Gemini (Google AI) - Recommended**

```bash
GRAPHITI_ENABLED=true
GRAPHITI_EMBEDDER_PROVIDER=google
GOOGLE_API_KEY=your-gemini-key
```

- Free tier available
- No local setup required

**2. Ollama (Local) - Privacy-focused**

```bash
# Install Ollama first: https://ollama.ai
ollama pull nomic-embed-text

# Then configure:
GRAPHITI_ENABLED=true
GRAPHITI_EMBEDDER_PROVIDER=ollama
GRAPHITI_EMBEDDER_MODEL=nomic-embed-text
```

- Completely local
- No API keys needed
- Requires Ollama installation

**3. Sentence Transformers (Local)**

```bash
GRAPHITI_ENABLED=true
GRAPHITI_EMBEDDER_PROVIDER=sentence_transformers
GRAPHITI_EMBEDDER_MODEL=all-MiniLM-L6-v2
```

- No external dependencies
- Models download automatically

**4. Disable Memory**

```bash
GRAPHITI_ENABLED=false
```

- Still get autonomous coding
- No cross-session memory

---

## Security Notes

- OAuth token stored in `.auto-claude/.env` (gitignored)
- All credentials remain local, never committed
- Git worktrees isolated from main branch
- Output directory gitignored by default

---

## Updates

Auto-Claude updates automatically with other marketplaces:

```bash
cd ~/.claude
bash scripts/update-external-repos.sh
```

Or manually:

```bash
cd ~/.claude/plugins/marketplaces/auto-claude
git pull origin main
```

---

## Advanced Usage

### Creating Specs Interactively

```bash
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend
python spec_runner.py --interactive
```

### Running Autonomous Build

```bash
python run.py --spec 001
```

### QA Validation

```bash
python run.py --spec 001 --qa
```

### Merging Completed Work

```bash
python run.py --spec 001 --merge
```

---

## Real-World Examples

### Example 1: Adding User Authentication

**Task:** "Add JWT-based user authentication with login, registration, and protected routes"

**Auto-Claude Process:**

1. **Analysis Phase** (~30 seconds)
   - Detects Express/NestJS backend
   - Identifies existing database (Prisma/TypeORM)
   - Finds frontend framework (React/Vue)

2. **Spec Generation** (~1 minute)
   - Creates detailed implementation plan
   - Lists all files to create/modify
   - Defines acceptance criteria
   - Stored in: `~/.auto-claude/specs/001-user-authentication/spec.md`

3. **Worktree Creation**

   ```bash
   # Creates isolated branch
   git worktree add .worktrees/user-authentication auto-claude/user-authentication
   ```

4. **Implementation** (~5-10 minutes)
   - **Planner Agent:** Breaks into subtasks (User model, JWT service, Auth controller, Protected routes, Frontend integration)
   - **Coder Agent:** Implements each subtask
   - **QA Agent:** Validates login works, tokens expire, protected routes secured
   - **Fixer Agent:** Resolves any test failures

5. **Review & Merge**

   ```bash
   cd .worktrees/user-authentication
   npm test              # All tests pass
   git diff master       # Review changes

   # Merge if satisfied
   git checkout master
   git merge auto-claude/user-authentication
   git worktree remove .worktrees/user-authentication
   ```

**Files Created/Modified:**

- Backend: `src/auth/auth.service.ts`, `src/auth/auth.controller.ts`, `src/auth/jwt.strategy.ts`
- Database: `prisma/migrations/XXX_add_user_model.sql`
- Frontend: `src/services/auth.service.ts`, `src/components/LoginForm.tsx`
- Tests: `tests/auth.test.ts`

---

### Example 2: Implementing Dark Mode

**Task:** "/auto-claude Add dark mode toggle with localStorage persistence"

**Auto-Claude Process:**

1. **Analyzes** existing theme system (CSS variables, Tailwind, styled-components, etc.)
2. **Generates spec** with theme switching logic
3. **Implements**:
   - Theme context provider
   - Toggle component
   - LocalStorage persistence
   - System preference detection
   - Smooth transitions
4. **QA validates**: Theme persists after refresh, no flash of unstyled content

**Output:** Complete dark mode implementation ready for review in isolated worktree.

---

### Example 3: API Refactor

**Task:** "Refactor REST API to use async/await instead of callbacks"

**Why Auto-Claude Excels Here:**

- Large number of files to modify (20+ endpoints)
- Clear transformation pattern
- QA can verify no regressions
- Git worktree ensures safe refactoring

**Process:**

1. Analyzes all API endpoints
2. Creates transformation plan
3. Refactors each endpoint systematically
4. Runs comprehensive test suite
5. Fixes any breaking changes
6. Returns fully tested refactor

---

## Common Pitfalls & Best Practices

### ❌ Common Mistakes

1. **Using on Greenfield Projects**
   - Auto-Claude needs existing codebase patterns
   - **Solution:** Use manual `/start-task` or GSD for new projects

2. **Vague Requirements**
   - "Make the app better" is too ambiguous
   - **Solution:** Provide clear, specific goals: "Add pagination to user list with 20 items per page"

3. **Not Reviewing Before Merge**
   - Always review the worktree before merging
   - **Solution:** Test thoroughly in the worktree first

4. **Ignoring Failed QA**
   - If QA validation fails repeatedly, specs may be unclear
   - **Solution:** Review the spec, clarify requirements, try again

5. **Forgetting OAuth Token**
   - Auto-Claude needs Claude Code OAuth token
   - **Solution:** Add to `~/.auto-claude/.env` immediately after installation

### ✅ Best Practices

1. **Start Small**
   - First use: Try a simple, well-defined feature
   - Example: "Add email validation to registration form"

2. **Clear Acceptance Criteria**
   - Include specific success metrics
   - "User can log in with email and password, session persists for 7 days"

3. **Let QA Run**
   - Don't skip QA validation
   - Iterative fixing catches edge cases

4. **Review Worktree Commits**

   ```bash
   cd .worktrees/feature-name
   git log --oneline    # See implementation commits
   git diff master      # Review all changes
   ```

5. **Use for Repetitive Tasks**
   - CRUD operations
   - API endpoint creation
   - Form implementations
   - Auth flows

6. **Combine with Manual Exploration**
   - Use `/start-task` to research approaches
   - Use `/auto-claude` to implement the chosen approach

---

## Performance Tips

### Faster Spec Generation

**Use complexity hints:**

```bash
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend

# Force simple spec (3 phases, faster)
python spec_runner.py --task "Add logout button" --complexity simple

# Force complex spec (8 phases, more thorough)
python spec_runner.py --task "Implement OAuth2 flow" --complexity complex
```

### Memory Optimization

**Disable memory for one-off tasks:**

```bash
# In .env
GRAPHITI_ENABLED=false   # Faster, no memory overhead
```

**Enable memory for related features:**

```bash
GRAPHITI_ENABLED=true    # Learns patterns across sessions
```

### Parallel Development

**Multiple features simultaneously:**

```bash
# Feature 1
/auto-claude Add search functionality

# Feature 2 (in different directory)
cd other-project
/auto-claude Add export to CSV
```

Each gets its own worktree - completely isolated.

---

## Comparison with Other Workflows

| Aspect                  | Auto-Claude           | Manual (/start-task)  | GSD                     |
| ----------------------- | --------------------- | --------------------- | ----------------------- |
| **Setup time**          | 30-60 sec (spec gen)  | Immediate             | 2-5 min (project init)  |
| **Implementation**      | Autonomous            | Step-by-step with you | Phased with checkpoints |
| **Review points**       | End (full worktree)   | After each step       | After each phase        |
| **Best for**            | Well-defined features | Exploration, learning | Large projects          |
| **Context persistence** | Memory system         | Conversation          | STATE.md file           |
| **Isolation**           | Git worktree          | Main branch           | .planning/ directory    |
| **QA validation**       | Automatic loops       | Manual testing        | Manual per phase        |
| **Token usage**         | High (multi-agent)    | Medium                | High (long-running)     |

**When to switch:**

- Auto-Claude stuck → Switch to Manual to debug
- Manual getting repetitive → Switch to Auto-Claude
- Either getting too large → Switch to GSD

---

## Architecture Overview

**Spec Creation Pipeline:**

- SIMPLE (3 phases): Discovery → Quick Spec → Validate
- STANDARD (6-7 phases): Discovery → Requirements → Context → Spec → Plan → Validate
- COMPLEX (8 phases): Full pipeline with Research and Self-Critique

**Implementation Pipeline:**

1. Planner Agent creates subtask plan
2. Coder Agent implements (can spawn subagents)
3. QA Reviewer validates acceptance criteria
4. QA Fixer resolves issues in loop

**Security:**

- OS Sandbox for bash commands
- Filesystem permissions (project directory only)
- Dynamic command allowlist

---

## Related Documentation

- [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md) - All 67 marketplaces
- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - Workflow patterns
- [CLAUDE.md](../CLAUDE.md) - Core rules

---

_Auto-Claude: Autonomous coding that complements manual workflows._
