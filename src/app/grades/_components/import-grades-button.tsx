"use client";

import { Button } from "@/components/ui/button";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export function ImportGradesButton() {
  const { grades, setGrades } = useSubscribedSubjectsGradesStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const previousGrades = grades;

      try {
        const parsed = JSON.parse(e.target?.result as string);

        // A malformed file used to blow up silently and wipe the store.
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Unexpected shape");
        }

        setGrades(parsed);
        toast.success("Notas importadas", {
          action: {
            label: "Desfazer",
            onClick: () => setGrades(previousGrades),
          },
        });
      } catch {
        toast.error("Arquivo inválido", {
          description: "Use um arquivo de notas exportado por aqui.",
        });
      }
    };

    reader.readAsText(file);
    // Allow re-importing the same file twice in a row.
    event.target.value = "";
  };

  return (
    <>
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        size="sm"
      >
        <UploadIcon className="size-3.5" />
        Importar
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".json,application/json"
        className="hidden"
      />
    </>
  );
}
