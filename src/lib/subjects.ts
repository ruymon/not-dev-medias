import { SUBJECTS } from "@/data/subjects";
import { Subject } from "@/types/subjects";
import { cacheLife } from "next/cache";

const subjectsArray = Object.values(SUBJECTS);

export const AVAILABLE_COURSES = [
  ...new Set(subjectsArray.map((subject) => subject.course).filter(Boolean)),
];

export interface SubjectsFilter {
  search?: string;
  courses?: string;
}

export function parseSubjectsFilter(
  searchParams: Record<string, string | string[] | undefined>
): SubjectsFilter {
  const { search, courses } = searchParams;
  return {
    search: typeof search === "string" ? search : undefined,
    courses: typeof courses === "string" ? courses : undefined,
  };
}

/**
 * The catalogue is bundled with the app, so a given filter always yields the
 * same subjects. Caching it keys the result on the filter, which lets a
 * `<Link prefetch>` to a filtered URL include the results.
 */
export async function filterSubjects({
  search,
  courses,
}: SubjectsFilter): Promise<Subject[]> {
  "use cache";
  cacheLife("max");

  const selectedCourses = courses ? courses.split(",") : [];
  const searchTerm = search?.toLowerCase();

  return subjectsArray.filter((subject) => {
    const matchesSearch =
      !searchTerm ||
      subject.name.toLowerCase().includes(searchTerm) ||
      subject.code.toLowerCase().includes(searchTerm);

    const matchesCourse =
      selectedCourses.length === 0 || selectedCourses.includes(subject.course);

    return matchesSearch && matchesCourse;
  });
}
