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
  const rulesDir = path.resolve(process.cwd(), "..", "rules");

  if (!fs.existsSync(rulesDir)) {
    return [];
  }

  const rules: Rule[] = [];

  const subdirs = fs
    .readdirSync(rulesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const subdir of subdirs) {
    const category = CATEGORY_MAP[subdir.name] || subdir.name;
    const dirPath = path.join(rulesDir, subdir.name);
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = `${subdir.name}/${file.replace(".md", "")}`;
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
        content: content.slice(0, 5000),
        htmlContent: String(htmlResult),
      });
    }
  }

  return rules.sort((a, b) => a.name.localeCompare(b.name));
}
