#!/usr/bin/env node
/**
 * Cross-platform Prettier hook for Claude Code
 * Reads PostToolUse hook input from stdin and formats the file with Prettier
 * Works on Windows, macOS, and Linux
 */

const { spawn } = require('child_process');

let input = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(input);

    // Extract file path from tool input
    // PostToolUse hooks receive: { tool_name, tool_input, tool_result, ... }
    const filePath = hookData?.tool_input?.file_path;

    if (!filePath) {
      // No file path found, exit silently (not all tools have file paths)
      process.exit(0);
    }

    // Skip non-formattable files
    const formattableExtensions = [
      '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
      '.json', '.md', '.mdx', '.yml', '.yaml',
      '.css', '.scss', '.less', '.html', '.vue', '.svelte',
      '.graphql', '.gql'
    ];

    const ext = filePath.toLowerCase().slice(filePath.lastIndexOf('.'));
    if (!formattableExtensions.includes(ext)) {
      process.exit(0);
    }

    // Run prettier
    const prettier = spawn('npx', ['prettier', '--write', filePath], {
      stdio: 'inherit',
      shell: true
    });

    prettier.on('close', (code) => {
      process.exit(code || 0);
    });

    prettier.on('error', (err) => {
      // Prettier not available or other error - fail silently
      console.error('Prettier hook error:', err.message);
      process.exit(0);
    });

  } catch (err) {
    // JSON parse error or other issue - fail silently
    process.exit(0);
  }
});
