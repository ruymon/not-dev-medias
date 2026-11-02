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
import { assessmentGroups } from "@/lib/grades";
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
						{assessmentGroups(subject).map(({ label, group }) => (
							<section key={label} className="flex flex-col gap-2">
								<h3 className="font-medium">
									{label} ({Math.round(group.weight * 100)}%)
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{Object.entries(group.items).map(([name, weight]) => (
										<div key={name} className="flex flex-col gap-2">
											<Label htmlFor={`${subject.code}-${name}`}>
												{name} ({weight.toFixed(2)})
											</Label>
											<Input
												id={`${subject.code}-${name}`}
												type="number"
												min="0"
												max="10"
												value={grades[name] || ""}
												onChange={(e) =>
													onGradeChange(name, Number(e.target.value))
												}
											/>
										</div>
									))}
								</div>
							</section>
						))}
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	);
}
