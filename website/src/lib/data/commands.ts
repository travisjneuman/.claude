import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Command {
  slug: string;
  name: string;
  description: string;
  content: string;
  htmlContent: string;
}

export function getCommands(): Command[] {
  const commandsDir = path.resolve(process.cwd(), "..", "commands");

  if (!fs.existsSync(commandsDir)) {
    return [];
  }

  const files = fs.readdirSync(commandsDir).filter((f) => f.endsWith(".md"));
  const commands: Command[] = [];

  for (const file of files) {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(commandsDir, file), "utf-8");
    const { data, content } = matter(raw);

    const firstLine = content.trim().split("\n")[0] || "";
    const description =
      data.description ||
      firstLine
        .replace(/^#+\s*/, "")
        .replace(/\*+/g, "")
        .trim() ||
      slug;

    const htmlResult = remark()
      .use(remarkHtml)
      .processSync(content.slice(0, 5000));

    commands.push({
      slug,
      name:
        data.name ||
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
      content: content.slice(0, 5000),
      htmlContent: String(htmlResult),
    });
  }

  return commands.sort((a, b) => a.name.localeCompare(b.name));
}
