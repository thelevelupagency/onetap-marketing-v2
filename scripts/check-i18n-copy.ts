/**
 * Hebrew content leaf scanner — flags English leftovers not on the brand allowlist.
 * Mirrors onetap-app tests/locale/heOverlayCoverage.ts patterns.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const HE_CONTENT_DIR = join(ROOT, "src/content/he");

/** User-facing copy modules only — skip blog merge/validation and type imports. */
const SKIP_FILES = new Set([
  "src/content/he/blog/posts.ts",
  "src/content/he/blog/categories.ts",
]);

export const BRAND_ALLOWLIST = [
  "OneTap",
  "OneTap-Card",
  "ONETAP",
  "Google",
  "WhatsApp",
  "Facebook",
  "Slack",
  "CSV",
  "Free",
  "Pro",
  "Team",
  "Enterprise",
  "X",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "Vimeo",
  "URL",
  "APCA",
  "vCard",
  "CRM",
  "Meta Pixel",
  "Lemon Squeezy",
  "NFC",
  "QR",
  "SMS",
  "PDF",
  "Calendly",
  "ROI",
  "WA",
  "One-Tap",
  "pitch",
  "Tip:",
  "Summary:",
  "your-name",
  "a-z, 0-9",
  "a-z, 0-9, hyphens",
] as const;

const HEBREW_RE = /[\u0590-\u05FF]/;
const PROPER_NAME_RE = /^[A-Z][a-z]+(?:['\u2019][a-z]+)?(?: [A-Z][a-z]+(?:['\u2019][a-z]+)?)+$/;

function collectFiles(path: string, out: string[] = []): string[] {
  const stat = statSync(path);
  if (stat.isFile() && path.endsWith(".ts")) {
    out.push(path);
    return out;
  }
  if (!stat.isDirectory()) return out;
  for (const entry of readdirSync(path)) {
    collectFiles(join(path, entry), out);
  }
  return out;
}

function extractStringLiterals(source: string): string[] {
  const results: string[] = [];
  const lines = source.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("import ") || trimmed.startsWith("export type")) continue;

    const pattern = /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(line)) !== null) {
      const raw = match[0];
      const unquoted = raw.slice(1, -1);
      if (unquoted.length >= 2) {
        results.push(unquoted);
      }
    }
  }

  return results;
}

export function isHebrewOrAllowlisted(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (trimmed.includes("@/") || trimmed.includes("./")) return true;
  if (trimmed.includes("${")) return true;
  if (HEBREW_RE.test(trimmed)) return true;
  if (/^https?:\/\//.test(trimmed)) return true;
  if (/^\/[\w/-]*$/.test(trimmed)) return true;
  if (trimmed.includes("#")) return true;
  if (trimmed.startsWith("from-brand-")) return true;
  if (/^[A-Z][a-zA-Z'\u2019\s.&-]+$/.test(trimmed) && !HEBREW_RE.test(trimmed)) return true;
  if (PROPER_NAME_RE.test(trimmed)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(trimmed)) return true;
  if (/^\$\d+/.test(trimmed)) return true;
  if (/^[a-z][a-zA-Z0-9]*$/.test(trimmed) && trimmed.length <= 24) return true;
  if (/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(trimmed)) return true;
  return BRAND_ALLOWLIST.some(
    (token) => trimmed === token || trimmed.includes(token),
  );
}

function main(): void {
  const errors: string[] = [];
  const files = collectFiles(HE_CONTENT_DIR);

  for (const file of files) {
    const rel = relative(ROOT, file);
    if (SKIP_FILES.has(rel)) continue;

    const source = readFileSync(file, "utf8");
    const literals = extractStringLiterals(source);

    for (const literal of literals) {
      if (isHebrewOrAllowlisted(literal)) continue;
      if (/^[A-Z_]+$/.test(literal)) continue;
      if (/^\d+$/.test(literal)) continue;
      if (literal.startsWith("Blog post")) continue;
      errors.push(
        `${rel} — English leaf not allowlisted: "${literal.slice(0, 80)}${literal.length > 80 ? "…" : ""}"`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("check:i18n-copy failed:\n");
    for (const e of errors.slice(0, 50)) console.error(`  • ${e}`);
    if (errors.length > 50) {
      console.error(`  … and ${errors.length - 50} more`);
    }
    process.exit(1);
  }

  console.log("check:i18n-copy passed");
}

main();
