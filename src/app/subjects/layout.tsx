import type { ReactNode } from "react";

export default function SubjectsLayout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col md:flex-row py-8 container md:gap-16 gap-8">
			{children}
		</main>
	);
}
