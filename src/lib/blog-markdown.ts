export type BlogCalloutVariant = "tip" | "summary";

export type BlogContentNode =
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "image"; alt: string; src: string }
  | { type: "callout"; variant: BlogCalloutVariant; text: string }
  | { type: "h3"; text: string };

const BULLET_RE = /^[-•]\s+(.+)$/;
const ORDERED_RE = /^\d+\.\s+(.+)$/;
const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const CALLOUT_RE = /^>\s*(Tip|Summary):\s*(.+)$/i;
const H3_RE = /^###\s+(.+)$/;
const IGNORE_LINE_RE = /^read-time:/i;

export type ParsedContentBlock =
  | { kind: "section"; level: 2; heading: string; body: string }
  | { kind: "intro"; body: string };

/** Split a top-level `content[]` entry into a section heading or intro body. */
export function parseContentBlock(block: string): ParsedContentBlock {
  if (block.startsWith("## ")) {
    const lines = block.split("\n");
    const heading = lines[0].slice(3).trim();
    const body = lines.slice(1).join("\n").trim();
    return { kind: "section", level: 2, heading, body };
  }
  return { kind: "intro", body: block };
}

function isIgnorableChunk(chunk: string): boolean {
  const first = chunk.trim().split("\n")[0]?.trim() ?? "";
  return IGNORE_LINE_RE.test(first);
}

function parseListLines(
  lines: string[],
  pattern: RegExp
): string[] | null {
  const items: string[] = [];
  for (const line of lines) {
    const match = line.match(pattern);
    if (!match) return null;
    items.push(match[1].trim());
  }
  return items;
}

function parseChunk(chunk: string): BlogContentNode | BlogContentNode[] | null {
  const trimmed = chunk.trim();
  if (!trimmed || isIgnorableChunk(trimmed)) return null;

  const lines = trimmed.split("\n").map((l) => l.trim());

  if (lines.length === 1) {
    const line = lines[0];
    const h3 = line.match(H3_RE);
    if (h3) return { type: "h3", text: h3[1].trim() };
    const img = line.match(IMAGE_RE);
    if (img) return { type: "image", alt: img[1], src: img[2] };
    const callout = line.match(CALLOUT_RE);
    if (callout) {
      const variant = callout[1].toLowerCase() as BlogCalloutVariant;
      return { type: "callout", variant, text: callout[2].trim() };
    }
    return { type: "paragraph", text: line };
  }

  const h3First = lines[0].match(H3_RE);
  if (h3First) {
    const tail = lines.slice(1);
    const tailNodes = tail.length > 0 ? parseBlogBody(tail.join("\n\n")) : [];
    return [{ type: "h3", text: h3First[1].trim() }, ...tailNodes];
  }

  const ulItems = parseListLines(lines, BULLET_RE);
  if (ulItems) return { type: "ul", items: ulItems };

  const olItems = parseListLines(lines, ORDERED_RE);
  if (olItems) return { type: "ol", items: olItems };

  return { type: "paragraph", text: lines.join(" ") };
}

/** Parse section or intro body text into renderable nodes. */
export function parseBlogBody(text: string): BlogContentNode[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const chunks = trimmed.split(/\n\n+/);
  const nodes: BlogContentNode[] = [];

  for (const chunk of chunks) {
    const parsed = parseChunk(chunk);
    if (!parsed) continue;
    if (Array.isArray(parsed)) nodes.push(...parsed);
    else nodes.push(parsed);
  }

  return nodes;
}

/** Every `##` and `###` line in post content — for build-time TOC sync checks. */
export function extractContentHeadings(
  content: string[]
): Array<{ text: string; level: 2 | 3 }> {
  const headings: Array<{ text: string; level: 2 | 3 }> = [];

  for (const block of content) {
    const parsed = parseContentBlock(block);
    if (parsed.kind !== "section") continue;

    headings.push({ text: parsed.heading, level: 2 });

    for (const line of parsed.body.split("\n")) {
      const match = line.match(/^###\s+(.+)$/);
      if (match) {
        headings.push({ text: match[1].trim(), level: 3 });
      }
    }
  }

  return headings;
}

/** Plain-text word count for reading-time estimates. */
export function countBlogWords(content: string[]): number {
  const text = content.join("\n");
  const stripped = text
    .replace(/^read-time:.*$/gim, "")
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/^[-•]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^!\[([^\]]*)\]\([^)]+\)$/gm, "$1")
    .replace(/^>\s*(Tip|Summary):\s*/gim, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\/blog\/[a-z0-9-]+/g, "")
    .replace(/https?:\/\/\S+/g, "");

  const words = stripped.match(/[a-zA-Z0-9']+/g);
  return words?.length ?? 0;
}
