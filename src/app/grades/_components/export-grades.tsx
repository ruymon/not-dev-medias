"use client";

import { Button } from "@/components/ui/button";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

export function ExportGrades() {
  const { grades } = useSubscribedSubjectsGradesStore();

  const handleExportGrades = async () => {
    const gradesData = JSON.stringify(grades, null, 2);
    const blob = new Blob([gradesData], { type: "application/json" });

    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: "notas.json",
          types: [
            {
              description: "JSON File",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        toast.success("Notas exportadas");
      } catch (err) {
        // Dismissing the save dialog is a normal outcome, not a failure.
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Failed to save file:", err);
        toast.error("Não foi possível exportar", {
          description: "Tente novamente em instantes.",
        });
      }
      return;
    }

    // Fallback for browsers without the File System Access API.
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notas.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Notas exportadas");
  };

  return (
    <Button onClick={handleExportGrades} variant="outline" size="sm">
      <DownloadIcon className="size-3.5" />
      Exportar
    </Button>
  );
}
