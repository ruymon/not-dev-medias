import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TargetFinalGradeStore {
  targetGrade: number;
  setTargetGrade: (targetGrade: number) => void;
}

export const useTargetFinalGradeStore = create(
  persist<TargetFinalGradeStore>(
    (set) => ({
      targetGrade: 0,
      setTargetGrade: (targetGrade) => set({ targetGrade }),
    }),
    {
      name: "target-final-grade-store",
    }
  )
);
