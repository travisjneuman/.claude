# Troubleshooting Guide

**When to use:** Diagnosing common issues with workflows, hooks, and tools.

---

## Platform-Specific Issues

### Windows

| Issue                       | Fix                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Bash scripts don't run      | Install [Git for Windows](https://git-scm.com/download/win) - includes Git Bash     |
| `~/.claude/` path not found | Use `$HOME/.claude/` or `C:\Users\<username>\.claude\`                              |
| Line ending errors          | Convert with `dos2unix` or configure Git: `git config --global core.autocrlf false` |
| Notifications not working   | Ensure PowerShell execution policy allows scripts                                   |
| `python3` not found         | Windows uses `python` not `python3` - use `node` for JSON validation                |

```powershell
# Verify Git Bash is available
where bash

# Check if running in Git Bash
echo $OSTYPE  # Should output "msys" or "cygwin"
```

### macOS

| Issue                        | Fix                                               |
| ---------------------------- | ------------------------------------------------- |
| Command not found: git       | Install Xcode CLI: `xcode-select --install`       |
| Notifications not showing    | Check System Preferences → Notifications          |
| Permission denied on scripts | Run `chmod +x script.sh`                          |
| zsh compatibility issues     | Scripts use `#!/bin/bash` shebang for portability |

```bash
# Verify bash is available (even on zsh default)
which bash

# Test notification
osascript -e 'display notification "Test" with title "Claude Code"'
```

### Linux

| Issue                     | Fix                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Notifications not working | Install: `sudo apt install libnotify-bin` (Debian/Ubuntu)                           |
| Permission denied         | Run `chmod +x ~/.claude/scripts/*.sh`                                               |
| Command not found: bash   | Usually pre-installed, verify with `which bash`                                     |
| File watcher limit        | Increase: `echo fs.inotify.max_user_watches=524288 \| sudo tee -a /etc/sysctl.conf` |

```bash
# Test notification
notify-send "Claude Code" "Test notification"

# Check notification daemon
systemctl --user status notification-daemon
```

---

## Git Hook Issues

### Issue: Pre-Commit Hook Not Running

**Symptoms:**

- Can commit code without task file
- No error message appears

**Causes & Fixes:**

| Cause                | Fix                                             |
| -------------------- | ----------------------------------------------- |
| Hook not executable  | `chmod +x .git/hooks/pre-commit`                |
| Hook file missing    | Check `.git/hooks/` directory                   |
| Using `--no-verify`  | Remove flag from command                        |
| Windows line endings | Convert to LF: `dos2unix .git/hooks/pre-commit` |

```bash
# Verify hook exists and is executable
ls -la .git/hooks/pre-commit

# Test hook manually
bash .git/hooks/pre-commit

# Check for syntax errors
bash -n .git/hooks/pre-commit
```

---

### Issue: Hook Blocking Valid Commits

**Symptoms:**

- Hook blocks commit even though task file is staged
- False positive error

**Causes & Fixes:**

| Cause                    | Fix                           |
| ------------------------ | ----------------------------- |
| Task file wrong location | Must be in `tasks/` directory |
| Task file not staged     | `git add tasks/[name].md`     |
| Wrong file extension     | Must be `.md`                 |
| Pattern mismatch         | Check hook's grep pattern     |

```bash
# Check what's staged
git diff --cached --name-only

# Verify task file is in the list
# If not, stage it:
git add tasks/my-feature.md
```

---

### Issue: Hook Allows Code Without Task File

**Symptoms:**

- Code commits go through without task file
- Hook seems to not detect code changes

**Causes & Fixes:**

| Cause                             | Fix                                         |
| --------------------------------- | ------------------------------------------- |
| Code not in monitored directories | Update hook's grep pattern                  |
| Only .md files changed            | Intentional - docs don't need task file     |
| Hook has bugs                     | Test manually: `bash .git/hooks/pre-commit` |

---

### Issue: Hook Error Messages Not Displaying

**Symptoms:**

- Commit blocked but no error message shown
- Silent failure

**Fixes:**

