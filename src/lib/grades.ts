import { Grades, SubjectGrades } from "@/types/grades";
import { Subject, Subjects } from "@/types/subjects";

export type GradeStatus = "pass" | "warn" | "fail";

export interface SubjectGradeSummary {
  /**
   * Weighted grade counting every unfilled item as zero — the média you'd end
   * up with if nothing else were graded. `null` while the subject is untouched,
   * so the UI can say "sem notas" instead of showing a failing 0.00.
   */
  grade: number | null;
  /** Share of the subject's total weight that already has a grade, 0 to 1. */
  completion: number;
  status: GradeStatus | null;
}

const PASSING_GRADE = 6;
const AT_RISK_GRADE = 5;

export function getGradeStatus(grade: number): GradeStatus {
  if (grade >= PASSING_GRADE) return "pass";
  if (grade >= AT_RISK_GRADE) return "warn";
  return "fail";
}

/** Weighted sum of one group (exams or assignments) and how much of it is filled. */
function reduceGroup(
  items: Subject["exams"],
  subjectGrades: SubjectGrades
): { total: number; filled: number } {
  return items.reduce(
    (acc, item) => {
      const grade = subjectGrades[item.name];
      const hasGrade = typeof grade === "number" && !Number.isNaN(grade);

      return {
        total: acc.total + (hasGrade ? grade * item.weight : 0),
        filled: acc.filled + (hasGrade ? item.weight : 0),
      };
    },
    { total: 0, filled: 0 }
  );
}

export function calculateSubjectGrade(
  subject: Subject,
  subjectGrades: SubjectGrades = {}
): SubjectGradeSummary {
  const exams = reduceGroup(subject.exams ?? [], subjectGrades);
  const assignments = reduceGroup(subject.assignments ?? [], subjectGrades);

  const examShare = subject.examWeight / 100;
  const assignmentShare = subject.assignmentWeight / 100;

  const completion =
    exams.filled * examShare + assignments.filled * assignmentShare;

  if (completion === 0) {
    return { grade: null, completion: 0, status: null };
  }

  const grade = exams.total * examShare + assignments.total * assignmentShare;

  return {
    grade,
    completion: Math.min(completion, 1),
    status: getGradeStatus(grade),
  };
}

/** Average across the subjects that have at least one grade entered. */
export function calculateOverallAverage(
  subscribedSubjects: Subjects,
  grades: Grades
): { average: number | null; gradedCount: number; totalCount: number } {
  const subjects = Object.values(subscribedSubjects);

  const gradedSubjects = subjects
    .map((subject) => calculateSubjectGrade(subject, grades[subject.code]))
    .filter((summary) => summary.grade !== null);

  if (gradedSubjects.length === 0) {
    return { average: null, gradedCount: 0, totalCount: subjects.length };
  }

  const sum = gradedSubjects.reduce(
    (total, summary) => total + (summary.grade ?? 0),
    0
  );

  return {
    average: sum / gradedSubjects.length,
    gradedCount: gradedSubjects.length,
    totalCount: subjects.length,
  };
}
