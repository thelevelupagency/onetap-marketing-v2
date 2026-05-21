import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LOGO_ICON, logoWordmarkSrc, type LogoTheme } from "@/lib/logos";

type LogoProps = {
  variant?: "icon" | "wordmark";
  theme?: LogoTheme;
  href?: string;
  className?: string;
  imageClassName?: string;
  alt?: string;
  priority?: boolean;
};

const WORDMARK_WIDTH = 140;
const WORDMARK_HEIGHT = 36;
const ICON_SIZE = 40;

export function Logo({
  variant = "wordmark",
  theme = "dark",
  href = "/",
  className,
  imageClassName,
  alt = "OneTap",
  priority = false,
}: LogoProps) {
  const isIcon = variant === "icon";
  const src = isIcon ? LOGO_ICON : logoWordmarkSrc(theme);
  const width = isIcon ? ICON_SIZE : WORDMARK_WIDTH;
  const height = isIcon ? ICON_SIZE : WORDMARK_HEIGHT;

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-9 w-auto shrink-0 object-contain", imageClassName)}
    />
  );

  if (!href) {
    return <div className={cn("flex items-center", className)}>{image}</div>;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex shrink-0 items-center transition-opacity hover:opacity-90",
        className,
      )}
    >
      {image}
    </Link>
  );
}
