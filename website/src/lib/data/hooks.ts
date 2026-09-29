import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Hook {
  slug: string;
  name: string;
  event: string;
  matcher: string;
  description: string;
  content: string;
  htmlContent: string;
}

// Keyed by filename. Only hooks listed here are shown: they are the ones wired
// in settings.json (all through the run-hook.js dispatcher). The gsd-*.js files
// in hooks/ are kept for GSD users but are not wired globally, so they are
// intentionally absent. Private hooks in the gitignored local/hooks/ layer are
// not in the public repo and never appear here.
const HOOK_METADATA: Record<
  string,
  { event: string; matcher: string; description: string }
> = {
  "run-hook.js": {
    event: "Dispatcher",
    matcher: "all hooks",
    description:
      "Cross-platform runner that every hook entry in settings.json goes through. Resolves the hook from the public hooks/ directory first, then the private local/hooks/ layer, picks the interpreter by extension (Node, Python, or Bash), and passes Claude Code's JSON through. A missing hook exits silently.",
  },
  "session-start-pull.sh": {
    event: "SessionStart",
    matcher: "startup|resume",
    description:
      "Runs in the background (async), at most once per PULL_INTERVAL_HOURS (default 24). Fast-forward pulls the toolkit, the marketplace clones, and optionally your project repos. Never commits, pushes, or merges, and logs to a file instead of Claude's context. /pull-repos forces a pull.",
  },
  "session-start-repo-health.sh": {
    event: "SessionStart",
    matcher: "startup|resume",
    description:
      "Checks local git state (no network) and prints a short banner only when a repo is behind, unpushed, dirty, diverged, or detached. Silent when everything is clean.",
  },
  "guard.js": {
    event: "PreToolUse",
    matcher: "Bash|Write|Edit|MultiEdit|NotebookEdit",
    description:
      "Blocks a short list of footguns with a structured deny: rm -rf on / or ~, force push, reset --hard, git clean, discarding all changes, curl | sh, destructive SQL, package publishing, AI attribution trailers, and writes to .env, credential, key, .git/, or node_modules files. Everything else passes silently.",
  },
  "secret-scan.sh": {
    event: "PostToolUse",
    matcher: "Write|Edit|MultiEdit|NotebookEdit",
    description:
      "Scans the file just written for strings that look like real credentials (AWS, OpenAI/Anthropic, GitHub, GitLab, Slack tokens, private keys) and tells Claude via additionalContext so it removes them before committing. Never blocks.",
  },
  "session-end-repo-health.sh": {
    event: "SessionEnd",
    matcher: "",
    description:
      "Walks the same repos at exit. Pushes clean, unpushed work only in repos owned by the configured GITHUB_OWNERS (optionally through REPO_PUSH_COMMAND) and logs warnings for dirty or diverged repos. Report-only when GITHUB_OWNERS is unset.",
  },
  "statusline.js": {
    event: "StatusLine",
    matcher: "",
    description:
      "Draws model, effort, folder and branch, context %, 5h/7d usage, and cost under the prompt. Rendered by the client and never sent to Claude, so it costs zero tokens.",
  },
};

// Hook file extension -> code fence language
const HOOK_EXTENSIONS: Record<string, string> = {
  ".sh": "bash",
  ".js": "javascript",
};

// Lifecycle order: dispatcher, session start, tool use, session end, status bar
const EVENT_ORDER: Record<string, number> = {
  Dispatcher: 0,
  SessionStart: 1,
  PreToolUse: 2,
  PostToolUse: 3,
  SessionEnd: 4,
  StatusLine: 5,
};

export function getHooks(): Hook[] {
  const hooksDir = path.resolve(process.cwd(), "..", "hooks");

  if (!fs.existsSync(hooksDir)) {
    return [];
  }

  const files = fs
    .readdirSync(hooksDir)
    .filter((f) => path.extname(f) in HOOK_EXTENSIONS)
    .sort();
  const hooks: Hook[] = [];

  for (const file of files) {
    const meta = HOOK_METADATA[file];

    // Skip hooks without metadata (not wired in settings.json)
    if (!meta) continue;

    const ext = path.extname(file);
    const slug = file.slice(0, -ext.length);
    const raw = fs.readFileSync(path.join(hooksDir, file), "utf-8");

    // Build markdown content from the script with syntax highlighting
    const markdownContent = [
      `## ${meta.description}`,
      "",
      "```" + HOOK_EXTENSIONS[ext],
      raw.trim(),
      "```",
    ].join("\n");

    const htmlResult = remark().use(remarkHtml).processSync(markdownContent);

    hooks.push({
      slug,
      // The filename is the hook's name everywhere else (settings.json,
      // hooks/README.md), so show it verbatim, extension included.
      name: file,
      event: meta.event,
      matcher: meta.matcher,
      description: meta.description,
      content: raw.slice(0, 5000),
      htmlContent: String(htmlResult),
    });
  }

  return hooks.sort(
    (a, b) =>
      (EVENT_ORDER[a.event] ?? 9) - (EVENT_ORDER[b.event] ?? 9) ||
      a.name.localeCompare(b.name),
  );
}
