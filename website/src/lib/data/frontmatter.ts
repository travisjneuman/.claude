import { parse as parseYaml } from "yaml";

export interface MarkdownFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseMarkdown(raw: string): MarkdownFrontmatter {
  const match = raw.match(frontmatterPattern);
  if (!match) return { data: {}, content: raw };

  const parsed = parseYaml(match[1]);
  return {
    data: isRecord(parsed) ? parsed : {},
    content: raw.slice(match[0].length),
  };
}

export function getFrontmatterString(
  data: Record<string, unknown>,
  key: string,
): string {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

export function getFrontmatterStringArray(
  data: Record<string, unknown>,
  key: string,
): string[] {
  const value = data[key];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return typeof value === "string" && value.length > 0 ? [value] : [];
}
