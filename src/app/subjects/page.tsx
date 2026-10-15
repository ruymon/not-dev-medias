import { EmptyState } from "@/app/_components/empty-state";
import { SUBJECTS } from "@/data/subjects";
import { matchesSearch } from "@/lib/search";
import { Subject } from "@/types/subjects";
import { SearchXIcon } from "lucide-react";
import { SearchAndFilter } from "./_components/search-and-filter";
import { SelectedSubjectsLink } from "./_components/selected-subjects-link";
import { SubjectCard } from "./_components/subject-card";

interface SubjectsPageProps {
  // Next.js 15+ resolves request data lazily, so `searchParams` is a promise.
  searchParams: Promise<{ search?: string; courses?: string }>;
}

export default async function SubjectsPage({
  searchParams,
}: SubjectsPageProps) {
  const { search, courses } = await searchParams;

  const subjectsArray = Object.values(SUBJECTS);
  const selectedCourses = courses ? courses.split(",") : [];
  const searchTerm = search?.trim();

  const filteredSubjects = subjectsArray.filter((subject: Subject) => {
    // Accent-insensitive, so "calculo" finds "Cálculo".
    const matchesTerm =
      !searchTerm ||
      matchesSearch(subject.name, searchTerm) ||
      matchesSearch(subject.code, searchTerm);

    const matchesCourse =
      selectedCourses.length === 0 || selectedCourses.includes(subject.course);

    return matchesTerm && matchesCourse;
  });

  return (
    <>
      <aside className="flex h-fit flex-col gap-8 bg-background md:sticky md:top-24 md:max-w-80 md:flex-1">
        <header className="flex flex-col gap-1 pt-4 md:py-0">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Matérias{" "}
            <span className="font-mono text-base font-normal text-muted-foreground">
              {filteredSubjects.length}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha as matérias que você está cursando.
          </p>
        </header>

        <SearchAndFilter subjects={subjectsArray} />

        <SelectedSubjectsLink />
      </aside>

      <ul className="flex min-w-0 flex-1 flex-col gap-3">
        {filteredSubjects.map((subject: Subject) => (
          <li key={subject.code}>
            <SubjectCard {...subject} />
          </li>
        ))}

        {filteredSubjects.length === 0 && (
          <li>
            <EmptyState
              icon={SearchXIcon}
              title="Nenhuma matéria encontrada"
              description="Tente outro termo de busca ou remova alguns filtros de curso."
            />
          </li>
        )}
      </ul>
    </>
  );
}
