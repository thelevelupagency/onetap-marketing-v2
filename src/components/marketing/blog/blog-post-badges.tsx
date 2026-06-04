import { categoryLabels } from "@/content/blog/categories";
import type { BlogCategory } from "@/content/blog/types";
import { MarketingBadge } from "@/components/marketing/primitives";
import { cn } from "@/lib/utils";

export function BlogPostBadges({
  categories,
  className,
  badgeClassName,
}: {
  categories: BlogCategory[];
  className?: string;
  badgeClassName?: string;
}) {
  const uniqueCategories = [...new Set(categories)];
  if (uniqueCategories.length === 0) return null;

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
