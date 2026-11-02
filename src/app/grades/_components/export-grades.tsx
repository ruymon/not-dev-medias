"use client";

import { Button } from "@/components/ui/button";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";

export function ExportGrades() {
	const { grades } = useSubscribedSubjectsGradesStore();

	const handleExportGrades = async () => {
		const gradesData = JSON.stringify(grades, null, 2);
		const blob = new Blob([gradesData], { type: "application/json" });

		if ("showSaveFilePicker" in window) {
			try {
				const handle = await window.showSaveFilePicker({
					suggestedName: "grades.json",
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
			} catch (err) {
				console.error("Failed to save file:", err);
			}
		} else {
			// Fallback for browsers that don't support the File System Access API
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "grades.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<Button onClick={handleExportGrades} variant="outline">
			Exportar notas
		</Button>
	);
}
