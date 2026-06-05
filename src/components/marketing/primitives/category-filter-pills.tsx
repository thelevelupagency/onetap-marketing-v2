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
  /** Optional ref for scroll-into-view (button pills only). */
  pillRef?: (el: HTMLButtonElement | null) => void;
}

type PillLayout = "row" | "column" | "row-scroll";
type PillDensity = "default" | "compact";

interface CategoryFilterPillsProps {
  items: readonly CategoryFilterPill[];
  ariaLabel: string;
  className?: string;
  layout?: PillLayout;
  align?: "center" | "start";
  density?: PillDensity;
  /** Attach to the scrollable `<nav>` (e.g. horizontal pill strip). */
  containerRef?: React.Ref<HTMLElement>;
}

function pillSizeClass(density: PillDensity) {
  return density === "compact"
    ? "min-h-9 px-4 py-2 text-sm"
    : "min-h-11 px-5 py-2.5 text-sm sm:min-h-12 sm:px-6 sm:py-3 sm:text-base";
}

const pillFocusClassName =
  "shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream";

function pillStyles(
  isActive: boolean,
  layout: PillLayout,
  align: "center" | "start",
  density: PillDensity
) {
  return cn(
    "inline-flex items-center rounded-full border font-medium tracking-tight transition-all duration-200",
    pillSizeClass(density),
    layout === "column" ? "w-full justify-start" : "justify-center",
    layout === "row" && align === "start" && "justify-start",
    isActive
      ? "border-brand-turquoise/40 bg-brand-turquoise/10 text-brand-turquoise-dark shadow-sm hover:border-brand-turquoise/50 hover:bg-brand-turquoise/15"
      : "border-brand-midnight/12 bg-white text-brand-midnight/75 shadow-sm hover:border-brand-turquoise/35 hover:bg-brand-turquoise/15 hover:text-brand-turquoise-dark hover:shadow-md"
  );
}

function navClassName(layout: PillLayout, align: "center" | "start", className?: string) {
  return cn(
    layout === "column" && "flex w-full flex-col gap-3",
    layout === "row-scroll" &&
      "flex w-full flex-nowrap gap-2 overflow-x-auto scroll-smooth [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden",
    layout === "row" &&
      cn(
        "mx-auto flex max-w-3xl flex-wrap gap-3",
        align === "start" ? "justify-start" : "justify-center"
      ),
    className
  );
}

/** Rounded category chips — shared by blog (links) and FAQ (buttons). */
export function CategoryFilterPills({
  items,
  ariaLabel,
  className,
  layout = "row",
  align = "center",
  density = "default",
  containerRef,
}: CategoryFilterPillsProps) {
  return (
    <nav
      ref={containerRef}
      aria-label={ariaLabel}
      className={navClassName(layout, align, className)}
    >
      {items.map(({ id, label, href, onSelect, isActive, pillRef }) => {
        if (href != null && onSelect == null) {
          return (
            <Link
              key={id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(pillFocusClassName, layout === "row-scroll" && "snap-start")}
            >
              <span className={pillStyles(isActive, layout, align, density)}>{label}</span>
            </Link>
          );
        }

        if (onSelect != null) {
          return (
            <button
              key={id}
              ref={pillRef}
              type="button"
              onClick={onSelect}
              aria-pressed={isActive}
              className={cn(pillFocusClassName, layout === "row-scroll" && "snap-start")}
            >
              <span className={pillStyles(isActive, layout, align, density)}>{label}</span>
            </button>
          );
        }

        return null;
      })}
    </nav>
  );
}
