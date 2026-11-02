import { readFile, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import { z } from "zod";
import { catalogueSchema, formatCatalogueIssues } from "../src/data/schema";

const dataFile = new URL("../src/data/subjects.json", import.meta.url);
const schemaFile = new URL("../src/data/subjects.schema.json", import.meta.url);

const data: unknown = JSON.parse(await readFile(dataFile, "utf8"));
const result = catalogueSchema.safeParse(data);

if (!result.success) {
	const issues = formatCatalogueIssues(result.error, data);
	console.error(`✗ src/data/subjects.json tem ${issues.length} problema(s):\n`);
	for (const issue of issues) console.error(`  • ${issue}`);
	process.exit(1);
}

const jsonSchema = z.toJSONSchema(catalogueSchema, { io: "input" });

if (process.argv.includes("--write")) {
	await writeFile(schemaFile, `${JSON.stringify(jsonSchema, null, "\t")}\n`);
	console.log("✓ src/data/subjects.schema.json atualizado.");
} else {
	const current = await readFile(schemaFile, "utf8").then(
		JSON.parse,
		() => null,
	);
	if (!isDeepStrictEqual(current, jsonSchema)) {
		console.error(
			"✗ src/data/subjects.schema.json está desatualizado. Rode `bun run data:schema`.",
		);
		process.exit(1);
	}
}

const { subjects, courses } = result.data;
console.log(
	`✓ ${subjects.length} matérias e ${Object.keys(courses).length} cursos válidos.`,
);
