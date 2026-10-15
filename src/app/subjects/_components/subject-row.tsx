"use client";

import { Button } from "@/components/ui/button";
import { ListItem, listRowClassName } from "@/components/ui/list";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { Subject } from "@/types/subjects";
import { CheckIcon, PlusIcon } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";
import { HighlightText } from "./highlight-text";

interface SubjectRowProps {
  subject: Subject;
  searchTerm: string;
}

// Hundreds of rows re-render on every keystroke otherwise.
export const SubjectRow = memo(function SubjectRow({
  subject,
  searchTerm,
}: SubjectRowProps) {
  const isSubscribed = useSubscribedSubjectsStore((state) =>
    Boolean(state.subscribedSubjects[subject.code])
  );
  const addSubscribedSubject = useSubscribedSubjectsStore(
    (state) => state.addSubscribedSubject
  );
  const removeSubscribedSubject = useSubscribedSubjectsStore(
    (state) => state.removeSubscribedSubject
  );

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

  return (
    <ListItem>
      <div className={listRowClassName}>
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          <span className="text-footnote text-muted-foreground">
            <HighlightText text={subject.code} searchTerm={searchTerm} />
          </span>
          <span className="text-body">
            <HighlightText text={subject.name} searchTerm={searchTerm} />
          </span>
          <span className="text-footnote text-muted-foreground">
            {subject.course}
          </span>
        </div>

        <Button
          onClick={handleToggle}
          // Filled once added, tinted before, like a toggle in iOS.
          variant={isSubscribed ? "default" : "tinted"}
          size="iconSm"
          aria-pressed={isSubscribed}
          aria-label={
            isSubscribed
              ? `Remover ${subject.name}`
              : `Adicionar ${subject.name}`
          }
        >
          {isSubscribed ? (
            <CheckIcon strokeWidth={3} />
          ) : (
            <PlusIcon strokeWidth={3} />
          )}
        </Button>
      </div>
    </ListItem>
  );
});
