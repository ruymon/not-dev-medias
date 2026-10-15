import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// Fixed widths rather than random ones: this renders on the server too, and a
// random width would not survive hydration.
const COURSE_WIDTHS = ["62%", "45%", "78%", "54%", "69%", "38%", "83%", "50%"];

export function SearchAndFilterSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Buscar
        </h2>
        <Input placeholder="Pesquisar" type="search" disabled />
      </div>

      <div className="hidden flex-col gap-3 md:flex">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Curso
        </h2>

        <ScrollArea className="h-96">
          <ul className="flex flex-col gap-4">
            {COURSE_WIDTHS.concat(COURSE_WIDTHS).map((width, index) => (
              <li key={index} className="flex h-4 items-center gap-2">
                <Skeleton className="aspect-square h-full rounded-sm" />
                <Skeleton className="h-full" style={{ width }} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <Button variant="outline" disabled>
        Limpar filtros
      </Button>
    </div>
  );
}
