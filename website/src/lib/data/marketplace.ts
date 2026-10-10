import snapshot from "./marketplace-counts.json";
import { getPublicCounts } from "./snapshot";

export interface MarketplaceRepo {
  name: string;
  displayName: string;
  skillCount: number;
  githubUrl: string;
}
interface MarketplaceSnapshot {
  schemaVersion: number;
  asOf: string;
  repoCount: number;
  totalSkills: number;
  marketplaceSkillsDisplay: string;
  provenance: { coverage: string; inputDigest: string };
  repos: MarketplaceRepo[];
}

export function getMarketplaceStats(): {
  repos: MarketplaceRepo[];
  totalSkills: number;
} {
  const counts = getPublicCounts();
  const marketplace = snapshot as unknown as MarketplaceSnapshot;
  if (marketplace.schemaVersion !== 2 || marketplace.provenance?.coverage !== "complete" ||
      marketplace.provenance.inputDigest !== counts.provenance.marketplace.inputDigest ||
      marketplace.asOf !== counts.asOf || marketplace.repoCount !== counts.repos ||
      marketplace.repos.length !== counts.repos || marketplace.totalSkills !== counts.marketplaceSkills ||
      marketplace.marketplaceSkillsDisplay !== counts.marketplaceSkillsDisplay) {
    throw new Error("Marketplace and public count snapshots disagree; run an explicit source refresh before publication.");
  }
  // Public manifest URLs and global deduplicated totals come from the producer.
  // Never inspect installed clones or sum overlapping per-repo totals at build time.
  return {
    repos: marketplace.repos.map(({ name, displayName, skillCount, githubUrl }) => ({ name, displayName, skillCount, githubUrl })),
    totalSkills: marketplace.totalSkills,
  };
}
