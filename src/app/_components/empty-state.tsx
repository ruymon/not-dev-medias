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
        "flex flex-col items-center justify-center gap-4 px-6 py-16 text-center",
        className
      )}
    >
      <Icon
        className="size-12 text-tertiary-foreground"
        strokeWidth={1.5}
        aria-hidden
      />

      <div className="flex max-w-xs flex-col gap-1">
        <h2 className="text-title3 font-semibold">{title}</h2>
        <p className="text-pretty text-subheadline text-muted-foreground">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}
