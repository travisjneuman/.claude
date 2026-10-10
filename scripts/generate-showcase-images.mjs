#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { loadMediaRoutingPolicy } from "./media-routing.mjs";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const args = new Set(process.argv.slice(2));
const changed = [];

// Rendering is an explicit production operation, never a commit-time check.
if (!args.has("--write") || args.has("--check")) {
  throw new Error("Use --write on the approved media host through desk-run; no check/render mode is supported.");
}
const policy = loadMediaRoutingPolicy();
const work = process.env.TJN_MEDIA_WORK;
if (!work || !path.isAbsolute(work)) throw new Error("desk-run must set TJN_MEDIA_WORK to an absolute dated production folder.");
const workRoot = path.resolve(work);
if (work.toLowerCase() !== workRoot.toLowerCase()) {
  throw new Error("Production job must use its canonical lexical spelling, without removed path components.");
}
if (path.dirname(workRoot).toLowerCase() !== policy.jobsRoot.toLowerCase() ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*-\d{4}-\d{2}-\d{2}$/i.test(path.basename(workRoot))) {
  throw new Error("Production must use a dated desk-run job under the approved jobs root.");
}
for (let cursor = workRoot; ; cursor = path.dirname(cursor)) {
  const stat = fs.lstatSync(cursor);
  if (!stat.isDirectory() || stat.isSymbolicLink() || statOrMissing(path.join(cursor, ".git"))) {
    throw new Error("Production job ancestors must be real directories outside Git checkouts.");
  }
  if (path.dirname(cursor) === cursor) break;
}
if (fs.realpathSync(workRoot).toLowerCase() !== workRoot.toLowerCase()) {
  throw new Error("Production job cannot resolve through a junction or alias.");
}
function statOrMissing(file) {
  try { return fs.lstatSync(file); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}
function assertOutputPath(file, directory = false) {
  const target = path.resolve(file);
  const relative = path.relative(workRoot, target);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || (!relative && !directory)) {
    throw new Error("Image output must stay inside TJN_MEDIA_WORK, never inside a repo or Proton.");
  }
  let current = workRoot;
  const parts = relative ? relative.split(path.sep) : [];
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    const stat = statOrMissing(current);
    if (!stat) continue;
    if (stat.isSymbolicLink() || ((directory || i < parts.length - 1) ? !stat.isDirectory() : !stat.isFile()) ||
        (stat.isDirectory() && statOrMissing(path.join(current, ".git"))) ||
        fs.realpathSync(current).toLowerCase() !== current.toLowerCase()) {
      throw new Error("Production output paths must be literal real paths outside every Git checkout.");
    }
  }
}
const outputDir = path.resolve(argValue("--output-dir") || path.join(workRoot, "claude-showcase"));
assertOutputPath(outputDir, true);
const targets = [["full", 1920, 1080], ["medium", 1200, 675], ["thumb", 800, 450]];
const targetFiles = targets.map(([size]) => path.join(outputDir, `tjn-claude-${size}.webp`));
for (const file of targetFiles) assertOutputPath(file);
const requireFromWebsite = createRequire(new URL("../website/package.json", import.meta.url));
const sharp = requireFromWebsite(argValue("--sharp-module") || "sharp");

function argValue(prefix) {
  const item = process.argv.find((a) => a.startsWith(`${prefix}=`));
  return item ? item.slice(prefix.length + 1) : "";
}

function xml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function counts() {
  const data = JSON.parse(fs.readFileSync(argValue("--counts-file") || path.join(repoRoot, "counts.json"), "utf8"));
  for (const key of ["skills", "agents", "repos", "marketplaceSkills"]) {
    if (!Number.isSafeInteger(data[key]) || data[key] < 0) throw new Error(`Invalid count: ${key}`);
  }
  if (typeof data.marketplaceSkillsDisplay !== "string") throw new Error("Missing marketplace display value.");
  return data;
}

