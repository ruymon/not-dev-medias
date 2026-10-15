import {
  ChartColumnIcon,
  HouseIcon,
  LibraryBigIcon,
  MedalIcon,
  type LucideIcon,
} from "lucide-react";

export interface NavbarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const NAVBAR_ITEMS: NavbarItem[] = [
  { title: "Resumo", href: "/", icon: HouseIcon },
  { title: "Matérias", href: "/subjects", icon: LibraryBigIcon },
  { title: "Notas", href: "/grades", icon: ChartColumnIcon },
  { title: "Insígnias", href: "/awards", icon: MedalIcon },
];
