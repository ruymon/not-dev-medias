import type { Metadata } from "next";
import { Suspense } from "react";
import { filterSubjects, parseSubjectsFilter } from "@/lib/subjects";
import { SearchAndFilter } from "./_components/search-and-filter";
import { SearchAndFilterSkeleton } from "./_components/search-and-filter-skeleton";
import { SubjectCard } from "./_components/subject-card";
import { SubjectCardSkeleton } from "./_components/subject-card-skeleton";

export const metadata: Metadata = {
	title: "Matérias",
};

export const instant = true;

type SearchParams = PageProps<"/subjects">["searchParams"];

// Not async: only the parts that read `searchParams` wait for the request, so
// the header, sidebar and fallbacks all land in the static shell.
export default function SubjectsPage({ searchParams }: PageProps<"/subjects">) {
	return (
		<>
			<aside className="flex flex-col gap-8 md:max-w-80 md:flex-1 h-fit md:sticky md:top-[calc(4rem+2rem)] bg-background">
				<header className="flex flex-col gap-1 md:py-0 pt-4">
					<h1 className="text-primary font-bold text-4xl md:text-3xl">
						Matérias{" "}
						<span className="font-normal text-base text-muted-foreground">
							(
							<Suspense fallback="-">
								<SubjectsCount searchParams={searchParams} />
							</Suspense>
							)
						</span>
					</h1>
					<span className="text-accent-foreground">
						Veja todas as matérias disponíveis
					</span>
				</header>

				<Suspense fallback={<SearchAndFilterSkeleton />}>
					<SearchAndFilter />
				</Suspense>
			</aside>

			<ul className="flex flex-col flex-1 gap-3">
				<Suspense fallback={<SubjectsListSkeleton />}>
					<SubjectsList searchParams={searchParams} />
				</Suspense>
			</ul>
		</>
	);
}

async function SubjectsCount({ searchParams }: { searchParams: SearchParams }) {
	const subjects = await filterSubjects(
		parseSubjectsFilter(await searchParams),
	);
	return subjects.length;
}

async function SubjectsList({ searchParams }: { searchParams: SearchParams }) {
	const filter = parseSubjectsFilter(await searchParams);
	const subjects = await filterSubjects(filter);

	if (subjects.length === 0) {
		return (
			<li className="w-full py-4 flex-col flex items-center justify-center">
				<h3 className="text-lg font-medium text-accent-foreground">
					Eita... Algo deu errado.
				</h3>
				<span className="text-muted-foreground text-sm font-normal">
					Nenhuma matéria encontrada com os filtros aplicados.
				</span>
			</li>
		);
	}

	return subjects.map((subject) => (
		<li key={subject.code}>
			<SubjectCard subject={subject} searchTerm={filter.search} />
		</li>
	));
}

function SubjectsListSkeleton() {
	return Array.from({ length: 10 }).map((_, index) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
		<li key={index} className="group">
			<SubjectCardSkeleton />
		</li>
	));
}
