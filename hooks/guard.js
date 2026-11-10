#!/usr/bin/env node
// PreToolUse guard for Bash, PowerShell, Write, Edit, and NotebookEdit. Shell
// commands Claude starts with the Monitor tool arrive here as Bash calls.
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

let RAW = "";
function readInput() {
  try {
    RAW = fs.readFileSync(0, "utf8") || "";
    return JSON.parse(RAW || "{}");
  } catch {
    return {};
  }
}

// Optional private guard (~/.claude/local/hooks/local-pre-tool-use.py). Runs only
// for the tools it cares about and only after the public checks pass; its deny
// (Claude Code JSON on stdout) is relayed unchanged.
function runLocalGuard(tool) {
  if (!["Bash", "PowerShell", "EnterWorktree", "Agent", "Task"].includes(tool)) return;
  // The private guard checks shell commands under the name Bash; a PowerShell
  // command is the same git/shell text, so hand it over under that name.
  let payload = RAW;
  if (tool === "PowerShell") {
    try { payload = JSON.stringify({ ...JSON.parse(RAW), tool_name: "Bash" }); } catch {}
  }
  const path = require("path");
  const local = path.join(require("os").homedir(), ".claude", "local", "hooks", "local-pre-tool-use.py");
  if (!fs.existsSync(local)) return;
  const py = process.platform === "win32" ? "python" : "python3";
  const r = require("child_process").spawnSync(py, [local], { input: payload, encoding: "utf8", timeout: 9000 });
  const out = (r.stdout || "").trim();
  if (out.includes('"permissionDecision"')) {
    process.stdout.write(out + "\n");
    process.exit(0);
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
  return cmd
    .replace(/<<-?\s*['"]?(\w+)['"]?[\s\S]*?\n\1\b/g, "")
    .replace(/@(['"])[ \t]*\r?\n[\s\S]*?\n\1@/g, ""); // PowerShell here-strings
}

// `git` plus global options before the subcommand: -C <path>, -c <key=value>,
// --git-dir/--work-tree/--namespace <value>, --flag[=value], -p/-P.
const GIT_VALUE = String.raw`(?:"[^"]*"|'[^']*'|[^\s;&|]+)`;
const GIT = String.raw`\bgit(?:\s+(?:-[Cc]\s+${GIT_VALUE}|--(?:git-dir|work-tree|namespace)\s+${GIT_VALUE}|--[A-Za-z][A-Za-z-]*(?:=${GIT_VALUE})?|-[pP]))*`;
const git = (rest) => new RegExp(GIT + rest);

const BASH_RULES = [
  [/\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-[a-zA-Z]*f[a-zA-Z]*r|-r\s+-f|-f\s+-r)[a-zA-Z]*\s+(\/|~|\$HOME|\$\{HOME\})(\s|\/?\*?\s*$|\/?$)/, "Recursive force delete of a filesystem or home root is blocked."],
  // --force, --force-if-includes, -f or a short-flag cluster holding f (-fu), or a +refspec (origin +main).
  [git(String.raw`\s+push\b[^\n;&|]*?\s(?:--force(?:-if-includes)?(?![\w-])|-[a-zA-Z0-9]*f[a-zA-Z0-9]*(?![\w-])|["']?\+[^\s"'])`), "Force push is blocked.", "approvable"],
  [git(String.raw`\s+push\b[^\n;&|]*\s--force-with-lease(?![\w-])`), "Force push (with lease) is blocked.", "approvable"],
  [git(String.raw`\s+reset\b[^\n;&|]*?\s--hard(?![\w-])`), "git reset --hard discards work and is blocked.", "approvable"],
  [git(String.raw`\s+clean\s+-[a-zA-Z]*[fdx]`), "git clean deleting files is blocked."],
  [git(String.raw`\s+(checkout|restore)\s+(--\s+)?(\.|:\/)(\s|$)`), "Discarding all working-tree changes is blocked."],
  [/\bchmod\s+-R\s+777\b/, "chmod -R 777 is blocked."],
  [/\b(curl|wget)\b[^\n|]*\|\s*(sudo\s+)?(ba|z)?sh\b/, "Piping a download straight into a shell is blocked; download, inspect, then run."],
  [/\b(DROP\s+(TABLE|DATABASE|SCHEMA)|TRUNCATE\s+TABLE)\b/i, "Destructive SQL is blocked."],
  [/\bdocker\s+system\s+prune\s+(-a|--all)\b/, "docker system prune -a is blocked."],
  [/\b(npm|yarn|pnpm)\s+publish\b/, "Package publishing is blocked."],
];

// PowerShell-only forms of the same footguns. The git, SQL, docker and publish
// rules above apply to PowerShell commands unchanged.
const PS_ROOT = String.raw`["']?(?:~|\$HOME|\$env:USERPROFILE|\$env:HOMEPATH|\$env:SystemDrive|[A-Za-z]:|/)[\\/]?\*?["']?(?=\s|$|[;|&)])`;
const POWERSHELL_RULES = [
  // Remove-Item (or an alias) with both -Recurse and -Force, aimed at a drive or home root.
  [new RegExp(String.raw`\b(?:Remove-Item|ri|rm|rmdir|rd|del|erase)\b(?=[^\n;|&]*\s-r(?:ec(?:urse)?)?\b)(?=[^\n;|&]*\s-fo(?:rce)?\b)[^\n;|&]*?\s${PS_ROOT}`, "i"), "Recursive force delete of a drive or home root is blocked."],
  [new RegExp(String.raw`\b(?:rd|rmdir)\s+/s\b[^\n;|&]*?\s${PS_ROOT}`, "i"), "Recursive delete of a drive or home root is blocked."],
  [/\b(?:iwr|irm|curl|wget|Invoke-WebRequest|Invoke-RestMethod)\b[^\n|]*\|\s*(?:iex|Invoke-Expression)\b/i, "Piping a download straight into Invoke-Expression is blocked; download, inspect, then run."],
  [/\b(?:iex|Invoke-Expression)\b[\s(&"']*\(?\s*(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|\(?\s*New-Object\s+(?:System\.)?Net\.WebClient)/i, "Running a download through Invoke-Expression is blocked; download, inspect, then run."],
  [/\b(?:Format-Volume|Clear-Disk|Initialize-Disk)\b/i, "Disk formatting commands are blocked."],
];

// A force push or `reset --hard` the user approved for a repo they own runs
// when the command carries GUARD_APPROVED_FORCE=<owner>/<repo>. The marker is
// the agent's record of that approval, never a way around a refusal; a private
// guard (below) can verify the owner and remotes.
const OWNER_APPROVED_FORCE = /(^|[\s;&|(])GUARD_APPROVED_FORCE=[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\s/;
// The same record in PowerShell: $env:GUARD_APPROVED_FORCE = '<owner>/<repo>'; git push ...
const OWNER_APPROVED_FORCE_PS = /\$env:GUARD_APPROVED_FORCE\s*=\s*(["'])[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\1/i;

const ATTRIBUTION = /Co-Authored-By:\s*(Claude|Codex|ChatGPT|OpenAI|Anthropic|AI\b|.*noreply@anthropic\.com)/i;

function checkShell(input, powershell) {
  const raw = String(input.tool_input?.command || "");
  if (!raw) return;
  if (/\bgit\b[\s\S]*\bcommit\b/.test(raw) && ATTRIBUTION.test(raw)) {
    deny("AI attribution trailers in commit messages are not allowed by this toolkit's rules.");
  }
  const cmd = stripHeredocs(raw);
  const approved = OWNER_APPROVED_FORCE.test(cmd) || (powershell && OWNER_APPROVED_FORCE_PS.test(cmd));
  for (const [re, reason, approvable] of BASH_RULES) {
    if (re.test(cmd) && !(approvable && approved)) deny(reason);
  }
  if (powershell) {
    for (const [re, reason] of POWERSHELL_RULES) if (re.test(cmd)) deny(reason);
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

// Other agents that load these hooks (e.g. Grok's Claude compatibility) send
// camelCase {toolName, toolInput} with their own tool names. Map them to the
// Claude shape so this guard and the private guard check them too.
const TOOL_ALIASES = { run_terminal_command: "Bash", spawn_subagent: "Task" };
function normalize(input) {
  if (input.tool_name || !input.toolName) return input;
  const normalized = {
    ...input,
    tool_name: TOOL_ALIASES[input.toolName] || input.toolName,
    tool_input: input.toolInput || {},
  };
  RAW = JSON.stringify(normalized);
  return normalized;
}

const input = normalize(readInput());
const tool = input.tool_name || "";
if (tool === "Bash") checkShell(input, false);
else if (tool === "PowerShell") checkShell(input, true);
else if (tool === "Write" || tool === "Edit" || tool === "MultiEdit" || tool === "NotebookEdit") checkWrite(input);
runLocalGuard(tool);
process.exit(0);
