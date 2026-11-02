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
import { COURSES } from "@/data/subjects";
import { assessmentGroups } from "@/lib/grades";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import type { Subject } from "@/types/subjects";
import { HighlightText } from "./highlight-text";

interface SubjectCardProps {
	subject: Subject;
	searchTerm?: string;
}

export function SubjectCard({ subject, searchTerm }: SubjectCardProps) {
	const isSubjectSubscribed = useSubscribedSubjectsStore((state) =>
		state.subscribedCodes.includes(subject.code),
	);
	const toggleSubject = useSubscribedSubjectsStore(
		(state) => state.toggleSubject,
	);

	const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

	const handleToggle = () => {
		toggleSubject(subject.code);
		toast.message(isSubjectSubscribed ? "Removido!" : "Adicionado!", {
			description: `${subject.name} foi ${isSubjectSubscribed ? "removido da" : "adicionado à"} sua lista de matérias`,
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
							onClick={handleToggle}
							variant={isSubjectSubscribed ? "destructive" : "secondary"}
							size="sm"
						>
							{isSubjectSubscribed ? "Remover" : "Adicionar"}
						</Button>
					</CardAction>
				</CardHeader>

				<CollapsibleContent>
					<CardContent className="flex-row gap-6">
						{assessmentGroups(subject).map(({ label, group }) => (
							<div key={label} className="flex flex-col gap-1">
								<span className="font-medium">
									{label} ({Math.round(group.weight * 100)}%)
								</span>
								<div className="flex items-center gap-2 text-muted-foreground">
									{Object.entries(group.items).map(([name, weight]) => (
										<span key={name}>
											{name} ({weight.toFixed(2)})
										</span>
									))}
								</div>
							</div>
						))}
					</CardContent>
				</CollapsibleContent>

				<CardFooter className="justify-between">
					{subject.course && <Badge>{COURSES[subject.course]}</Badge>}
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
