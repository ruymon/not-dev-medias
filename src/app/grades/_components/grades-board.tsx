"use client";

import { Button } from "@/components/ui/button";
import { SUBJECTS } from "@/data/subjects";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { ExportGrades } from "./export-grades";
import { GradeSummary } from "./grade-summary";
import { ImportGradesButton } from "./import-grades-button";
import { SubjectGradesInputCard } from "./subject-grades-input-card";

function clamp(value: number, min: number, max: number) {
	value = Math.max(value, min);
	value = Math.min(value, max);
	return value;
}

export function GradesBoard() {
	const subscribedCodes = useSubscribedSubjectsStore(
		(state) => state.subscribedCodes,
	);
	const subscribedSubjects = subscribedCodes.flatMap(
		(code) => SUBJECTS.find((subject) => subject.code === code) ?? [],
	);
	const { grades, setGrades } = useSubscribedSubjectsGradesStore();

	const handleGradeChange = (
		subjectCode: string,
		examOrAssignment: string,
		grade: number,
	) => {
		grade = clamp(grade, 0, 10);

		const updatedGrades = {
			...grades,
			[subjectCode]: {
				...grades[subjectCode],
				[examOrAssignment]: grade,
			},
		};
		setGrades(updatedGrades);
	};

	const handleClearGrades = () => {
		setGrades({});
	};

	return (
		<main className="flex py-8 container gap-16 flex-col md:flex-row">
			<aside className="md:max-w-[30%]">
				{subscribedSubjects.length > 0 && (
					<GradeSummary subjects={subscribedSubjects} grades={grades}>
						<Button onClick={handleClearGrades} variant="outline">
							Limpar valores
						</Button>
						<ExportGrades />
						<ImportGradesButton />
					</GradeSummary>
				)}
			</aside>

			<ul className="flex flex-col flex-1 gap-3">
				{subscribedSubjects.map((subject) => (
					<li key={subject.code}>
						<SubjectGradesInputCard
							subject={subject}
							grades={grades[subject.code] || {}}
							onGradeChange={(examOrAssignment, grade) =>
								handleGradeChange(subject.code, examOrAssignment, grade)
							}
						/>
					</li>
				))}

				{subscribedSubjects.length === 0 && (
					<span className="text-center text-muted-foreground">
						Você não tem nenhuma matéria inscrita ainda... Adicione matérias
						para começar a adicionar notas!
					</span>
				)}
			</ul>
		</main>
	);
}
