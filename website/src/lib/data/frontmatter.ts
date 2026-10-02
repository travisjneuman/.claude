import { parse as parseYaml } from "yaml";

export interface MarkdownFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Claude Code reads frontmatter leniently (e.g. an unquoted value containing
// ": "), so a file it accepts may still be invalid YAML. Fall back to flat
// `key: value` lines rather than failing the whole site build on one file.
function parseFlatFrontmatter(block: string): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const line of block.split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (pair) data[pair[1]] = pair[2].replace(/^(["'])(.*)\1$/, "$2");
  }
  return data;
}

function parseFrontmatterBlock(block: string): unknown {
  try {
    return parseYaml(block);
  } catch {
    return parseFlatFrontmatter(block);
  }
}

export function parseMarkdown(raw: string): MarkdownFrontmatter {
  const match = raw.match(frontmatterPattern);
  if (!match) return { data: {}, content: raw };

  const parsed = parseFrontmatterBlock(match[1]);
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
