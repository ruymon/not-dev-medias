import type { SubjectGrades } from "@/types/grades";
import type { AssessmentGroup, Subject } from "@/types/subjects";

export function calculateSubjectGrade(
	subject: Subject,
	grades: SubjectGrades = {},
): number {
	return (
		groupGrade(subject.exams, grades) + groupGrade(subject.assignments, grades)
	);
}

function groupGrade(
	group: AssessmentGroup | undefined,
	grades: SubjectGrades,
): number {
	if (!group) return 0;

	const total = Object.entries(group.items).reduce(
		(sum, [name, weight]) => sum + weight * (grades[name] || 0),
		0,
	);
	return group.weight * total;
}

export function formatGrade(grade: number): string {
	return (Math.round(grade * 100 + 1e-6) / 100).toFixed(2);
}

export function assessmentGroups(subject: Subject) {
	return [
		{ label: "Provas", group: subject.exams },
		{ label: "Trabalhos", group: subject.assignments },
	].filter(
		(entry): entry is { label: string; group: AssessmentGroup } =>
			entry.group !== undefined,
	);
}
