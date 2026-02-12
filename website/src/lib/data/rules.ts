import fs from "fs";
import path from "path";
import matter from "gray-matter";
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

  // Scan a directory tree for .md files in subdirectories
  function scanDir(
    baseDir: string,
    loadType: Rule["loadType"],
    slugPrefix: string,
  ) {
    if (!fs.existsSync(baseDir)) return;

    const subdirs = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const subdir of subdirs) {
      const category = CATEGORY_MAP[subdir.name] || subdir.name;
      const dirPath = path.join(baseDir, subdir.name);
      const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

      for (const file of files) {
        const slug = `${slugPrefix}${subdir.name}/${file.replace(".md", "")}`;
        const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const { data, content } = matter(raw);

        const firstLine = content.trim().split("\n")[0] || "";
        const description =
          data.description ||
          firstLine
            .replace(/^#+\s*/, "")
            .replace(/\*+/g, "")
            .trim() ||
          file.replace(".md", "");

        const htmlResult = remark().use(remarkHtml).processSync(content);

        rules.push({
          slug,
          name:
            data.name ||
            file
              .replace(".md", "")
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c: string) => c.toUpperCase()),
          description,
          category,
          loadType,
          content: content.slice(0, 5000),
          htmlContent: String(htmlResult),
        });
      }
    }
  }

  // Always-loaded rules from rules/
  scanDir(rulesDir, "always-loaded", "");

  // On-demand reference guides from docs/reference/
  scanDir(referenceDir, "on-demand", "reference/");

  return rules.sort((a, b) => a.name.localeCompare(b.name));
}
