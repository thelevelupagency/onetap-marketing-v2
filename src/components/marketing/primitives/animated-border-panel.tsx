import { cn } from "@/lib/utils";

export function AnimatedBorderPanel({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "animated-border-panel relative overflow-hidden rounded-3xl p-[5px]",
        className
      )}
    >
      <div className="animated-border-panel-ring" aria-hidden />
      <div
        className={cn(
          "relative z-10 rounded-[calc(1.5rem-5px)] bg-brand-midnight",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
