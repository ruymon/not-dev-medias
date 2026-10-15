"use client";

import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import Link from "next/link";

/** Closes the loop between picking subjects and entering grades. */
export function SelectedSubjectsLink() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const hydrated = useHydrated();

  const count = Object.keys(subscribedSubjects).length;

  if (!hydrated || count === 0) return null;

  return (
    <Button asChild variant="tinted" size="sm">
      <Link href="/grades">
        Lançar notas
        <span className="tabular-nums opacity-70">{count}</span>
      </Link>
    </Button>
  );
}
