# Plan: Terminal & AI Documentation Overhaul

## Overview
Create comprehensive, user-friendly documentation for the AI Terminal and Phantom Shell that serves users from beginners to advanced developers. Includes unified docs, in-app help, and backend proxy guide.

## Deliverables

### 1. Unified User Guide
**File:** `docs/user/terminal-complete-guide.md`

**Structure:**
```
# Neuman Brain Terminal - Complete Guide

## Quick Start (Beginners)
- What is the terminal?
- Two modes: AI Chat vs Phantom Shell
- Your first AI conversation
- Your first shell command

## AI Chat Mode
- Supported providers (with CORS status table)
- Setting up API keys (step-by-step with screenshots)
- Provider recommendations by use case
- Understanding "Proxy Required" warning
- Troubleshooting common errors

## Phantom Shell Mode
- What is WebContainer?
- Available commands (built-in vs system)
- Commands that DON'T work (ping, git, docker, python)
- Project management
- AI-assisted commands (/ai)
- Live preview pane

## Advanced: Backend Proxy Setup
- Why you might need a proxy
- Option 1: Use OpenRouter (easiest)
- Option 2: Cloudflare Worker proxy
- Option 3: Self-hosted Node.js proxy
- Security considerations

## Keyboard Shortcuts Reference
## Troubleshooting FAQ
## Glossary (CORS, WebContainer, etc.)
```

### 2. In-App Help System
**Files to modify:**
- `src/components/AITerminal.tsx` - Add help button and modal
- `src/components/TerminalHelpModal.tsx` (NEW) - Comprehensive help modal

**Features:**
- Help button (?) in terminal header
- Tabbed modal: Quick Start | AI Providers | Shell Commands | Troubleshooting
- Contextual tooltips on "Proxy Required" badges
- First-time onboarding for new users
- `/help` command improvements in Phantom Shell

### 3. Update Existing Docs
**Files to update:**
- `docs/user/ai_terminal_guide.md` - Add CORS/proxy explanation
- `docs/product/phantom-shell-guide.md` - Add WebContainer limitations clearly

### 4. Provider Settings Enhancement
**File:** `src/components/ProviderSettings.tsx`

**Changes:**
- Add tooltip explaining "Proxy Required" with link to docs
- Add "Recommended for beginners" badge on OpenRouter/Anthropic
- Show which providers work without proxy

## Implementation Phases

### Phase 1: Documentation Files
1. Create `docs/user/terminal-complete-guide.md` (unified guide)
2. Create `docs/user/backend-proxy-setup.md` (advanced proxy guide)
3. Update `docs/user/ai_terminal_guide.md` with CORS section
4. Update `docs/product/phantom-shell-guide.md` with limitations

### Phase 2: In-App Help Modal
1. Create `src/components/TerminalHelpModal.tsx`
2. Add help button to AITerminal header
3. Implement tabbed interface with:
   - Quick Start tab
   - AI Providers tab (with CORS table)
   - Shell Commands tab
   - Troubleshooting tab

### Phase 3: UI Enhancements
1. Add tooltip to "Proxy Required" badge in ProviderSettings
2. Add "Beginner Friendly" badges to OpenRouter/HuggingFace/Anthropic
3. Improve `/help` command output in Phantom Shell
4. Add first-time user detection and onboarding prompt

## Files to Create
| File | Purpose |
|------|---------|
| `docs/user/terminal-complete-guide.md` | Unified comprehensive guide |
| `docs/user/backend-proxy-setup.md` | Advanced proxy configuration |
| `src/components/TerminalHelpModal.tsx` | In-app help modal component |

## Files to Modify
| File | Changes |
|------|---------|
| `src/components/AITerminal.tsx` | Add help button, integrate modal |
| `src/components/ProviderSettings.tsx` | Add tooltips, beginner badges |
| `src/services/phantomShell/shellService.ts` | Improve /help output |
| `docs/user/ai_terminal_guide.md` | Add CORS/proxy section |
| `docs/product/phantom-shell-guide.md` | Add clear limitations section |

## Content Highlights

### CORS Explanation (User-Friendly)
```markdown
## Why Some Providers Show "Proxy Required"

Neuman Brain runs entirely in your browser for privacy - your API keys
never touch our servers. However, some AI providers (OpenAI, xAI, etc.)
block direct browser requests for security reasons.

**Easy Solution:** Use OpenRouter - it works directly and can access
200+ models including GPT-4, Claude, and more through one API key.

**For Power Users:** Set up your own proxy server (see Advanced Guide).
```

### WebContainer Limitations (Clear)
```markdown
## What Works vs What Doesn't

✅ WORKS: npm, node, npx, ls, cd, cat, mkdir, basic shell
❌ DOESN'T WORK: git, docker, python, ping, curl, system commands

WebContainer runs Node.js in your browser - it's not a full Linux system.
For git, use the GitHub widget or external tools.
```

## Estimated Effort
- Phase 1 (Docs): ~2 hours
- Phase 2 (Help Modal): ~1.5 hours
- Phase 3 (UI Polish): ~1 hour
- **Total: ~4.5 hours**

## Success Criteria
- New user can start AI chat within 2 minutes
- "Proxy Required" meaning is clear without reading docs
- WebContainer limitations are obvious before user hits errors
- Advanced users have clear path to set up their own proxy
