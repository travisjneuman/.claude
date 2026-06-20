// Removes only nested git metadata for the specific axiom marketplace entry if it
// exists. Do not delete the axiom directory itself: when the marketplace clone is
// present locally, those files are normal upstream reference files used by the
// count generator.
import { existsSync, lstatSync, rmSync } from "fs";
import { resolve } from "path";

const axiomDir = resolve(
  process.cwd(),
  "..",
  "plugins",
  "marketplaces",
  "claude-code-plugins-plus-skills",
  "plugins",
  "skill-enhancers",
  "axiom",
);
const nestedGitMarker = resolve(axiomDir, ".git");

try {
  if (existsSync(nestedGitMarker) && lstatSync(nestedGitMarker).isFile()) {
    rmSync(nestedGitMarker, { force: true });
    console.log("[fix-submodules] Removed nested axiom .git marker");
  } else {
    console.log("[fix-submodules] No nested axiom git marker found (OK)");
  }
} catch {
  console.log("[fix-submodules] Nothing to remove (OK)");
}
