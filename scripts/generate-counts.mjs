#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const args = new Set(process.argv.slice(2));
const writeMode = args.has("--write");
const checkMode = args.has("--check") || !writeMode;
const syncConsumers = args.has("--sync-consumers") || process.argv.some((a) => a.startsWith("--travis-repo=") || a.startsWith("--portfolio-repo="));
const syncImages = args.has("--sync-images");
const changed = [];
const stale = [];

const excludeSkillDirs = new Set([
  "backups", "backup", "tests", "test", "examples", "example",
  "docs", "workspace", "lab", "archive", "archived", "deprecated",
  "draft", "drafts", "planned-skills", "planned", "templates",
  "template", "node_modules", "web-app", "public",
]);

function argValue(prefix) {
  const item = process.argv.find((a) => a.startsWith(`${prefix}=`));
  return item ? item.slice(prefix.length + 1) : "";
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function writeText(file, content) {
  const current = readText(file);
  if (current === content) return;
  if (checkMode) stale.push(path.relative(repoRoot, file));
  if (writeMode) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content, "utf8");
    changed.push(path.relative(repoRoot, file));
  }
}

function countFiles(dir, predicate) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isFile() && predicate(entry.name)).length;
}

function countEntries(dir, predicate) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).filter(predicate).length;
}

function countSkillFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith(".") && !excludeSkillDirs.has(entry.name.toLowerCase())) {
      count += countSkillFiles(path.join(dir, entry.name));
    } else if (entry.name === "SKILL.md") {
      count += 1;
    }
  }
  return count;
}

function marketplaceManifestPaths() {
  const gitmodules = readText(path.join(repoRoot, ".gitmodules"));
  return [...gitmodules.matchAll(/^\s*path\s*=\s*(plugins\/marketplaces\/[^\r\n]+)\s*$/gm)].map((match) => match[1].trim());
}

function displayName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function roundedDisplay(value) {
  const rounded = Math.floor(value / 100) * 100;
  return `${rounded.toLocaleString("en-US") }+`;
}

function collectMarketplace(paths) {
  const repos = [];
  let totalSkills = 0;
  for (const relPath of paths) {
    const name = path.basename(relPath);
    const skillCount = countSkillFiles(path.join(repoRoot, relPath));
    repos.push({ name, displayName: displayName(name), skillCount });
    totalSkills += skillCount;
  }
  repos.sort((a, b) => b.skillCount - a.skillCount || a.name.localeCompare(b.name));
  return { repos, totalSkills };
}

