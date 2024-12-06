import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";
import { FileIcon, GitGraphIcon, HomeIcon, MedalIcon } from "lucide-react";
import { NAVBAR_ITEMS } from "@/config/navbar";

export function MobileNavbar() {
  return (
    <nav className="w-full h-16 container bg-background/50 md:hidden backdrop-blur-xl fixed bottom-0 z-10 flex justify-between">
      {NAVBAR_ITEMS.map(({ href, icon, title }) => (
        <NavLink key={href} href={href}>
          {icon}
          <span>{title}</span>
        </NavLink>
      ))}
    </nav>
  );
}
