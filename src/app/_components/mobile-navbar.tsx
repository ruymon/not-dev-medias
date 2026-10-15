import { NAVBAR_ITEMS } from "@/config/navbar";
import { NavLink } from "./nav-link";

export function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 z-10 flex h-16 w-full justify-around border-t border-border/60 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
      {NAVBAR_ITEMS.map(({ href, icon, title }) => (
        <NavLink key={href} href={href}>
          {icon}
          <span>{title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
