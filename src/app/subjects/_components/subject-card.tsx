"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { Subject } from "@/types/subjects";
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { HighlightText } from "./highlight-text";

export function SubjectCard(subject: Subject) {
  const { addSubscribedSubject, removeSubscribedSubject, subscribedSubjects } =
    useSubscribedSubjectsStore();

  const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.trim();

  const isSubscribed = Boolean(subscribedSubjects[subject.code]);

  const handleToggle = () => {
    if (isSubscribed) {
      removeSubscribedSubject(subject.code);
      toast("Matéria removida", {
        description: subject.name,
        action: {
          label: "Desfazer",
          onClick: () => addSubscribedSubject(subject),
        },
      });
      return;
    }

    addSubscribedSubject(subject);
    toast.success("Matéria adicionada", { description: subject.name });
  };

  const groups = [
    { label: "Provas", weight: subject.examWeight, items: subject.exams ?? [] },
    {
      label: "Trabalhos",
      weight: subject.assignmentWeight,
      items: subject.assignments ?? [],
    },
  ].filter((group) => group.weight > 0 && group.items.length > 0);

  return (
    <Collapsible
      open={isMoreDetailsOpen}
      onOpenChange={setIsMoreDetailsOpen}
      className="group rounded-xl border bg-card transition-colors hover:border-foreground/15 data-[state=open]:border-foreground/15"
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-mono text-xs text-muted-foreground">
              <HighlightText text={subject.code} searchTerm={searchTerm} />
            </span>
            <h2 className="text-balance text-base font-medium leading-snug tracking-tight">
              <HighlightText text={subject.name} searchTerm={searchTerm} />
            </h2>
          </div>

          <Button
            onClick={handleToggle}
            variant={isSubscribed ? "secondary" : "default"}
            size="sm"
            className="shrink-0"
            aria-pressed={isSubscribed}
          >
            {isSubscribed ? (
              <>
                <CheckIcon className="size-3.5" />
                Adicionada
              </>
            ) : (
              <>
                <PlusIcon className="size-3.5" />
                Adicionar
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary" className="font-normal">
            {subject.course}
          </Badge>

          <CollapsibleTrigger className="flex items-center gap-1 rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            Pesos
            <ChevronDownIcon className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <dl className="flex flex-col gap-3 border-t px-4 py-4">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-1.5">
              <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {group.label}
                <span className="ml-2 font-mono normal-case tracking-normal text-muted-foreground/70">
                  {group.weight.toFixed(0)}%
                </span>
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-md border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {item.name} · {Math.round(item.weight * 100)}%
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </CollapsibleContent>
    </Collapsible>
  );
}
