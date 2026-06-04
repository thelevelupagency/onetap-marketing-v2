import { Lightbulb, ListChecks } from "lucide-react";
import type { BlogCalloutVariant } from "@/lib/blog-markdown";
import { type as typography } from "@/lib/typography";
import { BlogRichText } from "@/components/marketing/blog/blog-rich-text";

const variantConfig: Record<
  BlogCalloutVariant,
  { icon: typeof Lightbulb; label: string }
> = {
  tip: { icon: Lightbulb, label: "Tip" },
  summary: { icon: ListChecks, label: "Summary" },
};

export function BlogBlockCallout({
  variant,
  text,
}: {
  variant: BlogCalloutVariant;
  text: string;
}) {
  const { icon: Icon, label } = variantConfig[variant];

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
          <BlogRichText text={text} />
        </p>
      </div>
    </aside>
  );
}
