import { EmptyState } from "@/app/_components/empty-state";
import { MedalIcon } from "lucide-react";

export default function AwardsPage() {
  return (
    <main className="container flex w-full flex-col gap-8 py-8 md:py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Insígnias
        </h1>
        <p className="text-sm text-muted-foreground">
          Ganhe medalhas ao completar desafios.
        </p>
      </header>

      <EmptyState
        icon={MedalIcon}
        title="Ainda não tem nada por aqui"
        description="As insígnias estão a caminho. Por enquanto, siga lançando suas notas — elas vão contar quando isso chegar."
      />
    </main>
  );
}
