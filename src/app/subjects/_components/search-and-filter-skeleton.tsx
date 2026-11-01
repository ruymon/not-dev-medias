import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getSkeletonWidth } from "@/lib/utils";

export function SearchAndFilterSkeleton() {
  return (
    <div className="flex-col gap-6 flex">
      <div className="flex flex-col gap-2">
        <header className="flex flex-col">
          <h2 className="text-accent-foreground font-medium text-lg">Buscar</h2>
          <span className="text-sm text-muted-foreground">
            Encontre tudo em um zap ⚡
          </span>
        </header>

        <Input
          placeholder="Pesquisar"
          type="search"
          disabled
          className="w-full"
        />
      </div>

      <div className="md:flex flex-col gap-6 hidden">
        <header className="flex flex-col">
          <h2 className="text-muted-foreground font-semibold text-lg">Curso</h2>
          <span className="text-sm text-muted-foreground">
            Filtre por curso
          </span>
        </header>

        <ScrollArea className="h-96">
          <ul className="flex flex-col gap-4">
            {Array.from({ length: 16 }).map((_, index) => {
              const width = getSkeletonWidth(index);

              return (
                <li key={index} className="flex items-center gap-2 h-4">
                  <Skeleton className="h-full aspect-square rounded-sm" />
                  <Skeleton
                    className="h-full"
                    style={{
                      width: width,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </div>

      <Button variant="outline" disabled>
        Limpar filtros
      </Button>
    </div>
  );
}
