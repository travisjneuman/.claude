import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Agent {
  slug: string;
  name: string;
  description: string;
  model: string;
  tools: string[];
  category: string;
  content: string;
  htmlContent: string;
}

const AGENT_CATEGORIES: Record<string, string> = {
  "react-expert": "frontend",
  "typescript-expert": "frontend",
  "graphic-designer": "creative",
  "motion-designer": "creative",
  "accessibility-expert": "frontend",
  "code-explainer": "quality",
  "deep-code-reviewer": "quality",
  "python-expert": "backend",
  "devops-specialist": "infrastructure",
  "devops-engineer": "infrastructure",
  "database-architect": "backend",
  "database-expert": "backend",
  "api-designer": "backend",
  "graphql-architect": "backend",
  "performance-optimizer": "quality",
  "ios-developer": "mobile",
  "android-developer": "mobile",
  "macos-developer": "mobile",
  "desktop-developer": "mobile",
  "mobile-architect": "mobile",
  "test-generator": "quality",
  "debugging-specialist": "quality",
  "refactoring-specialist": "quality",
  "security-auditor": "quality",
  "game-developer": "creative",
  "video-producer": "creative",
  "audio-engineer": "creative",
  "startup-advisor": "business",
  "monetization-expert": "business",
  "brand-strategist": "business",
  "architecture-analyst": "backend",
  "realtime-specialist": "backend",
  "documentation-writer": "quality",
  "i18n-specialist": "backend",
  "ml-engineer": "infrastructure",
  "cloud-architect": "infrastructure",
  "microservices-architect": "backend",
  "next-js-expert": "frontend",
  "flutter-developer": "mobile",
  "mobile-release-manager": "mobile",
  "data-engineer": "infrastructure",
  "e2e-test-specialist": "quality",
  "go-expert": "backend",
  "rust-expert": "backend",
  "auth-specialist": "backend",
  "payment-billing-specialist": "backend",
  "email-specialist": "backend",
  "seo-specialist": "frontend",
  "product-analytics-specialist": "backend",
  "vue-nuxt-expert": "frontend",
  "svelte-expert": "frontend",
  "django-fastapi-expert": "backend",
  "kotlin-expert": "backend",
  "technical-writer": "quality",
  "product-manager": "business",
  "devsecops-engineer": "infrastructure",
  "observability-engineer": "infrastructure",
  "migration-specialist": "backend",
  "api-integration-specialist": "backend",
  "cli-developer": "backend",
  "pwa-specialist": "frontend",
};

function categorizeAgent(slug: string): string {
  return AGENT_CATEGORIES[slug] || "quality";
}

export function getAgents(): Agent[] {
  const agentsDir = path.resolve(process.cwd(), "..", "agents");

  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(agentsDir)
    .filter((f) => f.endsWith(".md") && f !== "README.md");
  const agents: Agent[] = [];

  for (const file of files) {
    const slug = file.replace(".md", "");
    const raw = fs.readFileSync(path.join(agentsDir, file), "utf-8");
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

    agents.push({
      slug,
      name:
        data.name ||
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      description,
      model: data.model || "sonnet",
      tools: data.tools || [],
      category: categorizeAgent(slug),
      content: content.slice(0, 5000),
      htmlContent: String(htmlResult),
    });
  }

  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

export function getAgentBySlug(slug: string): Agent | null {
  const agentsDir = path.resolve(process.cwd(), "..", "agents");
  const file = path.join(agentsDir, `${slug}.md`);

  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
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
    model: data.model || "sonnet",
    tools: data.tools || [],
    category: categorizeAgent(slug),
    content,
    htmlContent: String(htmlResult),
  };
}
