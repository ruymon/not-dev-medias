import {
  ChartCandlestickIcon,
  HomeIcon,
  MedalIcon,
  SchoolIcon,
} from "lucide-react";

export const NAVBAR_ITEMS = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className="w-4" />,
  },
  {
    title: "Matérias",
    href: "/subjects",
    icon: <SchoolIcon className="w-4" />,
  },
  {
    title: "Minhas notas",
    href: "/grades",
    icon: <ChartCandlestickIcon className="w-4" />,
  },
  {
    title: "Insígnias",
    href: "/awards",
    icon: <MedalIcon className="w-4" />,
  },
];
