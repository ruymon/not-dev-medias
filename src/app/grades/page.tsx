"use client";

import { EmptyState } from "@/app/_components/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/hooks/use-hydrated";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { OverviewPanel } from "./_components/overview-panel";
import { SubjectGradesCard } from "./_components/subject-grades-card";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function GradesPage() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const { grades, setGrades } = useSubscribedSubjectsGradesStore();
  const hydrated = useHydrated();

  const handleGradeChange = (
    subjectCode: string,
    examOrAssignment: string,
    grade: number | null
  ) => {
    const subjectGrades = { ...grades[subjectCode] };

    if (grade === null || Number.isNaN(grade)) {
      delete subjectGrades[examOrAssignment];
    } else {
      subjectGrades[examOrAssignment] = clamp(grade, 0, 10);
    }

    setGrades({ ...grades, [subjectCode]: subjectGrades });
  };

  const subjects = Object.values(subscribedSubjects);

  return (
    <main className="container flex w-full flex-col gap-8 py-8 md:py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Minhas notas
        </h1>
        <p className="text-sm text-muted-foreground">
          Lance o que já saiu e acompanhe onde você está em cada matéria.
        </p>
      </header>

      {!hydrated ? (
        <GradesSkeleton />
      ) : subjects.length === 0 ? (
        <EmptyState
          icon={BookOpenIcon}
          title="Nenhuma matéria ainda"
          description="Escolha as matérias que você está cursando e elas aparecem aqui para você lançar as notas."
          action={
            <Button asChild size="sm">
              <Link href="/subjects">Escolher matérias</Link>
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:gap-12">
          <ul className="flex min-w-0 flex-1 flex-col gap-3">
            {subjects.map((subject) => (
              <li key={subject.code}>
                <SubjectGradesCard
                  subject={subject}
                  grades={grades[subject.code] ?? {}}
                  onGradeChange={(examOrAssignment, grade) =>
                    handleGradeChange(subject.code, examOrAssignment, grade)
                  }
                />
              </li>
            ))}
          </ul>

          <aside className="w-full shrink-0 md:max-w-xs">
            <OverviewPanel
              subscribedSubjects={subscribedSubjects}
              grades={grades}
            />
          </aside>
        </div>
      )}
    </main>
  );
}

function GradesSkeleton() {
  return (
    <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:gap-12">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full rounded-xl" />
        ))}
      </div>
      <div className="w-full shrink-0 md:max-w-xs">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}
