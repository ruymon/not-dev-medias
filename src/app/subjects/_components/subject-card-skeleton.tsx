import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSkeletonWidth } from "@/lib/utils";

export function SubjectCardSkeleton({ index }: { index: number }) {
  const titleWidth = getSkeletonWidth(index);

  return (
    <Card className="border-none py-5 flex flex-col gap-2 shadow-none">
      <div className="flex justify-between gap-8">
        <CardHeader className="space-y-1 p-0 flex-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton
            className="h-8"
            style={{
              width: titleWidth,
            }}
          />
        </CardHeader>

        <Skeleton className="h-9 w-24" />
      </div>

      <CardFooter className="justify-between px-0 pb-0 pt-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
  );
}
