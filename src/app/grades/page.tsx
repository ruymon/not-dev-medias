"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { Fragment } from "react";
import { ExportGrades } from "./_components/export-grades";
import { GradeSummary } from "./_components/grade-summary";
import { ImportGradesButton } from "./_components/import-grades-button";
import { SubjectGradesInputCard } from "./_components/subject-grades-input-card";

export default function GradesPage() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const { grades, setGrades } = useSubscribedSubjectsGradesStore();

  const handleGradeChange = (
    subjectCode: string,
    examOrAssignment: string,
    grade: number
  ) => {
    const updatedGrades = {
      ...grades,
      [subjectCode]: {
        ...grades[subjectCode],
        [examOrAssignment]: grade,
      },
    };
    setGrades(updatedGrades);
  };

  const handleClearGrades = () => {
    setGrades({});
  };

  const isSubscribedSubjectsEmpty =
    Object.keys(subscribedSubjects).length === 0;

  return (
    <main className="flex py-8 container gap-16 flex-col md:flex-row">
      <aside className="flex flex-col md:max-w-[30%]">
        {Object.keys(subscribedSubjects).length > 0 && (
          <>
            <GradeSummary
              subscribedSubjects={subscribedSubjects}
              grades={grades}
            />
            <Button
              onClick={handleClearGrades}
              variant="outline"
              size="lg"
              className="rounded-none"
            >
              Limpar valores
            </Button>
            <ExportGrades />
            <ImportGradesButton />
          </>
        )}
      </aside>

      <ul className="flex flex-col flex-1 gap-2">
        {Object.values(subscribedSubjects).map((subject) => (
          <Fragment key={subject.code}>
            <SubjectGradesInputCard
              subject={subject}
              grades={grades[subject.code] || {}}
              onGradeChange={(examOrAssignment, grade) =>
                handleGradeChange(subject.code, examOrAssignment, grade)
              }
            />
            <Separator className="bg-muted" />
          </Fragment>
        ))}

        {isSubscribedSubjectsEmpty && (
          <span className="text-center text-muted-foreground">
            Você não tem nenhuma matéria inscrita ainda... Adicione matérias
            para começar a adicionar notas!
          </span>
        )}
      </ul>
    </main>
  );
}
