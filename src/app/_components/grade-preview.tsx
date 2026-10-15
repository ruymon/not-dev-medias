const PREVIEW_ITEMS = [
  { name: "P1", weight: "50%", grade: "8.0" },
  { name: "P2", weight: "50%", grade: "7.5" },
];

/**
 * A still of the real grade card, used on the home page to show what the
 * product does instead of describing it. Decorative: hidden from assistive
 * tech, since the live version is one click away.
 */
export function GradePreview() {
  return (
    <div aria-hidden className="select-none">
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-xs text-muted-foreground">
              ECM303
            </span>
            <span className="text-sm font-medium tracking-tight">
              Sistemas Eletrônicos
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-mono text-xl font-medium tracking-tight text-grade-pass">
              7.75
            </span>
            <span className="text-[11px] text-muted-foreground">Aprovado</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[70%] rounded-full bg-grade-pass" />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            70%
          </span>
        </div>

        <div className="mt-5 border-t pt-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Provas
          </span>

          <div className="mt-3 grid grid-cols-2 gap-4">
            {PREVIEW_ITEMS.map((item) => (
              <div key={item.name} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-medium">{item.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {item.weight}
                  </span>
                </div>
                <div className="flex h-10 items-center justify-between rounded-md border border-input bg-secondary/50 px-3">
                  <span className="font-mono text-sm">{item.grade}</span>
                  <span className="font-mono text-xs text-muted-foreground/70">
                    /10
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