```bash
# Test hook output directly
bash .git/hooks/pre-commit
echo $?  # Should be 0 (success) or 1 (blocked)

# Check for terminal color support issues
# Try removing color codes from hook
```

---

## TypeScript Issues

### Issue: Type Errors Not Caught

**Symptoms:**

- Code compiles but has type issues
- `any` types creeping in

**Fixes:**

```bash
# Run type check explicitly
npm run type-check

# Or directly
npx tsc --noEmit

# Check tsconfig.json strict settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

### Issue: Module Not Found

**Symptoms:**

- `Cannot find module` errors
- Path imports failing

**Fixes:**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Check path aliases in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## Test Issues

### Issue: Tests Not Running

**Symptoms:**

- `npm run test` does nothing
- Tests not discovered

**Fixes:**

```bash
# Check test script in package.json
cat package.json | grep -A1 '"test"'

# For Jest
npx jest --listTests

# For Vitest
npx vitest --list

# Check test file naming
# Must match: *.test.ts, *.spec.ts, or tests/ directory
```

---

### Issue: Tests Passing Locally But Failing in CI

**Symptoms:**

- Green locally, red in CI
- Intermittent failures

**Common Causes:**

| Cause                   | Fix                          |
| ----------------------- | ---------------------------- |
| Environment differences | Check Node version, env vars |
| Race conditions         | Add proper async/await       |
| Time-dependent tests    | Mock dates                   |
| Order-dependent tests   | Reset state in beforeEach    |

---

## Build Issues

### Issue: Build Fails But Dev Works

**Symptoms:**

- `npm run dev` works
- `npm run build` fails

**Common Causes:**

| Cause                      | Fix                         |
| -------------------------- | --------------------------- |
| Type errors ignored in dev | Run `npm run type-check`    |
| Missing environment vars   | Check `.env.production`     |
| Import issues              | Check for circular imports  |
| SSR issues (Next.js)       | Check window/document usage |

```bash
# Debug build
npm run build -- --debug

# Check for window/document in server code
grep -r "window\." src/
grep -r "document\." src/
```

---

## Dev Server Issues

### Issue: Port Already in Use

**Symptoms:**

- `Error: listen EADDRINUSE: address already in use`

**Fixes:**

```bash
# Find process using port (Mac/Linux)
lsof -ti:3000
kill -9 $(lsof -ti:3000)

# Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }

# Or just use different port
PORT=3001 npm run dev
```

---

### Issue: Hot Reload Not Working

**Symptoms:**

- Changes not reflected in browser
- Need to restart server

**Fixes:**

```bash
# Clear caches
rm -rf .next/  # Next.js
rm -rf node_modules/.vite/  # Vite

# Check file watchers limit (Linux)
cat /proc/sys/fs/inotify/max_user_watches
# Increase if needed
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

## Database Issues (Prisma)

### Issue: Migration Conflicts

**Symptoms:**

- `Migration failed to apply`
- Database schema out of sync

**Fixes:**

```bash
# Reset development database (CAUTION: deletes data)
npx prisma migrate reset

# Generate client after schema changes
npx prisma generate

# Pull current database state
npx prisma db pull
```

---

## Auto-Claude Issues

### Issue: OAuth Token Not Set

**Symptoms:**

- `CLAUDE_CODE_OAUTH_TOKEN not found`
- Auto-Claude fails to start

**Fixes:**

```bash
# Get OAuth token from Claude Code
# Run: /settings
# Copy the OAuth token

# Edit .env file
nano ~/.auto-claude/.env

# Add token
CLAUDE_CODE_OAUTH_TOKEN=your-token-here
```

---

### Issue: Python Dependencies Missing

**Symptoms:**

- `ModuleNotFoundError: No module named 'claude'`
- Import errors when running Auto-Claude

**Fixes:**

```bash
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend
pip install -r requirements.txt

# Verify installation
python -c "import claude; print('✓ claude-agent-sdk installed')"
```

---

### Issue: Git Worktree Already Exists

**Symptoms:**

