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

const HOOK_METADATA: Record<
  string,
  { event: string; matcher: string; description: string }
> = {
  "session-start-pull": {
    event: "SessionStart",
    matcher: "",
    description:
      "Pulls all repos in background with 60s timeout on session startup.",
  },
  "session-start-context": {
    event: "SessionStart",
    matcher: "",
    description:
      "Injects previous session context so Claude can resume where it left off.",
  },
  "prompt-context": {
    event: "UserPromptSubmit",
    matcher: "",
    description:
      "Injects current git branch, status, and recent commits into every prompt.",
  },
  "guard-dangerous": {
    event: "PreToolUse",
    matcher: "Bash",
    description:
      "Blocks dangerous commands like rm -rf /, git push --force, DROP TABLE.",
  },
  "pre-commit-counts": {
    event: "PreToolUse",
    matcher: "Bash",
    description:
      "Runs update-counts.sh before git commit to keep documentation accurate.",
  },
  "format-code": {
    event: "PostToolUse",
    matcher: "Write|Edit",
    description:
      "Auto-formats files after Claude writes or edits them using Prettier or Ruff.",
  },
  "session-stop-summary": {
    event: "Stop",
    matcher: "",
    description:
      "Saves a session summary for continuity between Claude Code sessions.",
  },
};

export function getHooks(): Hook[] {
  const hooksDir = path.resolve(process.cwd(), "..", "hooks");

  if (!fs.existsSync(hooksDir)) {
    return [];
  }

  const files = fs
    .readdirSync(hooksDir)
    .filter((f) => f.endsWith(".sh"))
    .sort();
  const hooks: Hook[] = [];

  for (const file of files) {
    const slug = file.replace(".sh", "");
    const raw = fs.readFileSync(path.join(hooksDir, file), "utf-8");
    const meta = HOOK_METADATA[slug];

    // Build markdown content from the script with syntax highlighting
    const markdownContent = [
      `## ${meta?.description || slug}`,
      "",
      "```bash",
      raw.trim(),
      "```",
    ].join("\n");

    const htmlResult = remark().use(remarkHtml).processSync(markdownContent);

    hooks.push({
      slug,
      name: slug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      event: meta?.event || "Unknown",
      matcher: meta?.matcher || "",
      description: meta?.description || slug,
      content: raw.slice(0, 5000),
      htmlContent: String(htmlResult),
    });
  }

  return hooks;
}
