import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHash } from "node:crypto";

// Owner-reviewed machine identity and work paths stay outside public repositories.
export function loadMediaRoutingPolicy() {
  if (process.platform !== "win32") throw new Error("Media production requires the approved Windows host.");
  try {
    const file = path.join(os.homedir(), ".config", "showcase", "media-production.json");
    const stat = fs.lstatSync(file);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size < 1 || stat.size > 4096 ||
        fs.realpathSync(file).toLowerCase() !== file.toLowerCase()) throw new Error();
    const bytes = fs.readFileSync(file);
    if (bytes.length < 1 || bytes.length > 4096 ||
        createHash("sha256").update(bytes).digest("hex") !== "160dfee8de4b21b40036d7086f9786aec973c8f3d60eff806a5c4fcededdeb6e") throw new Error();
    const policy = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (Object.keys(policy).sort().join(",") !== "hostname,jobsRoot,schemaVersion" || policy.schemaVersion !== 1 ||
        typeof policy.hostname !== "string" || !/^[A-Z0-9-]{1,63}$/.test(policy.hostname) ||
        os.hostname().toUpperCase() !== policy.hostname || typeof policy.jobsRoot !== "string" ||
        !path.isAbsolute(policy.jobsRoot) || path.resolve(policy.jobsRoot).toLowerCase() !== policy.jobsRoot.toLowerCase()) throw new Error();
    return policy;
  } catch { throw new Error("Readable reviewed private media routing policy for this host is required."); }
}
