import Link from "next/link";
import { getBlogLinkLabel } from "@/lib/blog";

const BLOG_PATH_PATTERN = /(\/blog\/[a-z0-9-]+)/g;
const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,;:!?)}\]'"])/g;
const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g;

function BlogExternalLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-brand-turquoise-dark underline-offset-2 hover:underline"
    >
      {href.replace(/^https?:\/\//, "")}
    </a>
  );
}

function BlogBold({ text }: { text: string }) {
  return <strong className="font-medium text-brand-midnight">{text.slice(2, -2)}</strong>;
}

function renderSegment(segment: string, keyPrefix: string) {
  if (!segment) return null;

  const blogParts = segment.split(BLOG_PATH_PATTERN);
  return blogParts.map((part, i) => {
    const key = `${keyPrefix}-blog-${i}`;
    if (part.startsWith("/blog/")) {
      const slug = part.slice("/blog/".length);
      return (
        <Link
          key={key}
          href={part}
          className="font-medium text-brand-turquoise-dark underline-offset-2 hover:underline"
        >
          {getBlogLinkLabel(slug)}
        </Link>
      );
    }

    const urlParts = part.split(URL_PATTERN);
    return urlParts.map((urlPart, j) => {
      const urlKey = `${key}-url-${j}`;
      if (/^https?:\/\//.test(urlPart)) {
        return <BlogExternalLink key={urlKey} href={urlPart} />;
      }

      const boldParts = urlPart.split(BOLD_PATTERN);
      return boldParts.map((boldPart, k) => {
        const boldKey = `${urlKey}-b-${k}`;
        if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
          return <BlogBold key={boldKey} text={boldPart} />;
        }
        return boldPart ? <span key={boldKey}>{boldPart}</span> : null;
      });
    });
  });
}

/** Paragraph inline text: internal blog links, external URLs, and **bold**. */
export function BlogRichText({ text }: { text: string }) {
  return <>{renderSegment(text, "seg")}</>;
}
