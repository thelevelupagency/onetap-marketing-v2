import { cn } from "@/lib/utils";

export function FeatureGrid({
  columns = 3,
  className,
  children,
}: {
  columns?: 2 | 3;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-8",
        columns === 3 && "md:grid-cols-3",
        columns === 2 && "md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
}