function showcaseSvg(width, height, data) {
  const sx = width / 1200;
  const sy = height / 630;
  const scale = Math.min(sx, sy);
  const circleCx = width * 0.5;
  const circleCy = height * 0.515;
  const circleR = Math.min(width * 0.235, height * 0.38);
  const statsY = circleCy + circleR * 0.3;
  const labelY = statsY + 34 * scale;
  const statGap = circleR * 0.64;
  const statXs = [
    circleCx - statGap * 1.5,
    circleCx - statGap * 0.5,
    circleCx + statGap * 0.5,
    circleCx + statGap * 1.5,
  ];
  const stars = [
    [26, 38], [82, 158], [128, 412], [214, 96], [259, 515], [326, 222],
    [653, 36], [742, 592], [914, 76], [1048, 214], [1128, 426], [1178, 56],
    [428, 316], [1072, 548], [581, 121], [1012, 338],
  ].map(([x, y], i) => `<rect x="${x * sx}" y="${y * sy}" width="${(i % 3) + 1}" height="${(i % 3) + 1}" fill="#93b3d8" opacity="${i % 2 ? 0.36 : 0.62}"/>`).join("");
  const orbs = [
    [40, 366, 27, "#ef476f", 0.28], [264, 111, 17, "#8b3bd9", 0.42],
    [356, 205, 18, "#ef476f", 0.22], [452, 416, 12, "#a675ff", 0.75],
    [667, 20, 21, "#8b5cf6", 0.36], [760, 245, 7, "#22c55e", 0.9],
    [944, 19, 27, "#22c55e", 0.22], [1038, 160, 24, "#64748b", 0.4],
    [1160, 404, 20, "#7c3aed", 0.45],
  ].map(([x, y, r, fill, opacity]) => `<circle cx="${x * sx}" cy="${y * sy}" r="${r * scale}" fill="${fill}" opacity="${opacity}"/>`).join("");
  const line = (x1, y1, x2, y2) => `<line x1="${x1 * sx}" y1="${y1 * sy}" x2="${x2 * sx}" y2="${y2 * sy}" stroke="#7c3aed" stroke-width="${Math.max(1, scale)}" opacity="0.25"/>`;
  const labels = [
    ["TOOLKIT", "SKILLS"],
    ["SPECIALIZED", "AGENTS"],
    ["NORMALIZED", "SKILL BODIES"],
    ["OPEN-SOURCE", "REPOS"],
  ];
  const values = [data.skills, data.agents, data.marketplaceSkillsDisplay, data.repos];
  const statMarkup = values.map((value, index) => `
    <text x="${statXs[index]}" y="${statsY}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${38 * scale}" font-weight="800" fill="#ffffff">${xml(value)}</text>
    <text x="${statXs[index]}" y="${labelY}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${9 * scale}" letter-spacing="${3 * scale}" fill="${index === 2 || index === 3 ? "#f59e0b" : "#f0abfc"}">${labels[index][0]}</text>
    <text x="${statXs[index]}" y="${labelY + 18 * scale}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${9 * scale}" letter-spacing="${3 * scale}" fill="${index === 2 || index === 3 ? "#f59e0b" : "#f0abfc"}">${labels[index][1]}</text>
  `).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="80%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#060912"/>
    </radialGradient>
    <linearGradient id="planet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${stars}
  ${line(40, 366, 356, 205)}
  ${line(452, 416, 264, 111)}
  ${line(760, 245, 1038, 160)}
  ${line(760, 245, 1160, 404)}
  ${orbs}
  <circle cx="${circleCx}" cy="${circleCy}" r="${circleR}" fill="url(#planet)"/>
  <text x="${circleCx}" y="${circleCy - circleR * 0.55}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${9 * scale}" letter-spacing="${6 * scale}" fill="#d8b4fe" opacity="0.8">CLAUDE CONFIGURATION</text>
  <text x="${circleCx}" y="${circleCy - circleR * 0.3}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${48 * scale}" font-weight="900" fill="#e879f9">tjn.claude/</text>
  <text x="${circleCx}" y="${circleCy - circleR * 0.18}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${17 * scale}" fill="#ffffff">A comprehensive configuration framework with skills, agents, commands, and</text>
  <text x="${circleCx}" y="${circleCy - circleR * 0.04}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${17 * scale}" fill="#ffffff">marketplace integrations that transform Claude Code into an autonomous</text>
  <text x="${circleCx}" y="${circleCy + circleR * 0.1}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${17 * scale}" fill="#ffffff">engineering platform.</text>
  ${statMarkup}
  <rect x="${circleCx - 110 * scale}" y="${circleCy + circleR * 0.62}" width="${92 * scale}" height="${34 * scale}" rx="${9 * scale}" fill="#ec4899"/>
  <text x="${circleCx - 64 * scale}" y="${circleCy + circleR * 0.62 + 22 * scale}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${13 * scale}" font-weight="800" fill="#ffffff">Explore Skills</text>
  <rect x="${circleCx + 18 * scale}" y="${circleCy + circleR * 0.62}" width="${118 * scale}" height="${34 * scale}" rx="${9 * scale}" fill="transparent" stroke="#2e1065" stroke-width="${2 * scale}"/>
  <text x="${circleCx + 77 * scale}" y="${circleCy + circleR * 0.62 + 22 * scale}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${13 * scale}" font-weight="800" fill="#ffffff">View on GitHub</text>
</svg>`;
}

async function renderBuffer(width, height, format, data) {
  const svg = Buffer.from(showcaseSvg(width, height, data));
  let pipeline = sharp(svg);
  if (format === "png") pipeline = pipeline.png();
  if (format === "jpg") pipeline = pipeline.jpeg({ quality: 88 });
  if (format === "webp") pipeline = pipeline.webp({ quality: 88 });
  return pipeline.toBuffer();
}

async function deliverToWork(file, buffer) {
  assertOutputPath(file);
  if (fs.existsSync(file)) {
    if (Buffer.compare(fs.readFileSync(file), buffer) === 0) return;
    throw new Error(`Refusing to overwrite an existing production artifact: ${path.basename(file)}`);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  assertOutputPath(file);
  fs.writeFileSync(file, buffer, { flag: "wx" });
  changed.push(path.basename(file));
}

async function main() {
  const data = counts();
  // The website's og-image.png is the repo's GitHub social preview image, kept static and count-free.

  if (argValue("--portfolio-repo")) {
    throw new Error("Render to --output-dir in TJN_MEDIA_WORK; deliver finished images separately, never directly into a repo.");
  }
  // Prepare every buffer before writing any artifact.
  const rendered = await Promise.all(targets.map(async ([size, width, height], index) => ({
    file: targetFiles[index],
    buffer: await renderBuffer(width, height, "webp", data),
  })));
  for (const { file, buffer } of rendered) {
    assertOutputPath(file);
    if (fs.existsSync(file) && Buffer.compare(fs.readFileSync(file), buffer) !== 0) {
      throw new Error(`Refusing to overwrite an existing production artifact: ${path.basename(file)}`);
    }
  }
  for (const { file, buffer } of rendered) await deliverToWork(file, buffer);
  console.log(`Showcase images: ${data.skills} skills, ${data.agents} agents, ${data.repos} sources, ${data.marketplaceSkillsDisplay} normalized skill bodies`);
  console.log(changed.length ? `Produced ${changed.length} image(s) in ${outputDir}:\n- ${changed.join("\n- ")}` : "Existing job artifacts are byte-identical.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
