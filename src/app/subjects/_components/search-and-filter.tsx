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
  const [selectedSubjectYears, setSelectedSubjectYears] = useState<string[]>(
    searchParams.get("years")?.split(",") || []
  );

  const availableCourses = useMemo(() => {
    const coursesSet = new Set<string>();
    subjects.forEach((subject) => {
      if (subject.course) coursesSet.add(subject.course);
    });

    return Array.from(coursesSet);
  }, [subjects]);

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
    <div className="hidden flex-col gap-6 md:flex">
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
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-6">
        <header className="flex flex-col">
          <h2 className="text-accent-foreground font-medium text-lg">Curso</h2>
          <span className="text-sm text-muted-foreground">
            Filtre por curso
          </span>
        </header>

        <ScrollArea className="h-96">
          <ul className="flex flex-col gap-4">
            {availableCourses.map((course) => (
              <li key={course} className="flex items-center gap-2">
                <Checkbox
                  id={course}
                  checked={selectedCourses.includes(course)}
                  onCheckedChange={() => handleCourseToggle(course)}
                />
                <Label htmlFor={course}>{course}</Label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <Button
        variant="outline"
        onClick={handleClear}
        disabled={isPending || (!search && selectedCourses.length === 0)}
      >
        Limpar filtros
      </Button>
    </div>
  );
}
