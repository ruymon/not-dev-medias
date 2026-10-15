"use client";

import { Button } from "@/components/ui/button";
import {
  List,
  ListItem,
  listRowClassName,
  listRowInteractiveClassName,
} from "@/components/ui/list";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  calculateSubjectGrade,
  getSubjectOutlook,
  needsAttention,
  type SubjectOutlook,
} from "@/lib/grades";
import { cn } from "@/lib/utils";
import { useSubscribedSubjectsGradesStore } from "@/stores/subscribed-subjects-grades-store";
import { useSubscribedSubjectsStore } from "@/stores/subscribed-subjects-store";
import {
  ChevronRightIcon,
  LibraryBigIcon,
  PencilLineIcon,
  WifiOffIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { describeOutlook, GradeBadge } from "./grade-badge";
import { GradesChart } from "./grades-chart";
import { Page, PageHeader, Section } from "./page";

export function HomeScreen({ subjectCount }: { subjectCount: number }) {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <Page>
        <PageHeader eyebrow="Não é o Dev Médias" title="Resumo" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </Page>
    );
  }

  const subjects = Object.values(subscribedSubjects);

  if (subjects.length === 0) return <Welcome subjectCount={subjectCount} />;

  return <Summary />;
}

const STEPS: {
  icon: LucideIcon;
  tint: string;
  title: string;
  description: (subjectCount: number) => string;
}[] = [
  {
    icon: LibraryBigIcon,
    tint: "bg-primary",
    title: "Escolha suas matérias",
    description: (count) => `Entre as ${count} matérias da Mauá.`,
  },
  {
    icon: PencilLineIcon,
    tint: "bg-chart-assignment",
    title: "Lance o que já saiu",
    description: () => "Os pesos de provas e trabalhos já vêm prontos.",
  },
  {
    icon: WifiOffIcon,
    tint: "bg-[#8e8e93]",
    title: "Funciona offline",
    description: () => "Sem conta e sem servidor. Fica tudo no seu aparelho.",
  },
];

function Welcome({ subjectCount }: { subjectCount: number }) {
  return (
    <Page>
      <PageHeader
        eyebrow="Boas-vindas ao"
        title="Não é o Dev Médias"
        description="Suas médias da Mauá sem encheção de saco. Veja quanto falta em cada matéria antes da prova, não depois."
      />

      <Section title="Como funciona">
        <List>
          {STEPS.map(({ icon: Icon, tint, title, description }) => (
            <ListItem
              key={title}
              // The separator starts after the icon, as in iOS Settings.
              className="after:left-[3.75rem]"
            >
              <div className={listRowClassName}>
                <span
                  className={cn(
                    "flex size-[1.875rem] shrink-0 items-center justify-center rounded-[7px] text-white",
                    tint
                  )}
                >
                  <Icon className="size-[1.125rem]" strokeWidth={2} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-body">{title}</span>
                  <span className="text-footnote text-muted-foreground">
                    {description(subjectCount)}
                  </span>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </Section>

      <Button asChild size="lg" className="w-full sm:w-auto sm:self-start">
        <Link href="/subjects">Escolher matérias</Link>
      </Button>
    </Page>
  );
}

/** Sorts what needs the most work first: unreachable, then highest needed. */
function urgency(outlook: SubjectOutlook) {
  switch (outlook.kind) {
    case "unreachable":
      return 20;
    case "pending":
      return outlook.needed;
    case "final":
      return 10 - outlook.grade;
    default:
      return -1;
  }
}

function Summary() {
  const { subscribedSubjects } = useSubscribedSubjectsStore();
  const { grades } = useSubscribedSubjectsGradesStore();

  const subjects = Object.values(subscribedSubjects);
  const rows = subjects.map((subject) => ({
    subject,
    outlook: getSubjectOutlook(
      calculateSubjectGrade(subject, grades[subject.code])
    ),
  }));

  const attention = rows
    .filter((row) => needsAttention(row.outlook))
    .sort((a, b) => urgency(b.outlook) - urgency(a.outlook));
  const hasAnyGrade = rows.some((row) => row.outlook.kind !== "empty");

  return (
    <Page>
      <PageHeader eyebrow="Não é o Dev Médias" title="Resumo" />

      <Section
        title="Visão geral"
        description={`${subjects.length} ${
          subjects.length === 1 ? "matéria" : "matérias"
        } neste semestre`}
        action={
          <Button asChild variant="plain" size="inline">
            <Link href="/grades">Lançar notas</Link>
          </Button>
        }
      >
        <GradesChart subjects={subjects} grades={grades} />
      </Section>

      <Section
        title="Precisa de atenção"
        description="O que falta para chegar a 6"
      >
        {attention.length > 0 ? (
          <List>
            {attention.map(({ subject, outlook }) => (
              <ListItem key={subject.code}>
                <Link
                  href={`/grades#${subject.code}`}
                  className={listRowInteractiveClassName}
                >
                  <div className="flex min-w-0 flex-1 flex-col py-0.5">
                    <span className="truncate text-body">{subject.name}</span>
                    <span
                      className={cn(
                        "text-footnote",
                        outlook.kind === "unreachable"
                          ? "text-grade-fail"
                          : "text-muted-foreground"
                      )}
                    >
                      {describeOutlook(outlook)}
                    </span>
                  </div>
                  <GradeBadge outlook={outlook} />
                  <ChevronRightIcon
                    aria-hidden
                    className="-mr-1 size-4 shrink-0 text-tertiary-foreground"
                    strokeWidth={2.5}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <p className="rounded-lg bg-card px-4 py-3 text-subheadline text-muted-foreground">
            {hasAnyGrade
              ? "Nenhuma matéria abaixo de 6 por enquanto."
              : "Lance uma nota e as matérias que precisam de esforço aparecem aqui."}
          </p>
        )}
      </Section>
    </Page>
  );
}
