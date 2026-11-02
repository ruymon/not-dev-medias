import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { calculateSubjectGrade, formatGrade } from "@/lib/grades";
import type { Grades } from "@/types/grades";
import type { Subject } from "@/types/subjects";

interface GradeSummaryProps {
	subjects: Subject[];
	grades: Grades;
	children: React.ReactNode;
}

export function GradeSummary({
	subjects,
	grades,
	children,
}: GradeSummaryProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Visão geral</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{subjects.map((subject) => {
					const subjectGrade = calculateSubjectGrade(
						subject,
						grades[subject.code],
					);

					const passingTone =
						subjectGrade >= 6
							? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
							: subjectGrade >= 5
								? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
								: undefined;
					return (
						<div
							key={subject.code}
							className="flex justify-between items-center"
						>
							<span>
								{subject.name} ({subject.code})
							</span>

							<Badge
								variant={passingTone ? "secondary" : "destructive"}
								className={passingTone}
							>
								{formatGrade(subjectGrade)}
							</Badge>
						</div>
					);
				})}
			</CardContent>
			<CardFooter className="flex-col items-stretch gap-2">
				{children}
			</CardFooter>
		</Card>
	);
}
