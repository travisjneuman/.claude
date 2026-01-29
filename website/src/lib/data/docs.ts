import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface DocPage {
  slug: string;
  name: string;
  description: string;
  content: string;
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

    docs.push({
      slug,
      name:
        data.name ||
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
      content: content.slice(0, 3000),
    });
  }

  return docs.sort((a, b) => a.name.localeCompare(b.name));
}
