import { z } from "zod";

z.config(z.locales.ptBR());

export const WEIGHT_TOLERANCE = 0.001;

function sum(values: number[]) {
	return values.reduce((total, value) => total + value, 0);
}

function sumsToOne(values: number[]) {
	return Math.abs(sum(values) - 1) <= WEIGHT_TOLERANCE;
}

const weightSchema = z
	.number()
	.gt(0, "O peso precisa ser maior que 0.")
	.lte(1, "O peso precisa ser no máximo 1.");

function assessmentGroupSchema(prefix: "P" | "T", label: string) {
	return z
		.object({
			weight: weightSchema.describe(
				`Peso de ${label} na média final, entre 0 e 1 (ex.: 0.7 para 70%).`,
			),
			items: z
				.record(
					z
						.string()
						.regex(
							new RegExp(`^${prefix}\\d+$`),
							`Use nomes como ${prefix}1, ${prefix}2…`,
						),
					weightSchema,
				)
				.describe(
					`Cada avaliação e seu peso dentro de ${label}. Os pesos somam 1.`,
				)
				.refine((items) => Object.keys(items).length > 0, {
					message: `${label} precisa ter ao menos uma avaliação.`,
				})
				.refine((items) => sumsToOne(Object.values(items)), {
					message: `Os pesos de ${label} precisam somar 1.`,
				}),
		})
		.strict();
}

const subjectSchema = z
	.object({
		code: z
			.string()
			.regex(/^[A-Z]{3,4}\d{2,3}$/, "Código inválido (ex.: ECM251).")
			.describe("Código da matéria na Mauá, ex.: ECM251."),
		name: z.string().trim().min(1, "O nome não pode ficar vazio."),
		course: z
			.string()
			.nullable()
			.describe("Id de um curso em `courses`, ou null se não houver."),
		period: z
			.enum(["annual", "semester"])
			.nullable()
			.describe("annual (anual) ou semester (semestral)."),
		exams: assessmentGroupSchema("P", "provas").optional(),
		assignments: assessmentGroupSchema("T", "trabalhos").optional(),
	})
	.strict()
	.superRefine((subject, ctx) => {
		const groups = [subject.exams, subject.assignments].filter(
			(group) => group !== undefined,
		);

		if (groups.length > 0 && !sumsToOne(groups.map((group) => group.weight))) {
			ctx.addIssue({
				code: "custom",
				message: "Os pesos de provas e trabalhos precisam somar 1.",
			});
		}
		if (groups.length > 0 && subject.period === null) {
			ctx.addIssue({
				code: "custom",
				path: ["period"],
				message: "Matérias com avaliações precisam de um período.",
			});
		}
		if (groups.length === 0 && subject.period !== null) {
			ctx.addIssue({
				code: "custom",
				path: ["period"],
				message: "Matérias sem avaliações não têm período (use null).",
			});
		}
	});

export const catalogueSchema = z
	.object({
		$schema: z.string().optional(),
		courses: z
			.record(
				z
					.string()
					.regex(
						/^[a-z0-9]+(-[a-z0-9]+)*$/,
						"Use ids em minúsculas com hífens, ex.: engenharia-civil.",
					),
				z.string().trim().min(1),
			)
			.describe("Cursos: id → nome exibido."),
		subjects: z.array(subjectSchema),
	})
	.strict()
	.superRefine(
		(catalogue, ctx) => {
			const courses = catalogue.courses ?? {};
			const seen = new Set<string>();
			const subjects = Array.isArray(catalogue.subjects)
				? catalogue.subjects
				: [];

			subjects.forEach((subject, index) => {
				if (seen.has(subject?.code)) {
					ctx.addIssue({
						code: "custom",
						path: ["subjects", index, "code"],
						message: `Código repetido: ${subject.code}.`,
					});
				}
				seen.add(subject?.code);

				if (
					typeof subject?.course === "string" &&
					!Object.hasOwn(courses, subject.course)
				) {
					ctx.addIssue({
						code: "custom",
						path: ["subjects", index, "course"],
						message: `Curso "${subject.course}" não existe em courses.`,
					});
				}
			});
		},
		{ when: () => true },
	);

export type Catalogue = z.infer<typeof catalogueSchema>;

export function formatCatalogueIssues(error: z.ZodError, data: unknown) {
	const subjects = (data as { subjects?: { code?: string }[] }).subjects;

	return error.issues.map((issue) => {
		const [section, index, ...rest] = issue.path;
		const where =
			section === "subjects" && typeof index === "number"
				? [subjects?.[index]?.code ?? `subjects[${index}]`, ...rest]
				: issue.path;
		const message =
			issue.code === "invalid_key"
				? (issue.issues[0]?.message ?? issue.message)
				: issue.message;
		return `${where.join(" › ") || "catálogo"}: ${message}`;
	});
}
