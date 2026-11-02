import type { AssessmentGroup, Subject } from "@/types/subjects";
import type { Catalogue } from "./schema";
import data from "./subjects.json";

const catalogue = data as Catalogue;

export const COURSES = catalogue.courses;

export const SUBJECTS = catalogue.subjects.map(normalizeWeights);

function normalizeWeights(subject: Subject): Subject {
	const total =
		(subject.exams?.weight ?? 0) + (subject.assignments?.weight ?? 0);

	const normalize = (group: AssessmentGroup | undefined) => {
		if (!group) return undefined;
		const itemsTotal = Object.values(group.items).reduce((a, b) => a + b, 0);
		return {
			weight: group.weight / total,
			items: Object.fromEntries(
				Object.entries(group.items).map(([name, weight]) => [
					name,
					weight / itemsTotal,
				]),
			),
		};
	};

	return {
		...subject,
		exams: normalize(subject.exams),
		assignments: normalize(subject.assignments),
	};
}
