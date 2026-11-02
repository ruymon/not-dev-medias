import { Card, CardAction, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Varies its title width by position, so render it inside a `group` element.
export function SubjectCardSkeleton() {
	return (
		<Card size="sm">
			<CardHeader>
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-5 w-3/4 group-nth-[3n+2]:w-1/2 group-nth-[3n]:w-2/3" />
				<CardAction>
					<Skeleton className="h-8 w-24" />
				</CardAction>
			</CardHeader>
			<CardFooter className="justify-between">
				<Skeleton className="h-5 w-24 rounded-full" />
				<Skeleton className="h-8 w-28" />
			</CardFooter>
		</Card>
	);
}
