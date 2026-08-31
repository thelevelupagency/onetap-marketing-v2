import { Lightbulb, ListChecks } from "lucide-react";
import type { BlogCalloutVariant } from "@/lib/blog-markdown";
import type { Locale } from "@/lib/i18n/config";
import { type as typography } from "@/lib/typography";
import { BlogRichText } from "@/components/marketing/blog/blog-rich-text";

const variantConfig: Record<
  BlogCalloutVariant,
  { icon: typeof Lightbulb; labelEn: string; labelHe: string }
> = {
  tip: { icon: Lightbulb, labelEn: "Tip", labelHe: "טיפ" },
  summary: { icon: ListChecks, labelEn: "Summary", labelHe: "סיכום" },
};

export function BlogBlockCallout({
  variant,
  text,
  locale,
}: {
  variant: BlogCalloutVariant;
  text: string;
  locale?: Locale;
}) {
  const { icon: Icon, labelEn, labelHe } = variantConfig[variant];
  const label = locale === "he" ? labelHe : labelEn;

  return (
    <aside
      className="my-1 flex gap-3 rounded-2xl border border-brand-turquoise/20 bg-brand-turquoise/5 px-5 py-4"
      role="note"
    >
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0 text-brand-turquoise-dark"
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className={`${typography.label} mb-1 text-brand-turquoise-dark`}>{label}</p>
        <p className={typography.body}>
          <BlogRichText text={text} locale={locale} />
        </p>
      </div>
    </aside>
  );
}
