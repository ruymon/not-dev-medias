import { Separator } from "@/components/ui/separator";
import { Subject } from "@/types/subjects";
import { Fragment } from "react";
import { SearchAndFilter } from "./_components/search-and-filter";
import { SubjectCard } from "./_components/subject-card";
import { SUBJECTS } from "@/data/subjects";

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
  const searchTerm = search?.toLowerCase();

  const filteredSubjects = subjectsArray.filter((subject: Subject) => {
    const matchesSearch =
      !searchTerm ||
      subject.name.toLowerCase().includes(searchTerm) ||
      subject.code.toLowerCase().includes(searchTerm);

    const matchesCourse =
      selectedCourses.length === 0 || selectedCourses.includes(subject.course);

    return matchesSearch && matchesCourse;
  });

  return (
    <>
      <aside className="flex flex-col gap-8 md:max-w-80 md:flex-1 h-fit md:sticky md:top-[calc(4rem+2rem)] bg-background">
        <header className="flex flex-col gap-1 md:py-0 pt-4">
          <h1 className="text-primary font-bold text-4xl md:text-3xl">
            Matérias{" "}
            <span className="font-normal text-base text-muted-foreground">
              ({filteredSubjects.length})
            </span>
          </h1>
          <span className="text-accent-foreground">
            Veja todas as matérias disponíveis
          </span>
        </header>

        <SearchAndFilter subjects={subjectsArray} />
      </aside>

      <ul className="flex flex-col flex-1 gap-2">
        {filteredSubjects.map((subject: Subject) => {
          return (
            <Fragment key={subject.code}>
              <SubjectCard {...subject} />
              <Separator className="bg-muted" />
            </Fragment>
          );
        })}

        {filteredSubjects.length === 0 && (
          <div className="w-full py-4 flex-col flex items-center justify-center">
            <h3 className="text-lg font-medium text-accent-foreground">
              Eita... Algo deu errado.
            </h3>
            <span className="text-muted-foreground text-sm font-normal">
              Nenhuma matéria encontrada com os filtros aplicados.
            </span>
          </div>
        )}
      </ul>
    </>
  );
}
