import { NAVBAR_ITEMS } from "@/config/navbar";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function DesktopNavbar() {
  return (
    <div className="sticky top-0 z-20 hidden h-14 w-full border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-150 md:flex">
      <header className="container flex flex-1 items-center justify-between">
        <Link
          href="/"
          className="rounded-sm text-body font-semibold text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Não é o Dev Médias
        </Link>

        <nav className="flex items-center gap-1">
          {NAVBAR_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} variant="bar" />
          ))}
        </nav>

        <ThemeToggle />
      </header>
    </div>
  );
}
