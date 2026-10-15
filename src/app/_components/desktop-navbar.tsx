import { NAVBAR_ITEMS } from "@/config/navbar";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function DesktopNavbar() {
  return (
    <div className="sticky top-0 z-10 hidden h-16 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl md:flex">
      <header className="container flex flex-1 items-center justify-between">
        <Link
          href="/"
          className="rounded-sm text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Não é o Dev Médias
        </Link>

        <nav className="flex h-full w-fit">
          {NAVBAR_ITEMS.map(({ href, icon, title }) => (
            <NavLink key={href} href={href}>
              {icon}
              <span>{title}</span>
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </header>
    </div>
  );
}
