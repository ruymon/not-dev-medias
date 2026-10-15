import {
  calculateSubjectGrade,
  formatGrade,
  PASSING_GRADE,
} from "@/lib/grades";
import { cn } from "@/lib/utils";
import { Grades } from "@/types/grades";
import { Subject } from "@/types/subjects";

interface GradesChartProps {
  subjects: Subject[];
  grades: Grades;
}

const SERIES = [
  { key: "exam", label: "Provas", className: "bg-chart-exam" },
  { key: "assignment", label: "Trabalhos", className: "bg-chart-assignment" },
  { key: "pending", label: "Pendente", className: "bg-secondary" },
] as const;

const MAX = 10;
const toPercent = (value: number) => `${(value / MAX) * 100}%`;

/**
 * One stacked bar per subject: points banked from exams, from assignments,
 * and the share of the grade still to be played for. The dashed line is the
 * passing grade, so "how far from 6" reads at a glance without averaging
 * subjects together.
 */
export function GradesChart({ subjects, grades }: GradesChartProps) {
  const bars = subjects.map((subject) => {
    const summary = calculateSubjectGrade(subject, grades[subject.code]);
    return {
      code: subject.code,
      name: subject.name,
      exam: summary.examPoints,
      assignment: summary.assignmentPoints,
      pending: (1 - summary.completion) * MAX,
    };
  });

  return (
    <figure className="flex flex-col gap-4 rounded-lg bg-card p-4">
      <div className="flex gap-2">
        {/* Bars scroll sideways past ~7 subjects instead of shrinking. */}
        <div className="-mx-1 flex-1 overflow-x-auto px-1">
          <div className="relative flex min-w-full gap-1.5">
            {/* Gridlines span the plot behind the bars. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-36">
              <div className="absolute inset-x-0 top-0 h-px bg-border" />
              <div
                className="absolute inset-x-0 border-t border-dashed border-muted-foreground/60"
                style={{ bottom: toPercent(PASSING_GRADE) }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
            </div>

            {bars.map((bar, index) => (
              <div
                key={bar.code}
                tabIndex={0}
                className="group relative flex min-w-9 flex-1 flex-col items-center gap-2 rounded-sm outline-none"
              >
                <div className="flex h-36 w-full max-w-9 flex-col-reverse gap-0.5">
                  {SERIES.map((series) => {
                    const value = bar[series.key];
                    if (value <= 0.001) return null;
                    return (
                      <div
                        key={series.key}
                        className={cn(
                          "w-full first:rounded-b-[2px] last:rounded-t-[4px]",
                          series.className
                        )}
                        style={{ height: toPercent(value) }}
                      />
                    );
                  })}
                </div>
                <span className="text-[10px] leading-3 tracking-tight tabular-nums text-muted-foreground">
                  {bar.code}
                </span>

                {/* Hover or focus (tap on touch) shows the bar's numbers. It
                    sits over the plot, since the scroller clips anything
                    above it, and opens away from the nearer edge. */}
                <div
                  role="tooltip"
                  className={cn(
                    "pointer-events-none absolute top-0 z-10 hidden w-40 flex-col gap-1 rounded-lg bg-popover p-2.5 text-caption shadow-lg ring-1 ring-border group-hover:flex group-focus:flex",
                    index < bars.length / 2 ? "left-0" : "right-0"
                  )}
                >
                  <span className="truncate font-semibold">{bar.name}</span>
                  {SERIES.map((series) => (
                    <span key={series.key} className="flex items-center gap-1.5">
                      <span className={cn("size-2 rounded-full", series.className)} />
                      <span className="flex-1 text-muted-foreground">{series.label}</span>
                      <span className="tabular-nums">{formatGrade(bar[series.key])}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="relative h-36 w-4 shrink-0 text-caption2 tabular-nums text-muted-foreground"
        >
          <span className="absolute right-0 top-0 -translate-y-1/2">10</span>
          <span
            className="absolute right-0 translate-y-1/2"
            style={{ bottom: toPercent(PASSING_GRADE) }}
          >
            6
          </span>
          <span className="absolute bottom-0 right-0 translate-y-1/2">0</span>
        </div>
      </div>

      <figcaption className="flex flex-wrap gap-x-4 gap-y-1 text-footnote text-muted-foreground">
        {SERIES.map((series) => (
          <span key={series.key} className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full", series.className)} />
            {series.label}
          </span>
        ))}
      </figcaption>

      <table className="sr-only">
        <caption>Pontos por matéria, de 0 a 10</caption>
        <thead>
          <tr>
            <th scope="col">Matéria</th>
            {SERIES.map((series) => (
              <th key={series.key} scope="col">
                {series.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => (
            <tr key={bar.code}>
              <th scope="row">{bar.name}</th>
              {SERIES.map((series) => (
                <td key={series.key}>{formatGrade(bar[series.key])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
