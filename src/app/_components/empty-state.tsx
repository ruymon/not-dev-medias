import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-xl border border-dashed border-border/80 px-6 py-16 text-center",
        className
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-full border bg-muted/40 text-muted-foreground">
        <Icon className="size-5" strokeWidth={1.75} />
      </div>

      <div className="flex max-w-sm flex-col gap-1.5">
        <h3 className="text-base font-medium tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}
