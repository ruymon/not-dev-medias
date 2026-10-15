"use client";

import { NAVBAR_ITEMS } from "@/config/navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  // Icons are components, which can't cross the server/client boundary as
  // props, so the item is looked up here by href.
  href: string;
  /** `tab` is the bottom tab bar on phones, `bar` the desktop top bar. */
  variant: "tab" | "bar";
}

export function NavLink({ href, variant }: NavLinkProps) {
  const pathname = usePathname();
  const item = NAVBAR_ITEMS.find((navItem) => navItem.href === href);
  if (!item) return null;

  const isActive = pathname === item.href;
  const Icon = item.icon;

  if (variant === "tab") {
    return (
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-0.5 pt-1 text-[10px] font-medium leading-3 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          isActive ? "text-primary" : "text-muted-foreground active:opacity-60"
        )}
      >
        <Icon className="size-6" strokeWidth={isActive ? 2.25 : 1.75} />
        {item.title}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-subheadline transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? "bg-secondary font-medium text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="size-4" strokeWidth={isActive ? 2.25 : 1.75} />
      {item.title}
    </Link>
  );
}
