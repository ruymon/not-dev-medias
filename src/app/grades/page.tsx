import type { Metadata } from "next";
import { GradesBoard } from "./_components/grades-board";

export const metadata: Metadata = {
  title: "Minhas notas",
};

export const instant = true;

// A Server Component page so it can export metadata; the grades themselves
// live in localStorage, so the board is a Client Component.
export default function GradesPage() {
  return <GradesBoard />;
}
