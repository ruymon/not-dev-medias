"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
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

import { Subject } from "@/types/subjects";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { HighlightText } from "./highlight-text";

interface SubjectCardProps extends Subject {}

export function SubjectCard(subject: SubjectCardProps) {
  const { addSubscribedSubject, removeSubscribedSubject, subscribedSubjects } =
    useSubscribedSubjectsStore();

  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase();

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
    <Card className="border-none py-4 flex flex-col gap-2 shadow-none">
      <div className="flex items-center justify-between">
        <CardHeader className="space-y-0 p-0">
          <CardDescription>
            <HighlightText text={subject.code} searchTerm={searchTerm} />
          </CardDescription>
          <CardTitle className="text-secondary-foreground text-xl font-bold">
            <HighlightText text={subject.name} searchTerm={searchTerm} />
          </CardTitle>
        </CardHeader>
        <Button
          onClick={isSubjectSubscribed ? handleUnsubscribe : handleSubscribe}
          variant={isSubjectSubscribed ? "destructive" : "secondary"}
          size="sm"
        >
          {isSubjectSubscribed ? "Remover" : "Adicionar"}
        </Button>
      </div>

      <Collapsible open={isMoreDetailsOpen} onOpenChange={setIsMoreDetailsOpen}>
        <CollapsibleContent>
          <CardContent className="px-0 py-2 flex items-center gap-6">
            {subject.exams && subject.examWeight > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-accent-foreground text-sm font-semibold">
                  Provas ({subject.examWeight.toFixed(0)}%)
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {subject.exams.map((exam) => (
                    <span key={exam.name}>
                      {exam.name} ({exam.weight.toFixed(2)})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {subject.assignments && subject.assignmentWeight > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-accent-foreground text-sm font-semibold">
                  Trabalhos ({subject.assignmentWeight.toFixed(0)}%)
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

        <CardFooter className="justify-between px-0 pb-0 pt-2">
          <Badge>{subject.course}</Badge>

          <CollapsibleTrigger className="text-sm text-muted-foreground">
            {isMoreDetailsOpen ? "Esconder" : "Mostrar"} detalhes
          </CollapsibleTrigger>

          {/* <div className="flex flex-wrap gap-2 mt-1">
          {subject.courses &&
            Object.entries(subject.courses).map(([course, weight]) => (
              <span
                key={course}
                className="text-xs font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground"
              >
                {course} ({weight})
              </span>
            ))}
        </div> */}
        </CardFooter>
      </Collapsible>
    </Card>
  );
}
