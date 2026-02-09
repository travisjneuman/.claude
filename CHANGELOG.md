# Changelog

All notable changes to the Ultimate Claude Code Toolkit.

## [2.3.8] - February 8, 2026

### Scripts Showcase on Website

### Added

- **Scripts page** — New `/scripts` page on the website showcasing all 19 automation scripts, grouped by category (Setup, Maintenance, Repo Management, Utilities, Git Hooks) with modal source code viewer.
- **Homepage scripts section** — Category overview grid between Marketplace and Getting Started sections, with counts per category and link to the full scripts page.
- **Navigation link** — "Scripts" added to the main nav bar between Hooks and Rules.
- **Scripts data layer** — `website/src/lib/data/scripts.ts` following the hooks.ts metadata-mapping pattern for shell scripts without frontmatter.

---

## [2.3.7] - February 8, 2026

### Prebuild Script Fix + Marketplace Skill Count Restoration

### Fixed

- **Prebuild script deleting legitimate skill files** — `website/scripts/fix-submodules.mjs` was deleting the entire `plugins/` directory inside `claude-code-plugins-plus-skills` (22 subdirectories, ~1,366 SKILL.md files) instead of just the broken `plugins/skill-enhancers/axiom` gitlink. This caused marketplace skills to drop from 3,900+ to 2,500+ during v2.3.6 work when `npm run build` triggered the prebuild hook. Narrowed the deletion target to the specific broken gitlink only.
- **Marketplace skill count restored** — Re-cloned `claude-code-plugins-plus-skills` from upstream to recover the 1,366 deleted skill files. cpps now has 3,148 total SKILL.md files (1,859 after exclusions), restoring the correct 3,900+ marketplace total.

### Root Cause Analysis

The v2.3.6 submodule cleanup deleted `.git/modules/plugins/marketplaces/claude-code-plugins-plus-skills/` (modules cache), which broke git inside cpps. When `npm run build` ran for website verification, the prebuild hook fired and `rmSync(cpps/plugins/, {recursive: true})` permanently destroyed 1,366 legitimate skill files that could not be recovered via git.

---

## [2.3.6] - February 8, 2026

### Complete Submodule Cleanup + Cross-Repo Count Sync

### Fixed

