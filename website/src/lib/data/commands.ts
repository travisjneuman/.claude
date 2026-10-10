import { getPublicCounts, readPublicSource } from "./snapshot";
import { getFrontmatterString, parseMarkdown } from "./frontmatter";
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
  // The public slash-command count is base commands; router wrappers are a
  // separate canonical field/inventory, not an accidental recursive population.
  const files = getPublicCounts().inventory.commands;
  const commands: Command[] = [];

  for (const file of files) {
    const slug = file.slice("commands/".length).replace(/\.md$/, "");
    const raw = readPublicSource(file);
    const { data, content } = parseMarkdown(raw);

    const firstLine = content.trim().split("\n")[0] || "";
    const description =
      getFrontmatterString(data, "description") ||
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
        getFrontmatterString(data, "name") ||
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
