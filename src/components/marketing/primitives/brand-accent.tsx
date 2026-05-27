import { cn } from "@/lib/utils";

export function BrandAccent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("italic text-brand-turquoise", className)}>{children}</span>
  );
}
