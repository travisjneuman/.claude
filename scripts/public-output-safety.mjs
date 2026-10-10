// Shared offline publication safety. Never log private inputs, patterns or hits.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { TextDecoder } from "node:util";
import { createHash } from "node:crypto";

const MAX_BYTES = 2 * 1024 * 1024;
const MAX_PIN_BYTES = 4096;
// Reviewed full artifact, not perpetual permission for a matching record shape.
const REVIEWED_REGISTRY_SHA256 = "8f6cef0da8d631305848a2e66422f1c9f14f9b97af7c8b8f052127f8abaaf4fa";
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function privateBytes(file, maxBytes = MAX_BYTES) {
  let fd;
  try {
    if (!path.isAbsolute(file)) throw new Error();
    fd = fs.openSync(file, fs.constants.O_RDONLY | fs.constants.O_NONBLOCK);
    const stat = fs.fstatSync(fd);
    if (!stat.isFile() || stat.size > maxBytes) throw new Error();
    const chunks = [];
    let size = 0;
    for (;;) {
      const chunk = Buffer.alloc(Math.min(64 * 1024, maxBytes + 1 - size));
      const n = fs.readSync(fd, chunk, 0, chunk.length, null);
      if (!n) break;
      size += n;
      if (size > maxBytes) throw new Error();
      chunks.push(chunk.subarray(0, n));
    }
    return Buffer.concat(chunks);
  } catch { throw new Error("Private safety input unavailable, oversized or invalid; refusing publication."); }
  finally { if (fd !== undefined) fs.closeSync(fd); }
}
function decodePrivate(bytes) {
  try { return new TextDecoder("utf-8", { fatal: true }).decode(bytes); }
  catch { throw new Error("Private safety input unavailable, oversized or invalid; refusing publication."); }
}
function privateText(file) { return decodePrivate(privateBytes(file)); }
function loadReviewedRegistryPin(parsedUrls, urlFiles) {
  const file = path.join(os.homedir(), ".config", "showcase", "reviewed-registry.json");
  try { fs.lstatSync(file); }
  catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error("Reviewed registry policy unavailable; refusing publication pending renewed review.");
  }
  try {
    const pin = JSON.parse(decodePrivate(privateBytes(file, MAX_PIN_BYTES)));
    const keys = ["schemaVersion", "urlSlot", "basename", "sha256", "adapter"];
    if (!pin || typeof pin !== "object" || Array.isArray(pin) ||
        Object.keys(pin).length !== keys.length || !keys.every((key) => Object.hasOwn(pin, key)) ||
        pin.schemaVersion !== 1 || pin.urlSlot !== 1 || pin.basename !== "franchises.json" ||
        typeof pin.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(pin.sha256) ||
        pin.sha256 !== REVIEWED_REGISTRY_SHA256 || pin.adapter !== "unidentified-manager-v1" ||
        parsedUrls[0]?.pathname.split("/").at(-1) !== pin.basename ||
        !urlFiles.has(1) || path.basename(urlFiles.get(1)) !== pin.basename) throw new Error();
    return pin;
  } catch {
    throw new Error("Reviewed registry policy invalid or inconsistent; refusing publication pending renewed review.");
  }
}
function unidentifiedManagerRecord(record) {
  const fields = ["id", "slug", "name", "displayName", "managerAliases", "teamAliases", "primaryColor", "secondaryColor"];
  const meaningful = (value) => typeof value === "string" && value.trim().length > 0 && /[\p{L}\p{N}]/u.test(value);
  return record && typeof record === "object" && !Array.isArray(record) &&
    fields.every((key) => Object.hasOwn(record, key)) &&
    meaningful(record.id) && meaningful(record.slug) && meaningful(record.displayName) &&
    typeof record.name === "string" && record.name.toLowerCase() === "unknown" &&
    Array.isArray(record.managerAliases) && record.managerAliases.length === 0 &&
    Array.isArray(record.teamAliases) && record.teamAliases.length > 0 && record.teamAliases.every(meaningful) &&
    typeof record.primaryColor === "string" && record.primaryColor.trim().length > 0 &&
    typeof record.secondaryColor === "string" && record.secondaryColor.trim().length > 0;
}
function grep(patterns, text) {
  const result = spawnSync("grep", ["-n", "-o", "-E", ...patterns.flatMap((p) => ["-e", p]), "--"], {
    input: text, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["pipe", "pipe", "ignore"],
  });
  if (result.error || ![0, 1].includes(result.status)) throw new Error("Private pattern gate failed; refusing publication.");
  // Owner explicitly confirms this existing public contact is not private.
  // Inspect every match; neither the surrounding line nor other hits are exempt.
  const publicContact = ["travis", "neuman.dev"].join("@");
  const matches = result.status === 0 ? result.stdout.replace(/\n$/, "").split("\n") : [];
  for (const record of matches) {
    const match = /^([0-9]+):([\s\S]*)$/.exec(record);
    const line = Number(match?.[1]);
    if (!match || !Number.isSafeInteger(line) || line < 1) throw new Error("Private pattern gate failed; refusing publication.");
    if (match[2] !== publicContact) return { blocked: true, line };
  }
  return { blocked: false, line: null };
}
export function loadPrivatePatterns(root, explicitFile) {
  const files = new Set([path.join(root, "local", "public-safety-patterns.txt")]);
  if (explicitFile !== undefined) files.add(explicitFile);
  // This checkout's existing private policy is required, never silently skipped
  // or replaced by an explicit input. Extra pattern files are additive only.
  const patterns = [...files].flatMap((file) => privateText(file).split(/\r?\n/))
    .filter((line) => line.trim() && !line.trimStart().startsWith("#"));
  if (!patterns.length) throw new Error("Private pattern policy is empty; refusing publication.");
  // Validate individually: grep can short-circuit after a hit and hide bad regexes.
  for (const pattern of patterns) grep([pattern], "");
  return (text) => {
    const finding = grep(patterns, text);
    if (finding.blocked) throw new Error(`Private pattern gate blocked public content at line ${finding.line}; refusing publication.`);
  };
}
export function loadPublicOutputSafety(root, { urlFiles = new Map(), jsonFiles = [], patternFile } = {}) {
  const patternGate = loadPrivatePatterns(root, patternFile);
  const terms = new Set();
  const allow = new Set(["travis", "neuman", "travis neuman", "travis j. neuman", "travisjneuman", ["travis", "neuman.dev"].join("@")]);
  const usable = (t) => t.length >= 3 && /[\p{L}\p{N}]/u.test(t) && !allow.has(t.toLowerCase());
  const defaultFile = path.join(os.homedir(), ".config", "showcase", "denylist.txt");
  const literalFiles = new Set();
  if (fs.existsSync(defaultFile)) literalFiles.add(defaultFile);
  if (process.env.SHOWCASE_DENYLIST !== undefined) literalFiles.add(process.env.SHOWCASE_DENYLIST);
  for (const file of literalFiles) {
    for (const line of privateText(file).split(/\r?\n/)) {
      const term = line.trim();
      if (term && !term.startsWith("#") && usable(term)) terms.add(term);
    }
  }
  const list = (value) => (value || "").split(",").map((s) => s.trim()).filter(Boolean);
  const files = [...list(process.env.SHOWCASE_DENYLIST_JSON_FILES), ...jsonFiles];
  const urls = list(process.env.SHOWCASE_DENYLIST_JSON_URLS);
  if (files.length + urls.length > 8) throw new Error("Privacy JSON sources exceed the bounded limit of 8.");
  const parsedUrls = urls.map((value) => {
    try {
      const url = new URL(value);
      if (url.protocol !== "https:" || url.username || url.password) throw new Error();
      return url;
    } catch { throw new Error("Invalid configured privacy URL; refusing publication."); }
  });
  for (const [index, file] of urlFiles) {
    if (!Number.isSafeInteger(index) || index < 1 || index > urls.length || !path.isAbsolute(file) ||
        parsedUrls[index - 1].pathname.split("/").at(-1) !== path.basename(file)) {
      throw new Error("Privacy URL counterpart must match a configured 1-based position and source filename.");
    }
  }
  if (urls.some((_, i) => !urlFiles.has(i + 1))) {
    throw new Error("Unmapped configured privacy URL; supply a reviewed --denylist-url-file=position=/absolute/existing/file. Offline only.");
  }
  const reviewedPin = loadReviewedRegistryPin(parsedUrls, urlFiles);
  const jsonTerms = (file, pin = null) => {
    // Hash the very bytes parsed below, before decoding/BOM handling or JSON re-encoding.
    const bytes = privateBytes(file);
    if (pin && createHash("sha256").update(bytes).digest("hex") !== pin.sha256) {
      throw new Error("Reviewed registry snapshot changed; refusing publication pending renewed review.");
    }
    let value;
    try { value = JSON.parse(decodePrivate(bytes)); }
    catch { throw new Error("Privacy JSON unavailable or invalid; refusing publication."); }
    const omittedNames = new Set();
    if (pin && value && typeof value === "object" && !Array.isArray(value) &&
        Object.hasOwn(value, "franchises") && Array.isArray(value.franchises)) {
      for (const record of value.franchises) {
        if (unidentifiedManagerRecord(record)) omittedNames.add(record);
      }
    }
    const collected = new Set();
    const walk = (v, key = "") => {
      if (typeof v === "string" && /name|alias/i.test(key)) collected.add(v.replace(/[^\p{L}\p{N}&.'\- ]/gu, "").trim());
      else if (Array.isArray(v)) v.forEach((x) => walk(x, key));
      else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => {
        // Only this direct reviewed record's own scalar; all other properties recurse.
        if (k !== "name" || !omittedNames.has(v)) walk(x, k);
      });
    };
    try { walk(value); } catch { throw new Error("Privacy JSON traversal failed; refusing publication."); }
    const selected = [...collected].filter(usable);
    if (!selected.length) throw new Error("Privacy JSON contains no meaningful name or alias terms; refusing publication.");
    selected.forEach((t) => terms.add(t));
  };
  // Additive files do not satisfy or remove any configured URL position.
  for (const file of files) jsonTerms(file);
  for (const [slot, file] of urlFiles) jsonTerms(file, slot === 1 ? reviewedPin : null);
  if (!terms.size) throw new Error("No meaningful literal/name/alias denylist inputs; refusing publication.");
  const literals = [...terms].map((term) => new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(term)}($|[^\\p{L}\\p{N}])`, "iu"));
  return (text, { ownToolkitOutput = true } = {}) => {
    // The toolkit's private-project patterns belong to this repository. Owner
    // profile/portfolio text has intentionally public identity and product names;
    // every complete cross-repo output still receives the shared identity gate.
    if (ownToolkitOutput) patternGate(text);
    for (const re of literals) {
      const match = re.exec(text);
      if (match) {
        const start = match.index + match[1].length;
        const line = text.slice(0, start).split("\n").length;
        const column = start - text.lastIndexOf("\n", start - 1);
        throw new Error(`Literal privacy gate blocked public content at line ${line}, column ${column}; refusing publication.`);
      }
    }
  };
}
