import fs from "fs";
import path from "path";
import {
  getFrontmatterString,
  getFrontmatterStringArray,
  parseMarkdown,
} from "./frontmatter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Rule {
  slug: string;
  name: string;
  description: string;
  category: string;
  loadType: "always-loaded" | "on-demand";
  content: string;
  htmlContent: string;
}

const CATEGORY_MAP: Record<string, string> = {
  checklists: "checklist",
  stacks: "stack",
  tooling: "tooling",
  workflows: "workflow",
};

export function getRules(): Rule[] {
  const repoRoot = path.resolve(process.cwd(), "..");
  const rulesDir = path.join(repoRoot, "rules");
  const referenceDir = path.join(repoRoot, "docs", "reference");

  const rules: Rule[] = [];

  function buildRule(
    raw: string,
    file: string,
    slug: string,
    category: string,
    loadTypeFor: (data: Record<string, unknown>) => Rule["loadType"],
  ): Rule {
    const { data, content } = parseMarkdown(raw);

    const firstLine = content.trim().split("\n")[0] || "";
    const heading =
      getFrontmatterString(data, "description") ||
      firstLine
        .replace(/^#+\s*/, "")
        .replace(/\*+/g, "")
        .trim() ||
      file.replace(".md", "");
    const paths = getFrontmatterStringArray(data, "paths");
    const description = paths.length
      ? `${heading} \u2014 loads only when working on ${paths.join(", ")}`
      : heading;

    const htmlResult = remark().use(remarkHtml).processSync(content);

    return {
      slug,
      name:
        getFrontmatterString(data, "name") ||
        file
          .replace(".md", "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
      category,
      loadType: loadTypeFor(data),
      content: content.slice(0, 5000),
      htmlContent: String(htmlResult),
    };
  }

  // Rules: flat .md files directly in rules/. Rules with `paths:` frontmatter
  // are path-scoped (loaded only for matching files); rules without it load
  // every session. Subdirectories are deliberately not scanned: rules/local/
  // is the private, gitignored layer and must never be published.
  if (fs.existsSync(rulesDir)) {
    const files = fs
      .readdirSync(rulesDir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith(".md") && e.name !== "README.md")
      .map((e) => e.name);

    for (const file of files) {
      const raw = fs.readFileSync(path.join(rulesDir, file), "utf-8");
      rules.push(
        buildRule(raw, file, file.replace(".md", ""), "rule", (data) =>
          getFrontmatterStringArray(data, "paths").length
            ? "on-demand"
            : "always-loaded",
        ),
      );
    }
  }

  // On-demand reference guides from docs/reference/<category>/*.md
  if (fs.existsSync(referenceDir)) {
    const subdirs = fs
      .readdirSync(referenceDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const subdir of subdirs) {
      const category = CATEGORY_MAP[subdir.name] || subdir.name;
      const dirPath = path.join(referenceDir, subdir.name);
      const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

      for (const file of files) {
        const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
        rules.push(
          buildRule(
            raw,
            file,
            `reference/${subdir.name}/${file.replace(".md", "")}`,
            category,
            () => "on-demand",
          ),
        );
      }
    }
  }

  return rules.sort((a, b) => a.name.localeCompare(b.name));
}
