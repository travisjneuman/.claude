import path from "path";
import { getPublicCounts, readPublicSource } from "./snapshot";
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

// Descriptions supplement the canonical public wiring inventory. Membership,
// events and matchers come from counts.json, never this presentation map.
const HOOK_METADATA: Record<
  string,
  { event: string; matcher: string; description: string }
> = {
  "daily-maintenance.js": {
    event: "Stop",
    matcher: "",
    description:
      "At most daily, schedules a background usage rollup and the configured repository maintenance sweep. Public output contains no transcripts; private runtime data is not part of the toolkit inventory.",
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
  "secret-scan.js": {
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
  ".py": "python",
};

// Lifecycle order: session start, tool use, session end, stop, status bar
const EVENT_ORDER: Record<string, number> = {
  SessionStart: 1,
  PreToolUse: 2,
  PostToolUse: 3,
  SessionEnd: 4,
  Stop: 5,
  StatusLine: 6,
};

export function getHooks(): Hook[] {
  const hooks: Hook[] = [];
  for (const identity of getPublicCounts().inventory.hooks) {
    const file = path.posix.basename(identity.file);
    const meta = {
      description: HOOK_METADATA[file]?.description || "Public hook wired in the toolkit settings.",
      event: identity.events.join(", "),
      matcher: identity.matchers.join("; "),
    };
    const ext = path.extname(file);
    const slug = file.slice(0, -ext.length);
    const raw = readPublicSource(identity.file);

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
