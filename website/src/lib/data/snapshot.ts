import fs from "fs";
import path from "path";
import snapshot from "../../../../counts.json";

export interface PublicHookIdentity {
  file: string;
  events: string[];
  matchers: string[];
}
export interface PublicCounts {
  schemaVersion: number;
  definitionVersion: string;
  asOf: string;
  skills: number;
  agents: number;
  commands: number;
  routerCommands: number;
  totalCommands: number;
  hooks: number;
  repos: number;
  marketplaceSkills: number;
  marketplaceSkillsDisplayValue: number;
  marketplaceSkillsDisplay: string;
  inventory: {
    skills: string[];
    agents: string[];
    commands: string[];
    routerCommands: string[];
    hooks: PublicHookIdentity[];
  };
  provenance: { marketplace: { inputDigest: string; coverage: string } };
}
// Same immutable generated identities/totals on local and hosted builds.
// Old snapshots are not silently presented as newly measured data.
export function getPublicCounts(): PublicCounts {
  const counts = snapshot as unknown as PublicCounts;
  if (counts.schemaVersion !== 2 || !counts.inventory || counts.provenance?.marketplace?.coverage !== "complete") {
    throw new Error("Public count inventory requires an explicit generate-counts.mjs --write refresh before publication.");
  }
  return counts;
}
export function readPublicSource(file: string): string {
  const root = path.resolve(process.cwd(), "..");
  const parts = file.split("/");
  if (file.includes("\\") || parts.some((part) => !part || part === "." || part === "..")) throw new Error("Invalid public inventory identity.");
  let full = root;
  for (let i = 0; i < parts.length; i++) {
    full = path.join(full, parts[i]);
    const stat = fs.lstatSync(full);
    if (stat.isSymbolicLink() || (i < parts.length - 1 ? !stat.isDirectory() : !stat.isFile())) {
      throw new Error("Public inventory source is missing or linked; explicitly refresh the source snapshot.");
    }
  }
  return fs.readFileSync(full, "utf8");
}
