import Link from "next/link";
import { getPostBySlug } from "@/lib/blog";

const BLOG_PATH_PATTERN = /(\/blog\/[a-z0-9-]+)/g;

/** Renders plain text with internal `/blog/<slug>` paths as links to post titles. */
export function BlogInlineText({ text }: { text: string }) {
  const parts = text.split(BLOG_PATH_PATTERN);

  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith("/blog/")) {
          return part ? <span key={i}>{part}</span> : null;
        }

        const slug = part.slice("/blog/".length);
        const linked = getPostBySlug(slug);

        return (
          <Link
            key={i}
            href={part}
            className="font-medium text-brand-turquoise-dark underline-offset-2 hover:underline"
          >
            {linked?.title ?? part}
          </Link>
        );
      })}
    </>
  );
}
