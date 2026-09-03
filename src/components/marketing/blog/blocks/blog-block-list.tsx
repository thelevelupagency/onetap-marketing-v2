import type { Locale } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";
import { BlogRichText } from "@/components/marketing/blog/blog-rich-text";

const listClass = `${typography.body} not-prose leading-snug list-outside ps-4`;

export function BlogBlockUl({
  items,
  locale,
}: {
  items: string[];
  locale?: Locale;
}) {
  return (
    <ul className={`${listClass} my-0 list-disc space-y-marketing-prose-list-gap`}>
      {items.map((item, i) => (
        <li key={i}>
          <BlogRichText text={item} locale={locale} />
        </li>
      ))}
    </ul>
  );
}

export function BlogBlockOl({
  items,
  locale,
}: {
  items: string[];
  locale?: Locale;
}) {
  return (
    <ol className={`${listClass} my-0 list-decimal space-y-marketing-prose-list-gap`}>
      {items.map((item, i) => (
        <li key={i}>
          <BlogRichText text={item} locale={locale} />
        </li>
      ))}
    </ol>
  );
}
