"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import type { Subject } from "@/types/subjects";
import { HighlightText } from "./highlight-text";

interface SubjectCardProps {
	subject: Subject;
	searchTerm?: string;
}

export function SubjectCard({ subject, searchTerm }: SubjectCardProps) {
	const { addSubscribedSubject, removeSubscribedSubject, subscribedSubjects } =
		useSubscribedSubjectsStore();

	const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

	const isSubjectSubscribed = subscribedSubjects[subject.code];

	const handleSubscribe = () => {
		addSubscribedSubject(subject);
		toast.message("Adicionado!", {
			description: `${subject.name} foi adicionado à sua lista de matérias`,
		});
	};

	const handleUnsubscribe = () => {
		removeSubscribedSubject(subject.code);
		toast.message("Removido!", {
			description: `${subject.name} foi removido da sua lista de matérias`,
		});
	};

	return (
		<Collapsible
			open={isMoreDetailsOpen}
			onOpenChange={setIsMoreDetailsOpen}
			asChild
		>
			<Card size="sm">
				<CardHeader>
					<CardDescription>
						<HighlightText text={subject.code} searchTerm={searchTerm} />
					</CardDescription>
					<CardTitle>
						<HighlightText text={subject.name} searchTerm={searchTerm} />
					</CardTitle>
					<CardAction>
						<Button
							onClick={
								isSubjectSubscribed ? handleUnsubscribe : handleSubscribe
							}
							variant={isSubjectSubscribed ? "destructive" : "secondary"}
							size="sm"
						>
							{isSubjectSubscribed ? "Remover" : "Adicionar"}
						</Button>
					</CardAction>
				</CardHeader>

				<CollapsibleContent>
					<CardContent className="flex-row gap-6">
						{subject.examWeight > 0 && (
							<div className="flex flex-col gap-1">
								<span className="font-medium">
									Provas ({subject.examWeight.toFixed(0)}%)
								</span>
								<div className="flex items-center gap-2 text-muted-foreground">
									{subject.exams.map((exam) => (
										<span key={exam.name}>
											{exam.name} ({exam.weight.toFixed(2)})
										</span>
									))}
								</div>
							</div>
						)}

						{subject.assignmentWeight > 0 && (
							<div className="flex flex-col gap-1">
								<span className="font-medium">
									Trabalhos ({subject.assignmentWeight.toFixed(0)}%)
								</span>
								<div className="flex items-center gap-2 text-muted-foreground">
									{subject.assignments.map((assignment) => (
										<span key={assignment.name}>
											{assignment.name} ({assignment.weight.toFixed(2)})
										</span>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</CollapsibleContent>

				<CardFooter className="justify-between">
					<Badge>{subject.course}</Badge>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="sm">
							{isMoreDetailsOpen ? "Esconder" : "Mostrar"} detalhes
						</Button>
					</CollapsibleTrigger>
				</CardFooter>
			</Card>
		</Collapsible>
	);
}