- `fatal: 'worktree-name' already exists`
- Cannot create new worktree

**Fixes:**

```bash
# List all worktrees
git worktree list

# Remove specific worktree
git worktree remove worktree-name --force

# Remove all Auto-Claude worktrees
git worktree list | grep auto-claude | awk '{print $1}' | xargs -I {} git worktree remove {} --force
```

---

### Issue: Spec Generation Stuck or Slow

**Symptoms:**

- Spec generation taking too long
- Process appears hung

**Fixes:**

```bash
# 1. Force complexity level for faster spec
cd ~/.claude/plugins/marketplaces/auto-claude/apps/backend
python spec_runner.py --task "your task" --complexity simple

# 2. Disable memory for faster generation
# Edit ~/.auto-claude/.env
GRAPHITI_ENABLED=false

# 3. Check Python process isn't stuck
ps aux | grep python
# Kill if needed: kill -9 <PID>
```

---

### Issue: QA Validation Failing Repeatedly

**Symptoms:**

- QA agent rejects implementation multiple times
- Fixer agent can't resolve issues

**Fixes:**

1. **Review the spec:**

   ```bash
   cat ~/.auto-claude/specs/XXX-feature/spec.md
   # Check if acceptance criteria are clear
   ```

2. **Provide more specific requirements:**
   - Instead of: "Add user authentication"
   - Try: "Add JWT-based user authentication with login, registration, and session expiry after 7 days"

3. **Check QA report:**

   ```bash
   cat ~/.auto-claude/specs/XXX-feature/qa_report.md
   # See what's failing
   ```

4. **Fall back to manual:**
   - If Auto-Claude can't satisfy requirements, use `/start-task` instead

---

### Issue: Worktree Merge Conflicts

**Symptoms:**

- Conflicts when merging Auto-Claude branch
- Git merge errors

**Fixes:**

```bash
# Review changes first
cd .worktrees/feature-name
git diff master

# Merge with conflict resolution
git checkout master
git merge auto-claude/feature-name
# Resolve conflicts manually
git add .
git commit

# Or abort and review
git merge --abort
```

---

### Issue: Memory/Embedding Errors

**Symptoms:**

- Graphiti errors
- Embedding provider failures

**Fixes:**

**For Gemini:**

```bash
# Check API key is valid
# Edit ~/.auto-claude/.env
GOOGLE_API_KEY=your-valid-key
```

**For Ollama:**

```bash
# Ensure Ollama is running
ollama serve

# Pull embedding model
ollama pull nomic-embed-text

# Configure in ~/.auto-claude/.env
GRAPHITI_EMBEDDER_PROVIDER=ollama
GRAPHITI_EMBEDDER_MODEL=nomic-embed-text
```

**Disable memory entirely:**

```bash
# Edit ~/.auto-claude/.env
GRAPHITI_ENABLED=false
```

---

## Common Command Quick Reference

```bash
# Clear all caches
rm -rf node_modules/.cache
rm -rf .next/
rm -rf dist/
rm -rf .turbo/

# Reinstall everything
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Find large files
du -sh node_modules/*/ | sort -hr | head -20
```

---

## Related Skills

| Skill                | When to Use                     |
| -------------------- | ------------------------------- |
| `tech-debt-analyzer` | Systematic code health analysis |
| `test-specialist`    | Test debugging                  |
| `security`           | Security-related issues         |

### Invoke with:

```
Skill(tech-debt-analyzer)
```

---

## Related Documentation

- `~/.claude/docs/AUTO-CLAUDE-GUIDE.md` - Auto-Claude setup and troubleshooting
- `~/.claude/rules/tooling/git-hooks-setup.md` - Hook setup
- `~/.claude/CLAUDE.md` - Core workflow
- `~/.claude/skills/README.md` - Skills overview

---

## When to Ask for Help

If troubleshooting doesn't resolve the issue:

1. Document what you've tried
2. Capture error messages exactly
3. Note environment details (OS, Node version, etc.)
4. Check project issues/discussions
5. Ask with full context

---

_Most issues have simple fixes. Check the basics first._
