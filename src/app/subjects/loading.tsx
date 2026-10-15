import { SearchAndFilterSkeleton } from "./_components/search-and-filter-skeleton";
import { SubjectCardSkeleton } from "./_components/subject-card-skeleton";

const TITLE_WIDTHS = ["72%", "48%", "85%", "60%", "40%", "77%", "55%", "66%"];

export default function SubjectsLoading() {
  return (
    <>
      <aside className="flex h-fit flex-col gap-8 bg-background md:sticky md:top-24 md:max-w-80 md:flex-1">
        <header className="flex flex-col gap-1 pt-4 md:py-0">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Matérias
          </h1>
          <p className="text-sm text-muted-foreground">
            Escolha as matérias que você está cursando.
          </p>
        </header>

        <SearchAndFilterSkeleton />
      </aside>

      <ul className="flex min-w-0 flex-1 flex-col gap-3">
        {TITLE_WIDTHS.map((titleWidth, index) => (
          <li key={index}>
            <SubjectCardSkeleton titleWidth={titleWidth} />
          </li>
        ))}
      </ul>
    </>
  );
}
