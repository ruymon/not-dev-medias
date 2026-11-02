import { cacheLife } from "next/cache";
import { COURSES } from "@/data/courses";
import { SUBJECTS } from "@/data/subjects";
import type { CourseId, Subject } from "@/types/subjects";
import { normalizeText } from "./text";

export interface SubjectsFilter {
	search: string;
	courses: CourseId[];
}

function isCourseId(value: string): value is CourseId {
	return Object.hasOwn(COURSES, value);
}

export function parseSubjectsFilter(
	searchParams: Record<string, string | string[] | undefined>,
): SubjectsFilter {
	const { search, courses } = searchParams;
	return {
		search: typeof search === "string" ? search : "",
		courses:
			typeof courses === "string" ? courses.split(",").filter(isCourseId) : [],
	};
}

const searchIndex = SUBJECTS.map((subject) =>
	normalizeText(`${subject.code} ${subject.name}`),
);

export async function filterSubjects({
	search,
	courses,
}: SubjectsFilter): Promise<Subject[]> {
	"use cache";
	cacheLife("max");

	const term = normalizeText(search);

	return SUBJECTS.filter(
		(subject, index) =>
			searchIndex[index].includes(term) &&
			(courses.length === 0 ||
				(subject.course !== null && courses.includes(subject.course))),
	);
}
