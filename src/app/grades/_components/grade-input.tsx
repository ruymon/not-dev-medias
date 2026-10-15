"use client";

import { Label } from "@/components/ui/label";

interface GradeInputProps {
  id: string;
  name: string;
  /** Weight within its group, 0 to 1. */
  weight: number;
  value: number | undefined;
  onChange: (grade: number | null) => void;
}

export function GradeInput({
  id,
  name,
  weight,
  value,
  onChange,
}: GradeInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2 px-1">
        <Label htmlFor={id} className="truncate text-footnote font-semibold">
          {name}
        </Label>
        <span className="shrink-0 text-footnote tabular-nums text-muted-foreground">
          {Math.round(weight * 100)}%
        </span>
      </div>

      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        max="10"
        step="0.1"
        placeholder="–"
        // `?? ""` and not `|| ""`: a legitimate 0 must still render.
        value={value ?? ""}
        onChange={(event) => {
          const raw = event.target.value;
          // Clearing the field should drop the grade, not store a zero.
          onChange(raw === "" ? null : Number(raw));
        }}
        // 17px keeps iOS from zooming the page when the field takes focus.
        className="h-11 w-full rounded-[10px] bg-background px-3 text-center text-body tabular-nums placeholder:text-tertiary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-secondary"
      />
    </div>
  );
}
