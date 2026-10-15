"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { Grades } from "@/types/grades";
import {
  DownloadIcon,
  EllipsisIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

async function exportGrades(grades: Grades) {
  const blob = new Blob([JSON.stringify(grades, null, 2)], {
    type: "application/json",
  });

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
}

/**
 * Export, import and clear live behind one "…" button, the way iOS keeps
 * secondary actions in the navigation bar rather than on the page.
 */
export function GradesActionsMenu() {
  const { grades, setGrades } = useSubscribedSubjectsGradesStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasGrades = Object.values(grades).some(
    (subjectGrades) => Object.keys(subjectGrades).length > 0
  );

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

  const handleClearGrades = () => {
    const previousGrades = grades;
    setGrades({});

    // Wiping every grade is destructive, so it stays undoable instead of
    // hiding behind a confirmation modal.
    toast("Notas limpas", {
      description: "Todos os valores lançados foram removidos.",
      action: {
        label: "Desfazer",
        onClick: () => setGrades(previousGrades),
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="tinted" size="icon" aria-label="Mais ações">
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => exportGrades(grades)}>
            <DownloadIcon />
            Exportar notas
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => fileInputRef.current?.click()}>
            <UploadIcon />
            Importar notas
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={!hasGrades}
            onSelect={handleClearGrades}
          >
            <Trash2Icon />
            Limpar todas as notas
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
