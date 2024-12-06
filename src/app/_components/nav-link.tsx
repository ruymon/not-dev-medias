"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps extends LinkProps {
  children: ReactNode;
}

export function NavLink({ children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      data-state={isActive}
      className="data-[state=true]:border-primary flex-shrink text-xs md:text-sm data-[state=true]:text-primary text-center text-muted-foreground px-4 flex md:flex-row flex-col gap-1 md:gap-2 items-center justify-center border-b-2 border-transparent"
      {...props}
    >
      {children}
    </Link>
  );
}
