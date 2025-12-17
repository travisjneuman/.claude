# Phantom Shell Implementation Plan

## Summary

Implement **Phase 1: Terminal UI Foundation** of the Phantom Shell browser-native development environment.

## What We're Building

Transform the AI Terminal sidebar into a real xterm.js terminal emulator with:
- Full terminal emulation (not chat bubbles)
- Command history (up/down arrows)
- Built-in commands (/help, /clear, /version, /projects)
- Neuman Brain theme styling

## Files to Create

1. `src/components/PhantomShell/Terminal.tsx` - xterm.js wrapper (~165 lines)
2. `src/components/PhantomShell/index.ts` - Barrel export
3. `src/stores/usePhantomShellStore.ts` - Zustand state (~330 lines)
4. `src/services/phantomShell/shellService.ts` - Command parser (~250 lines)
5. `src/services/phantomShell/index.ts` - Barrel export
6. `public/_headers` - Cloudflare COEP/COOP headers

## Files to Modify

1. `vite.config.ts` - Add COEP/COOP headers for dev server

## Dependencies to Install

```bash
npm install @xterm/xterm@^5.5.0 @xterm/addon-fit@^0.10.0 @xterm/addon-web-links@^0.11.0 @xterm/addon-search@^0.15.0
```

## Phase 1 Checklist (from task file)

- [ ] Install xterm.js dependencies
- [ ] Create `src/components/PhantomShell/` directory
- [ ] Create `src/components/PhantomShell/Terminal.tsx`
- [ ] Create `src/components/PhantomShell/index.ts`
- [ ] Create `src/stores/usePhantomShellStore.ts`
- [ ] Create `src/services/phantomShell/` directory
- [ ] Create `src/services/phantomShell/shellService.ts`
- [ ] Create `src/services/phantomShell/index.ts`
- [ ] Modify `vite.config.ts` - add COEP/COOP headers
- [ ] Create `public/_headers` for Cloudflare Pages
- [ ] Manual test: Terminal renders and accepts input
- [ ] Manual test: /help, /clear, /version commands work
- [ ] Run tests and type-check
- [ ] Commit Phase 1 changes

## Not In Scope (Later Phases)

- Phase 2: WebContainer Integration (npm, node execution)
- Phase 3: IndexedDB Persistence
- Phase 4: AI Ghost Commands
- Phase 5: Preview Pane
- Phase 6: Git Integration

## Risk

COEP/COOP headers may affect third-party embeds. Will test after enabling.

---

**Ready to implement Phase 1?**
