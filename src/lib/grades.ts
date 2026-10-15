import { SubjectGrades } from "@/types/grades";
import { Subject } from "@/types/subjects";

export function calculateSubjectGrade(
  subject: Subject,
  subjectGrades: SubjectGrades
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

const EPSILON = 1e-9;

export type RequiredGradeStatus =
  | "no-target"
  | "achieved"
  | "possible"
  | "impossible";

export interface RequiredGradeResult {
  status: RequiredGradeStatus;
  /** Uniform grade needed on every still-blank item to hit the target. */
  requiredPerItem: number;
  /** Final grade if every blank item scored 0. */
  currentGrade: number;
  /** Highest final grade still reachable (blank items scored 10). */
  maxGrade: number;
  /** Names of the blank, weight-bearing items the requirement applies to. */
  remainingItems: string[];
}

/**
 * Each individual grade contributes linearly to the final grade:
 *
 *   coeff(item) = item.weight * (examWeight | assignmentWeight) / 100
 *   final       = sum( grade(item) * coeff(item) )   // coeffs sum to 1
 *
 * Keeping the grades already entered fixed, we solve for a single score `x`
 * applied to every item still blank:
 *
 *   x = (target - knownContribution) / remainingCoeff
 *
 * A grade of 0 counts as "not entered" here, matching how the inputs render.
 */
export function calculateRequiredGrade(
  subject: Subject,
  subjectGrades: SubjectGrades,
  targetGrade: number
): RequiredGradeResult {
  const items: { name: string; coeff: number }[] = [];

  if (subject.examWeight > 0 && subject.exams) {
    for (const exam of subject.exams) {
      items.push({
        name: exam.name,
        coeff: (exam.weight * subject.examWeight) / 100,
      });
    }
  }

  if (subject.assignmentWeight > 0 && subject.assignments) {
    for (const assignment of subject.assignments) {
      items.push({
        name: assignment.name,
        coeff: (assignment.weight * subject.assignmentWeight) / 100,
      });
    }
  }

  let knownContribution = 0;
  let remainingCoeff = 0;
  const remainingItems: string[] = [];

  for (const item of items) {
    const grade = subjectGrades[item.name];
    const isEntered = typeof grade === "number" && grade > 0;

    if (isEntered) {
      knownContribution += grade * item.coeff;
    } else if (item.coeff > EPSILON) {
      remainingCoeff += item.coeff;
      remainingItems.push(item.name);
    }
  }

  const currentGrade = knownContribution;
  const maxGrade = knownContribution + remainingCoeff * 10;

  if (!targetGrade || targetGrade <= 0) {
    return {
      status: "no-target",
      requiredPerItem: 0,
      currentGrade,
      maxGrade,
      remainingItems,
    };
  }

  if (remainingItems.length === 0) {
    return {
      status: currentGrade + EPSILON >= targetGrade ? "achieved" : "impossible",
      requiredPerItem: 0,
      currentGrade,
      maxGrade,
      remainingItems,
    };
  }

  const requiredPerItem = (targetGrade - knownContribution) / remainingCoeff;

  let status: RequiredGradeStatus;
  if (requiredPerItem <= EPSILON) {
    status = "achieved";
  } else if (requiredPerItem > 10 + EPSILON) {
    status = "impossible";
  } else {
    status = "possible";
  }

  return {
    status,
    requiredPerItem,
    currentGrade,
    maxGrade,
    remainingItems,
  };
}