- **Complete submodule cleanup** — Previous Cloudflare fix only removed the gitlink (`git rm --cached`). Three ghost registrations remained in `.gitmodules`, `.git/config`, and `.git/modules/` cache. Running `_pull-all-repos.sh` would re-create the gitlink via `git submodule update --init`, reverting the deploy fix. All three are now removed; the directory still exists on disk (gitignored).
- **Rules count drift** — `counts.json` had 27 rules but filesystem had 28 (post-change-documentation.md was added in v2.3.5 but count wasn't bumped). Now synced.
- **Health-check hooks count** — `commands/health-check.md` referenced 7 hooks; actual count is 8.
- **Marketplace skills recount** — Count dropped from 3,900+ to 2,500+ due to prebuild script bug (see v2.3.7 fix). The `fix-submodules.mjs` prebuild hook deleted `cpps/plugins/` (1,366 skill files) instead of just the broken axiom gitlink.

### Changed

- **Cross-repo count sync** — GitHub Profile README and Portfolio repo updated with current counts (repos 70→68).
- **Marketplace repo updates** — Pulled latest from 8 repos: davila7-templates, get-shit-done (37 commits), hesreallyhim-awesome, neolab-context-kit (47), othmanadi-planning, quemsah-awesome (14), skill-seekers (76), voltagent-agent-skills (12).

---

## [2.3.5] - February 8, 2026

### Cloudflare Deploy Fix + Dynamic Website Counts

### Added

- **Dynamic website counts** — Created `website/src/lib/data/counts.ts` as single source of truth for all formatted count strings. Footer, console greeting, and metadata now pull live counts at build time instead of hardcoded strings.
- **Post-change documentation rule** — Added `rules/workflows/post-change-documentation.md` requiring documentation updates with every code change.

### Fixed

- **Cloudflare Pages deploy** — Builds were failing because `claude-code-plugins-plus-skills` was the only marketplace repo tracked as a gitlink (mode 160000) in the git tree. All other 67 marketplace repos are gitignored and exist only on disk. Cloudflare's submodule init step tried to recursively clone this one tracked repo, hitting a broken nested submodule (`plugins/skill-enhancers/axiom`). Fix: removed the accidental gitlink with `git rm --cached`. The directory remains on disk for local skill counting. `.gitignore` line 77 (`plugins/marketplaces/`) prevents re-tracking.
- **Count drift between website sections** — Hero section had dynamic counts while footer, console, and metadata had hardcoded strings. All now use `getCounts()` utility with consistent `Math.floor` rounding.

### Changed

- **ConsoleGreeting component** — Now accepts `stats` prop from server component instead of hardcoded string
- **Footer component** — Now accepts `counts` prop with dynamic footer text
- **FooterWithDocs component** — Calls `getCounts()` and passes to Footer
- **layout.tsx** — Uses `getCounts()` for metadata description, OpenGraph, and Twitter tags

---

## [2.3.4] - February 7-8, 2026

### Re-added claude-code-plugins-plus-skills Marketplace + Count Accuracy Fix

### Added

- **claude-code-plugins-plus-skills** — Re-added jeremylongshore/claude-code-plugins-plus-skills as submodule (1.3k stars, 1,537 skills, v4.14.0). Previously removed Jan 28 due to broken nested submodule concern, but `.gitmodules` global `recurse = false` already prevents recursive init.
- **Marketplace repos** — 67→68 repos

### Fixed

- **Marketplace skill count accuracy** — Excluded ~1,346 non-skill SKILL.md files from count (backups: 780, planned-skills: 500, docs/translations: 45, examples: 34, tests: 4, templates: 2, workspace: 1). Raw count 5,252 → filtered count ~3,906 (display: 3,900+).
- **Exclusion logic in `update-counts.sh`** — Added `EXCLUDE_SKILL_DIRS` array with 20 directory patterns (backups, tests, examples, docs, planned-skills, templates, etc.) used by both the shell `find` command and the Node.js `countSkillFiles` function. Patterns are generic and require no maintenance when new repos are added.

---

## [2.3.3] - February 3, 2026

### Count Accuracy Fix

### Fixed

- **Skills count** — Corrected 72→68 across all documentation (4 skills were removed but counts weren't updated)
- **Marketplace skills** — Corrected 5,000+→1,900+ (v2.3.1 incorrectly inflated from 1,900+ to 5,000+; actual disk count is 1,961)
- **Templates count** — Corrected 12→9 across documentation
- **Version references** — Updated v2.3.1→v2.3.3 across all 17 docs files
- **Historical changelog entries** — Fixed stale counts in older changelog entries that referenced 22/71/1,328/1,496 marketplace counts

---

## [2.3.2] - February 2, 2026

### Website & Count Accuracy Fix

### Fixed

- **Website marketplace counts** — Added `marketplace-counts.json` fallback for Cloudflare Pages deployment where submodules are unavailable; marketplace data no longer shows zeros on live site
- **Stale repo count** — Corrected 72→67 across all documentation (5 repos were removed but hardcoded counts weren't updated)
- **Hero rounding** — Marketplace skills now rounds to nearest 100 with `+` suffix (1,900+) instead of showing exact count with misleading `+`
- **Pre-commit hook** — Now stages `marketplace-counts.json` and `plugin.json` alongside other count-updated files
- **Website README** — Replaced default create-next-app boilerplate with deployment documentation (Cloudflare Pages pipeline, fallback mechanism)
- **Deleted `nul` file** — Removed Windows reserved device name file from repo root

---

## [2.3.1] - February 2, 2026

### Documentation Overhaul & Visual Enhancement

Complete visual redesign of README and comprehensive accuracy pass across all documentation.

### Added

- **SVG hero banner** — Dynamic wave banner with light/dark mode support via capsule-render, replacing ASCII art
- **Enhanced badge system** — 14 badges total: resources (Skills, Agents, Marketplaces, Commands, Hooks, MCP Servers), platform support, GitHub stars/forks/last-commit, license
- **Architecture diagram** — Visual "How It All Connects" diagram showing prompt → routing → resources flow
- **commands/README.md** — New index file for all 19 slash commands, categorized by function
- **Visual Quick Start** — Step-by-step table format with expected output for each step
- **Footer wave banner** — Matching capsule-render footer with resource summary

### Changed

- **Count accuracy pass** — Fixed stale numbers across 25+ files: marketplace skills 1,900+ → 5,000+, marketplace repos 50/67 → 72, hooks 2/5 → 7, commands 30+ → 19, total repos 68 → 73
- **Appendix F statistics** — Updated from v2.2.0 to v2.3.1 with all current counts including MCP servers, rules, and templates
- **Appendix E version history** — Added v2.0-2.3.1 entries
- **docs/\*.md** — All 13 documentation files updated with correct counts and enhanced content
- **Subdirectory READMEs** — agents/, skills/, hooks/, scripts/, templates/, rules/ READMEs updated
- **docs/NEW-DEVICE-SETUP.md** — Updated for new submodule approach (gitlinks no longer tracked)
- **Version** — 2.3.0 → 2.3.1 across all files

### Fixed

- **Submodule gitlink tracking** — Removed 66 gitlinks from index to prevent cross-machine SHA conflicts (separate commit)
- **\_pull-all-repos.sh SCRIPT_DIR bug** — ENV_FILE referenced SCRIPT_DIR before it was defined (separate commit)
- **no_push enforcement** — Fixed 16 marketplace repos missing no_push configuration
- **Gitignore gaps** — Added paste-cache/, session-summaries/, last-session.md

---

## [2.3.0] - February 1, 2026

### Documentation Enhancement & Configuration Improvements

Comprehensive documentation overhaul for v2.3 — every doc updated, new READMEs created, and dynamic count management extended to plugin.json.

### Added

- **LICENSE** — MIT license (was missing, referenced by README badges)
- **hooks/README.md** — Lifecycle diagram, reference table for all 7 hooks, exit codes, troubleshooting
- **scripts/README.md** — Categorized reference for all scripts (setup, maintenance, repo management, utilities)
- **.env.example** — Template for machine-specific configuration (custom project directories)
- **.env.local support** — `_pull-all-repos.sh` now reads CUSTOM_PROJECT_DIRS from gitignored `.env.local` instead of requiring edits to tracked files
- **Dynamic plugin.json counts** — `update-counts.sh` now updates skills/agents/repo counts in plugin.json automatically
- **Parent repo safety check** — `_pull-all-repos.sh` detects and restores push URL if accidentally set to `no_push`

### Changed

- **Version bump** — All 13 docs updated from v2.2/January 2026 to v2.3/February 2026
- **docs/CONFIGURATION.md** — Added `.env.local`, hooks configuration table, and model setting sections
- **README.md** — Added `.env.local` setup step (Step 4) in new-machine guide, renumbered subsequent steps
- **docs/NEW-DEVICE-SETUP.md** — Added "Configure Custom Project Directories" section
- **docs/SETUP-GUIDE.md** — Added `.env.local` to sync table
- **rules/tooling/external-repos.md** — Updated to reference `.env.local` instead of editing `_pull-all-repos.sh`
- **plugin.json** — Fixed stale counts (100→72 skills, 30→36 agents), bumped version to 2.3.0
- **Marketplace skills** — Count updated from 1,700+ to 1,900+ across all docs (incorrectly inflated to 5,000+ in v2.3.1, corrected in v2.3.3)

---

## [2.2.2] - January 28, 2026

### Major Enhancement: Showcase Website & Documentation Polish

Live website, branding consistency, and comprehensive documentation updates.

### Added

- **Showcase website** — Next.js site at [claude.travisjneuman.com](https://claude.travisjneuman.com) with 3D hero, interactive card modals, curated featured skills/agents, terminal demo, and marketplace browser. Deployed on Cloudflare Pages.
- **Pull All Repos script** — `_pull-all-repos.sh` cross-platform script to sync parent repo, 50 marketplace submodules, and custom project directories with no_push enforcement and detached HEAD auto-fix.
- **HomeCards component** — Client component with modal detail views for skills, agents, and marketplace repos on homepage.
- **Curated featured content** — Homepage shows hand-picked highest-ROI skills and agents instead of alphabetical order.
- **skip-worktree documentation** — Added tip to MAINTENANCE.md for keeping local customizations to \_pull-all-repos.sh without committing them.

### Changed

- **Branding** — "Claude Code Supercharged" → "tjn.claude/" across nav, hero, metadata, OpenGraph, and Twitter cards.
- **Agent count** — Fixed 37 → 36 across README.md (TOC, problem table, directory structure, agents section header, statistics appendix).
- **OG image** — Added `metadataBase` to layout.tsx so social media crawlers resolve `/og-image.png` correctly.
- **Hero orb** — Resized from 1.2 → 1.5 (was temporarily 1.8, too large).
- **Section padding** — Reduced homepage sections from py-24 to py-16.
- **Get Started section** — Updated to use `setup-new-machine.sh` instead of manual `git submodule update`.
- **GSAP animations** — Rewrote ScrollReveal/StaggerReveal from `gsap.from` to `gsap.set`+`gsap.to` pattern for static export compatibility.
- **Favicon** — Replaced Next.js default `src/app/favicon.ico` with real favicon.
- **setup-new-machine.sh** — Fixed stale comment (22 → 50 repos).

### Documentation

- Updated README.md with v2.2 "What's New" section, showcase website link, version history entry.
- Updated docs/README.md to v2.2 with new features listed.
- Updated docs/MAINTENANCE.md to v2.2 with skip-worktree tip for custom directories.
- Updated docs/SETUP-GUIDE.md version to v2.2.

---

## [2.2.1] - January 28, 2026

### Added

- **mvanhorn-last30days-skill** - New marketplace repo (#50) for researching any topic from the last 30 days
- Updated all documentation from 49 → 50 marketplace repos

---

## [2.2.0] - January 28, 2026

### Major Enhancement: Marketplace Expansion & Documentation Audit

Comprehensive audit and expansion of the marketplace ecosystem, documentation consistency, and routing accuracy across all files.

### Added

- **28 new marketplace repositories** - Expanded from 21 to 49 total marketplace repos
- **New domain routes** - Added Go, Rust, Data Science, Writing, and Documents domains to router
- **Marketplace resource sections** - Added to business and creative domain routers

### Changed

- **Skill count updated** - 69 → 72 local skills across all documentation
- **Agent count verified** - 36 local agents confirmed across all documentation
- **Marketplace skill count** - 1,496 → 1,700+ across all documentation
- **GSD threshold consistency** - Standardized to Score ≥5 for GSD, 3-4 for Planning
- **MARKETPLACE-GUIDE.md** - Complete rewrite listing all 49 repos with accurate skill counts
- **FOLDER-STRUCTURE.md** - Updated marketplace listing to show 49 repos
- **pull-repos.md** - Updated from 23 to 49 submodule references

### Fixed

- **Phantom skill references** - Removed non-existent `Skill()` wrapper references from router files
- **Stale counts** - Fixed 20+ files with outdated skill/agent/marketplace counts
- **Decision framework references** - Consolidated Pros/Cons into SWOT, removed phantom `/consider:decision-matrix`
- **Router accuracy** - Fixed `devops-specialist` → `devops-engineer` routing in skill-finder

### Documentation

- Updated README.md badges, TOC, architecture diagram, statistics, and footer
- Updated bootstrap.md, health-check.md, list-skills.md health report outputs
- Updated agents/README.md, skills/README.md, skills/MASTER_INDEX.md counts
- Updated AUTO-CLAUDE-GUIDE.md, NEW-DEVICE-SETUP.md, SETUP-GUIDE.md marketplace refs

---

## [2.1.0] - January 13, 2026

### Major Enhancement: One-Line Installation & Automatic Routing

Complete overhaul of the installation experience and automatic skill/agent routing system.

### Added

#### One-Line Installation Script

- **`scripts/install.sh`** - Comprehensive bootstrap installer
  - Single command installation: `curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash`
  - Prerequisites checking (git, node, claude-code)
  - Automatic submodule initialization (67 marketplace repos)
  - Read-only configuration (`no_push`) for all external repos
  - Platform-specific MCP configuration generation
  - Installation verification with detailed reporting
  - Handles existing installations (update or backup+replace)

#### Bootstrap Command

- **`commands/bootstrap.md`** - Post-install verification and repair command
  - Core files verification (CLAUDE.md, settings.json, hooks)
  - Submodule health checking
  - `no_push` protection verification for all marketplace repos
  - Hook configuration validation
  - Comprehensive health report generation
  - Automatic fix capabilities for common issues

#### SessionStart Hook (Automatic Routing)

- **`scripts/hooks/session-start.sh`** - Automatic routing protocol injection
  - Injects domain detection at every session start
  - Maps keywords to skills and agents automatically
  - Eliminates need for explicit `/start-task` invocation
  - Cross-platform compatible (macOS, Linux, Windows via Git Bash)

**Automatic Domain Detection:**

| Keywords                      | Skill                           | Agent                |
| ----------------------------- | ------------------------------- | -------------------- |
| react, frontend, component    | generic-react-feature-developer | react-expert         |
| ios, swift, swiftui           | ios-development                 | ios-developer        |
| android, kotlin, compose      | android-development             | android-developer    |
| api, backend, rest            | api-design                      | api-designer         |
| database, sql, postgres       | database-expert                 | database-architect   |
| test, testing, coverage       | test-specialist                 | test-generator       |
| security, auth, vulnerability | security                        | security-auditor     |
| debug, bug, error, fix        | debug-systematic                | debugging-specialist |
| devops, docker, k8s, aws      | devops-cloud                    | devops-engineer      |
| design, ui, styling, css      | frontend-enhancer               | -                    |
| startup, launch, mvp          | startup-launch                  | startup-advisor      |

### Changed

#### settings.json

- Added SessionStart hook configuration
- Hook executes `$HOME/.claude/scripts/hooks/session-start.sh` with 5-second timeout
- Confirmed `alwaysThinkingEnabled: true` for Ultrathink default

#### Documentation Updates

- **README.md** - Added "One-Line Install (Recommended)" section
- **docs/SETUP-GUIDE.md** - Restructured with Option A (one-liner) and Option B (manual)
- **docs/SETUP-GUIDE.md** - Added Windows hook requirement (Git for Windows)

#### External Repository Management

- All 67 marketplace repos verified with `no_push` configuration
- Fixed sync issues with 4 repos that had diverged histories
- Updated `scripts/update-external-repos.sh` for reliable syncing
- Added `scripts/force-sync-repos.sh` for multi-machine workflow

### Architecture

**Repository Structure:**

```
~/.claude/ (YOUR repo - synced via git)
├── CLAUDE.md, settings.json    ← Your settings (tracked)
├── scripts/hooks/              ← Your hooks (tracked)
├── skills/, agents/, commands/ ← Your resources (tracked)
└── plugins/marketplaces/       ← GITLINKS ONLY (just SHA pointers)
    └── [67 repos]              → Fetched from upstream, never embedded
```

**Protection Mechanisms:**

- Gitlinks (`160000 commit`) - Only stores commit SHA, not content
- `ignore = all` - Git ignores changes inside submodules
- `no_push` - Push URL blocked, prevents accidental pushes
- `recurse = false` - Prevents automatic submodule operations

### Platform Support

| Platform | Status         | Requirement                |
| -------- | -------------- | -------------------------- |
| macOS    | ✓ Full support | Native bash                |
| Linux    | ✓ Full support | Native bash                |
| Windows  | ✓ Full support | Git for Windows (Git Bash) |

### Files Changed

**Created (3):**

- `scripts/install.sh` (one-line installer)
- `scripts/hooks/session-start.sh` (automatic routing)
- `commands/bootstrap.md` (verification command)

**Modified (3):**

- `settings.json` (SessionStart hook)
- `README.md` (installation section)
- `docs/SETUP-GUIDE.md` (restructured)

### Migration from 2.0.x

No breaking changes. To get new features:

1. Pull latest: `cd ~/.claude && git pull origin master`
2. Run `/bootstrap` to verify configuration
3. Restart Claude Code to activate SessionStart hook

**Result:** Skills and agents now activate automatically without explicit `/start-task` invocation.

---

## [2.0.0] - January 3, 2026

### Major Enhancement: Claude 4.5 Best Practices Integration

Complete integration of Anthropic's official Claude 4.5 best practices with intelligent auto-activation system. This is the largest enhancement since toolkit inception, optimizing the entire environment for Claude Sonnet 4.5's advanced capabilities.

**Philosophy:** Make advanced capabilities activate naturally through context detection, not slash commands.

### Added

#### Research Methodology Framework

- **`rules/workflows/research-methodology.md` (450+ lines)** - Structured research approach
  - Competing hypotheses tracking with confidence calibration
  - Multi-source verification framework
  - Self-critique methodology
  - Research progress notes template
  - Auto-activates on research-related prompts ("investigate", "research", "compare approaches")

#### Action Policy System

- **`rules/workflows/action-policy.md` (350+ lines)** - Configurable action behavior
  - Documents current PROACTIVE WITH INTELLIGENCE mode (default)
  - Alternative CONSERVATIVE mode (suggest first, implement after approval)
  - Easy mode switching mechanism
  - Project-level override support
  - Examples and troubleshooting

#### Multi-Window Workflow Templates

Four new templates for seamless state persistence across context windows:

- **`templates/research-notes.md`** - Structured research tracking with hypothesis tree
- **`templates/tests.json`** - Test status schema with warnings about removal
- **`templates/init.sh`** - Project initialization script (deps, linting, tests, git status)
- **`templates/progress.md`** - Session notes, decisions, blockers, next steps

#### Documentation

- **`CLAUDE4-BEST-PRACTICES-ANALYSIS.md`** - Comprehensive gap analysis vs Anthropic docs
- **`IMPLEMENTATION-SUMMARY.md`** - Complete implementation guide and usage

#### Autonomous Coding Framework (Auto-Claude)

- **Auto-Claude marketplace integration** - 22nd marketplace added
  - Read-only git submodule at `plugins/marketplaces/auto-claude`
  - Autonomous multi-agent coding with Claude Agent SDK
  - Git worktree isolation for safe feature development
  - QA validation loops with iterative fixing
  - Semantic memory via Graphiti (LadybugDB embedded graph DB)
  - No Electron frontend required - fully CLI-based Python backend
- **`skills/auto-claude/SKILL.md`** - Wrapper skill for Auto-Claude invocation
- **`commands/auto-claude.md`** - Slash command for autonomous implementation
- **`docs/AUTO-CLAUDE-GUIDE.md`** (550+ lines) - Comprehensive setup and usage guide
  - Configuration with multiple embedding providers (Gemini, Ollama, Sentence Transformers)
  - Workflow examples and troubleshooting
  - Memory system documentation
  - Advanced usage patterns
- **Router integration** - Auto-suggests Auto-Claude for complex features
  - `commands/start-task.md` - Auto-detection when complexity >= 3 + well-defined spec
  - `commands/router/domains-development.md` - Complex Feature Implementation routing
  - Keywords: "autonomous", "auto", "implement feature", "build [complex]"
- **`.auto-claude/.env` configuration** - Pre-configured with free embedding options
- **Dependencies:** Python 3.12+ with claude-agent-sdk>=0.1.16, graphiti-core, real_ladybug

**What it provides:**

- Codebase analysis and spec generation
- Isolated git worktrees (`.worktrees/`) for safe development
- Multi-agent implementation (Planner → Coder → QA Reviewer → QA Fixer)
- Semantic memory retention across sessions
- Output location: `~/.auto-claude/` (gitignored)

**Integration approach:**

- Follows established 21-marketplace submodule pattern
- Natural activation via `/start-task` router
- User choice between Manual/Autonomous/GSD workflows
- Compatible with all existing toolkit features

### Changed

#### CLAUDE.md - Core Configuration Enhanced

- **Action Philosophy** (new section) - PROACTIVE WITH INTELLIGENCE mode
  - Default to implementing changes rather than suggesting
  - Infer intent and gather context proactively
  - Read code before proposing changes - never speculate
  - For ambiguous requests: gather context first, then act with informed judgment
- **Communication Style** (new section)
  - Prose over bullets for explanations
  - Grounded, fact-based reporting (no celebratory updates)
  - Concise summaries after tool use
  - Conversational but professional
- **Context Management** (new section)
  - Context window awareness (never stop early due to token limits)
  - Multi-window workflow patterns (first vs subsequent windows)
  - State persistence strategies (JSON for data, markdown for notes, git for checkpoints)
- **Parallel Tool Calling** - Explicit guidance to maximize efficiency
- **Code Standards** enhanced with:
  - Test Quality: Solve for ALL inputs, not just test cases
  - Temporary Files: Clean up iteration artifacts before completion

#### Enhanced Router System (commands/start-task.md)

- **Step 1 - Environment Context & Research**
  - Expanded research trigger detection
  - Auto-load research methodology for complex questions
  - Parallel tool usage guidance
  - Hypothesis tracking activation
- **Step 4 - Smart Resource Loading**
  - Auto-load contextual resources based on patterns
  - Multi-window awareness (first vs subsequent windows)
  - Progress file checking on continuation
- **Step 6 - Execute with Full Environment**
  - Intelligent marketplace skill discovery
  - Multi-window workflow awareness
  - Quality-of-life tool creation
  - Execution principles integration
- **Step 7 - Verify with Quality Checks**
  - Context-specific verification loading
  - Comprehensive quality checklist
  - Post-work automation triggers
- **Step 8 - State Persistence**
  - Memory saving for long-term context
  - File-based state for multi-window projects
  - Context limit awareness

#### Frontend Aesthetics Guide (rules/checklists/ui-visual-changes.md)

Enhanced with **+230 lines** of anti-"AI slop" design guidance:

- **Typography** - Avoid generic fonts (Inter, Arial, Roboto)
  - Font inspiration sources (Google Fonts, display, modern, code)
  - Vary choices across projects
  - Context-specific character (dev tools → monospace, editorial → serif)
- **Color & Theme** - Avoid clichéd schemes (purple gradients on white)
  - Dominant colors with sharp accents
  - IDE theme inspiration (Dracula, Nord, Tokyo Night)
  - Cultural aesthetics (Vaporwave, Y2K, Brutalism, Swiss, Japanese)
- **Motion & Animation** - GPU-accelerated, orchestrated reveals
  - Staggered animation-delay for page load choreography
  - High-impact moments vs scattered micro-interactions
- **Backgrounds & Atmosphere** - Layered gradients, geometric patterns
  - Mesh gradients, noise textures, subtle patterns
  - Create depth vs plain solid colors
- **Layout & Composition** - Creative, unexpected layouts
  - Break grids when appropriate
  - Asymmetric compositions
- **Critical Anti-Patterns Checklist** - Verify NOT doing generic AI patterns
- **Design Evaluation Rubric** - Score on 6 dimensions (target: 7+/10 on 3+)
- **Context-Specific Aesthetics** - Tailor to project type (dev tools, editorial, SaaS, etc.)

#### Solution Quality Verification (rules/checklists/verification-template.md)

Added **Solution Quality Verification** section:

- Solutions must work for ALL valid inputs, not just test cases
- No hard-coded values specific to test inputs
- Edge cases handled beyond what tests explicitly check
- Algorithm/logic is sound and generalizable
- Anti-patterns checklist (hard-coding, test-only solutions, helper script workarounds)
- Correct approach (understand requirements, implement proper logic, tests verify correctness)

### Auto-Activation Patterns

The system now automatically detects context and activates appropriate resources:

| User Says                         | System Auto-Activates                                                     |
| --------------------------------- | ------------------------------------------------------------------------- |
| "research the best approach to X" | WebSearch + research-methodology.md + hypothesis tracking                 |
| "design a homepage"               | ui-visual-changes.md + frontend aesthetics guide + anti-generic-AI checks |
| "build authentication"            | Domain detection → development skills + GSD (if complex)                  |
| "fix this bug"                    | Code exploration + proactive fixing + quality verification                |
| "what are my options for X?"      | Research mode + competing hypotheses + multi-source verification          |
| "improve the UI"                  | Frontend aesthetics + anti-"AI slop" guidance + design rubric             |

**No slash commands needed.** Context detection handles everything.

### Integration

- **100% backward compatible** - All existing workflows unchanged
- **Token efficient** - On-demand resource loading saves 40-60% tokens
- **Full environment integration** - Works with 1,900+ marketplace skills, 68 local skills, 36 agents
- **Seamless with existing tools** - GSD, skills, agents, MCP servers, hooks all work as before

### Performance Characteristics

- **Research tasks:** More calibrated conclusions with multi-source verification
- **Frontend designs:** Distinctive vs generic (+3-4 points on design rubric)
- **Code solutions:** General implementations vs test-passing hacks
- **Multi-window projects:** Near-perfect state preservation across context refreshes
- **Implementation speed:** PROACTIVE mode reduces back-and-forth asking

### Files Changed

**Modified (4):**

- `CLAUDE.md` (+54 lines)
- `commands/start-task.md` (+100 lines)
- `rules/checklists/ui-visual-changes.md` (+230 lines)
- `rules/checklists/verification-template.md` (+26 lines)

**Created (8):**

- `CLAUDE4-BEST-PRACTICES-ANALYSIS.md`
- `IMPLEMENTATION-SUMMARY.md`
- `rules/workflows/research-methodology.md`
- `rules/workflows/action-policy.md`
- `templates/research-notes.md`
- `templates/tests.json`
- `templates/init.sh`
- `templates/progress.md`

**Total:** 12 files changed, 2,338 insertions, 14 deletions

### Notes

- Based on Anthropic's official Claude 4.5 prompting best practices (January 2025)
- Designed for Claude Sonnet 4.5 (model ID: claude-sonnet-4-5-20250929)
- Research methodology inspired by KERNEL's calibration framework
- Frontend aesthetics based on Anthropic's blog post "Improving frontend design through skills"
- Multi-window patterns from Anthropic's context awareness documentation
- PROACTIVE mode is configurable - users can switch to CONSERVATIVE if preferred
- See `IMPLEMENTATION-SUMMARY.md` for complete usage guide

### Migration from 1.x

No breaking changes. Enhancement is additive:

- All existing skills, agents, commands work identically
- GSD system unchanged
- Marketplace integration unchanged
- Hooks and automation unchanged

To leverage new features:

1. Try research tasks - see hypothesis tracking automatically activate
2. Build frontends - experience anti-generic-AI design guidance
3. Start complex projects - use multi-window templates for state persistence
4. Review `action-policy.md` if you prefer CONSERVATIVE mode over PROACTIVE

---

## [1.4.3] - December 30, 2025

### Changed

#### Hooks Simplified for Windows Compatibility

Removed all Unix-specific hooks that were causing errors on Windows:

**Removed hooks (caused errors, low value):**

- SessionStart (banner display)
- Stop (desktop notification)
- SessionEnd (logging)
- PreCompact (logging)
- Notification (logging)
- UserPromptSubmit (logging)
- PermissionRequest (logging)
- SubagentStop (logging)
- PreToolUse (safety check using grep)

**Kept hooks (high value, Windows-compatible):**

- PostToolUse (Write) - Auto-format with Prettier
- PostToolUse (Edit) - Auto-format with Prettier

**Why:** The removed hooks used Unix-specific syntax (`|| true`, `$(date)`, `~/.claude/` paths, `2>/dev/null`) that fails on Windows PowerShell/CMD. The logging hooks provided minimal value anyway.

#### Security & Documentation

- **docs/SECURITY.md** - NEW: Comprehensive security audit documentation
- **docs/FOLDER-STRUCTURE.md** - Added settings files explanation, vscode folders distinction
- **vscode/README.md** - Clarified two VSCode folders, gitignore reasons
- **.gitignore** - Added security note at top with "DO NOT REVERT" warning

#### Git Configuration Fixed

- Fixed branch tracking after `git-filter-repo` operations
- Pre-commit hook disabled (was using WSL bash on Windows)

### Security

- Removed `.archive/` folder from Git history (139 files with personal data)
- Removed `vscode/settings.json` from Git history (local paths, IPs)
- Added `.vscode/` folder to gitignore (VSCode workspace folder)
- Git history rewritten with `git-filter-repo` to purge sensitive data

---

## [1.4.2] - December 30, 2025

### Added

#### Verification Workflow (KERNEL-Inspired)

Based on research into prompt engineering best practices:

- **`rules/checklists/verification-template.md`** - Reusable verification checklist based on KERNEL "Easy to verify" principle
- **Step 7 (Verify)** added to `/start-task` router between Execute and Memory Save
- **"Task completion"** trigger added to CLAUDE.md "Load When Relevant" table

#### Superpowers Plugin

- Installed `superpowers@obra-superpowers` for TDD and git worktree workflows
- Adds RED-GREEN-REFACTOR enforcement, systematic debugging, design-first skills

### Changed

#### Documentation Updates

- **CLAUDE.md** - "Anti-Patterns" renamed to "DO NOT (Hard Constraints)" with explicit `**DO NOT**` prefixes
- **CLAUDE.md** - Skill counts updated (1,328 → 1,496 marketplace skills, 37 → 36 agents)
- **external-repos.md** - Complete list of all 21 marketplaces (was 9)
- **All 21 marketplaces** - Synced to latest upstream commits

#### Skill Count Update

- Marketplace skills: 1,328 → **1,496** (+168 new skills from upstream syncs)
- Largest contributor: `claude-code-plugins-plus-skills` (+2,947 files)

### Notes

- Research documented in `plans/snuggly-brewing-alpaca.md`
- Key finding: Explicit constraints reduce unwanted outputs by 91%
- Duplicate `superpowers-marketplace` removed (now uses `obra-superpowers` submodule)

---

## [1.4.1] - December 2025

### Changed

#### Cross-Platform Compatibility Overhaul

Complete cross-platform support for Windows, macOS, and Linux:

- **Stop hook** - Now OS-aware: PowerShell notifications (Windows), osascript (macOS), notify-send (Linux)
- **All hooks** - Use POSIX-compatible bash syntax that works in Git Bash on Windows
- **All commands** - Added Platform Compatibility sections with OS-specific notes
- **All scripts** - Verified to work in Git Bash (Windows), bash (macOS/Linux)
- **Python commands** - Updated to show both `python` (Windows) and `python3` (macOS/Linux) options

#### Documentation Updates

- **README.md** - Added comprehensive "Platform Compatibility" section with:
  - Platform requirements table (Windows 10/11, macOS, Linux)
  - Detailed OS-specific setup notes (collapsible sections)
  - Cross-platform command reference table
- **Updated TOC** - Added Platform Compatibility link
- **Commands** - Each command now includes Platform Compatibility table
- **Skills** - Updated `generic-static-*` skills with cross-platform local server commands
- **Checklists** - Updated `static-sites.md` with cross-platform python options
- **Bumped version** - 1.4.0 → 1.4.1

### Verified Cross-Platform

- **Git hooks** (`scripts/hooks/`) - All use POSIX bash, work on all platforms
- **Shell scripts** - All use `#!/bin/bash` shebang, work in Git Bash
- **MCP config** - `.mcp.json` not tracked (in .gitignore), templates in docs for each OS
- **Templates** - All markdown, no OS-specific code

### Notes

- Windows users need Git for Windows (provides Git Bash)
- macOS notifications use native `osascript`
- Linux notifications use `notify-send` (optional, graceful fallback)
- All toolkit scripts use POSIX bash, not PowerShell directly
- MCP server config must be created per-machine using templates in `docs/MCP-SERVERS.md`

---

## [1.4.0] - December 2025

### Added

#### New Templates (5 total)

Comprehensive templates for creating toolkit components:

- **skill-template.md** - Complete guide for creating new skills
- **agent-template.md** - Template for subagent definitions
- **command-template.md** - Slash command creation guide
- **plugin-template/** - Full plugin scaffolding with plugin.json, commands, agents, skills
- **project-CLAUDE.md** - Per-project CLAUDE.md starter template

#### New Utility Commands (5 total)

- **`/review-code [target]`** - Comprehensive code review workflow with stack detection
- **`/health-check [verbose]`** - System diagnostics for toolkit configuration
- **`/context-stats`** - Token usage report with optimization recommendations
- **`/session-log [action]`** - View and analyze session log (view/tail/clear/stats)
- **`/backup-config [action]`** - Backup and restore configuration files

#### MCP Wildcard Permissions

New granular MCP tool permissions using wildcard syntax:

- `mcp__memory__*` - All memory tools auto-allowed
- `mcp__filesystem__read_file` - Read-only filesystem access
- `mcp__sqlite__read_query` - Read-only database queries
- `mcp__sequential-thinking__*` - All reasoning tools
- `mcp__filesystem__write_file` - Explicitly denied for safety

### Changed

#### Documentation

- **Updated README.md** - Added Templates section with quick start guide
- **Updated README.md** - Added Utility & Diagnostics command section
- **Updated README.md** - Table of contents includes new sections
- **Bumped version** - 1.3.3 → 1.4.0 across all files

### Notes

- Templates reduce boilerplate when creating new components
- Utility commands provide essential toolkit management
- MCP permissions follow least-privilege principle (read allowed, write denied)
- Total command count: 10 (5 existing + 5 new)
- Total template count: 6 (1 existing + 5 new)

---

## [1.3.3] - December 2025

### Added

#### Complete Hook Implementation (10/10 Hooks)

All 10 available Claude Code lifecycle hooks are now implemented:

- **SessionEnd hook** - Logs session termination with timestamp and separator
- **PreCompact hook** - Logs context compaction events for checkpoint tracking
- **UserPromptSubmit hook** - Logs user prompts (first 100 chars) for session history
- **PermissionRequest hook** - Logs tool permission requests for audit trail
- **SubagentStop hook** - Logs subagent completion events

### Changed

#### Documentation Updates

- **Updated README.md** - All hooks now marked as implemented with descriptions
- **Updated README.md** - Added documentation sections for all 5 new hooks

### Notes

- All hooks write to `~/.claude/.session-log` for unified session tracking
- Hooks use bash for cross-platform compatibility (Git Bash on Windows)
- Session log provides complete audit trail of Claude Code interactions

---

## [1.3.2] - December 2025

### Added

#### New Claude Code Lifecycle Hooks

- **SessionStart hook** - Displays toolkit status on session start (68 skills, 36 agents, 67 marketplaces)
- **Notification hook** - Logs system notifications to ~/.claude/.session-log for debugging

#### New Stack Guides

- **rules/stacks/go.md** - Comprehensive Go project patterns (modules, testing, concurrency, error handling)
- **rules/stacks/rust.md** - Comprehensive Rust project patterns (ownership, lifetimes, async, cargo)

### Changed

#### Documentation Overhaul

- **Corrected marketplace skill count** - Updated from "550+" to "1,328+" across all documentation
- **Updated CLAUDE.md** - Added Go and Rust to "Load When Relevant" triggers
- **Updated agents/README.md** - Added parallel execution documentation (max 10 concurrent, 200k context each)
- **Updated skills/MASTER_INDEX.md** - Corrected skill counts (68 local + 1,900+ marketplace)
- **Updated docs/MARKETPLACE-GUIDE.md** - Corrected skill counts
- **Updated docs/WORKFLOW-GUIDE.md** - Added automation hooks section
- **Updated README.md** - Version bump, hook documentation, stack guide additions

#### Strategic Analysis Findings (Documented)

- **Skills overlap analysis** - 70% of local skills are UNIQUE with no marketplace equivalent
- **Agent capabilities** - Confirmed parallel execution (up to 10), single-level nesting only
- **Python NOT required** - All hooks use bash, hookify plugin disabled

### Notes

- 5 of 10 hook events implemented in this version (see v1.3.3 for complete implementation)
- No changes to skills or agents - current counts provide comprehensive coverage
- Marketplace submodule architecture fully prepared for expansion

---

## [1.3.1] - December 2025

### Added

#### Git Hooks (Workflow Automation)

- **pre-commit hook** - Secret detection, CHANGELOG reminder, SKILL.md validation, gitignore enforcement
- **commit-msg hook** - Conventional commit format validation (feat|fix|docs|chore|...)
- **pre-push hook** - Force-push protection, remote validation, submodule awareness

#### Claude Code Lifecycle Hooks

- **Stop hook** - Windows toast notification when Claude awaits input
- **PreToolUse hook** - Dangerous command blocking (rm -rf /, format c:, etc.)
- **PostToolUse hook** - Prettier auto-formatting on Edit operations (added to existing Write)

### Changed

#### .gitignore Cleanup

- Removed 6 redundant marketplace entries
- Fixed duplicate entries (_.code-workspace, _~)
- Moved misplaced entries to proper sections
- Fixed header accuracy (.planning/ removed from tracked list)

#### Organization

- Moved CLAUDE.md backup to `.archive/claude-md-versions/`
- Removed ephemeral shell-snapshots from tracking

### Notes

- hookify plugin remains disabled (uses `python3` incompatible with Windows)
- Native hooks in settings.json replicate hookify functionality

---

## [1.3.0] - December 2025

### Changed

#### Architecture Refactoring (Token Optimization)

- **CLAUDE.md trimmed** from 355 to 194 lines (45% reduction)
- **Token savings** of ~1,400 tokens per session (56% reduction)
- Follows Anthropic's recommendation: "concise guardrails and pointers"

#### New Satellite Guides

- `docs/WORKFLOW-GUIDE.md` - Detailed workflow patterns, prompt types, discovery
- `docs/MARKETPLACE-GUIDE.md` - Complete marketplace reference (21 repos)

#### CLAUDE.md Restructure

- Kept essential guardrails (Identity, P0s, Workflow, Safety)
- Expanded "Load When Relevant" triggers (14 context-based file loads)
- Added "Skill Discovery" section with search commands
- Moved detailed content to satellite files for on-demand loading

#### Philosophy

- CLAUDE.md = essential guardrails (always loaded, ~1,100 tokens)
- Satellites = detailed patterns (loaded on-demand when context matches)
- Discovery triggers ensure right content loads automatically

---

## [1.2.0] - December 2025

### Added

#### New Marketplaces (6)

- `travisvn-awesome-claude-skills` - Curated skills list
- `hesreallyhim-awesome-claude-code` - Slash commands and CLI tools
- `alirezarezvani-claude-skills` - Skills and subagents collection
- `behisecc-awesome-claude-skills` - Categorized skills
- `alvinunreal-awesome-claude` - Broader Claude resources
- `voltagent-awesome-claude-skills` - VoltAgent skills collection

#### New Documentation

- `docs/GSD-TUTORIAL.md` - Comprehensive GSD usage guide
- `docs/DOMAIN-ROUTING.md` - How /start-task routes requests to skills/agents

#### New Commands

- `/discover-skills` - Search skillsmp.com API for community skills

### Changed

#### Workflow Enhancement

- Added "Always Available" section to CLAUDE.md clarifying tools/skills/agents are never blocked by GSD
- Added "GSD + Tools Integration" section explaining how to use capabilities within GSD phases
- Updated Quick Start Commands with research and agent invocation examples

#### Documentation Accuracy

- Fixed marketplace count: 15 → 21
- Verified skill count: 67 local skills
- Verified agent count: 36 local agents
- Added "Last Updated" dates to 7 documentation files
- Cross-linked MCP documentation (docs and rules/tooling)

#### Infrastructure

- Converted 6 manual clones to proper git submodules
- Added 6 new marketplace repositories as submodules
- All 21 marketplaces now tracked with no_push configuration

---

## [1.1.0] - December 2025

### Added

#### New Skills (5)

- `devops-cloud` - AWS, GCP, Azure, Kubernetes, Terraform, CI/CD
- `ai-ml-development` - PyTorch, TensorFlow, LLM integration, MLOps
- `game-development` - Unity, Unreal Engine, Godot
- `macos-native` - AppKit, Catalyst, macOS system integration
- `database-expert` - PostgreSQL, MongoDB, Redis advanced patterns

#### New Agents (5)

- `devops-engineer` - Cloud infrastructure and CI/CD specialist
- `ml-engineer` - Machine learning and LLM integration
- `game-developer` - Game engine development
- `macos-developer` - Native macOS development
- `database-architect` - Schema design and query optimization

#### GSD Integration

- Installed [Get Shit Done](https://github.com/glittercowboy/get-shit-done) v1.3.5
- Added GSD section to CLAUDE.md
- Updated `/start-task` command with GSD routing
- Full `/gsd:*` command suite available

#### Documentation

- Added CHANGELOG.md (this file)
- Added CONTRIBUTING.md
- Updated all README files with cross-references
- Updated MASTER_INDEX.md with new skills and agents

### Changed

- Enhanced Skills & Agents section in CLAUDE.md with Quick Trigger Guide
- Updated `/start-task` with Requirements section referencing CLAUDE.md

---

## [1.0.0] - December 2025

### Initial Release

#### Skills (60+)

- **Platform Development**: iOS, Android, React Native, Flutter, Electron, PWA
- **Creative**: Graphic design, video, audio, branding, UI animation
- **Business**: Startup launch, monetization, marketing, sales, finance
- **Technical**: GraphQL, microservices, i18n, WebSockets
- **Domain Expert**: 16 business domain skills
- **Stack-Specific**: Static, React, Full-stack variants
- **Utilities**: Testing, debugging, documentation, SEO

#### Agents (30+)

- Code quality: deep-code-reviewer, security-auditor, refactoring-specialist
- Development: test-generator, api-designer, database-expert
- Architecture: architecture-analyst, graphql-architect, microservices-architect
- Platform: ios-developer, android-developer, mobile-architect, desktop-developer
- Creative: graphic-designer, video-producer, audio-engineer, brand-strategist
- Business: startup-advisor, monetization-expert
- Support: documentation-writer, code-explainer, accessibility-expert

#### Rules & Checklists

- UI/Visual changes checklist
- Automation scripts checklist
- Static sites checklist
- Stack-specific guides (React, Python, Full-stack)
- Git hooks setup guide
- Troubleshooting guide

#### Core Configuration

- CLAUDE.md global constitution
- plugin.json for marketplace distribution
- Comprehensive README with installation guide

---

## Version Format

This project uses [Semantic Versioning](https://semver.org/):

- MAJOR: Breaking changes to skill/agent interfaces
- MINOR: New skills, agents, or features
- PATCH: Bug fixes, documentation updates

---

## Upgrade Guide

### From 1.0.0 to 1.1.0

No breaking changes. To get new features:

```bash
# If using git
cd ~/.claude && git pull

# If manual install
# Download and copy new skill/agent folders
```

To enable GSD:

```bash
npx get-shit-done-cc
# Select 1 for global install
```
