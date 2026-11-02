"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COURSES } from "@/data/subjects";

export function SearchAndFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [selectedCourses, setSelectedCourses] = useState<string[]>(
		searchParams.get("courses")?.split(",") || [],
	);

	const handleSearch = (term: string) => {
		setSearch(term);
		updateURL(term, selectedCourses);
	};

	const handleCourseToggle = (courseId: string) => {
		const updatedCourses = selectedCourses.includes(courseId)
			? selectedCourses.filter((id) => id !== courseId)
			: [...selectedCourses, courseId];
		setSelectedCourses(updatedCourses);
		updateURL(search, updatedCourses);
	};

	const updateURL = (searchTerm: string, coursesToFilter: string[]) => {
		startTransition(() => {
			const params = new URLSearchParams();
			if (searchTerm) params.set("search", searchTerm);
			if (coursesToFilter.length > 0)
				params.set("courses", coursesToFilter.join(","));
			router.replace(`/subjects?${params.toString()}`, { scroll: false });
		});
	};

	const handleClear = () => {
		setSearch("");
		setSelectedCourses([]);
		router.replace("/subjects", { scroll: false });
	};

	return (
		<div className="flex-col gap-6 flex">
			<div className="flex flex-col gap-2">
				<header className="flex flex-col">
					<h2 className="text-accent-foreground font-medium text-lg">Buscar</h2>
					<span className="text-sm text-muted-foreground">
						Encontre tudo em um zap ⚡
					</span>
				</header>

				<Input
					placeholder="Pesquisar"
					type="search"
					value={search}
					onChange={(e) => handleSearch(e.target.value)}
					className="w-full"
				/>
			</div>

			<div className="md:flex flex-col gap-6 hidden">
				<header className="flex flex-col">
					<h2 className="text-accent-foreground font-medium text-lg">Curso</h2>
					<span className="text-sm text-muted-foreground">
						Filtre por curso
					</span>
				</header>

				<ScrollArea className="h-96">
					<ul className="flex flex-col gap-4">
						{Object.entries(COURSES).map(([id, name]) => (
							<li key={id} className="flex items-center gap-2">
								<Checkbox
									id={id}
									checked={selectedCourses.includes(id)}
									onCheckedChange={() => handleCourseToggle(id)}
								/>
								<Label htmlFor={id}>{name}</Label>
							</li>
						))}
					</ul>
				</ScrollArea>
			</div>

			<Button
				variant="outline"
				onClick={handleClear}
				disabled={isPending || (!search && selectedCourses.length === 0)}
			>
				Limpar filtros
			</Button>
		</div>
	);
}
