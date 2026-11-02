"use client";

import { Button } from "@/components/ui/button";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";

export function ImportGradesButton() {
	const { setGrades } = useSubscribedSubjectsGradesStore();

	const handleFileInput = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setGrades(JSON.parse(await file.text()));
	};

	return (
		<Button
			asChild
			variant="outline"
			size="lg"
			className="rounded-t-none cursor-pointer has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
		>
			<label>
				Importar notas
				<input
					type="file"
					accept=".json"
					onChange={handleFileInput}
					className="sr-only"
				/>
			</label>
		</Button>
	);
}
