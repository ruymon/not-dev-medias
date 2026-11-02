"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface NavLinkProps {
	href: Route;
	children: ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
	const pathname = usePathname();

	return (
		<Link
			aria-current={pathname === href ? "page" : undefined}
			className="aria-[current=page]:border-primary text-xs md:text-sm aria-[current=page]:text-primary text-center text-muted-foreground px-4 flex md:flex-row flex-col gap-1 md:gap-2 items-center justify-center border-b-2 border-transparent"
			href={href}
		>
			{children}
		</Link>
	);
}
