import {
  formatGrade,
  type GradeStatus,
  type SubjectOutlook,
} from "@/lib/grades";
import { cn } from "@/lib/utils";

const STATUS_CLASSNAME: Record<GradeStatus, string> = {
  pass: "bg-grade-pass/15 text-grade-pass",
  warn: "bg-grade-warn/15 text-grade-warn",
  fail: "bg-grade-fail/15 text-grade-fail",
};

const NEUTRAL_CLASSNAME = "bg-secondary text-foreground";

function badgeFor(outlook: SubjectOutlook): {
  label: string;
  className: string;
} {
  switch (outlook.kind) {
    case "empty":
      return { label: "–", className: "bg-secondary text-tertiary-foreground" };
    case "final":
      return {
        label: formatGrade(outlook.grade),
        className: STATUS_CLASSNAME[outlook.status],
      };
    case "secured":
      return {
        label: formatGrade(outlook.grade),
        className: STATUS_CLASSNAME.pass,
      };
    case "unreachable":
      return {
        label: formatGrade(outlook.average),
        className: STATUS_CLASSNAME.fail,
      };
    case "pending":
      // Still open: the number is the pace so far, not a verdict, so it
      // stays neutral.
      return { label: formatGrade(outlook.average), className: NEUTRAL_CLASSNAME };
  }
}

/** The média as a tinted capsule, the way iOS shows a value at a row's end. */
export function GradeBadge({ outlook }: { outlook: SubjectOutlook }) {
  const { label, className } = badgeFor(outlook);

  return (
    <span
      className={cn(
        "inline-flex h-7 min-w-14 shrink-0 items-center justify-center rounded-md px-2 text-subheadline font-semibold tabular-nums",
        className
      )}
    >
      {label}
    </span>
  );
}

/** One line explaining the badge: what's left, or how it ended. */
export function describeOutlook(outlook: SubjectOutlook): string {
  switch (outlook.kind) {
    case "empty":
      return "Sem notas";
    case "final":
      if (outlook.status === "pass") return "Aprovado";
      return outlook.status === "warn" ? "Ficou pouco abaixo de 6" : "Abaixo de 6";
    case "secured":
      return "Aprovação garantida";
    case "pending":
      return `Precisa de ${formatGrade(outlook.needed, "up")} no que falta`;
    case "unreachable":
      return "Nem 10 no que falta chega a 6";
  }
}
