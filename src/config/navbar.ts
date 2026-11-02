import {
  ChartCandlestickIcon,
  HomeIcon,
  type LucideIcon,
  MedalIcon,
  SchoolIcon,
} from "lucide-react";
import type { Route } from "next";

interface NavbarItem {
  title: string;
  href: Route;
  icon: LucideIcon;
}

export const NAVBAR_ITEMS: NavbarItem[] = [
  { title: "Home", href: "/", icon: HomeIcon },
  { title: "Matérias", href: "/subjects", icon: SchoolIcon },
  { title: "Minhas notas", href: "/grades", icon: ChartCandlestickIcon },
  { title: "Insígnias", href: "/awards", icon: MedalIcon },
];
