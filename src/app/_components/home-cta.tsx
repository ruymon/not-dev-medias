"use client";

import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function HomeCta() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const hydrated = useHydrated();

  const subscribedCount = Object.keys(subscribedSubjects).length;
  // Only offered once the persisted store has actually loaded, so the button
  // never renders with a count the server couldn't know about.
  const hasSubjects = hydrated && subscribedCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild size="lg">
        <Link href="/subjects">
          {hasSubjects ? "Adicionar matérias" : "Escolher matérias"}
          <ArrowRightIcon className="size-4" />
        </Link>
      </Button>

      {hasSubjects && (
        <Button asChild size="lg" variant="outline">
          <Link href="/grades">
            Minhas notas
            <span className="font-mono text-xs text-muted-foreground">
              {subscribedCount}
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
}
