import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-semibold transition-[background-color,opacity] active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // Named after iOS button styles: filled, tinted, gray and plain.
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        tinted: "bg-primary/15 text-primary hover:bg-primary/20",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80",
        plain: "text-primary hover:opacity-80",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 rounded-xl px-5 text-body",
        sm: "h-8 rounded-full px-3.5 text-subheadline [&_svg]:size-4",
        lg: "h-12 rounded-xl px-6 text-body",
        icon: "size-8 rounded-full [&_svg]:size-5",
        iconSm: "size-8 rounded-full [&_svg]:size-4",
        inline: "h-auto rounded-sm p-0 text-body font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
