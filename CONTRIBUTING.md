# Contribuindo com o catálogo de matérias

Todas as matérias, cursos e pesos ficam em um único arquivo: [`src/data/subjects.json`](src/data/subjects.json). Para corrigir um peso ou adicionar uma matéria, basta editar esse arquivo e abrir um pull request. Dá para fazer tudo pelo editor do GitHub, sem instalar nada.

## Estrutura

```json
{
  "courses": {
    "administracao": "Administração"
  },
  "subjects": [
    {
      "code": "ADM112",
      "name": "Cálculo Aplicado à Administração",
      "course": "administracao",
      "period": "semester",
      "exams": { "weight": 0.7, "items": { "P1": 0.5, "P2": 0.5 } },
      "assignments": { "weight": 0.3, "items": { "T1": 0.1, "T2": 0.3, "T3": 0.6 } }
    }
  ]
}
```

- **`courses`**: id do curso (minúsculas com hífens) → nome exibido no site.
- **`code`**: código da matéria na Mauá. Não pode repetir.
- **`course`**: id de um curso de `courses`, ou `null`.
- **`period`**: `"annual"` (anual) ou `"semester"` (semestral).
- **`exams`** (provas) e **`assignments`** (trabalhos): cada grupo tem
  - `weight`: o peso do grupo na média final, de 0 a 1 (70% vira `0.7`);
  - `items`: cada avaliação e seu peso dentro do grupo. Provas se chamam `P1`, `P2`…; trabalhos, `T1`, `T2`…

  Uma matéria sem provas (ou sem trabalhos) simplesmente não tem esse grupo.

Os pesos de `exams` e `assignments` somam 1, e os pesos de `items` dentro de cada grupo também. Pesos como 1/3 podem ser escritos como `0.3333`: aceitamos uma diferença de até 0.001 e o site normaliza os valores na hora de calcular a média.

## Checando antes de enviar

Todo pull request que mexe em `src/data` roda a validação automaticamente e aponta o que estiver errado, por exemplo:

```text
✗ src/data/subjects.json tem 2 problema(s):

  • ADM112 › assignments › items: Os pesos de trabalhos precisam somar 1.
  • ADM113 › course: Curso "administracoa" não existe em courses.
```

Para rodar localmente (com [Bun](https://bun.sh)):

```bash
bun install
bun run data:check
```

No VS Code, o arquivo já é validado enquanto você digita, graças ao `subjects.schema.json`. Se você alterar as regras em `src/data/schema.ts`, rode `bun run data:schema` para atualizar esse arquivo.
