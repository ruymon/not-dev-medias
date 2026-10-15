"use client";

import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

/**
 * Closes the loop between picking subjects and entering grades — otherwise
 * nothing on this page tells you what to do once you've added a few.
 */
export function SelectedSubjectsLink() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const hydrated = useHydrated();

  const count = Object.keys(subscribedSubjects).length;

  if (!hydrated || count === 0) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium tracking-tight">
          <span className="font-mono">{count}</span>{" "}
          {count === 1 ? "matéria escolhida" : "matérias escolhidas"}
        </span>
        <span className="text-xs text-muted-foreground">
          Pronto para lançar as notas?
        </span>
      </div>

      <Button asChild size="sm" className="w-full">
        <Link href="/grades">
          Ir para minhas notas
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
