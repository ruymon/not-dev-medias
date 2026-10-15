import type { GradeStatus } from "@/lib/grades";
import { cn } from "@/lib/utils";

const STATUS_TEXT: Record<GradeStatus, string> = {
  pass: "text-grade-pass",
  warn: "text-grade-warn",
  fail: "text-grade-fail",
};

const STATUS_BAR: Record<GradeStatus, string> = {
  pass: "bg-grade-pass",
  warn: "bg-grade-warn",
  fail: "bg-grade-fail",
};

export const STATUS_LABEL: Record<GradeStatus, string> = {
  pass: "Aprovado",
  warn: "Em risco",
  fail: "Abaixo da média",
};

interface GradeValueProps {
  grade: number | null;
  status: GradeStatus | null;
  className?: string;
}

/** The média itself: tabular mono, coloured by status, em-dash when unset. */
export function GradeValue({ grade, status, className }: GradeValueProps) {
  if (grade === null) {
    return (
      <span
        className={cn("font-mono text-muted-foreground/60", className)}
        aria-label="Sem notas"
      >
        —
      </span>
    );
  }

  return (
    <span
      className={cn(
        "font-mono tracking-tight tabular-nums",
        status && STATUS_TEXT[status],
        className
      )}
    >
      {grade.toFixed(2)}
    </span>
  );
}

interface GradeMeterProps {
  /** 0 to 1. How much of the subject's weight already has a grade. */
  completion: number;
  status: GradeStatus | null;
  className?: string;
}

/**
 * Hairline bar showing how much of the subject is actually graded, so a
 * partial média never reads as a final one.
 */
export function GradeMeter({ completion, status, className }: GradeMeterProps) {
  const percentage = Math.round(completion * 100);

  return (
    <div
      className={cn("h-1 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progresso das notas lançadas"
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          status ? STATUS_BAR[status] : "bg-muted-foreground/30"
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
