export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-start flex-1 px-6 w-full gap-16">
      <header className="flex flex-col gap-4 container">
        <span className="text-muted-foreground mb-4">
          Calcule suas médias sem encheção de saco!
        </span>
        <h1 className="text-primary font-bold text-5xl">Não é o Dev Médias</h1>
        <span className="text-accent-foreground text-xl max-w-2xl">
          Um site sem complicações, sem frescura. Apenas uma ferramenta simples
          e eficiente para calcular suas médias da Mauá.
        </span>
      </header>
    </main>
  );
}
