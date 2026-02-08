// Removes broken nested submodule references that cause Cloudflare
// recursive clone failures. Safe no-op if directory doesn't exist.
import { rmSync } from "fs";
import { resolve } from "path";

const broken = resolve(
  process.cwd(),
  "..",
  "plugins",
  "marketplaces",
  "claude-code-plugins-plus-skills",
  "plugins",
);

try {
  rmSync(broken, { recursive: true, force: true });
  console.log("[fix-submodules] Removed broken nested submodule dir");
} catch {
  console.log("[fix-submodules] Nothing to remove (OK)");
}
