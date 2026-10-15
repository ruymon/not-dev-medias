import { Page, PageHeader } from "@/app/_components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { SelectedSubjectsLink } from "./_components/selected-subjects-link";
import { SubjectsBrowser } from "./_components/subjects-browser";

// Filtering happens on the client against the bundled catalogue, so this page
// is static and keeps working offline.
export default function SubjectsPage() {
  return (
    <Page className="gap-6">
      <PageHeader
        title="Matérias"
        description="Escolha as que você está cursando."
        action={<SelectedSubjectsLink />}
      />

      {/* `useSearchParams` has no value at build time. */}
      <Suspense fallback={<Skeleton className="h-96 w-full rounded-lg" />}>
        <SubjectsBrowser />
      </Suspense>
    </Page>
  );
}
