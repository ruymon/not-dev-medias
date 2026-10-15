"use client";

import {
  calculateOverallAverage,
  calculateSubjectGrade,
  getGradeStatus,
} from "@/lib/grades";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { Grades } from "@/types/grades";
import { Subjects } from "@/types/subjects";
import { toast } from "sonner";
import { ExportGrades } from "./export-grades";
import { GradeValue } from "./grade-value";
import { ImportGradesButton } from "./import-grades-button";

interface OverviewPanelProps {
  subscribedSubjects: Subjects;
  grades: Grades;
}

export function OverviewPanel({
  subscribedSubjects,
  grades,
}: OverviewPanelProps) {
  const { setGrades } = useSubscribedSubjectsGradesStore();

  const { average, gradedCount, totalCount } = calculateOverallAverage(
    subscribedSubjects,
    grades
  );

  const handleClearGrades = () => {
    const previousGrades = grades;
    setGrades({});

    // Wiping every grade is destructive, so it stays undoable instead of
    // hiding behind a confirmation modal.
    toast("Notas limpas", {
      description: "Todos os valores lançados foram removidos.",
      action: {
        label: "Desfazer",
        onClick: () => setGrades(previousGrades),
      },
    });
  };

  const hasGrades = gradedCount > 0;

  return (
    <div className="flex flex-col gap-4 md:sticky md:top-24">
      <section className="rounded-xl border bg-card">
        <header className="flex flex-col gap-1 p-5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Média geral
          </span>

          <GradeValue
            grade={average}
            status={average === null ? null : getGradeStatus(average)}
            className="text-4xl font-medium"
          />

          <span className="text-xs text-muted-foreground">
            {hasGrades
              ? `${gradedCount} de ${totalCount} ${
                  totalCount === 1 ? "matéria" : "matérias"
                } com notas`
              : "Lance uma nota para ver sua média"}
          </span>
        </header>

        <ul className="flex flex-col border-t">
          {Object.values(subscribedSubjects).map((subject) => {
            const { grade, status } = calculateSubjectGrade(
              subject,
              grades[subject.code]
            );

            return (
              <li
                key={subject.code}
                className="flex items-center justify-between gap-3 border-b px-5 py-2.5 last:border-b-0"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {subject.code}
                  </span>
                  <span className="truncate text-xs text-foreground">
                    {subject.name}
                  </span>
                </div>

                <GradeValue
                  grade={grade}
                  status={status}
                  className="shrink-0 text-sm font-medium"
                />
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <ExportGrades />
          <ImportGradesButton />
        </div>

        <button
          type="button"
          onClick={handleClearGrades}
          disabled={!hasGrades}
          className="rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-grade-fail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
        >
          Limpar todas as notas
        </button>
      </div>
    </div>
  );
}
