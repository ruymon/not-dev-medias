interface AwardsPageProps {}

export default function AwardsPage({}: AwardsPageProps) {
  return (
    <main className="flex py-8 px-6 max-w-5xl mx-auto w-full gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-primary font-bold text-3xl">Insígnias</h1>
        <span className="text-accent-foreground">
          Ganhe medalhas ao completar desafios
        </span>
      </header>
    </main>
  );
}