function countMcpServersFromDocs() {
  const docs = readText(path.join(repoRoot, "docs", "MCP-SERVERS.md"));
  const table = docs.match(/## Currently Installed Servers[\s\S]*?## Server Details/);
  if (!table) return 0;
  return table[0].split("\n").filter((line) => /^\|\s*[^|-][^|]*\|/.test(line) && !line.includes("---") && !line.includes("Server")).length;
}

function buildCounts() {
  const manifest = marketplaceManifestPaths();
  const marketplace = collectMarketplace(manifest);
  const gsdCommands = countFiles(path.join(repoRoot, "commands", "gsd"), (name) => name.endsWith(".md") && name !== "README.md");
  const routerCommands = countFiles(path.join(repoRoot, "commands", "router"), (name) => name.endsWith(".md") && name !== "README.md");
  const commands = countFiles(path.join(repoRoot, "commands"), (name) => name.endsWith(".md") && name !== "README.md");
  const hooks = countFiles(path.join(repoRoot, "hooks"), (name) => (name.endsWith(".sh") || name.endsWith(".js")) && name !== "run-hook.js");
  return {
    skills: countSkillFiles(path.join(repoRoot, "skills")),
    skillDirectories: countEntries(path.join(repoRoot, "skills"), (entry) => entry.isDirectory() && entry.name !== "_shared"),
    agents: countFiles(path.join(repoRoot, "agents"), (name) => name.endsWith(".md") && name !== "README.md"),
    repos: manifest.length,
    commands,
    gsdCommands,
    routerCommands,
    totalCommands: commands + gsdCommands + routerCommands,
    hooks,
    rules: countFiles(path.join(repoRoot, "rules"), (name) => name.endsWith(".md") && name !== "README.md"),
    templates: countEntries(path.join(repoRoot, "templates"), (entry) => entry.name !== "README.md"),
    checklists: countFiles(path.join(repoRoot, "docs", "reference", "checklists"), (name) => name.endsWith(".md") && name !== "README.md"),
    mcpServers: countMcpServersFromDocs(),
    marketplaceSkills: marketplace.totalSkills,
    marketplaceSkillsDisplay: roundedDisplay(marketplace.totalSkills),
    marketplaceRepos: marketplace.repos,
  };
}

function replaceCoreCounts(text, counts) {
  return text
    .replace(/Skills-[0-9]+-/g, `Skills-${counts.skills}-`)
    .replace(/Agents-[0-9]+-/g, `Agents-${counts.agents}-`)
    .replace(/Marketplace_Repos-[0-9]+-/g, `Marketplace_Repos-${counts.repos}-`)
    .replace(/Marketplace_Skills-[0-9,]+\+-/g, `Marketplace_Skills-${counts.marketplaceSkillsDisplay.replace(",", "")}-`)
    .replace(/Commands-[0-9]+-/g, `Commands-${counts.commands}-`)
    .replace(/Hooks-[0-9]+-/g, `Hooks-${counts.hooks}-`)
    .replace(/Templates-[0-9]+-/g, `Templates-${counts.templates}-`)
    .replace(/MCP_Servers-[0-9]+-/g, `MCP_Servers-${counts.mcpServers}-`)
    .replace(/[0-9]+ domain skills/g, `${counts.skills} domain skills`)
    .replace(/[0-9]+ local skills/g, `${counts.skills} local skills`)
    .replace(/[0-9]+ custom skills/g, `${counts.skills} custom skills`)
    .replace(/[0-9]+ specialized agents/g, `${counts.agents} specialized agents`)
    .replace(/[0-9]+ specialist agents/g, `${counts.agents} specialist agents`)
    .replace(/[0-9]+ slash commands/g, `${counts.commands} slash commands`)
    .replace(/[0-9]+ base \+ [0-9]+ GSD \+ [0-9]+ router = [0-9]+ total/g, `${counts.commands} base + ${counts.gsdCommands} GSD + ${counts.routerCommands} router = ${counts.totalCommands} total`)
    .replace(/[0-9]+ lifecycle hooks/g, `${counts.hooks} lifecycle hooks`)
    .replace(/[0-9]+ MCP server configs/g, `${counts.mcpServers} MCP server configs`)
    .replace(/[0-9]+ MCP Servers/g, `${counts.mcpServers} MCP Servers`)
    .replace(/[0-9]+ templates/g, `${counts.templates} templates`)
    .replace(/[0-9]+ checklists/g, `${counts.checklists} checklists`)
    .replace(/[0-9]+ rules/g, `${counts.rules} rules`)
    .replace(/\| \*\*\[Skills\]\(\.\/skills\/MASTER_INDEX\.md\)\*\* \| [0-9]+ \|/g, `| **[Skills](./skills/MASTER_INDEX.md)** | ${counts.skills} |`)
    .replace(/\| \*\*\[Marketplace Repos\]\(\.\/plugins\/marketplaces\/\)\*\* \| [0-9]+ \|/g, `| **[Marketplace Repos](./plugins/marketplaces/)** | ${counts.repos} |`)
    .replace(/\| \*\*\[Hooks\]\(\.\/hooks\/README\.md\)\*\* \| [0-9]+ \|/g, `| **[Hooks](./hooks/README.md)** | ${counts.hooks} |`)
    .replace(/[0-9]+ marketplace repos/g, `${counts.repos} marketplace repos`)
    .replace(/All [0-9]+ marketplace repos/g, `All ${counts.repos} marketplace repos`)
    .replace(/All [0-9]+ marketplaces/g, `All ${counts.repos} marketplaces`)
    .replace(/[0-9]+ community-maintained GitHub repositories/g, `${counts.repos} community-maintained GitHub repositories`)
    .replace(/[0-9]+ marketplace repositories/g, `${counts.repos} marketplace repositories`)
    .replace(/[0-9]+ marketplaces/g, `${counts.repos} marketplaces`)
    .replace(/[0-9]+ community marketplaces/g, `${counts.repos} community marketplaces`)
    .replace(/[0-9]+ community skill repositories/g, `${counts.repos} community skill repositories`)
    .replace(/[0-9]+ plugin marketplaces/g, `${counts.repos} plugin marketplaces`)
    .replace(/[0-9]+,[0-9]+\+ (additional |community |community-contributed |marketplace )?skills/g, `${counts.marketplaceSkillsDisplay} $1skills`)
    .replace(/[0-9]+,[0-9]+\+ more/g, `${counts.marketplaceSkillsDisplay} more`);
}

function updateJsonFiles(counts) {
  const publicCounts = { ...counts };
  delete publicCounts.marketplaceRepos;
  writeText(path.join(repoRoot, "counts.json"), `${JSON.stringify(publicCounts, null, 2)}\n`);
  writeText(path.join(repoRoot, "website", "src", "lib", "data", "marketplace-counts.json"), `${JSON.stringify({ repoCount: counts.repos, totalSkills: counts.marketplaceSkills, repos: counts.marketplaceRepos }, null, 2)}\n`);
}

function updatePluginJson(counts) {
  const file = path.join(repoRoot, "plugin.json");
  const data = JSON.parse(readText(file));
  data.description = replaceCoreCounts(data.description, counts);
  if (data.components?.skills) data.components.skills.count = counts.skills;
  if (data.components?.agents) data.components.agents.count = counts.agents;
  if (Array.isArray(data.keywords)) data.keywords = data.keywords;
  if (Array.isArray(data.features)) data.features = data.features.map((item) => replaceCoreCounts(item, counts));
  writeText(file, `${JSON.stringify(data, null, 2)}\n`);
}

function updateClaudeDocs(counts) {
  const files = [
    "README.md", "docs/SETUP-GUIDE.md", "docs/NEW-DEVICE-SETUP.md",
    "docs/MARKETPLACE-GUIDE.md", "docs/MAINTENANCE.md", "docs/FOLDER-STRUCTURE.md",
    "docs/ARCHITECTURE.md", "docs/README.md", "docs/FAQ.md", "docs/GLOSSARY.md",
    "docs/PLUGIN-MANAGEMENT.md", "docs/CLAUDE-CODE-RESOURCES.md", "docs/SKILLS.md",
    "docs/reference/tooling/external-repos.md", "scripts/README.md",
    "commands/README.md", "commands/bootstrap.md", "commands/health-check.md",
    "commands/list-skills.md", "commands/pull-repos.md", "commands/skill-finder.md",
    "CLAUDE.md",
  ];
  for (const rel of files) {
    const file = path.join(repoRoot, rel);
    if (fs.existsSync(file)) writeText(file, replaceCoreCounts(readText(file), counts));
  }
}

function updateTravisReadme(counts, repo) {
  if (!repo || !fs.existsSync(repo)) return;
  for (const name of ["README.md", "README2.md"]) {
    const file = path.join(repo, name);
    if (!fs.existsSync(file)) continue;
    let text = readText(file);
    text = text.replace(/> [0-9]+ custom skills\. [0-9]+ specialized agents\. [0-9,]+\+ marketplace skills\. Open source\./g, `> ${counts.skills} custom skills. ${counts.agents} specialized agents. ${counts.marketplaceSkillsDisplay} marketplace skills. Open source.`);
    text = text.replace(/\*\*[0-9]+ skills\*\* · \*\*[0-9]+ agents\*\* · \*\*[0-9]+ repos\*\* · \*\*[0-9,]+\+ marketplace skills\*\*/g, `**${counts.skills} skills** · **${counts.agents} agents** · **${counts.repos} repos** · **${counts.marketplaceSkillsDisplay} marketplace skills**`);
    text = text.replace(/[0-9]+ open-source marketplace integrations/g, `${counts.repos} open-source marketplace integrations`);
    text = text.replace(/\*\*100\+ custom skills\*\* · \*\*80\+ specialist agents\*\* · \*\*[0-9,]+\+ marketplace skills\*\* · \*\*30\+ commands\*\*/g, `**${counts.skills} custom skills** · **${counts.agents} specialist agents** · **${counts.marketplaceSkillsDisplay} marketplace skills** · **${counts.commands}+ commands**`);
    text = text.replace(/Next\.js_15/g, "Next.js_16");
    writeText(file, text);
  }
}

function updatePortfolioProject(counts, repo) {
  if (!repo || !fs.existsSync(repo)) return;
  const file = path.join(repo, "src", "lib", "data", "projects.ts");
  if (!fs.existsSync(file)) return;
  let text = readText(file);
  const start = text.indexOf('    id: "tjn-claude"');
  if (start === -1) return;
  const nextProject = text.indexOf("\n  {\n", start + 1);
  const end = nextProject === -1 ? text.length : nextProject;
  let block = text.slice(start, end);
  block = block.replace(
    /It includes [0-9]+ custom skills, [0-9]+ specialized agents, command workflows, hooks, routing guidance, and a large imported marketplace ecosystem currently documented as [0-9,]+\+ community skills(?: across [0-9]+ marketplace repo entries)?\./,
    `It includes ${counts.skills} custom skills, ${counts.agents} specialized agents, command workflows, hooks, routing guidance, and a large imported marketplace ecosystem currently documented as ${counts.marketplaceSkillsDisplay} community skills across ${counts.repos} marketplace repo entries.`,
  );
  block = block.replace(
    /\/\/ Source of truth: .*/,
    "// Source of truth: ~/.claude/scripts/generate-counts.mjs -> counts.json and marketplace-counts.json",
  );
  block = block.replace(
    /metrics: \[[\s\S]*?\n    \],/,
    `metrics: [
      { label: "Skills", value: "${counts.skills}" },
      { label: "Agents", value: "${counts.agents}" },
      { label: "Community", value: "${counts.marketplaceSkillsDisplay}" },
      { label: "Repos", value: "${counts.repos}" },
    ],`,
  );
  text = `${text.slice(0, start)}${block}${text.slice(end)}`;
  writeText(file, text);
}

const counts = buildCounts();
updateJsonFiles(counts);
updatePluginJson(counts);
updateClaudeDocs(counts);
if (syncConsumers) {
  updateTravisReadme(counts, argValue("--travis-repo") || process.env.CLAUDE_COUNT_TRAVIS_REPO || "");
  updatePortfolioProject(counts, argValue("--portfolio-repo") || process.env.CLAUDE_COUNT_PORTFOLIO_REPO || "");
}

if (syncImages) {
  const imageArgs = [path.join(scriptDir, "generate-showcase-images.mjs"), writeMode ? "--write" : "--check"];
  const portfolioRepo = argValue("--portfolio-repo") || process.env.CLAUDE_COUNT_PORTFOLIO_REPO || "";
  if (portfolioRepo) imageArgs.push(`--portfolio-repo=${portfolioRepo}`);
  const result = spawnSync(process.execPath, imageArgs, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

console.log(`Counts: ${counts.skills} skills, ${counts.agents} agents, ${counts.repos} marketplace repos, ${counts.marketplaceSkillsDisplay} marketplace skills`);
if (writeMode) console.log(changed.length ? `Updated ${changed.length} file(s):\n- ${changed.join("\n- ")}` : "No count changes needed.");
if (checkMode && stale.length) {
  console.error(`Stale generated count file(s):\n- ${stale.join("\n- ")}`);
  process.exit(1);
}
