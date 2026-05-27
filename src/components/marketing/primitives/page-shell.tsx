import { cn } from "@/lib/utils";

export function PageShell({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col bg-brand-cream pt-32 pb-24",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
