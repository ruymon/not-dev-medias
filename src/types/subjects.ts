import type { COURSES } from "@/data/courses";

export type CourseId = keyof typeof COURSES;

export interface AssessmentGroup {
	weight: number;
	items: Record<string, number>;
}

export interface Subject {
	code: string;
	name: string;
	course: CourseId | null;
	period: "annual" | "semester" | null;
	exams?: AssessmentGroup;
	assignments?: AssessmentGroup;
}
