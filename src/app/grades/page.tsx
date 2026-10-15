"use client";

import { EmptyState } from "@/app/_components/empty-state";
import { Page, PageHeader } from "@/app/_components/page";
import { Button } from "@/components/ui/button";
import { List } from "@/components/ui/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/hooks/use-hydrated";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { BookOpenIcon } from "lucide-react";
import Link from "next/link";
import { GradesActionsMenu } from "./_components/grades-actions-menu";
import { SubjectGradesRow } from "./_components/subject-grades-row";

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
    <Page>
      <PageHeader
        title="Notas"
        description="Toque numa matéria para lançar o que já saiu."
        action={hydrated && <GradesActionsMenu />}
      />

      {!hydrated ? (
        <Skeleton className="h-72 w-full rounded-lg" />
      ) : subjects.length === 0 ? (
        <EmptyState
          icon={BookOpenIcon}
          title="Nenhuma matéria ainda"
          description="Escolha as matérias que você está cursando e elas aparecem aqui para você lançar as notas."
          action={
            <Button asChild size="sm" variant="tinted">
              <Link href="/subjects">Escolher matérias</Link>
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-2">
          <List>
            {subjects.map((subject) => (
              <SubjectGradesRow
                key={subject.code}
                subject={subject}
                grades={grades[subject.code] ?? {}}
                onGradeChange={(examOrAssignment, grade) =>
                  handleGradeChange(subject.code, examOrAssignment, grade)
                }
              />
            ))}
          </List>
          <p className="px-4 text-footnote text-muted-foreground">
            Para passar, a média precisa chegar a 6. Tudo fica salvo neste
            aparelho, inclusive sem internet.
          </p>
        </div>
      )}
    </Page>
  );
}
