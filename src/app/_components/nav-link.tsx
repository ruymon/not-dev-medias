"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 px-4 text-center text-xs transition-colors md:flex-row md:gap-2 md:text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}

      {/* The indicator sits under the label on desktop and above it on the
          mobile bar, which is docked to the bottom of the screen. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-2 h-0.5 rounded-full transition-colors top-0 md:top-auto md:bottom-0",
          isActive ? "bg-primary" : "bg-transparent"
        )}
      />
    </Link>
  );
}
