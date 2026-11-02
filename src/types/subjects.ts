import type { Catalogue } from "@/data/schema";

export type Subject = Catalogue["subjects"][number];

export type AssessmentGroup = NonNullable<Subject["exams"]>;

export type CourseId = keyof Catalogue["courses"];
