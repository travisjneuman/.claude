# Auto-Claude Integration Guide

Complete setup and usage guide for Auto-Claude autonomous coding framework.

**Last Updated:** January 2026 (v2.0)

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

| Workflow | When to Use |
|----------|-------------|
| `/start-task` | Manual implementation, planning first |
| `/auto-claude` | Autonomous implementation of defined features |
| `/gsd:new-project` | Multi-phase project management |

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

- [MARKETPLACE-GUIDE.md](./MARKETPLACE-GUIDE.md) - All 22 marketplaces
- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - Workflow patterns
- [CLAUDE.md](../CLAUDE.md) - Core rules

---

*Auto-Claude: Autonomous coding that complements manual workflows.*
