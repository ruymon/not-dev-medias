import { SubjectGrades } from "@/types/grades";
import { Subject } from "@/types/subjects";

export type GradeStatus = "pass" | "warn" | "fail";

export const PASSING_GRADE = 6;
const AT_RISK_GRADE = 5;
const MAX_GRADE = 10;

export interface SubjectGradeSummary {
  /**
   * Weighted grade counting every unfilled item as zero — the points already
   * banked. `null` while the subject is untouched.
   */
  grade: number | null;
  /** Share of the subject's total weight that already has a grade, 0 to 1. */
  completion: number;
  /** Points (0–10 scale) banked from exams and from assignments. */
  examPoints: number;
  assignmentPoints: number;
}

/**
 * Where a subject stands, in the terms a student cares about: is it over,
 * and if not, what do I still need?
 */
export type SubjectOutlook =
  | { kind: "empty" }
  /** Everything is graded. */
  | { kind: "final"; grade: number; status: GradeStatus }
  /** Points already banked reach 6, whatever comes next. */
  | { kind: "secured"; grade: number }
  /** `average` is the média of what's graded so far; `needed` is the average
      the ungraded items must reach for a 6. */
  | { kind: "pending"; average: number; needed: number }
  /** Not even 10 on everything left gets to 6. */
  | { kind: "unreachable"; average: number };

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

  const completion = Math.min(
    exams.filled * examShare + assignments.filled * assignmentShare,
    1
  );
  const examPoints = exams.total * examShare;
  const assignmentPoints = assignments.total * assignmentShare;

  return {
    grade: completion === 0 ? null : examPoints + assignmentPoints,
    completion,
    examPoints,
    assignmentPoints,
  };
}

// Weights like 1/3 never sum to exactly 1.
const EPSILON = 1e-6;

export function getSubjectOutlook(summary: SubjectGradeSummary): SubjectOutlook {
  const { grade, completion } = summary;

  if (grade === null) return { kind: "empty" };

  if (completion >= 1 - EPSILON) {
    return { kind: "final", grade, status: getGradeStatus(grade) };
  }

  if (grade >= PASSING_GRADE - EPSILON) return { kind: "secured", grade };

  const average = grade / completion;
  const needed = (PASSING_GRADE - grade) / (1 - completion);

  if (needed > MAX_GRADE + EPSILON) return { kind: "unreachable", average };

  return { kind: "pending", average, needed };
}

/** Whether the subject is below 6 or still has ground to cover to get there. */
export function needsAttention(outlook: SubjectOutlook) {
  return (
    outlook.kind === "pending" ||
    outlook.kind === "unreachable" ||
    (outlook.kind === "final" && outlook.status !== "pass")
  );
}

const gradeFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * One decimal, Brazilian style ("5,9"). Rounds toward the safe side so a
 * displayed grade never contradicts its status: a 5.96 shows as 5,9 rather
 * than a "6,0" that hasn't passed, and a needed 7.21 shows as 7,3.
 */
export function formatGrade(value: number, round: "down" | "up" = "down") {
  const scaled = value * 10;
  const rounded =
    round === "down"
      ? Math.floor(scaled + EPSILON)
      : Math.ceil(scaled - EPSILON);
  return gradeFormatter.format(rounded / 10);
}
