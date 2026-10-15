"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Subject } from "@/types/subjects";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

export function SearchAndFilter({ subjects }: { subjects: Subject[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCourses, setSelectedCourses] = useState<string[]>(
    searchParams.get("courses")?.split(",") || []
  );
  const availableCourses = useMemo(
    () => [...new Set(subjects.map((subject) => subject.course).filter(Boolean))],
    [subjects]
  );

  const handleSearch = (term: string) => {
    setSearch(term);
    updateURL(term, selectedCourses);
  };

  const handleCourseToggle = (courseId: string) => {
    const updatedCourses = selectedCourses.includes(courseId)
      ? selectedCourses.filter((id) => id !== courseId)
      : [...selectedCourses, courseId];
    setSelectedCourses(updatedCourses);
    updateURL(search, updatedCourses);
  };

  const updateURL = (searchTerm: string, courses: string[]) => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (courses.length > 0) params.set("courses", courses.join(","));
      router.replace(`/subjects?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearch("");
    setSelectedCourses([]);
    router.replace("/subjects");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Buscar
        </h2>

        <Input
          placeholder="Nome ou código da matéria"
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="hidden flex-col gap-3 md:flex">
        <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Curso
        </h2>

        <ScrollArea className="h-96 pr-3">
          <ul className="flex flex-col gap-1">
            {availableCourses.map((course) => (
              <li key={course}>
                <Label
                  htmlFor={course}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-normal text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground has-[[data-state=checked]]:text-foreground"
                >
                  <Checkbox
                    id={course}
                    checked={selectedCourses.includes(course)}
                    onCheckedChange={() => handleCourseToggle(course)}
                  />
                  {course}
                </Label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleClear}
        disabled={isPending || (!search && selectedCourses.length === 0)}
      >
        Limpar filtros
      </Button>
    </div>
  );
}
