#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { loadMediaRoutingPolicy } from "./media-routing.mjs";
import { spawnSync } from "node:child_process";
import { collectCore, collectMarketplaces, assertSnapshotFilesUnchanged, readManifest, assertCheckout, digest, git, realFile, definitionVersion } from "./count-inventory.mjs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { loadPublicOutputSafety } from "./public-output-safety.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
// Plan every output in memory; no mutation until ALL sources and destinations pass.
let options;
try { options = parseOptions(process.argv.slice(2)); }
catch (error) { console.error(`Counts not written: ${error.message}`); process.exit(1); }
const writeMode = options.has("--write");
const checkMode = !writeMode;
const syncImages = options.has("--sync-images");
const changed = [];
const stale = [];
const outputs = new Map();

function parseOptions(argv) {
  const flags = new Set(["--write", "--check", "--sync-consumers", "--sync-images"]);
  const values = new Set(["--as-of", "--travis-repo", "--portfolio-repo", "--renderer-path", "--image-output-dir", "--private-pattern-file"]);
  const parsed = new Map([["--denylist-url-file", new Map()], ["--denylist-json-file", []], ["--marketplace-snapshot-file", new Map()]]);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--marketplace-snapshot-file=")) {
      const match = /^--marketplace-snapshot-file=([\w.-]+)=(.+)$/.exec(argv[i]);
      const mappings = parsed.get("--marketplace-snapshot-file");
      if (!match || match[1].startsWith(".") || !path.isAbsolute(match[2]) || mappings.has(match[1])) {
        throw new Error("Use one --marketplace-snapshot-file=manifest-name=/absolute/existing/source-snapshot.json per reviewed manifest entry.");
      }
      mappings.set(match[1], match[2]);
      continue;
    }
    if (argv[i].startsWith("--denylist-url-file=")) {
      const match = /^--denylist-url-file=([1-9]\d*)=(.+)$/.exec(argv[i]);
      const index = match ? Number(match[1]) : NaN;
      const mappings = parsed.get("--denylist-url-file");
      if (!match || !Number.isSafeInteger(index) || index > 8 || !path.isAbsolute(match[2]) || mappings.has(index)) {
        throw new Error("Use one --denylist-url-file=position=/absolute/existing/file per configured privacy URL position (1 to 8).");
      }
      mappings.set(index, match[2]);
      continue;
    }
    if (argv[i].startsWith("--denylist-json-file=")) {
      const file = argv[i].slice("--denylist-json-file=".length);
      if (!path.isAbsolute(file)) throw new Error("Privacy JSON files require absolute existing paths.");
      parsed.get("--denylist-json-file").push(file);
      continue;
    }
    const [key, ...rest] = argv[i].split("=");
    if (!flags.has(key) && !values.has(key)) throw new Error("Unknown count option.");
    if (parsed.has(key)) throw new Error(`Duplicate count option: ${key}`);
    if (flags.has(key)) {
      if (rest.length) throw new Error(`Flag takes no value: ${key}`);
      parsed.set(key, true);
    } else {
      const value = rest.length ? rest.join("=") : argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`Missing value: ${key}`);
      parsed.set(key, value);
    }
  }
  if (parsed.has("--write") && parsed.has("--check")) throw new Error("--write and --check are mutually exclusive.");
  if (parsed.has("--sync-consumers") && !parsed.has("--travis-repo") && !parsed.has("--portfolio-repo")) {
    throw new Error("--sync-consumers requires an explicit --travis-repo and/or --portfolio-repo destination.");
  }
  if (parsed.has("--sync-images") && (!parsed.has("--write") || !parsed.has("--renderer-path") || !parsed.has("--image-output-dir"))) {
    throw new Error("--sync-images requires --write, --renderer-path and --image-output-dir (approved DESK work folder).");
  }
  if (!parsed.has("--sync-images") && (parsed.has("--renderer-path") || parsed.has("--image-output-dir"))) {
    throw new Error("Renderer options require --sync-images.");
  }
  return parsed;
}

function argValue(key) { return options.get(key) || ""; }

function measurementDate() {
  const value = argValue("--as-of") || new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) ||
      new Date(value).toISOString().slice(0, 10) !== value) throw new Error("--as-of must be a valid YYYY-MM-DD date.");
  return value;
}

