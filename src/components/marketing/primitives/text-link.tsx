import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function TextLink({
  href,
  children,
  className,
  showArrow = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 font-medium text-brand-turquoise-dark hover:underline",
        className
      )}
    >
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4" /> : null}
    </Link>
  );
}
