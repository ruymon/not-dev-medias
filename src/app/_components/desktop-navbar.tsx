import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { NAVBAR_ITEMS } from "@/config/navbar";

export function DesktopNavbar() {
  return (
    <div className="w-full h-16 bg-background/50 hidden backdrop-blur-xl sticky top-0 md:flex z-10">
      <header className="flex-1 container items-center flex justify-between">
        <span className="text-primary font-bold text-xl tracking-wide">
          Não é o Dev Médias
        </span>

        <nav className="h-full flex w-fit">
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
