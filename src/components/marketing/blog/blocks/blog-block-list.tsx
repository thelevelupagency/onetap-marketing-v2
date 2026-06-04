import { type as typography } from "@/lib/typography";
import { BlogRichText } from "@/components/marketing/blog/blog-rich-text";

const listClass = `${typography.body} not-prose leading-snug list-outside pl-4`;

export function BlogBlockUl({ items }: { items: string[] }) {
  return (
    <ul className={`${listClass} my-0 list-disc space-y-marketing-prose-list-gap`}>
      {items.map((item, i) => (
        <li key={i}>
          <BlogRichText text={item} />
        </li>
      ))}
    </ul>
  );
}

export function BlogBlockOl({ items }: { items: string[] }) {
  return (
    <ol className={`${listClass} my-0 list-decimal space-y-marketing-prose-list-gap`}>
      {items.map((item, i) => (
        <li key={i}>
          <BlogRichText text={item} />
        </li>
      ))}
    </ol>
  );
}
