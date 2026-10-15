import { ReactNode } from "react";

export default function SubjectsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container flex flex-col gap-8 py-8 md:flex-row md:gap-12 md:py-12">
      {children}
    </main>
  );
}
