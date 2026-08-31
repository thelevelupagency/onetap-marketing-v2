/**
 * Lightweight RTL / i18n guard for marketing chrome.
 * Mirrors onetap-app dashboard-chrome-rtl source-scan patterns.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..");

const SCAN_DIRS = [
  "src/components/layout",
  "src/components/marketing",
  "src/components/providers/locale-provider.tsx",
  "src/lib/i18n",
];

const ALLOWLIST_SUBSTRINGS = [
  "phones/",
  "hero-phone-preview",
  "card-ux-phone-bubbles",
  "left-1/2",
  "inset-x-0",
  "left-0 right-0", // full-bleed fixed chrome
  "-translate-x-1/2",
  "blog-reading-progress",
  "decorative",
  "hero-ambient-blob",
  "agency-workspace-simulator",
  "dashboard-section",
  "footer.tsx", // decorative blob
  "navigation.tsx", // fixed header inset
  "marketing-carousel-frame", // full-bleed centering
  "audience-marquee.tsx", // full-bleed centering lg:left-1/2
  "process-graph-timeline", // decorative blobs + centering
  "hero-section", // decorative blobs
  "pain-point-card", // centered badge
  "pricing-plan-cards", // centered badge
  "dropdown-menu.tsx", // shadcn generated (partial)
  "navigation-menu.tsx",
  "sheet.tsx", // side-specific physical classes for animation
  "carousel.tsx", // vertical mode centering
  "split-content-section", // comment only
];

const PHYSICAL_PATTERNS: RegExp[] = [
  /\btext-left\b/,
  /\btext-right\b/,
  /\bml-\d/,
  /\bmr-\d/,
  /\bpl-\d/,
  /\bpr-\d/,
  /\bborder-l\b/,
  /\bborder-r\b/,
];

function collectFiles(path: string, out: string[] = []): string[] {
  const stat = statSync(path);
  if (stat.isFile() && (path.endsWith(".tsx") || path.endsWith(".ts"))) {
    out.push(path);
    return out;
  }
  if (!stat.isDirectory()) return out;
  for (const entry of readdirSync(path)) {
    collectFiles(join(path, entry), out);
  }
  return out;
}

function isAllowlisted(relPath: string, line: string): boolean {
  if (ALLOWLIST_SUBSTRINGS.some((s) => relPath.includes(s))) return true;
  // Allow physical classes inside comments
  if (line.trim().startsWith("//") || line.trim().startsWith("*")) return true;
  return false;
}

function main(): void {
  const errors: string[] = [];

  const localeProvider = readFileSync(
    join(ROOT, "src/components/providers/locale-provider.tsx"),
    "utf8",
  );
  if (!localeProvider.includes("document.documentElement.lang")) {
    errors.push("LocaleProvider must set document.documentElement.lang");
  }
  if (!localeProvider.includes("document.documentElement.dir")) {
    errors.push("LocaleProvider must set document.documentElement.dir");
  }

  const switcher = readFileSync(
    join(ROOT, "src/components/marketing/language-switcher.tsx"),
    "utf8",
  );
  if (!switcher.includes("Globe")) {
    errors.push("LanguageSwitcher must use Globe icon trigger");
  }

  const slug = readFileSync(
    join(ROOT, "src/components/marketing/slug-claim-cta.tsx"),
    "utf8",
  );
  if (!slug.includes('dir="ltr"')) {
    errors.push("SlugClaimCta must pin dir=ltr on the URL field island");
  }

  const files: string[] = [];
  for (const dir of SCAN_DIRS) {
    const full = join(ROOT, dir);
    try {
      collectFiles(full, files);
    } catch {
      // single file path
      if (dir.endsWith(".tsx")) files.push(full);
    }
  }

  for (const file of files) {
    const rel = relative(ROOT, file);
    const source = readFileSync(file, "utf8");
    const lines = source.split("\n");
    lines.forEach((line, i) => {
      if (isAllowlisted(rel, line)) return;
      for (const pattern of PHYSICAL_PATTERNS) {
        if (pattern.test(line)) {
          errors.push(`${rel}:${i + 1} — physical layout class: ${line.trim()}`);
          break;
        }
      }
    });
  }

  const config = readFileSync(join(ROOT, "src/lib/i18n/config.ts"), "utf8");
  if (config.includes('=== "he"')) {
    errors.push('src/lib/i18n/config.ts must not use locale === "he" policy checks');
  }

  if (errors.length > 0) {
    console.error("check:i18n-rtl failed:\n");
    for (const e of errors) console.error(`  • ${e}`);
    process.exit(1);
  }

  console.log("check:i18n-rtl passed");
}

main();
