"use client";

import { Button } from "@/components/ui/button";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useRef } from "react";

interface ImportGradesButtonProps {}

export function ImportGradesButton({}: ImportGradesButtonProps) {
  const { setGrades } = useSubscribedSubjectsGradesStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportGrades = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const importedGrades = JSON.parse(content);
        setGrades(importedGrades);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        onClick={handleImportGrades}
        variant="outline"
        className="rounded-t-none"
        size="lg"
      >
        Importar notas
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept=".json"
        className="hidden"
      />
    </>
  );
}
