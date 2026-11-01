import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSubjectGrade } from "@/lib/grades";
import type { Grades } from "@/types/grades";
import type { Subjects } from "@/types/subjects";

interface GradeSummaryProps {
  subscribedSubjects: Subjects;
  grades: Grades;
}

export function GradeSummary({
  subscribedSubjects,
  grades,
}: GradeSummaryProps) {
  const subjects = Object.values(subscribedSubjects);

  return (
    <Card className="rounded-b-none">
      <CardHeader>
        <CardTitle>Visão geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {subjects.map((subject) => {
          const isSubjectGradesEmpty = !grades[subject.code];
          const subjectGrade = isSubjectGradesEmpty
            ? 0
            : calculateSubjectGrade(subject, grades[subject.code]);

          const badgeVariant: VariantProps<typeof badgeVariants>["variant"] =
            subjectGrade >= 6
              ? "success"
              : subjectGrade >= 5
                ? "warning"
                : "danger";
          return (
            <div
              key={subject.code}
              className="flex justify-between items-center"
            >
              <span>
                {subject.name} ({subject.code})
              </span>

              <Badge variant={badgeVariant}>{subjectGrade.toFixed(2)}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
