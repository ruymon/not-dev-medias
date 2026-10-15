"use client";

import { describeOutlook, GradeBadge } from "@/app/_components/grade-badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ListItem, listRowInteractiveClassName } from "@/components/ui/list";
import { calculateSubjectGrade, getSubjectOutlook } from "@/lib/grades";
import { cn } from "@/lib/utils";
import { SubjectGrades } from "@/types/grades";
import { Subject } from "@/types/subjects";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GradeInput } from "./grade-input";

interface SubjectGradesRowProps {
  subject: Subject;
  grades: SubjectGrades;
  onGradeChange: (examOrAssignment: string, grade: number | null) => void;
}

export function SubjectGradesRow({
  subject,
  grades,
  onGradeChange,
}: SubjectGradesRowProps) {
  // Rows only mount after the stores hydrate, on the client, so the hash is
  // safe to read here. It's how the home screen links straight to a subject.
  const [isOpen, setIsOpen] = useState(
    () => window.location.hash === `#${subject.code}`
  );
  const rowRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (window.location.hash === `#${subject.code}`) {
      rowRef.current?.scrollIntoView({ block: "start" });
    }
  }, [subject.code]);

  const outlook = getSubjectOutlook(calculateSubjectGrade(subject, grades));

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
    <ListItem ref={rowRef} id={subject.code} className="scroll-mt-20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group">
        <CollapsibleTrigger className={listRowInteractiveClassName}>
          <div className="flex min-w-0 flex-1 flex-col py-0.5">
            <span className="text-footnote text-muted-foreground">
              {subject.code}
            </span>
            <span className="text-body">{subject.name}</span>
            <span
              className={cn(
                "text-footnote",
                outlook.kind === "unreachable"
                  ? "text-grade-fail"
                  : "text-muted-foreground"
              )}
            >
              {describeOutlook(outlook)}
            </span>
          </div>

          <GradeBadge outlook={outlook} />
          <ChevronRightIcon
            aria-hidden
            className="-mr-1 size-4 shrink-0 text-tertiary-foreground transition-transform duration-200 group-data-[state=open]:rotate-90"
            strokeWidth={2.5}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="flex flex-col gap-5 px-4 pb-5 pt-1">
            {groups.map((group) => (
              <section key={group.label} className="flex flex-col gap-2.5">
                <h3 className="px-1 text-footnote text-muted-foreground">
                  {group.label} · {group.weight.toFixed(0)}% da média
                </h3>

                <div className="grid grid-cols-3 gap-x-2.5 gap-y-3 sm:grid-cols-4">
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
    </ListItem>
  );
}
