"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { calculateSubjectGrade } from "@/lib/grades";
import { SubjectGrades } from "@/types/grades";
import { Subject } from "@/types/subjects";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { GradeInput } from "./grade-input";
import { GradeMeter, GradeValue, STATUS_LABEL } from "./grade-value";

interface SubjectGradesCardProps {
  subject: Subject;
  grades: SubjectGrades;
  onGradeChange: (examOrAssignment: string, grade: number | null) => void;
}

export function SubjectGradesCard({
  subject,
  grades,
  onGradeChange,
}: SubjectGradesCardProps) {
  // Entering grades is the whole point of this screen, so it starts open.
  const [isOpen, setIsOpen] = useState(true);

  const { grade, completion, status } = calculateSubjectGrade(subject, grades);

  const groups = [
    {
      label: "Provas",
      weight: subject.examWeight,
      items: subject.exams ?? [],
    },
    {
      label: "Trabalhos",
      weight: subject.assignmentWeight,
      items: subject.assignments ?? [],
    },
  ].filter((group) => group.weight > 0 && group.items.length > 0);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group rounded-xl border bg-card transition-colors hover:border-foreground/15"
    >
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-mono text-xs text-muted-foreground">
              {subject.code}
            </span>
            <h2 className="text-balance text-base font-medium leading-snug tracking-tight">
              {subject.name}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <div className="flex flex-col items-end">
              <GradeValue
                grade={grade}
                status={status}
                className="text-xl font-medium"
              />
              <span className="text-[11px] text-muted-foreground">
                {status ? STATUS_LABEL[status] : "Sem notas"}
              </span>
            </div>

            <CollapsibleTrigger
              aria-label={isOpen ? "Esconder notas" : "Mostrar notas"}
              className="ml-1 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-[state=closed]:-rotate-90" />
            </CollapsibleTrigger>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GradeMeter completion={completion} status={status} />
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {Math.round(completion * 100)}%
          </span>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="flex flex-col gap-5 border-t px-4 py-4 sm:px-5 sm:py-5">
          {groups.map((group) => (
            <section key={group.label} className="flex flex-col gap-3">
              <h3 className="flex items-baseline gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
                <span className="font-mono normal-case tracking-normal text-muted-foreground/70">
                  {group.weight.toFixed(0)}% da média
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <GradeInput
                    key={item.name}
                    id={`${subject.code}-${item.name}`}
                    name={item.name}
                    weight={item.weight}
                    value={grades[item.name]}
                    onChange={(value) => onGradeChange(item.name, value)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
