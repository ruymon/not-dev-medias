import { SUBJECTS } from "@/data/subjects";
import { HomeScreen } from "./_components/home-screen";

const SUBJECT_COUNT = Object.keys(SUBJECTS).length;

export default function HomePage() {
  return <HomeScreen subjectCount={SUBJECT_COUNT} />;
}
