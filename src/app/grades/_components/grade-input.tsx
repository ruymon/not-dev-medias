"use client";

import { Input } from "@/components/ui/input";
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
      <div className="flex items-baseline justify-between gap-2">
        <Label
          htmlFor={id}
          className="truncate text-xs font-medium text-foreground"
        >
          {name}
        </Label>
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
          {Math.round(weight * 100)}%
        </span>
      </div>

      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          max="10"
          step="0.1"
          placeholder="—"
          // `?? ""` and not `|| ""`: a legitimate 0 must still render.
          value={value ?? ""}
          onChange={(event) => {
            const raw = event.target.value;
            // Clearing the field should drop the grade, not store a zero.
            onChange(raw === "" ? null : Number(raw));
          }}
          className="h-10 pr-9 font-mono text-sm tabular-nums"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs text-muted-foreground/70"
        >
          /10
        </span>
      </div>
    </div>
  );
}
