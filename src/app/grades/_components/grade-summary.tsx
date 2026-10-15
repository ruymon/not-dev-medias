import { Badge, BadgeProps } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RequiredGradeStatus,
  calculateRequiredGrade,
  calculateSubjectGrade,
} from "@/lib/grades";
import { Grades } from "@/types/grades";
import { Subjects } from "@/types/subjects";

interface GradeSummaryProps {
  subscribedSubjects: Subjects;
  grades: Grades;
  targetGrade: number;
}

const requirementTextClass: Record<RequiredGradeStatus, string> = {
  "no-target": "",
  achieved: "text-emerald-500",
  possible: "text-yellow-600 dark:text-yellow-500",
  impossible: "text-red-500",
};

export function GradeSummary({
  subscribedSubjects,
  grades,
  targetGrade,
}: GradeSummaryProps) {
  const subjects = Object.values(subscribedSubjects);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Visão geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {subjects.map((subject) => {
          const subjectGrades = grades[subject.code] || {};
          const isSubjectGradesEmpty = !grades[subject.code];
          const subjectGrade = isSubjectGradesEmpty
            ? 0
            : calculateSubjectGrade(subject, subjectGrades);

          const badgeVariant: BadgeProps["variant"] =
            subjectGrade >= 6
              ? "success"
              : subjectGrade >= 5
              ? "warning"
              : "danger";

          const required = calculateRequiredGrade(
            subject,
            subjectGrades,
            targetGrade
          );

          let requirementText = "";
          if (required.status === "achieved") {
            requirementText = "Meta garantida";
          } else if (required.status === "possible") {
            requirementText = `Precisa de ${required.requiredPerItem.toFixed(
              2
            )} em cada item restante`;
          } else if (required.status === "impossible") {
            requirementText = `Meta inatingível (máx. ${required.maxGrade.toFixed(
              2
            )})`;
          }

          return (
            <div
              key={subject.code}
              className="flex flex-col gap-0.5"
            >
              <div className="flex justify-between items-center">
                <span>
                  {subject.name} ({subject.code})
                </span>

                <Badge variant={badgeVariant}>{subjectGrade.toFixed(2)}</Badge>
              </div>

              {requirementText && (
                <span
                  className={`text-xs ${
                    requirementTextClass[required.status]
                  }`}
                >
                  {requirementText}
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
