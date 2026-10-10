#!/usr/bin/env node
// Safety gates only: inspect final index blobs, never working-tree file bodies.
import path from "node:path";
import { spawnSync } from "node:child_process";
import { TextDecoder } from "node:util";
import { loadPrivatePatterns } from "../public-output-safety.mjs";

function git(args, root) {
  const result = spawnSync("git", [...(root ? ["-C", root] : []), ...args], {
    encoding: null, maxBuffer: 512 * 1024 * 1024,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
  });
  if (result.error || result.status !== 0) throw new Error("Cannot read staged Git input; commit blocked.");
  return result.stdout;
}
let stageOrdinal = 0;
try {
  const root = git(["rev-parse", "--show-toplevel"]).toString("utf8").trim();
  const staged = git(["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"], root)
    .toString("utf8").split("\0").filter(Boolean);
  const index = new Map();
  for (const row of git(["ls-files", "--stage", "-z"], root).toString("utf8").split("\0").filter(Boolean)) {
    const match = /^(\d+) ([a-f0-9]+) ([0-3])\t([\s\S]+)$/.exec(row);
    if (!match || match[3] !== "0") throw new Error("Unresolved or unreadable index entry; commit blocked.");
    if (match[1] === "160000") throw new Error("Marketplace clone/gitlink content is not publishable; commit blocked.");
    index.set(match[4], { mode: match[1], blob: match[2] });
  }
  const ignored = new Set(git(["ls-files", "--cached", "--ignored", "--exclude-standard", "-z"], root)
    .toString("utf8").split("\0").filter(Boolean));
  const privateRoots = new Set(["local", "agent-memory", "projects", "sessions", "session-env", "session-summaries",
    "shell-snapshots", "file-history", "todos", "tasks", "teams", "plans", "debug", "ide", "cache", "paste-cache",
    "image-cache", "downloads", "statsig", "telemetry", "usage-data", "logs", "backups", ".backups", ".archive", "security"]);
  const privateNames = new Set([".credentials.json", ".credentials.lock", "credentials.json", "history.jsonl", ".mcp.json",
    ".env", ".env.local", "settings.local.json", "CLAUDE.local.md", ".claude.json", "last-session.md"]);
  const patternGate = loadPrivatePatterns(root);
  // Optional closing key quote covers JSON properties as well as bare assignments.
  // Keep scanning comments and every textual format; exemptions apply only to
  // a complete quoted value, never its surrounding line or file.
  const secret = /(api[_-]?key|secret|password|token|credential|private[_-]?key)["']?\s*[:=]\s*(["'])([^"']+)/gi;
  // Source-reviewed instructional examples only: exact public path + literal.
  // Published status alone is not evidence that a credential is safe. These
  // synthetic/truncated examples never exempt settings, scripts or new paths;
  // the private-pattern gate still scans their complete final staged bodies.
  const publicPlaceholdersByPath = new Map([
    ["templates/api-project.md", new Set(["generate-with-openssl-rand-base64-64"])],
    ["templates/release-checklist-template.md", new Set(["[test-password]"])],
    ["docs/reference/checklists/automation-scripts.md", new Set(["sk-abc123..."])],
    ["skills/database-expert/SKILL.md", new Set(["xxx"])],
    ["skills/devops-cloud/SKILL.md", new Set(["xxx"])],
    ["skills/react-native/SKILL.md", new Set(["password123"])],
    ["skills/seo-analytics-auditor/SKILL.md", new Set(["YOUR_TOKEN"])],
    ["skills/tech-debt-analyzer/references/debt_categories.md", new Set(["sk_live_abc123xyz789"])],
    ["skills/devex-sdk-design/SKILL.md", new Set(["api-key"])],
    ["skills/low-code-platforms/SKILL.md", new Set(["secure-password"])],
    ["skills/test-specialist/references/testing_patterns.md", new Set(["invalid.jwt.token"])],
    ["skills/agent-django-fastapi-expert/SKILL.md", new Set(["secure_password_123", "password123"])],
    ["skills/codebase-documenter/assets/templates/API.template.md", new Set([
      "password123", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "YOUR_API_TOKEN",
    ])],
  ]);
  const envReference = /^(?:\$\{[A-Z_][A-Z0-9_]*\}|\$[A-Z_][A-Z0-9_]*)$/;
  for (const [stageIndex, file] of staged.entries()) {
    stageOrdinal = stageIndex + 1;
    const parts = file.split("/");
    if (file.startsWith("plugins/marketplaces/")) throw new Error("Marketplace clone content is staged; commit blocked.");
    if (ignored.has(file) || privateRoots.has(parts[0]) || file.startsWith("rules/local/") || file.startsWith("skills/synced/") ||
        parts.some((part) => privateNames.has(part) || part.startsWith(".oauth_refresh.lock") || /^\.env\..*\.local$/.test(part)) ||
        parts.some((part) => part.startsWith(".claude-counts-stage-"))) {
      throw new Error("Private, ignored or temporary content is staged; commit blocked.");
    }
    const entry = index.get(file);
    if (!entry || !["100644", "100755", "120000"].includes(entry.mode)) throw new Error("Unreadable staged entry; commit blocked.");
    const body = git(["cat-file", "blob", entry.blob], root);
    // Known encoded image/archive data cannot be privacy-scanned as text. All
    // textual definitions (including .mjs/.ts/settings/.gitignore) scan in full.
    const binary = /\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|pdf|zip|gz|7z|mp[34]|wav|mov)$/i.test(path.basename(file));
    let text;
    try { text = new TextDecoder("utf-8", { fatal: true }).decode(body); }
    catch {
      if (binary && entry.mode !== "120000") continue;
      throw new Error("Staged text is not readable UTF-8; commit blocked.");
    }
    if (text.includes("\0")) {
      if (binary && entry.mode !== "120000") continue;
      throw new Error("Staged text contains binary data; commit blocked.");
    }
    patternGate(text);
    for (const match of text.matchAll(secret)) {
      const value = match[3];
      const closed = text[match.index + match[0].length] === match[2];
      if (closed && (envReference.test(value) || publicPlaceholdersByPath.get(file)?.has(value))) continue;
      throw new Error("Potential credential in final staged content; commit blocked.");
    }
  }
  console.log("Staged marketplace, privacy, credential and ignored-file safety gates passed. No generation or tests run.");
} catch (error) {
  // Never emit filenames, patterns, source URLs, matched text or raw Git errors.
  const reason = /^(?:Private pattern gate blocked public content at line [0-9]+; refusing publication\.|Potential credential in final staged content; commit blocked\.)$/.test(error.message) ? error.message : "Staged publication safety failed.";
  console.error(`COMMIT BLOCKED: ${reason} Staged entry ${stageOrdinal}. Review the index and private policy locally; do not bypass the hook.`);
  process.exitCode = 1;
}
