import { cacheLife } from "next/cache";
import { catalogueSchema, formatCatalogueIssues } from "@/data/schema";
import { COURSES, SUBJECTS } from "@/data/subjects";
import data from "@/data/subjects.json";
import type { CourseId, Subject } from "@/types/subjects";
import { normalizeText } from "./text";

const validation = catalogueSchema.safeParse(data);
if (!validation.success) {
	throw new Error(
		[
			"src/data/subjects.json é inválido:",
			...formatCatalogueIssues(validation.error, data),
		].join("\n"),
	);
}

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
