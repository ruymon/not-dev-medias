"use client";

import { EmptyState } from "@/app/_components/empty-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List } from "@/components/ui/list";
import { SUBJECTS } from "@/data/subjects";
import { matchesSearch } from "@/lib/search";
import { ChevronsUpDownIcon, SearchIcon, SearchXIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { SubjectRow } from "./subject-row";

const ALL_SUBJECTS = Object.values(SUBJECTS);
const COURSES = [
  ...new Set(ALL_SUBJECTS.map((subject) => subject.course).filter(Boolean)),
].sort((a, b) => a.localeCompare(b, "pt-BR"));

/** Mirrors the filters into the URL without a server round trip. */
function syncURL(search: string, courses: string[]) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (courses.length > 0) params.set("courses", courses.join(","));
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : "/subjects");
}

export function SubjectsBrowser() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    () => searchParams.get("courses")?.split(",").filter(Boolean) ?? []
  );
  // Typing stays responsive while the long list catches up.
  const deferredSearch = useDeferredValue(search);

  const filteredSubjects = useMemo(() => {
    const term = deferredSearch.trim();
    return ALL_SUBJECTS.filter((subject) => {
      // Accent-insensitive, so "calculo" finds "Cálculo".
      const matchesTerm =
        !term ||
        matchesSearch(subject.name, term) ||
        matchesSearch(subject.code, term);
      const matchesCourse =
        selectedCourses.length === 0 ||
        selectedCourses.includes(subject.course);
      return matchesTerm && matchesCourse;
    });
  }, [deferredSearch, selectedCourses]);

  const handleSearch = (value: string) => {
    setSearch(value);
    syncURL(value, selectedCourses);
  };

  const handleCourses = (courses: string[]) => {
    setSelectedCourses(courses);
    syncURL(search, courses);
  };

  const coursesLabel =
    selectedCourses.length === 0
      ? "Todos os cursos"
      : selectedCourses.length === 1
        ? selectedCourses[0]
        : `${selectedCourses.length} cursos`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <label className="relative flex items-center">
          <span className="sr-only">Buscar matéria</span>
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute left-2.5 size-[1.125rem] text-muted-foreground"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Buscar por nome ou código"
            // 17px keeps iOS from zooming the page on focus.
            className="h-10 w-full rounded-[10px] bg-secondary pl-9 pr-3 text-body placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="plain"
                size="inline"
                className="min-w-0 font-semibold"
              >
                <span className="truncate">{coursesLabel}</span>
                <ChevronsUpDownIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-80">
              <DropdownMenuItem
                disabled={selectedCourses.length === 0}
                onSelect={() => handleCourses([])}
              >
                Todos os cursos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {COURSES.map((course) => (
                <DropdownMenuCheckboxItem
                  key={course}
                  checked={selectedCourses.includes(course)}
                  // Picking several courses is the common case, so the menu
                  // stays open between picks.
                  onSelect={(event) => event.preventDefault()}
                  onCheckedChange={(checked) =>
                    handleCourses(
                      checked
                        ? [...selectedCourses, course]
                        : selectedCourses.filter((c) => c !== course)
                    )
                  }
                >
                  {course}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="shrink-0 text-footnote tabular-nums text-muted-foreground">
            {filteredSubjects.length}{" "}
            {filteredSubjects.length === 1 ? "matéria" : "matérias"}
          </span>
        </div>
      </div>

      {filteredSubjects.length > 0 ? (
        <List>
          {filteredSubjects.map((subject) => (
            <SubjectRow
              key={subject.code}
              subject={subject}
              searchTerm={deferredSearch.trim()}
            />
          ))}
        </List>
      ) : (
        <EmptyState
          icon={SearchXIcon}
          title="Nenhuma matéria encontrada"
          description="Tente outro termo de busca ou mude o filtro de cursos."
        />
      )}
    </div>
  );
}
