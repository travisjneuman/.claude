import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface DocPage {
  slug: string;
  name: string;
  description: string;
  category: string;
  content: string;
  htmlContent: string;
}

export function getDocs(): DocPage[] {
  const docsDir = path.resolve(process.cwd(), "..", "docs");

  if (!fs.existsSync(docsDir)) {
    return [];
  }

  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md"));
  const docs: DocPage[] = [];

  for (const file of files) {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(docsDir, file), "utf-8");
    const { data, content } = matter(raw);

    const firstLine = content.trim().split("\n")[0] || "";
    const description =
      data.description ||
      firstLine
        .replace(/^#+\s*/, "")
        .replace(/\*+/g, "")
        .trim() ||
      slug;

    const htmlResult = remark().use(remarkHtml).processSync(content);

    docs.push({
      slug,
      name:
        data.name ||
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
      category: data.category || "general",
      content: content.slice(0, 5000),
      htmlContent: String(htmlResult),
    });
  }

  return docs.sort((a, b) => a.name.localeCompare(b.name));
}
