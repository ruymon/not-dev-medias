import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Varies its title width by position, so render it inside a `group` element.
export function SubjectCardSkeleton() {
	return (
		<Card className="border-none py-5 flex flex-col gap-2 shadow-none">
			<div className="flex justify-between gap-8">
				<CardHeader className="flex-1 gap-1 p-0">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-8 w-3/4 group-nth-[3n+2]:w-1/2 group-nth-[3n]:w-2/3" />
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
