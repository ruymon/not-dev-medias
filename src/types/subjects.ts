export interface Subject {
	course: string;
	name: string;
	code: string;
	period: string;
	examWeight: number;
	assignmentWeight: number;
	exams: { name: string; weight: number }[];
	assignments: { name: string; weight: number }[];
}

export interface Subjects {
	[key: string]: Subject;
}
