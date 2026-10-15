import { EmptyState } from "@/app/_components/empty-state";
import { Page, PageHeader } from "@/app/_components/page";
import { MedalIcon } from "lucide-react";

export default function AwardsPage() {
  return (
    <Page>
      <PageHeader
        title="Insígnias"
        description="Ganhe medalhas ao completar desafios."
      />

      <EmptyState
        icon={MedalIcon}
        title="Ainda não tem nada por aqui"
        description="As insígnias estão a caminho. Por enquanto, siga lançando suas notas — elas vão contar quando isso chegar."
      />
    </Page>
  );
}
