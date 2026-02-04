import { getAllStartups } from "@/lib/startups";
import Link from "next/link";
import StartupsList from "./StartupsList";

export default function StartupsPage() {
  const startups = getAllStartups();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Indian Startups</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">A curated, lightweight directory — quick overview with clean cards and clear actions.</p>
      </header>

      <StartupsList startups={startups} />
    </div>
  );
}
