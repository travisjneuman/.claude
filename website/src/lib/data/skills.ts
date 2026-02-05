import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  category: string;
  content: string;
  htmlContent: string;
}

const SKILL_CATEGORIES: Record<string, string> = {
  "generic-code-reviewer": "development",
  "generic-design-system": "design",
  "generic-feature-developer": "development",
  "generic-ux-designer": "design",
  "generic-static-code-reviewer": "development",
  "generic-static-design-system": "design",
  "generic-static-feature-developer": "development",
  "generic-static-ux-designer": "design",
  "generic-react-code-reviewer": "development",
  "generic-react-design-system": "design",
  "generic-react-feature-developer": "development",
  "generic-react-ux-designer": "design",
  "generic-fullstack-code-reviewer": "development",
  "generic-fullstack-design-system": "design",
  "generic-fullstack-feature-developer": "development",
  "generic-fullstack-ux-designer": "design",
  "vue-development": "development",
  "svelte-development": "development",
  "ios-development": "platform",
  "android-development": "platform",
  "react-native": "platform",
  "flutter-development": "platform",
  "electron-desktop": "platform",
  "pwa-development": "platform",
  "macos-native": "platform",
  "game-development": "creative",
  "ui-research": "design",
  "frontend-enhancer": "design",
  "graphic-design": "creative",
  "video-production": "creative",
  "audio-production": "creative",
  "brand-identity": "creative",
  "ui-animation": "design",
  "startup-launch": "business",
  "monetization-strategy": "business",
  "business-strategy": "business",
  finance: "business",
  marketing: "business",
  sales: "business",
  "product-management": "business",
  "api-design": "architecture",
  "graphql-expert": "architecture",
  "microservices-architecture": "architecture",
  "i18n-localization": "architecture",
  "websockets-realtime": "architecture",
  "devops-cloud": "infrastructure",
  "database-expert": "infrastructure",
  "ai-ml-development": "infrastructure",
  security: "infrastructure",
  operations: "business",
  "risk-management": "business",
  "legal-compliance": "business",
  leadership: "business",
  "hr-talent": "business",
  innovation: "business",
  "rd-management": "business",
  "data-science": "infrastructure",
  "sustainability-esg": "business",
  "health-wellness": "business",
  "debug-systematic": "development",
  "tdd-workflow": "development",
  "codebase-documenter": "development",
  "tech-debt-analyzer": "development",
  "test-specialist": "development",
  "seo-analytics-auditor": "development",
  "document-skills": "development",
  "auto-claude": "development",
  "core-workflow": "development",
};

function categorize(slug: string): string {
  return SKILL_CATEGORIES[slug] || "development";
}

export function getSkills(): Skill[] {
  const skillsDir = path.resolve(process.cwd(), "..", "skills");

  if (!fs.existsSync(skillsDir)) {
    return [];
  }

  const skills: Skill[] = [];

  function scanDir(dir: string, parentSlug?: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith("_")) continue;
      const skillMd = path.join(dir, entry.name, "SKILL.md");
      const slug = parentSlug ? `${parentSlug}/${entry.name}` : entry.name;

      if (fs.existsSync(skillMd)) {
        const raw = fs.readFileSync(skillMd, "utf-8");
        const { data, content } = matter(raw);
        const firstLine = content.trim().split("\n")[0] || "";
        const description =
          data.description ||
          firstLine
            .replace(/^#+\s*/, "")
            .replace(/\*+/g, "")
            .trim() ||
          entry.name;

        const htmlResult = remark()
          .use(remarkHtml)
          .processSync(content.slice(0, 5000));

        skills.push({
          slug,
          name:
            data.name ||
            entry.name
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c: string) => c.toUpperCase()),
          description,
          category: categorize(entry.name),
          content: content.slice(0, 5000),
          htmlContent: String(htmlResult),
        });
      }

      // Scan subdirectories for nested skills
      const subDir = path.join(dir, entry.name);
      scanDir(subDir, slug);
    }
  }

  scanDir(skillsDir);
  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

export function getSkillBySlug(slug: string): Skill | null {
  const skillsDir = path.resolve(process.cwd(), "..", "skills");
  const skillMd = path.join(skillsDir, slug, "SKILL.md");

  if (!fs.existsSync(skillMd)) return null;

  const raw = fs.readFileSync(skillMd, "utf-8");
  const { data, content } = matter(raw);
  const firstLine = content.trim().split("\n")[0] || "";

  const htmlResult = remark().use(remarkHtml).processSync(content);

  return {
    slug,
    name:
      data.name ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
    description:
      data.description ||
      firstLine
        .replace(/^#+\s*/, "")
        .replace(/\*+/g, "")
        .trim() ||
      slug,
    category: categorize(slug),
    content,
    htmlContent: String(htmlResult),
  };
}
