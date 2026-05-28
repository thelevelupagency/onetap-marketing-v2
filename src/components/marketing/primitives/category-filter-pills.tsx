import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryFilterPill {
  id: string;
  label: string;
  isActive: boolean;
  /** Link-style filter (e.g. blog). Provide `href` or `onSelect`, not both. */
  href?: string;
  /** In-place filter (e.g. FAQ). Provide `href` or `onSelect`, not both. */
  onSelect?: () => void;
}

interface CategoryFilterPillsProps {
  items: readonly CategoryFilterPill[];
  ariaLabel: string;
  className?: string;
}

const pillClassName =
  "inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-200 sm:min-h-12 sm:px-6 sm:py-3 sm:text-base";

const pillFocusClassName =
  "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream";

function pillStyles(isActive: boolean) {
  return cn(
    pillClassName,
    isActive
      ? "border-brand-midnight bg-brand-midnight text-brand-cream shadow-soft-diffusion"
      : "border-brand-midnight/12 bg-white text-brand-midnight/75 shadow-sm hover:border-brand-turquoise/35 hover:bg-brand-turquoise/15 hover:text-brand-midnight hover:shadow-md"
  );
}

/** Rounded category chips — shared by blog (links) and FAQ (buttons). */
export function CategoryFilterPills({ items, ariaLabel, className }: CategoryFilterPillsProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn("mx-auto flex max-w-3xl flex-wrap justify-center gap-3", className)}
    >
      {items.map(({ id, label, href, onSelect, isActive }) => {
        if (href != null && onSelect == null) {
          return (
            <Link
              key={id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={pillFocusClassName}
            >
              <span className={pillStyles(isActive)}>{label}</span>
            </Link>
          );
        }

        if (onSelect != null) {
          return (
            <button
              key={id}
              type="button"
              onClick={onSelect}
              aria-pressed={isActive}
              className={pillFocusClassName}
            >
              <span className={pillStyles(isActive)}>{label}</span>
            </button>
          );
        }

        return null;
      })}
    </nav>
  );
}
