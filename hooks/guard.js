#!/usr/bin/env node
// PreToolUse guard for Bash, Write, Edit, and NotebookEdit.
//
// Claude Code sends the tool call as JSON on stdin ({tool_name, tool_input,
// cwd, ...}). This hook answers with a structured deny when a call matches a
// small set of low-ambiguity footguns; everything else passes silently.
//
// Scope: protection against mistakes in YOLO / bypassPermissions mode, not a
// sandbox. Regex guards can be evaded on purpose; they exist so an honest
// slip (wrong directory, force push, key file overwrite) never lands.
//
// If you really want a blocked action, run it yourself in a terminal.

const fs = require("fs");

function readInput() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: `${reason} If this is intended, ask the user to run it themselves.`,
      },
    }) + "\n",
  );
  process.exit(0);
}

// Strip heredoc bodies and quoted commit messages are still scanned for
// attribution trailers separately, so a blocked word inside a quoted string
// in an unrelated command does not trip the destructive-command checks.
function stripHeredocs(cmd) {
  return cmd.replace(/<<-?\s*['"]?(\w+)['"]?[\s\S]*?\n\1\b/g, "");
}

const BASH_RULES = [
  [/\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|-r\s+-f|-f\s+-r)[a-zA-Z]*\s+(\/|~|\$HOME|\$\{HOME\})(\s|\/?\*?\s*$|\/?$)/, "Recursive force delete of a filesystem or home root is blocked."],
  [/\bgit\s+(-C\s+\S+\s+)?push\b[^\n;&|]*\s(--force(?!-with-lease)|-f)\b/, "Force push is blocked."],
  [/\bgit\s+(-C\s+\S+\s+)?push\b[^\n;&|]*\s--force-with-lease\b/, "Force push (with lease) is blocked."],
  [/\bgit\s+(-C\s+\S+\s+)?reset\s+--hard\b/, "git reset --hard discards work and is blocked."],
  [/\bgit\s+(-C\s+\S+\s+)?clean\s+-[a-zA-Z]*[fdx]/, "git clean deleting files is blocked."],
  [/\bgit\s+(-C\s+\S+\s+)?(checkout|restore)\s+(--\s+)?\.(\s|$)/, "Discarding all working-tree changes is blocked."],
  [/\bchmod\s+-R\s+777\b/, "chmod -R 777 is blocked."],
  [/\b(curl|wget)\b[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh\b/, "Piping a download straight into a shell is blocked; download, inspect, then run."],
  [/\b(DROP\s+(TABLE|DATABASE|SCHEMA)|TRUNCATE\s+TABLE)\b/i, "Destructive SQL is blocked."],
  [/\bdocker\s+system\s+prune\s+(-a|--all)\b/, "docker system prune -a is blocked."],
  [/\b(npm|yarn|pnpm)\s+publish\b/, "Package publishing is blocked."],
];

const ATTRIBUTION = /Co-Authored-By:\s*(Claude|Codex|ChatGPT|OpenAI|Anthropic|AI\b|.*noreply@anthropic\.com)/i;

function checkBash(input) {
  const raw = String(input.tool_input?.command || "");
  if (!raw) return;
  if (/\bgit\b[\s\S]*\bcommit\b/.test(raw) && ATTRIBUTION.test(raw)) {
    deny("AI attribution trailers in commit messages are not allowed by this toolkit's rules.");
  }
  const cmd = stripHeredocs(raw);
  for (const [re, reason] of BASH_RULES) {
    if (re.test(cmd)) deny(reason);
  }
}

const PROTECTED_WRITE = [
  [/(^|\/)\.env(\.(local|production|staging|development|test))?$/, "Environment files hold secrets; edit them manually."],
  [/(^|\/)(credentials|service-account[^/]*|[^/]*-credentials)\.json$/, "Credential files must not be modified by automation."],
  [/(^|\/)\.git\//, "Files inside .git/ are managed by git."],
  [/(^|\/)node_modules\//, "node_modules is managed by the package manager."],
  [/(^|\/)\.(ssh|gnupg)\//, "SSH/GPG directories must be managed manually."],
  [/(^|\/)(id_rsa|id_ed25519|id_ecdsa)[^/]*$|\.(pem|key|p12|pfx|jks)$/, "Private key files must not be modified by automation."],
];

function checkWrite(input) {
  const p = String(input.tool_input?.file_path || input.tool_input?.notebook_path || "").replace(/\\/g, "/");
  if (!p) return;
  for (const [re, reason] of PROTECTED_WRITE) {
    if (re.test(p)) deny(`${reason} (${p})`);
  }
}

const input = readInput();
const tool = input.tool_name || "";
if (tool === "Bash") checkBash(input);
else if (tool === "Write" || tool === "Edit" || tool === "MultiEdit" || tool === "NotebookEdit") checkWrite(input);
process.exit(0);
