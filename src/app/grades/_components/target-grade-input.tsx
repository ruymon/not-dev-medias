"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTargetFinalGradeStore } from "@/stores/target-final-grade-store";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TargetGradeInput() {
  const { targetGrade, setTargetGrade } = useTargetFinalGradeStore();

  return (
    <Card className="rounded-b-none">
      <CardHeader>
        <CardTitle>Meta de média</CardTitle>
        <CardDescription>
          Defina a média final que você quer atingir e veja a nota mínima
          necessária em cada prova e trabalho ainda em branco.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="target-final-grade">Média final desejada</Label>
          <Input
            id="target-final-grade"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="ex.: 6"
            value={targetGrade || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              setTargetGrade(Number.isNaN(value) ? 0 : clamp(value, 0, 10));
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