function readText(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function writeText(file, content) {
  if (outputs.has(file)) throw new Error("Duplicate planned count destination.");
  const existed = fs.existsSync(file);
  const previous = existed ? fs.readFileSync(file) : Buffer.alloc(0);
  const stat = existed ? fs.lstatSync(file) : null;
  outputs.set(file, { content, bytes: Buffer.from(content, "utf8"), existed, previous, stat });
}

function countMcpServersFromDocs() {
  const docs = readText(path.join(repoRoot, "docs", "MCP-SERVERS.md"));
  const table = docs.match(/## Currently Installed Servers[\s\S]*?## Server Details/);
  if (!table) throw new Error("MCP documentation table missing; refusing a zero count.");
  return table[0].split("\n").filter((line) => /^\|\s*[^|-][^|]*\|/.test(line) && !line.includes("---") && !line.includes("Server")).length;
}

function buildCounts() {
  const core = collectCore(repoRoot);
  const manifest = readManifest(repoRoot);
  const asOf = measurementDate();
  const marketplace = collectMarketplaces(repoRoot, manifest, {
    snapshotFiles: options.get("--marketplace-snapshot-file"), measuredAsOf: asOf,
  });
  const { inventory } = core;
  const commands = inventory.commands.length;
  const routerCommands = inventory.routerCommands.length;
  return {
    schemaVersion: 2, definitionVersion, asOf,
    skills: inventory.skills.length,
    skillDirectories: new Set(inventory.skills.map((f) => f.split("/")[1])).size,
    agents: inventory.agents.length, repos: manifest.length,
    commands, routerCommands, totalCommands: commands + routerCommands,
    hooks: inventory.hooks.length, rules: inventory.rules.length,
    templates: new Set(inventory.templates.map((f) => f.split("/")[1])).size,
    checklists: inventory.checklists.length, mcpServers: countMcpServersFromDocs(),
    marketplaceSkills: marketplace.totalSkills,
    marketplaceSkillsDisplayValue: Math.floor(marketplace.totalSkills / 100) * 100,
    marketplaceSkillsDisplay: `${(Math.floor(marketplace.totalSkills / 100) * 100).toLocaleString("en-US")}+`,
    inventory,
    provenance: {
      generator: "scripts/generate-counts.mjs", core: core.provenance,
      marketplace: { inputMode: "committed-HEAD-snapshots", coverage: "complete", repoCount: manifest.length,
        freshness: "Selected committed revisions (including deliberate pins); reviewed exports retain their own observation dates, not a latest-upstream guarantee.",
        snapshotExports: marketplace.repos.filter((repo) => repo.transport).map(({ name, revision, tree, inputMode, inputDigest, measuredAsOf, transport, snapshotDigest }) =>
          ({ name, revision, tree, inputMode, inputDigest, measuredAsOf, transport, snapshotDigest })),
        normalization: "strip initial frontmatter, collapse whitespace, lowercase; nonempty SHA-256 bodies deduplicated within/across repos",
        inputDigest: marketplace.inputDigest },
    },
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
    .replace(/[0-9]+ specialized AI agents/g, `${counts.agents} specialized AI agents`)
    .replace(/[0-9]+ custom agents/g, `${counts.agents} custom agents`)
    .replace(/[0-9]+ specialized agents/g, `${counts.agents} specialized agents`)
    .replace(/[0-9]+ specialist agents/g, `${counts.agents} specialist agents`)
    .replace(/[0-9]+ slash commands/g, `${counts.commands} slash commands`)
    .replace(/[0-9]+ lifecycle hooks/g, `${counts.hooks} lifecycle hooks`)
    .replace(/[0-9]+ MCP server configs/g, `${counts.mcpServers} MCP server configs`)
    .replace(/[0-9]+ MCP Servers/g, `${counts.mcpServers} MCP Servers`)
    .replace(/[0-9]+ templates/g, `${counts.templates} templates`)
    .replace(/[0-9]+ checklists/g, `${counts.checklists} checklists`)
    .replace(/[0-9]+ rules/g, `${counts.rules} rules`)
    .replace(/\| \*\*\[Skills\]\(\.\/skills\/MASTER_INDEX\.md\)\*\* \| [0-9]+ \|/g, `| **[Skills](./skills/MASTER_INDEX.md)** | ${counts.skills} |`)
    .replace(/\| \*\*\[Marketplace Repos\]\(\.\/plugins\/marketplaces\/\)\*\* \| [0-9]+ \|/g, `| **[Marketplace Repos](./plugins/marketplaces/)** | ${counts.repos} |`)
    .replace(/\| \*\*\[Hooks\]\(\.\/hooks\/README\.md\)\*\* \| [0-9]+ \|/g, `| **[Hooks](./hooks/README.md)** | ${counts.hooks} |`)
    .replace(/\| \*\*\[Agents\]\(\.\/agents\/README\.md\)\*\* \| [0-9]+ \|/g, `| **[Agents](./agents/README.md)** | ${counts.agents} |`)
    .replace(/\| \*\*\[Commands\]\(\.\/docs\/COMMANDS\.md\)\*\* \| [0-9]+ \|/g, `| **[Commands](./docs/COMMANDS.md)** | ${counts.commands} |`)
    .replace(/\| \*\*\[Templates\]\(\.\/templates\/README\.md\)\*\* \| [0-9]+ \|/g, `| **[Templates](./templates/README.md)** | ${counts.templates} |`)
    .replace(/\| \*\*\[Rules\]\(\.\/rules\/\)\*\* \| [0-9]+ \|/g, `| **[Rules](./rules/)** | ${counts.rules} |`)
    .replace(/[0-9]+ marketplace repos/g, `${counts.repos} marketplace repos`)
    .replace(/All [0-9]+ marketplace repos/g, `All ${counts.repos} marketplace repos`)
    .replace(/All [0-9]+ marketplaces/g, `All ${counts.repos} marketplaces`)
    .replace(/[0-9]+ community-maintained GitHub repositories/g, `${counts.repos} community-maintained GitHub repositories`)
    .replace(/[0-9]+ marketplace repositories/g, `${counts.repos} marketplace repositories`)
    .replace(/[0-9]+ marketplace clones/g, `${counts.repos} manifest marketplace repositories`)
    .replace(/[0-9]+ manifest-managed marketplace clones/g, `${counts.repos} manifest entries; clones are local-only`)
    .replace(/[0-9]+ marketplaces/g, `${counts.repos} marketplaces`)
    .replace(/[0-9]+ community marketplaces/g, `${counts.repos} community marketplaces`)
    .replace(/[0-9]+ community skill repositories/g, `${counts.repos} community skill repositories`)
    .replace(/[0-9]+ community plugin marketplaces/g, `${counts.repos} community plugin marketplaces`)
    .replace(/[0-9]+ plugin marketplaces/g, `${counts.repos} plugin marketplaces`)
    .replace(/[0-9]+,[0-9]+\+ (additional |community |community-contributed |marketplace )?skills/g, `${counts.marketplaceSkillsDisplay} $1skills`)
    .replace(/[0-9]+,[0-9]+\+ more/g, `${counts.marketplaceSkillsDisplay} more`);
}

// Historical sections in every count document are evidence. Do not rewrite
// their baselines, even when a phrase also matches a current-count pattern.
function replaceCurrentMarkdown(text, replace) {
  let historyLevel = null;
  let fence = null;
  let current = "";
  let result = "";
  for (const line of text.match(/[^\n]*\n|[^\n]+$/g) || []) {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!fence) fence = { character: marker[0], length: marker.length };
      else if (marker[0] === fence.character && marker.length >= fence.length &&
               line.slice(fenceMatch[0].length).trim() === "") fence = null;
    } else if (!fence) {
      const heading = line.match(/^(#{1,6})\s+(.+)/);
      if (heading) {
        const level = heading[1].length;
        if (historyLevel !== null && level <= historyLevel) historyLevel = null;
        const title = heading[2];
        if (historyLevel === null && (
          /^(?:version\s+)?history\b/i.test(title) ||
          /\b(?:changelog|release notes|what['’]s new)\b/i.test(title) ||
          /\bv\d+(?:\.\d+)+\b/i.test(title) ||
          /\b20\d{2}-\d{2}-\d{2}\b/.test(title) ||
          /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\b/i.test(title)
        )) historyLevel = level;
      }
    }
    if (historyLevel !== null) {
      if (current) { result += replace(current); current = ""; }
      result += line;
    } else current += line;
  }
  return result + (current ? replace(current) : "");
}

// Map owned table labels to canonical fields, never to row positions. Keep
// unrelated cells and padding, and accept the qualified labels on later writes.
function replaceCountTableRows(text, rows) {
  for (const { labels, value, label = labels[0], location } of rows) {
    const names = labels.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const re = new RegExp(`^(\\|\\s*)(${names})(\\s*\\|\\s*)(?:[0-9,]+\\+?|\\*\\*(?:[0-9,]+\\+?|Not measured)\\*\\*)(\\s*\\|)([^\\n]*)$`, "gm");
    text = text.replace(re, (_, start, oldLabel, separator, end, tail) => {
      if (location !== undefined) tail = tail.replace(/^(\s*)[^|]*?(\s*\|)/, (_, left, right) => `${left}${location}${right}`);
      return `${start}${label}${separator}${value}${end}${tail}`;
    });
  }
  return text;
}

function replaceDirectoryCounts(text, counts) {
  return text
    .replace(/^(\s*│\s*└── \.\.\. \()[0-9]+ (?:marketplace clone manifest entries|manifest entries; clones are local-only); parent repo tracks no gitlinks\)/gm,
      `$1${counts.repos} manifest entries; clones are local-only; parent repo tracks no gitlinks)`)
    .replace(/(Subagent [Dd]efinitions \()[0-9]+( agents\))/g, `$1${counts.agents}$2`)
    .replace(/(Domain Knowledge \()[0-9]+ SKILL\.md files across [0-9]+ directories\)/g,
      `$1${counts.skills} SKILL.md files across ${counts.skillDirectories} directories)`)
    .replace(/(Custom slash commands \()[0-9]+ \+ [0-9]+ router\)/g,
      `$1${counts.commands} + ${counts.routerCommands} router)`)
    .replace(/(Custom Slash Commands \()[0-9]+ commands \+ [0-9]+ router files\)/g,
      `$1${counts.commands} commands + ${counts.routerCommands} router files)`)
    .replace(/(Custom skills \()[0-9]+ directories, [0-9]+ SKILL\.md files\)/g,
      `$1${counts.skillDirectories} directories, ${counts.skills} SKILL.md files)`)
    .replace(/(Contextual rules \()[0-9]+ (?:files across [0-9]+ dirs|public immediate files)\)/g,
      `$1${counts.rules} public immediate files)`)
    .replace(/(Templates \()[0-9]+ (?:files \+ plugin-template\/|represented top-level artifacts)\)/g,
      `$1${counts.templates} represented top-level artifacts)`)
    .replace(/(Event Hooks \()[0-9]+ scripts\)/g, `$1${counts.hooks} wired public files)`)
    .replace(/(Event Hooks \()[0-9]+ wired public files\)/g, `$1${counts.hooks} wired public files)`)
    .replace(/(Always-Load Rules \()[0-9]+ files\)/g, `$1${counts.rules} files)`)
    .replace(/(router\/\*\.md`[^\n]*Domain detection tables \()[0-9]+ files\)/g, `$1${counts.routerCommands} files)`)
    .replace(/^(\| `skills\/`\s*\|[^|]*\|\s*)[0-9]+ SKILL\.md files across [0-9]+ dirs(\s*\|)/gm,
      `$1${counts.skills} SKILL.md files across ${counts.skillDirectories} dirs$2`)
    .replace(/^(\| `commands\/`\s*\|[^|]*\|\s*)[0-9]+ commands \+ [0-9]+ router files(\s*\|)/gm,
      `$1${counts.commands} commands + ${counts.routerCommands} router files$2`)
    .replace(/^(\| `agents\/`\s*\|[^|]*\|\s*)[0-9]+ agent definitions(\s*\|)/gm, `$1${counts.agents} agent definitions$2`)
    .replace(/^(\| `rules\/`\s*\|[^|]*\|\s*)[0-9]+ (?:rule files across [0-9]+ subdirs|public immediate rule files)(\s*\|)/gm,
      `$1${counts.rules} public immediate rule files$2`)
    .replace(/^(\| `hooks\/`\s*\|[^|]*\|\s*)[0-9]+ (?:event hook scripts|wired public hook files)(\s*\|)/gm,
      `$1${counts.hooks} wired public hook files$2`)
    .replace(/^(\| `templates\/`\s*\|[^|]*\|\s*)[0-9]+ (?:templates \+ plugin-template\/|represented top-level artifacts)(\s*\|)/gm,
      `$1${counts.templates} represented top-level artifacts$2`);
}

function publicMarketplaceRow(repo) {
  return {
    name: repo.name, path: repo.path, githubUrl: repo.githubUrl,
    displayName: repo.displayName, skillCount: repo.skillCount,
    revision: repo.revision, tree: repo.tree, worktree: repo.worktree,
    inputMode: repo.inputMode, inputDigest: repo.inputDigest,
    measuredAsOf: repo.measuredAsOf, selectedFileCount: repo.files.length,
    ...(repo.transport === undefined ? {} : { transport: repo.transport, snapshotDigest: repo.snapshotDigest }),
  };
}
function updateJsonFiles(counts) {
  const publicCounts = { ...counts };
  delete publicCounts.marketplaceRepos;
  writeText(path.join(repoRoot, "counts.json"), `${JSON.stringify(publicCounts, null, 2)}\n`);
  writeText(path.join(repoRoot, "website", "src", "lib", "data", "marketplace-counts.json"), `${JSON.stringify({
    schemaVersion: counts.schemaVersion, definitionVersion, asOf: counts.asOf,
    repoCount: counts.repos, totalSkills: counts.marketplaceSkills,
    marketplaceSkillsDisplay: counts.marketplaceSkillsDisplay,
    provenance: counts.provenance.marketplace, repos: counts.marketplaceRepos.map(publicMarketplaceRow),
  }, null, 2)}\n`);
}

function updatePluginJson(counts) {
  const file = path.join(repoRoot, "plugin.json");
  const data = JSON.parse(readText(file));
  data.description = replaceCoreCounts(data.description, counts);
  if (data.components?.skills) data.components.skills.count = counts.skills;
  if (data.components?.agents) data.components.agents.count = counts.agents;
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
    "docs/COMMANDS.md", "commands/bootstrap.md", "commands/health-check.md",
    "commands/list-skills.md", "commands/pull-repos.md", "commands/skill-finder.md",
    "CLAUDE.md", "skills/README.md",
  ];
  for (const rel of files) {
    const file = path.join(repoRoot, rel);
    if (!fs.existsSync(file)) throw new Error(`Required count document missing: ${rel}`);
    let text = readText(file);
    if (rel === "README.md") {
      const start = text.indexOf("## 🆕 What's New");
      const end = text.indexOf("## 📚 Documentation", start);
      if (start < 0 || end < 0) throw new Error("README historical section boundary missing.");
    }
    text = replaceCurrentMarkdown(text, (text) => {
    if (rel === "skills/README.md") {
      text = replaceCoreCounts(text, counts)
        .replace(/Claude Code - [0-9]+ skills covering/, `Claude Code - ${counts.skills} skills covering`)
        .replace(/\([0-9]+ Skills, [0-9]+ Marketplace Repos\)/, `(${counts.skills} Skills, ${counts.repos} Marketplace Repos)`)
        .replace(/\*\*Local: [0-9]+ unique skills/, `**Local: ${counts.skills} public skills`)
        .replace(/\*\*Local: [0-9]+ public skills/, `**Local: ${counts.skills} public skills`)
        .replace(/\| Marketplace\s*\| [0-9,]+\+\s*\| From [0-9]+ plugin repositories\s*\|/, `| Marketplace | ${counts.marketplaceSkillsDisplay} | From ${counts.repos} manifest repositories |`)
        .replace(/\| Marketplace\s*\| [0-9,]+\+\s*\| From [0-9]+ manifest repositories\s*\|/, `| Marketplace | ${counts.marketplaceSkillsDisplay} | From ${counts.repos} manifest repositories |`);
    } else if (rel === "docs/MARKETPLACE-GUIDE.md") {
      // Upstream collection examples and external discovery service totals are
      // different populations. Only this guide's owned aggregate claims change.
      text = text
        .replace(/^description: Browse, install, and manage [0-9]+ community plugin marketplaces with [0-9,]+\+ additional skills\.$/m,
          `description: Browse, install, and manage ${counts.repos} community plugin marketplaces with ${counts.marketplaceSkillsDisplay} additional skills.`)
        .replace(/Complete reference for the [0-9]+ plugin marketplaces/, `Complete reference for the ${counts.repos} plugin marketplaces`)
        .replace(/## (?:Installed|Manifest) Marketplaces \([0-9]+\)/, `## Manifest Marketplaces (${counts.repos})`)
        .replace(/_[0-9]+ marketplaces, [0-9,]+\+ skills, discovered proactively/, `_${counts.repos} marketplaces, ${counts.marketplaceSkillsDisplay} skills, discovered proactively`);
    } else {
      text = replaceCoreCounts(text, counts);
      if (rel === "docs/README.md") {
        text = replaceCountTableRows(text, [
          { labels: ["Local skills"], value: counts.skills },
          { labels: ["Agents"], value: counts.agents },
          { labels: ["Commands"], value: counts.commands },
          { labels: ["Rules files"], value: counts.rules },
          { labels: ["Templates"], value: counts.templates },
          { labels: ["Hooks"], value: counts.hooks },
          { labels: ["MCP servers", "Installed MCP entries (documented)"], label: "Installed MCP entries (documented)", value: counts.mcpServers, location: "`docs/MCP-SERVERS.md` (installed section; not optional configurations)" },
          { labels: ["Marketplace repos"], value: counts.repos, location: "`.gitmodules` manifest entries (not installed clones)" },
          { labels: ["Marketplace skills"], value: counts.marketplaceSkillsDisplay, location: "nonempty normalized unique manifest skill bodies; display floored to 100" },
          { labels: ["**Total git repos**"], value: "**Not measured**", location: "Host/device clone and configured-project totals are not measured; parent + manifest entries is a different population" },
        ]);
      }
      if (rel === "docs/FOLDER-STRUCTURE.md") text = replaceDirectoryCounts(text, counts);
      if (rel === "docs/SETUP-GUIDE.md") {
        text = text
          .replace(/^(\+-- skills\/\s*<- )[0-9]+ skills$/gm, `$1${counts.skills} skills`)
          .replace(/^(\+-- agents\/\s*<- )[0-9]+ agents$/gm, `$1${counts.agents} agents`);
      }
      if (rel === "docs/CLAUDE-CODE-RESOURCES.md") {
        text = text
          .replace(/full catalog of [0-9]+ agents/, `full catalog of ${counts.agents} public agents`)
          .replace(/full catalog of [0-9]+ public agents/, `full catalog of ${counts.agents} public agents`)
          .replace(/[0-9]+ custom commands available via/, `${counts.commands} base commands available via`)
          .replace(/[0-9]+ base commands available via/, `${counts.commands} base commands available via`);
        for (const [label, value] of [
          ["Local skills", counts.skills], ["Custom agents", counts.agents],
          ["Marketplace repos", counts.repos], ["Marketplace skills", counts.marketplaceSkillsDisplay],
          ["Custom commands", counts.commands],
        ]) {
          const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const re = new RegExp(`(\\| ${escaped} +\\| )[0-9,]+\\+?( +\\|)`, "g");
          if ([...text.matchAll(re)].length !== 1) throw new Error(`Resource overview requires one owned ${label} row.`);
          text = text.replace(re, (_, start, end) => `${start}${value}${end}`);
        }
        text = replaceCountTableRows(text, [
          { labels: ["MCP servers (configured)", "Installed MCP entries (documented)"], label: "Installed MCP entries (documented)", value: counts.mcpServers },
        ]).replace(/`MCP servers \(configured\)` reflects/, "`Installed MCP entries (documented)` reflects");
      }
    }
    return text;
    });
    writeText(file, text);
  }
}

function updateSocialPreview(counts) {
  const file = path.join(repoRoot, ".github", "social-preview.html");
  let text = fs.readFileSync(file, "utf8");
  for (const key of ["skills", "agents", "commands", "repos", "marketplaceSkillsDisplay"]) {
    const re = new RegExp(`(<div class="stat-number [^"]+" data-count="${key}">)[0-9,]+\\+?(</div>)`, "g");
    if ([...text.matchAll(re)].length !== 1) throw new Error(`Social preview source requires one owned ${key} count slot.`);
    text = text.replace(re, (_, start, end) => `${start}${counts[key]}${end}`);
  }
  const dateSlot = /<!-- claude-counts:as-of [^>]+ -->/g;
  if ([...text.matchAll(dateSlot)].length !== 1) throw new Error("Social preview source date slot missing or duplicated.");
  text = text.replace(dateSlot, `<!-- claude-counts:as-of ${counts.asOf}; committed marketplace snapshots, not latest-upstream -->`);
  writeText(file, text); // Source HTML only; no rendering or image delivery.
}

function consumerRepo(value) {
  const repo = path.resolve(value);
  assertCheckout(repo);
  if (fs.realpathSync(repo) === fs.realpathSync(repoRoot)) throw new Error("Consumer must be a separate existing checkout.");
  return repo;
}
function updateTravisReadme(counts, repo) {
  const file = path.join(repo, "README.md");
  const text = fs.readFileSync(file, "utf8");
  const startMarker = "<!-- claude-counts:start -->";
  const endMarker = "<!-- claude-counts:end -->";
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start < 0 || end < start || text.indexOf(startMarker, start + 1) !== -1 || text.indexOf(endMarker, end + 1) !== -1) {
    throw new Error("Profile README requires exactly one ordered claude-counts marker pair.");
  }
  const offset = start + startMarker.length;
  let region = text.slice(offset, end);
  for (const [phrase, value] of [
    ["custom skills", counts.skills], ["specialist agents", counts.agents],
    ["commands", counts.commands], ["marketplace skills", counts.marketplaceSkillsDisplay],
  ]) {
    const re = new RegExp(`\\b[0-9][0-9,]*\\+?(?= ${phrase}\\b)`, "g");
    if ([...region.matchAll(re)].length !== 1) throw new Error(`Profile count region must contain exactly one numeric ${phrase} phrase.`);
    region = region.replace(re, String(value));
  }
  region = region.replace(/\b[0-9]+(?= marketplace repos\b)/g, String(counts.repos));
  writeText(file, text.slice(0, offset) + region + text.slice(end));

  const metricSchema = JSON.parse(fs.readFileSync(path.join(repo, "showcase", "schema", "showcase-v1.json"), "utf8"))
    .properties?.metrics?.items;
  if (!metricSchema?.properties?.key || !metricSchema.properties.round?.enum?.includes("floor-100")) {
    throw new Error("Profile metric schema must permit optional key and truthful floor-100 rounding before count publication.");
  }
  const factsFile = path.join(repo, "showcase", "local", "tjn-claude.json");
  const facts = JSON.parse(fs.readFileSync(factsFile, "utf8"));
  if (facts.id !== "tjn-claude" || facts.visibility !== "public" || !Array.isArray(facts.metrics)) {
    throw new Error("Profile Claude showcase facts have an invalid identity or metric list.");
  }
  const specs = [
    { key: "skills", label: "Skills", value: String(counts.skills), round: "exact", population: "public real toolkit SKILL.md files" },
    { key: "agents", label: "Agents", value: String(counts.agents), round: "exact", population: "public real toolkit agents" },
    { key: "community", label: "Community skills", value: counts.marketplaceSkillsDisplay, round: "floor-100", population: "nonempty normalized unique manifest skill bodies from committed HEAD snapshots; display floored to 100" },
    { key: "repos", label: "Repos", value: String(counts.repos), round: "exact", population: "reviewed manifest repository entries" },
  ];
  const previousMetrics = facts.metrics;
  // Reviewed legacy labels only; never infer ownership from array positions.
  const labels = new Map([["skills", "skills"], ["agents", "agents"],
    ["community", "community"], ["community skills", "community"], ["repos", "repos"]]);
  const knownKeys = new Set(specs.map((s) => s.key));
  const selected = new Map();
  const keys = new Set();
  const ownership = new Map();
  for (const metric of previousMetrics) {
    if (!metric || typeof metric.label !== "string" || (metric.key !== undefined && (typeof metric.key !== "string" || !metric.key))) {
      throw new Error("Invalid showcase metric identity.");
    }
    if (metric.key && keys.has(metric.key)) throw new Error("Duplicate showcase metric key.");
    if (metric.key) keys.add(metric.key);
    const legacyKey = labels.get(metric.label.toLowerCase());
    if (metric.key && legacyKey && metric.key !== legacyKey) throw new Error("Ambiguous showcase metric key/label authority.");
    const key = metric.key ? (knownKeys.has(metric.key) ? metric.key : undefined) : legacyKey;
    ownership.set(metric, key);
    if (!key) continue;
    if (selected.has(key)) throw new Error("Duplicate showcase metric authority.");
    selected.set(key, metric);
  }
  const snapshotEvidence = counts.provenance.marketplace.snapshotExports.map(({ name, measuredAsOf, transport, snapshotDigest }) =>
    `${name}: ${transport}, observed ${measuredAsOf}, export SHA-256 ${snapshotDigest}`).join("; ");
  facts.metrics = specs.map((spec) => {
    const previous = selected.get(spec.key);
    return { ...(previous || {}), key: spec.key, label: spec.label,
      value: spec.value, round: spec.round, asOf: counts.asOf,
      source: `travisjneuman/.claude counts.json; ${spec.population}; public-working-source (${counts.provenance.core.worktree}), core revision ${counts.provenance.core.revision}, input SHA-256 ${counts.provenance.core.inputDigest}; marketplace input SHA-256 ${counts.provenance.marketplace.inputDigest}; ${snapshotEvidence ? `${snapshotEvidence}; ` : ""}selected revisions, not latest-upstream` };
  });
  // Keep unrelated metrics/copy intact rather than silently deleting public knowledge.
  facts.metrics.push(...previousMetrics.filter((m) => !ownership.get(m)));
  facts.updated = counts.asOf;
  writeText(factsFile, `${JSON.stringify(facts, null, 2)}\n`);
}
function updatePortfolioProject(counts, repo) {
  const { marketplaceRepos, inventory, provenance, ...publicCounts } = counts;
  const { files, ...core } = provenance.core;
  // A small data import, never a brittle projects.ts prose/metric rewrite.
  // Public provenance commits to complete collection without duplicating upstream
  // per-file records in consumers. Full records remain in the collector/input exports.
  writeText(path.join(repo, "src", "lib", "data", "claude-counts.generated.json"), `${JSON.stringify({
    ...publicCounts, provenance: { ...provenance, core },
  }, null, 2)}\n`);
}
function preflight() {
  const safetyGate = loadPublicOutputSafety(repoRoot, {
    urlFiles: options.get("--denylist-url-file"), jsonFiles: options.get("--denylist-json-file"),
    patternFile: argValue("--private-pattern-file") || undefined,
  });
  // Scan complete final output strings, including unchanged prose, settings-derived
  // wiring and provenance. Every destination joins the SAME gate before staging.
  for (const [file, item] of outputs) {
    try { safetyGate(item.content, { ownToolkitOutput: file.startsWith(`${repoRoot}${path.sep}`) }); }
    catch (error) {
      // These destinations are fixed public output names, never private input paths.
      const role = file.startsWith(`${repoRoot}${path.sep}`) ? "toolkit" : path.basename(file) === "README.md" ? "profile" : "portfolio";
      throw new Error(`${error.message} Public output: ${role}/${path.basename(file)}.`);
    }
    let ancestor = file;
    while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
    if (writeMode) fs.accessSync(ancestor, fs.constants.W_OK);
    if (item.existed && !fs.lstatSync(file).isFile()) throw new Error("Count destination is not a regular file.");
    // Never overwrite via a symlink, even when the target is writable.
    for (let cursor = file; cursor !== path.dirname(cursor); cursor = path.dirname(cursor)) {
      try { if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error("Linked count destination rejected."); }
      catch (error) { if (error.code !== "ENOENT") throw error; }
    }
    if (!item.existed && !fs.statSync(ancestor).isDirectory()) throw new Error("Count destination parent is not a directory.");
  }
  if (syncImages) {
    const policy = loadMediaRoutingPolicy();
    const renderer = path.resolve(argValue("--renderer-path"));
    const output = path.resolve(argValue("--image-output-dir"));
    if (!renderer.endsWith(".mjs") || !fs.statSync(renderer).isFile()) throw new Error("Renderer must be an explicit existing .mjs file.");
    if (path.dirname(output).toLowerCase() !== policy.jobsRoot.toLowerCase() ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*-\d{4}-\d{2}-\d{2}$/i.test(path.basename(output)) || !fs.statSync(output).isDirectory() ||
        !process.env.TJN_MEDIA_WORK || path.resolve(process.env.TJN_MEDIA_WORK).toLowerCase() !== output.toLowerCase()) {
      throw new Error("Image output must be the existing dated Jobs work folder supplied by desk-run via TJN_MEDIA_WORK.");
    }
    for (let cursor = output; cursor !== path.dirname(cursor); cursor = path.dirname(cursor)) {
      if (fs.lstatSync(cursor).isSymbolicLink() || fs.existsSync(path.join(cursor, ".git"))) {
        throw new Error("Media output must be a real non-repository work folder, not a linked/repository destination.");
      }
    }
    fs.accessSync(output, fs.constants.W_OK);
  }
}
function destinationState(file) {
  // Recheck the entire path, not just content; a replaced link is never writable.
  for (let cursor = file; cursor !== path.dirname(cursor); cursor = path.dirname(cursor)) {
    try { if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error("Linked count destination rejected."); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
  }
  try {
    const stat = fs.lstatSync(file);
    if (!stat.isFile()) throw new Error("Count destination is not a regular file.");
    return { stat, bytes: fs.readFileSync(file) };
  } catch (error) { if (error.code === "ENOENT") return null; throw error; }
}
function sameState(state, stat, bytes) {
  return state && state.stat.dev === stat.dev && state.stat.ino === stat.ino &&
    state.stat.mode === stat.mode && state.stat.mtimeMs === stat.mtimeMs &&
    state.stat.ctimeMs === stat.ctimeMs && state.bytes.equals(bytes);
}
function unchanged(file, item) {
  const state = destinationState(file);
  return item.existed ? sameState(state, item.stat, item.previous) : state === null;
}
function applyOutputs() {
  for (const [file, item] of outputs) {
    if (!unchanged(file, item)) throw new Error("Count destination changed during planning; nothing written.");
  }
  const stages = [];
  const applied = [];
  const directories = [];
  let failure;
  let rollbackIncomplete = false;
  let cleanupIncomplete = false;
  try {
    // Prepare ALL bytes and byte-exact rollback copies before any promotion.
    for (const [file, item] of outputs) {
      if (item.previous.equals(item.bytes)) continue;
      let dir = path.dirname(file);
      const missing = [];
      while (!fs.existsSync(dir)) { missing.push(dir); dir = path.dirname(dir); }
      for (const next of missing.reverse()) { fs.mkdirSync(next); directories.push(next); }
      if (!unchanged(file, item)) throw new Error("Count destination changed during staging.");
      const stageDir = path.join(path.dirname(file), `.claude-counts-stage-${randomUUID()}`);
      fs.mkdirSync(stageDir, { mode: 0o700 });
      const stage = { dir: stageDir, file, item };
      stages.push(stage);
      // Self-ignore even in explicit cross-repo consumers: crash remnants must
      // never be picked up by git add -A. Write this BEFORE staging any content.
      fs.writeFileSync(path.join(stageDir, ".gitignore"), "*\n", { flag: "wx", mode: 0o600 });
      stage.next = path.join(stageDir, "next");
      fs.writeFileSync(stage.next, item.bytes, { flag: "wx", mode: item.stat ? item.stat.mode & 0o777 : 0o644 });
      if (item.stat) fs.chmodSync(stage.next, item.stat.mode & 0o777);
      if (item.existed) {
        stage.backup = path.join(stageDir, "previous");
        fs.writeFileSync(stage.backup, item.previous, { flag: "wx", mode: item.stat.mode & 0o777 });
        fs.chmodSync(stage.backup, item.stat.mode & 0o777);
      }
      stage.nextStat = fs.lstatSync(stage.next);
    }
    for (const [file, item] of outputs) if (!unchanged(file, item)) throw new Error("Count destination changed during staging.");
    for (const stage of stages) {
      const { file, item } = stage;
      if (!unchanged(file, item)) throw new Error("Count destination changed before promotion.");
      if (item.existed) fs.renameSync(stage.next, file);
      else fs.linkSync(stage.next, file); // exclusive create: never replace a newly arrived file
      // Register ownership before any further fallible operation.
      applied.push(stage);
      stage.promotedStat = fs.lstatSync(file);
      if (stage.promotedStat.dev !== stage.nextStat.dev || stage.promotedStat.ino !== stage.nextStat.ino ||
          stage.promotedStat.mode !== stage.nextStat.mode || stage.promotedStat.mtimeMs !== stage.nextStat.mtimeMs) {
        throw new Error("Count destination replaced during promotion.");
      }
      changed.push(path.relative(repoRoot, file));
    }
    if (syncImages) {
      // Explicit DESK renderer only; no implicit consumer delivery.
      const result = spawnSync(process.execPath, [path.resolve(argValue("--renderer-path")), "--write",
        `--counts-file=${path.join(repoRoot, "counts.json")}`, `--output-dir=${path.resolve(argValue("--image-output-dir"))}`], { stdio: "inherit" });
      if (result.error || result.status !== 0) throw new Error("Explicit count renderer failed.");
    }
    for (const [file, item] of outputs) {
      const stage = applied.find((s) => s.file === file);
      if (stage ? !sameState(destinationState(file), stage.promotedStat, item.bytes) : !unchanged(file, item)) {
        throw new Error("Count destination changed after promotion.");
      }
    }
  } catch (error) {
    failure = error;
    for (const stage of applied.reverse()) {
      try {
        // NEVER restore over somebody else's edit, even if its bytes happen to
        // equal ours. Changed inode/timestamps/mode also lose rollback ownership.
        if (!stage.promotedStat || !sameState(destinationState(stage.file), stage.promotedStat, stage.item.bytes)) {
          rollbackIncomplete = true;
          continue;
        }
        if (stage.item.existed) fs.renameSync(stage.backup, stage.file);
        else fs.unlinkSync(stage.file);
      } catch { rollbackIncomplete = true; }
    }
  } finally {
    for (const stage of stages.reverse()) {
      // Keep all self-ignored rollback evidence for manual recovery if ownership
      // was lost. Do not destroy previous bytes after an incomplete rollback.
      if (rollbackIncomplete) continue;
      try {
        for (const name of ["next", "previous", ".gitignore"]) {
          const file = path.join(stage.dir, name);
          if (fs.existsSync(file)) fs.unlinkSync(file);
        }
        fs.rmdirSync(stage.dir); // never recurse into unexpected contents
      } catch { cleanupIncomplete = true; }
    }
    if (failure && !rollbackIncomplete) for (const dir of directories.reverse()) {
      try { fs.rmdirSync(dir); } catch { cleanupIncomplete = true; }
    }
  }
  if (failure || cleanupIncomplete) {
    throw new Error(rollbackIncomplete ? "Count publication failed; concurrent work preserved and rollback incomplete. Original byte copies retained in ignored staging directories; inspect before publishing." :
      failure ? "Count publication failed; owned promotions rolled back. Inspect ignored staging remnants if present." :
      "Count outputs promoted but staging cleanup incomplete; inspect ignored remnants before publishing.");
  }
}
try {
  const counts = buildCounts();
  // Some owned count phrases live in command sources. Keep the measured bytes
  // for race detection, but publish evidence for their planned final bytes.
  const measuredFiles = counts.provenance.core.files.map((file) => ({ ...file }));
  updatePluginJson(counts);
  updateClaudeDocs(counts);
  updateSocialPreview(counts);
  for (const file of counts.provenance.core.files) {
    const planned = outputs.get(path.join(repoRoot, file.path));
    if (!planned) continue;
    const finalHash = digest(planned.content);
    if (finalHash !== file.sha256) counts.provenance.core.worktree = "modified";
    file.sha256 = finalHash;
  }
  counts.provenance.core.inputDigest = digest(JSON.stringify(counts.provenance.core.files));
  updateJsonFiles(counts);
  if (argValue("--travis-repo")) updateTravisReadme(counts, consumerRepo(argValue("--travis-repo")));
  if (argValue("--portfolio-repo")) updatePortfolioProject(counts, consumerRepo(argValue("--portfolio-repo")));
  preflight();
  for (const { path: file, sha256 } of measuredFiles) {
    if (!realFile(repoRoot, file) || digest(fs.readFileSync(path.join(repoRoot, file))) !== sha256) throw new Error("Public source changed during measurement; nothing written.");
  }
  if (git(repoRoot, ["rev-parse", "HEAD"]).trim() !== counts.provenance.core.revision) throw new Error("Toolkit HEAD changed during planning; nothing written.");
  assertSnapshotFilesUnchanged(options.get("--marketplace-snapshot-file"), counts.marketplaceRepos);
  for (const repo of counts.marketplaceRepos) {
    if (options.get("--marketplace-snapshot-file").has(repo.name)) continue;
    if (git(path.join(repoRoot, repo.path), ["rev-parse", "HEAD"]).trim() !== repo.revision) throw new Error("Marketplace HEAD changed during planning; nothing written.");
  }
  if (writeMode) applyOutputs();
  else for (const [file, item] of outputs) if (!item.previous.equals(item.bytes)) stale.push(path.relative(repoRoot, file));
  console.log(`Counts (${counts.asOf}, complete committed marketplace snapshots): ${counts.skills} skills, ${counts.agents} agents, ${counts.repos} marketplace repos, ${counts.marketplaceSkillsDisplay} marketplace skills`);
  if (writeMode) console.log(changed.length ? `Updated ${changed.length} file(s):\n- ${changed.join("\n- ")}` : "No count changes needed.");
  if (checkMode && stale.length) {
    console.error(`Stale generated count file(s):\n- ${stale.join("\n- ")}`);
    process.exitCode = 1;
  }
} catch (error) {
  // Filesystem/JSON parse errors may echo private absolute paths or raw content.
  console.error(`Counts not published: ${error.code || error instanceof SyntaxError ? "unreadable input/destination or invalid JSON" : error.message}`);
  process.exitCode = 1;
}
