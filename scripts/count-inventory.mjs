// Public count inputs only. No network, writes, installed plugin caches, or private layer.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { TextDecoder } from "node:util";

export const definitionVersion = "public-toolkit-v2";
export const digest = (value) => createHash("sha256").update(value).digest("hex");
export const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const excluded = new Set([
  "backups", "backup", "tests", "test", "examples", "example", "docs",
  "workspace", "lab", "archive", "archived", "deprecated", "draft", "drafts",
  "planned-skills", "planned", "templates", "template", "synced", "node_modules",
  "web-app", "public", "local", "private", "_shared",
]);
// Core runtime/vendor trees are not the manifest's committed collection policy.
const coreRuntimeTrees = new Set(["vendor", "vendored", "vendor-skills", "imported", "installed", "plugin-cache"]);
export function publicSkillPath(file) {
  const parts = file.split("/");
  return parts.at(-1) === "SKILL.md" && parts.slice(0, -1).every((p) =>
    p && !p.startsWith(".") && !excluded.has(p.toLowerCase()));
}
export function normalizedBody(text) {
  return text.replace(/^\uFEFF/, "").replace(/^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, "")
    .replace(/\s+/g, " ").trim().toLowerCase();
}
export function git(root, args, options = {}) {
  // Keep stderr private: it can include credentials in remote URLs or local paths.
  const result = spawnSync("git", ["-C", root, ...args], {
    encoding: "utf8", maxBuffer: 512 * 1024 * 1024,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" }, ...options,
  });
  if (result.error || result.status !== 0) throw new Error(`Cannot read Git input (${args[0]}).`);
  return result.stdout;
}
export function assertCheckout(root) {
  if (!fs.existsSync(path.join(root, ".git")) ||
      fs.realpathSync(git(root, ["rev-parse", "--show-toplevel"]).trim()) !== fs.realpathSync(root)) {
    throw new Error("Expected an existing canonical Git checkout, not a parent repository or missing clone.");
  }
}
// Do not follow a linked directory OR a linked SKILL.md, including tracked links.
export function realFile(root, file) {
  let full = root;
  const parts = file.split("/");
  if (file.includes("\\") || parts.some((p) => !p || p === "." || p === "..")) return false;
  for (let i = 0; i < parts.length; i++) {
    full = path.join(full, parts[i]);
    let stat;
    try { stat = fs.lstatSync(full); } catch (error) {
      if (error.code === "ENOENT") return false;
      throw new Error("Unreadable candidate public input; refusing publication.");
    }
    if (stat.isSymbolicLink() || (i < parts.length - 1 ? !stat.isDirectory() : !stat.isFile())) return false;
  }
  return true;
}
function publicGithubUrl(url) {
  const match = url.match(/^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)([\w.-]+\/[\w.-]+?)(?:\.git)?\/?$/i);
  if (!match || match[1].split("/").some((part) => part === "." || part === "..")) {
    throw new Error("Marketplace identity must be a credential-free public GitHub repository URL.");
  }
  return `https://github.com/${match[1]}`;
}
export function readManifest(root) {
  const text = fs.readFileSync(path.join(root, ".gitmodules"), "utf8");
  const rows = [];
  for (const block of text.split(/(?=^\s*\[submodule )/m)) {
    if (!block.trim()) continue;
    const header = block.match(/^\s*\[submodule "([^"]+)"\]/);
    const paths = [...block.matchAll(/^\s*path\s*=\s*(\S+)\s*$/gm)];
    const urls = [...block.matchAll(/^\s*url\s*=\s*(\S+)\s*$/gm)];
    if (!header || paths.length !== 1 || urls.length !== 1 ||
        !/^plugins\/marketplaces\/[\w.-]+$/.test(paths[0][1]) || header[1] !== paths[0][1]) {
      throw new Error("Invalid marketplace manifest section/identity.");
    }
    const relPath = paths[0][1];
    if (path.posix.basename(relPath).startsWith(".")) throw new Error("Invalid public marketplace path.");
    if (rows.some((r) => r.path === relPath)) throw new Error(`Duplicate manifest path: ${relPath}`);
    rows.push({ name: path.posix.basename(relPath), path: relPath, githubUrl: publicGithubUrl(urls[0][1]) });
  }
  if (!rows.length) throw new Error("Empty marketplace manifest.");
  return rows.sort((a, b) => compare(a.name, b.name));
}
export function collectCore(root) {
  assertCheckout(root);
  // Gitignore AND real-file/directory exclusions define public toolkit files.
  // This is not an authorship claim or a body-deduplicated unique-skill count.
  // Vendor/synced/runtime symlinks never qualify; new public real files can.
  const ignoredTracked = new Set(git(root, ["ls-files", "--cached", "--ignored", "--exclude-standard", "-z"])
    .split("\0").filter(Boolean));
  const candidates = [...new Set(git(root, ["ls-files", "--cached", "--others", "--exclude-standard", "-z"])
    .split("\0").filter((file) => file && !ignoredTracked.has(file)))].sort(compare);
  const md = (dir) => candidates.filter((f) => f.startsWith(`${dir}/`) &&
    !f.slice(dir.length + 1).includes("/") && f.endsWith(".md") &&
    path.posix.basename(f) !== "README.md" && !path.posix.basename(f).startsWith(".") && realFile(root, f));
  const skills = candidates.filter((f) => f.startsWith("skills/") && publicSkillPath(f.slice(7)) &&
    !f.split("/").slice(1, -1).some((p) => coreRuntimeTrees.has(p.toLowerCase())) && realFile(root, f));
  const hookFiles = candidates.filter((f) => /^hooks\/[\w.-]+\.(sh|js|py)$/.test(f) &&
    f !== "hooks/run-hook.js" && realFile(root, f));
  const settings = JSON.parse(fs.readFileSync(path.join(root, "settings.json"), "utf8"));
  const wiring = new Map();
  const add = (event, matcher, entry) => {
    if (entry.type !== "command" || typeof entry.command !== "string") return;
    const name = entry.command.match(/\bHOOK_NAME\s*=\s*['"]([\w.-]+)['"]/)?.[1];
    if (!name || !hookFiles.includes(`hooks/${name}`)) return; // private hook or dispatcher
    const item = wiring.get(name) || { file: `hooks/${name}`, events: [], matchers: [] };
    if (!item.events.includes(event)) item.events.push(event);
    if (matcher && !item.matchers.includes(matcher)) item.matchers.push(matcher);
    wiring.set(name, item);
  };
  for (const [event, groups] of Object.entries(settings.hooks || {})) {
    if (!Array.isArray(groups)) throw new Error("Invalid hook event configuration; refusing publication.");
    for (const group of groups) for (const entry of group.hooks || []) add(event, group.matcher || "", entry);
  }
  // Retained existing public count convention: statusLine is a wired public hook.
  if (settings.statusLine) add("StatusLine", "", settings.statusLine);
  const inventory = {
    skills, agents: md("agents"), commands: md("commands"), routerCommands: md("commands/router"),
    hooks: [...wiring.values()].sort((a, b) => compare(a.file, b.file)),
    rules: md("rules"), checklists: md("docs/reference/checklists"),
    templates: candidates.filter((f) => f.startsWith("templates/") && path.posix.basename(f) !== "README.md" && realFile(root, f)),
  };
  // Only input hashes/identities and selected public wiring are planned. The
  // producer's complete-output privacy gate must approve any setting-derived
  // event/matcher before it can be published; never expose runtime filenames.
  const sourceFiles = [...new Set([
    ...skills, ...inventory.agents, ...inventory.commands, ...inventory.routerCommands,
    ...inventory.hooks.map((h) => h.file), ...inventory.rules, ...inventory.checklists, ...inventory.templates,
    ".gitmodules", "settings.json", "docs/MCP-SERVERS.md", "scripts/generate-counts.mjs", "scripts/count-inventory.mjs",
    "scripts/public-output-safety.mjs", "scripts/media-routing.mjs",
  ])].sort(compare);
  const files = sourceFiles.map((file) => ({ path: file, sha256: digest(fs.readFileSync(path.join(root, file))) }));
  const revision = git(root, ["rev-parse", "--verify", "HEAD^{commit}"]).trim();
  const modified = git(root, ["status", "--porcelain=v1", "--untracked-files=normal", "--", ...sourceFiles]).trim() !== "";
  return {
    inventory,
    provenance: { revision, inputMode: "public-working-source", worktree: modified ? "modified" : "clean", inputDigest: digest(JSON.stringify(files)), files },
  };
}
function readBlobs(root, entries) {
  if (!entries.length) return [];
  const output = git(root, ["cat-file", "--batch"], { encoding: null, input: entries.map((e) => e.blob).join("\n") + "\n" });
  const bodies = [];
  let offset = 0;
  for (const entry of entries) {
    const end = output.indexOf(10, offset);
    if (end < offset) throw new Error("Incomplete committed skill blob stream.");
    const header = output.subarray(offset, end).toString("utf8");
    const match = header.match(/^([a-f0-9]+) blob ([0-9]+)$/);
    if (!match || match[1] !== entry.blob) throw new Error("Invalid committed skill blob.");
    const size = Number(match[2]);
    offset = end + 1;
    if (!Number.isSafeInteger(size) || offset + size >= output.length || output[offset + size] !== 10) throw new Error("Unreadable committed skill blob.");
    let text;
    try { text = new TextDecoder("utf-8", { fatal: true }).decode(output.subarray(offset, offset + size)); }
    catch { throw new Error("Committed SKILL.md is not readable UTF-8 text."); }
    bodies.push(normalizedBody(text));
    offset += size + 1;
  }
  if (offset !== output.length) throw new Error("Unexpected committed skill blob data.");
  return bodies;
}
function snapshotDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
      !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
    throw new Error("Snapshot observation date must be a valid YYYY-MM-DD date.");
  }
  return value;
}
function exactKeys(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      Object.keys(value).sort(compare).join("\0") !== [...keys].sort(compare).join("\0")) {
    throw new Error("Unexpected committed snapshot fields.");
  }
}
function validateSnapshot(value, source) {
  exactKeys(value, ["definitionVersion", "measuredAsOf", "repo"]);
  if (value.definitionVersion !== definitionVersion) throw new Error("Unsupported snapshot definition version.");
  snapshotDate(value.measuredAsOf);
  const repo = value.repo;
  exactKeys(repo, ["name", "path", "githubUrl", "displayName", "skillCount", "revision", "tree", "worktree", "inputMode", "inputDigest", "files"]);
  if (repo.name !== source.name || repo.path !== source.path || repo.githubUrl !== source.githubUrl ||
      repo.displayName !== source.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
      repo.inputMode !== "committed-HEAD-snapshot" || !["clean", "modified"].includes(repo.worktree)) {
    throw new Error("Committed snapshot identity or source mode does not match manifest.");
  }
  const objectId = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/;
  const sha256 = /^[a-f0-9]{64}$/;
  if (typeof repo.revision !== "string" || !objectId.test(repo.revision) ||
      typeof repo.tree !== "string" || !objectId.test(repo.tree) || repo.tree.length !== repo.revision.length ||
      typeof repo.inputDigest !== "string" || !sha256.test(repo.inputDigest) || !Array.isArray(repo.files)) {
    throw new Error("Invalid committed snapshot Git identity or digest.");
  }
  let previous = null;
  const unique = new Set();
  const files = repo.files.map((file) => {
    exactKeys(file, ["path", "blob", "bodyHash"]);
    if (typeof file.path !== "string" || /[\\\x00-\x1f\x7f]/.test(file.path) || !publicSkillPath(file.path) ||
        (previous !== null && compare(previous, file.path) >= 0) ||
        typeof file.blob !== "string" || !objectId.test(file.blob) || file.blob.length !== repo.revision.length ||
        !(file.bodyHash === null || (typeof file.bodyHash === "string" && sha256.test(file.bodyHash)))) {
      throw new Error("Invalid or unsorted committed snapshot skill evidence.");
    }
    previous = file.path;
    if (file.bodyHash !== null) unique.add(file.bodyHash);
    return { path: file.path, blob: file.blob, bodyHash: file.bodyHash };
  });
  if (!Number.isSafeInteger(repo.skillCount) || repo.skillCount !== unique.size ||
      repo.inputDigest !== digest(JSON.stringify(files))) {
    throw new Error("Committed snapshot count or deterministic input digest disagrees with evidence.");
  }
  // Normalize fields; never relay arbitrary payload fields or host paths.
  return { ...source, displayName: repo.displayName, skillCount: unique.size,
    revision: repo.revision, tree: repo.tree, worktree: repo.worktree,
    inputMode: repo.inputMode, inputDigest: repo.inputDigest, files };
}
function snapshotBytes(file) {
  try {
    if (typeof file !== "string" || !path.isAbsolute(file)) throw new Error();
    const stat = fs.lstatSync(file);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 64 * 1024 * 1024) throw new Error();
    const bytes = fs.readFileSync(file);
    if (bytes.length > 64 * 1024 * 1024) throw new Error();
    return bytes;
  } catch { throw new Error("Committed snapshot file must be an existing readable regular file (at most 64 MiB)."); }
}
function importSnapshot(file, source, measuredAsOf) {
  const bytes = snapshotBytes(file);
  let value;
  try { value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); }
  catch { throw new Error("Invalid committed snapshot JSON/UTF-8."); }
  const repo = validateSnapshot(value, source);
  if (value.measuredAsOf > measuredAsOf) throw new Error("Snapshot observation date is later than publication measurement date.");
  return { ...repo, measuredAsOf: value.measuredAsOf,
    transport: "reviewed-committed-snapshot-export", snapshotDigest: digest(bytes) };
}
// Caller executes this trusted collector once on an existing canonical source,
// then transfers only its public JSON result. No shell commands from the input.
export function exportSnapshot(root, manifestEntry, asOf) {
  snapshotDate(asOf);
  assertCheckout(root);
  const registered = readManifest(root).find((entry) => entry.name === manifestEntry.name);
  if (!registered || registered.path !== manifestEntry.path || registered.githubUrl !== manifestEntry.githubUrl) {
    throw new Error("Snapshot export requires the exact registered manifest identity.");
  }
  const repo = collectMarketplaces(root, [registered]).repos[0];
  const value = { definitionVersion, measuredAsOf: asOf, repo };
  validateSnapshot(value, registered);
  return value;
}
export function assertSnapshotFilesUnchanged(snapshotFiles, repos) {
  for (const repo of repos) if (snapshotFiles.has(repo.name) &&
      digest(snapshotBytes(snapshotFiles.get(repo.name))) !== repo.snapshotDigest) {
    throw new Error("Committed snapshot export changed during planning; nothing written.");
  }
}
export function collectMarketplaces(root, manifest, { snapshotFiles = new Map(), measuredAsOf } = {}) {
  if (!(snapshotFiles instanceof Map) || [...snapshotFiles.keys()].some((name) => !manifest.some((entry) => entry.name === name))) {
    throw new Error("Snapshot overrides must name registered manifest entries.");
  }
  if (measuredAsOf !== undefined || snapshotFiles.size) snapshotDate(measuredAsOf);
  const all = new Set();
  const repos = [];
  for (const source of manifest) {
    try {
      if (snapshotFiles.has(source.name)) {
        const repo = importSnapshot(snapshotFiles.get(source.name), source, measuredAsOf);
        for (const file of repo.files) if (file.bodyHash !== null) all.add(file.bodyHash);
        repos.push(repo);
        continue;
      }
      const checkout = path.join(root, source.path);
      // Clone paths must not be symlinks, even when their target is a real checkout.
      let dir = root;
      for (const part of source.path.split("/")) {
        dir = path.join(dir, part);
        const stat = fs.lstatSync(dir);
        if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error("Invalid clone path.");
      }
      assertCheckout(checkout);
      const origin = publicGithubUrl(git(checkout, ["config", "--get", "remote.origin.url"]).trim());
      if (origin.toLowerCase() !== source.githubUrl.toLowerCase()) throw new Error("Clone origin does not match manifest identity.");
      const revision = git(checkout, ["rev-parse", "--verify", "HEAD^{commit}"]).trim();
      const tree = git(checkout, ["rev-parse", `${revision}^{tree}`]).trim();
      const worktree = git(checkout, ["status", "--porcelain=v1", "--untracked-files=normal"]).trim() ? "modified" : "clean";
      const entries = git(checkout, ["ls-tree", "-r", "-z", revision]).split("\0").filter(Boolean).flatMap((line) => {
        const match = line.match(/^(100644|100755) blob ([a-f0-9]+)\t([\s\S]+)$/);
        return match && publicSkillPath(match[3]) ? [{ path: match[3], blob: match[2] }] : [];
      }).sort((a, b) => compare(a.path, b.path));
      const bodies = readBlobs(checkout, entries);
      const unique = new Set();
      const files = entries.map((entry, i) => {
        const bodyHash = bodies[i] ? digest(bodies[i]) : null;
        if (bodyHash) { unique.add(bodyHash); all.add(bodyHash); }
        return { ...entry, bodyHash };
      });
      if (git(checkout, ["rev-parse", "HEAD"]).trim() !== revision) throw new Error("Checkout HEAD changed while reading.");
      repos.push({ ...source, displayName: source.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        skillCount: unique.size, revision, tree, worktree, inputMode: "committed-HEAD-snapshot",
        inputDigest: digest(JSON.stringify(files)), files,
        ...(measuredAsOf === undefined ? {} : { measuredAsOf }) });
    } catch (error) {
      // Public error identifies only the manifest entry; never expose raw Git stderr/private paths.
      throw new Error(`Marketplace ${source.name} rejected: ${error instanceof Error && !error.code ? error.message : "missing or unreadable clone"}`);
    }
  }
  repos.sort((a, b) => b.skillCount - a.skillCount || compare(a.name, b.name));
  return { totalSkills: all.size, repos, inputDigest: digest(JSON.stringify({ definitionVersion,
    sources: repos.map(({ name, path: sourcePath, githubUrl, revision, tree, inputDigest, measuredAsOf: observed, transport, snapshotDigest }) =>
      ({ name, path: sourcePath, githubUrl, revision, tree, inputDigest,
        ...(observed === undefined ? {} : { measuredAsOf: observed }),
        ...(transport === undefined ? {} : { transport, snapshotDigest }) })),
  })) };
}
