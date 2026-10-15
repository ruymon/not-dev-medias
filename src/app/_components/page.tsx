import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** A single readable column, with iOS's 20pt side margins on phones. */
export function Page({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full max-w-2xl flex-1 flex-col gap-9 px-5 pb-12 pt-6 md:px-6 md:pt-14",
        className
      )}
    >
      {children}
    </main>
  );
}

interface PageHeaderProps {
  /** Small line above the title, e.g. the app name on the home screen. */
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Trailing control aligned with the title, like a navigation bar button. */
  action?: ReactNode;
}

/** Large title header, the way iOS opens a top-level screen. */
export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        {eyebrow && (
          <p className="text-subheadline text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="text-balance text-large-title font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-pretty text-subheadline text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 pb-1">{action}</div>}
    </header>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <header className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-title2 font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-subheadline text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </header>
      {children}
    </section>
  );
}
