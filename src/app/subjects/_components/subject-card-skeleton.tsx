import { Skeleton } from "@/components/ui/skeleton";

interface SubjectCardSkeletonProps {
  /** Varies the title width so a column of skeletons doesn't look stamped. */
  titleWidth: string;
}

export function SubjectCardSkeleton({ titleWidth }: SubjectCardSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 flex-col gap-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5" style={{ width: titleWidth }} />
        </div>

        <Skeleton className="h-9 w-28 shrink-0" />
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}
