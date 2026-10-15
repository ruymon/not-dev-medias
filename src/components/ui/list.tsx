import { cn } from "@/lib/utils";
import type * as React from "react";

/**
 * Inset grouped list, after iOS. Rows are separated by a hairline that starts
 * at the content's leading edge instead of running the full width.
 */
function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("overflow-hidden rounded-lg bg-card", className)}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "relative after:absolute after:bottom-0 after:left-4 after:right-0 after:h-px after:bg-border last:after:hidden",
        className
      )}
      {...props}
    />
  );
}

/** Shared padding and press feedback for a row's content. */
const listRowClassName =
  "flex w-full min-h-11 items-center gap-3 px-4 py-2.5 text-left";

/** For rows that act as a button or link. */
const listRowInteractiveClassName = cn(
  listRowClassName,
  "transition-colors active:bg-foreground/5 hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:bg-foreground/5"
);

export { List, ListItem, listRowClassName, listRowInteractiveClassName };
