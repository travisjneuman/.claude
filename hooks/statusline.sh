#!/bin/bash
# StatusLine hook: Display persistent status bar in Claude Code terminal
# Receives JSON session metadata on stdin, outputs a single formatted line
# Zero token cost — rendered by the client, not injected into context

# Read JSON from stdin
INPUT=$(cat)

# Extract fields using node for reliable JSON parsing
STATUS=$(node -e "
const d = JSON.parse(process.argv[1] || '{}');
const model = (d.model || 'unknown').replace('claude-', '');
const branch = d.git_branch || '';
const ctx = d.context_percent ? d.context_percent + '%' : '';
const cost = d.total_cost ? '\$' + d.total_cost.toFixed(2) : '';
const parts = [model, branch, ctx ? 'ctx:' + ctx : '', cost].filter(Boolean);
console.log(parts.join(' | '));
" "$INPUT" 2>/dev/null)

echo "${STATUS:-ready}"
