import {
	ChartCandlestickIcon,
	HomeIcon,
	type LucideIcon,
	MedalIcon,
	SchoolIcon,
} from "lucide-react";
import type { Route } from "next";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
	{ title: "Home", href: "/", icon: HomeIcon },
	{ title: "Matérias", href: "/subjects", icon: SchoolIcon },
	{ title: "Minhas notas", href: "/grades", icon: ChartCandlestickIcon },
	{ title: "Insígnias", href: "/awards", icon: MedalIcon },
] satisfies { title: string; href: Route; icon: LucideIcon }[];

export function Navbar() {
	return (
		<header className="z-10 md:sticky md:top-0 md:h-16 md:w-full md:bg-background/50 md:backdrop-blur-xl">
			<div className="md:container md:flex md:h-full md:items-center md:justify-between">
				<span className="hidden text-primary font-bold text-xl tracking-wide md:inline">
					Não é o Dev Médias
				</span>

				<nav className="fixed inset-x-0 bottom-0 z-10 flex h-16 justify-around bg-background/50 backdrop-blur-xl md:static md:h-full md:w-fit md:bg-transparent md:backdrop-blur-none">
					{NAV_ITEMS.map(({ href, icon: Icon, title }) => (
						<NavLink key={href} href={href}>
							<Icon className="size-4" />
							<span>{title}</span>
						</NavLink>
					))}
				</nav>

				<div className="hidden md:block">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
