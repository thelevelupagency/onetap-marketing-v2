import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const cardShellBase =
  "flex h-full flex-col overflow-visible rounded-2xl transition-all duration-300 hover:-translate-y-1";

const cardShellLight = cn(
  cardShellBase,
  "border border-brand-midnight/5 bg-white shadow-sm hover:shadow-soft-diffusion"
);

const cardShellDark = cn(
  cardShellBase,
  "border border-white/10 bg-white/10 hover:bg-white/[0.14] hover:border-white/20"
);

type IconVariantProps = {
  variant: "icon";
  icon: React.ComponentType<{ className?: string }>;
  /** Switches to the frosted-glass dark palette for midnight-background sections. */
  onDark?: boolean;
  centerContent?: boolean;
  title: string;
  description: string;
};

type ImageVariantProps = {
  variant: "image";
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel: string;
  title: string;
  description: string;
};

export type MarketingCarouselCardProps = IconVariantProps | ImageVariantProps;

export function MarketingCarouselCard(props: MarketingCarouselCardProps) {
  if (props.variant === "image") {
    const { image, imageAlt, href, ctaLabel, title, description } = props;
    return (
      <Link href={href} className={cn(cardShellLight, "group")}>
        <div className="relative aspect-5/3 w-full shrink-0 overflow-hidden rounded-t-2xl bg-brand-cream">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-marketing-card-padding">
          <h3
            className={cn(
              typography.label,
              "mb-1.5 line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-brand-turquoise-dark"
            )}
          >
            {title}
          </h3>
          <p className={cn(typography.bodySm, "mb-4 flex-1 line-clamp-2 text-brand-midnight/65")}>
            {description}
          </p>
          <span className="mt-auto inline-flex shrink-0 items-center text-sm font-medium text-brand-midnight transition-colors group-hover:text-brand-turquoise-dark">
            {ctaLabel}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  const { icon: Icon, onDark = false, centerContent = false, title, description } = props;
  return (
    <div
      className={cn(
        onDark ? cardShellDark : cardShellLight,
        "p-marketing-card-padding",
        centerContent ? "items-center text-center" : "items-start text-left"
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
          onDark ? "bg-brand-turquoise/20" : "bg-brand-turquoise/10"
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6",
            onDark ? "text-brand-turquoise" : "text-brand-turquoise-dark"
          )}
        />
      </div>
      <h3
        className={cn(
          typography.label,
          "mb-1.5 text-base font-semibold leading-snug",
          onDark ? "text-brand-cream" : "text-brand-midnight"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          typography.bodySm,
          "line-clamp-3 leading-snug",
          onDark ? "text-brand-cream/70" : "text-brand-midnight/70",
          centerContent && "mx-auto max-w-xs"
        )}
      >
        {description}
      </p>
    </div>
  );
}
