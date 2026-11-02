"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubjectGrades } from "@/types/grades";
import type { Subject } from "@/types/subjects";

interface SubjectGradesInputCardProps {
	subject: Subject;
	grades: SubjectGrades;
	onGradeChange: (examOrAssignment: string, grade: number) => void;
}

export function SubjectGradesInputCard({
	subject,
	grades,
	onGradeChange,
}: SubjectGradesInputCardProps) {
	const [isGradesPanelOpen, setIsGradesPanelOpen] = useState(false);

	return (
		<Collapsible
			open={isGradesPanelOpen}
			onOpenChange={setIsGradesPanelOpen}
			asChild
		>
			<Card size="sm">
				<CardHeader>
					<CardDescription>{subject.code}</CardDescription>
					<CardTitle>{subject.name}</CardTitle>
					<CardAction>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="sm">
								{isGradesPanelOpen ? "Esconder" : "Mostrar"} notas
							</Button>
						</CollapsibleTrigger>
					</CardAction>
				</CardHeader>

				<CollapsibleContent>
					<CardContent className="gap-4">
						{subject.examWeight > 0 && (
							<section className="flex flex-col gap-2">
								<h3 className="font-medium">
									Provas ({subject.examWeight.toFixed(0)}%)
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{subject.exams.map((exam) => (
										<div key={exam.name} className="flex flex-col gap-2">
											<Label htmlFor={`${subject.code}-${exam.name}`}>
												{exam.name} ({exam.weight.toFixed(2)})
											</Label>
											<Input
												id={`${subject.code}-${exam.name}`}
												type="number"
												min="0"
												max="10"
												value={grades[exam.name] || ""}
												onChange={(e) =>
													onGradeChange(exam.name, Number(e.target.value))
												}
											/>
										</div>
									))}
								</div>
							</section>
						)}

						{subject.assignmentWeight > 0 && (
							<section className="flex flex-col gap-2">
								<h3 className="font-medium">
									Trabalhos ({subject.assignmentWeight.toFixed(0)}%)
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{subject.assignments.map((assignment) => (
										<div key={assignment.name} className="flex flex-col gap-2">
											<Label htmlFor={`${subject.code}-${assignment.name}`}>
												{assignment.name} ({assignment.weight.toFixed(2)})
											</Label>
											<Input
												id={`${subject.code}-${assignment.name}`}
												type="number"
												min="0"
												max="10"
												value={grades[assignment.name] || ""}
												onChange={(e) =>
													onGradeChange(assignment.name, Number(e.target.value))
												}
											/>
										</div>
									))}
								</div>
							</section>
						)}
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	);
}
