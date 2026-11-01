import type { SubjectGrades } from "@/types/grades";
import type { Subject } from "@/types/subjects";

export function calculateSubjectGrade(
	subject: Subject,
	subjectGrades: SubjectGrades,
): number {
	const isSubjectGradesEmpty = Object.keys(subjectGrades).length === 0;
	if (isSubjectGradesEmpty) return 0;

	const examGrade = subject.exams.reduce((total, exam) => {
		return total + (subjectGrades[exam.name] || 0) * exam.weight;
	}, 0);

	const assignmentGrade = subject.assignments.reduce((total, assignment) => {
		return total + (subjectGrades[assignment.name] || 0) * assignment.weight;
	}, 0);

	return (
		(examGrade * subject.examWeight) / 100 +
		(assignmentGrade * subject.assignmentWeight) / 100
	);
}
