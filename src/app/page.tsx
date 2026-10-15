import { SUBJECTS } from "@/data/subjects";
import { CalculatorIcon, ListChecksIcon, LockIcon } from "lucide-react";
import { GradePreview } from "./_components/grade-preview";
import { HomeCta } from "./_components/home-cta";

const SUBJECT_COUNT = Object.keys(SUBJECTS).length;

const STEPS = [
  {
    icon: ListChecksIcon,
    title: "Escolha suas matérias",
    description: `Busque entre as ${SUBJECT_COUNT} matérias da Mauá e monte a sua lista.`,
  },
  {
    icon: CalculatorIcon,
    title: "Lance o que já saiu",
    description:
      "Os pesos de cada prova e trabalho já vêm prontos. Você só digita as notas.",
  },
  {
    icon: LockIcon,
    title: "Tudo fica no seu navegador",
    description:
      "Sem conta, sem login, sem servidor. Exporte um arquivo quando quiser.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden">
        {/* Soft overhead light, so the hero isn't a flat slab of background. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,hsl(var(--foreground)/0.07),transparent)]"
        />

        <div className="container relative flex flex-col gap-12 py-16 md:py-24 lg:flex-row lg:items-center lg:gap-16 lg:py-28">
          <div className="flex max-w-xl flex-1 flex-col items-start gap-6">
            <span className="animate-reveal inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-grade-pass" />
              <span className="font-mono">{SUBJECT_COUNT}</span>
              matérias da Mauá
            </span>

            <h1
              className="animate-reveal text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "60ms" }}
            >
              Suas médias, sem encheção de saco.
            </h1>

            <p
              className="animate-reveal max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "120ms" }}
            >
              Escolha as matérias que você cursa, lance as notas que já saíram e
              veja exatamente onde você está — antes da prova, não depois.
            </p>

            <div
              className="animate-reveal"
              style={{ animationDelay: "180ms" }}
            >
              <HomeCta />
            </div>
          </div>

          <div
            className="animate-reveal w-full max-w-md lg:flex-1"
            style={{ animationDelay: "240ms" }}
          >
            <GradePreview />
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="container grid gap-10 py-14 sm:grid-cols-3 sm:gap-8 md:py-16">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40 text-muted-foreground">
                <Icon className="size-4" strokeWidth={1.75} />
              </div>
              <h2 className="text-sm font-medium tracking-tight">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
