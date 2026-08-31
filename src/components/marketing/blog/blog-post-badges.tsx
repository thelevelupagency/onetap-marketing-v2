import { getBlogCategoryLabels } from "@/content/get-content";
import type { BlogCategory } from "@/content/blog/types";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { MarketingBadge } from "@/components/marketing/primitives";
import { cn } from "@/lib/utils";

export function BlogPostBadges({
  categories,
  locale = DEFAULT_LOCALE,
  className,
  badgeClassName,
}: {
  categories: BlogCategory[];
  locale?: Locale;
  className?: string;
  badgeClassName?: string;
}) {
  const uniqueCategories = [...new Set(categories)];
  if (uniqueCategories.length === 0) return null;
  const categoryLabels = getBlogCategoryLabels(locale);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {uniqueCategories.map((category) => (
        <MarketingBadge key={category} className={cn("text-xs", badgeClassName)}>
          {categoryLabels[category]}
        </MarketingBadge>
      ))}
    </div>
  );
}
