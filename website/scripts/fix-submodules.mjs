// Removes the specific broken nested submodule gitlink (axiom) that causes
// Cloudflare recursive clone failures. Only targets the dangling gitlink,
// NOT the entire plugins/ directory (which contains ~1,300+ legitimate skill files).
import { rmSync } from "fs";
import { resolve } from "path";

const broken = resolve(
  process.cwd(),
  "..",
  "plugins",
  "marketplaces",
  "claude-code-plugins-plus-skills",
  "plugins",
  "skill-enhancers",
  "axiom",
);

try {
  rmSync(broken, { recursive: true, force: true });
  console.log("[fix-submodules] Removed broken axiom gitlink");
} catch {
  console.log("[fix-submodules] Nothing to remove (OK)");
}
