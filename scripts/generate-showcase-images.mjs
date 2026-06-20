#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const requireFromWebsite = createRequire(new URL("../website/package.json", import.meta.url));
const sharp = requireFromWebsite("sharp");

const args = new Set(process.argv.slice(2));
const writeMode = args.has("--write");
const checkMode = args.has("--check") || !writeMode;
const changed = [];
const stale = [];

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
  return JSON.parse(fs.readFileSync(path.join(repoRoot, "counts.json"), "utf8"));
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
    ["CUSTOM", "SKILLS"],
    ["SPECIALIZED", "AGENTS"],
    ["MARKETPLACE", "SKILLS"],
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

async function writeOrCheck(file, buffer) {
  const rel = path.relative(repoRoot, file);
  const existing = fs.existsSync(file) ? fs.readFileSync(file) : null;
  const same = existing && Buffer.compare(existing, buffer) === 0;
  if (same) return;
  if (checkMode) stale.push(rel);
  if (writeMode) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, buffer);
    changed.push(rel);
  }
}

async function main() {
  const data = counts();
  await writeOrCheck(path.join(repoRoot, "website", "public", "og-image.png"), await renderBuffer(1200, 630, "png", data));
  await writeOrCheck(path.join(repoRoot, "website", "public", "og-image.jpg"), await renderBuffer(1200, 630, "jpg", data));
  await writeOrCheck(path.join(repoRoot, "website", "public", "og-image.webp"), await renderBuffer(1200, 630, "webp", data));

  const portfolioRepo = argValue("--portfolio-repo");
  if (portfolioRepo) {
    const targets = [
      ["full", 1920, 1080],
      ["medium", 1200, 675],
      ["thumb", 800, 450],
    ];
    for (const [size, width, height] of targets) {
      const buffer = await renderBuffer(width, height, "webp", data);
      await writeOrCheck(path.join(portfolioRepo, "images", "screenshots", `tjn-claude-${size}.webp`), buffer);
      await writeOrCheck(path.join(portfolioRepo, "src", "public", "images", "screenshots", `tjn-claude-${size}.webp`), buffer);
    }
  }

  console.log(`Showcase images: ${data.skills} skills, ${data.agents} agents, ${data.repos} repos, ${data.marketplaceSkillsDisplay} marketplace skills`);
  if (writeMode) console.log(changed.length ? `Updated ${changed.length} image(s):\n- ${changed.join("\n- ")}` : "No image changes needed.");
  if (checkMode && stale.length) {
    console.error(`Stale generated image(s):\n- ${stale.join("\n- ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
