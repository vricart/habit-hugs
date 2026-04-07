"use client";

import { EmptyHabitsState } from "@/features/habits/components/EmptyHabitsState";
import { AddHabitDialog } from "@/features/habits/components/AddHabitDialog";

export function HabitsHomePage() {
  function handleAddHabit(name: string, emoji: string) {
    // Placeholder until the habits store is wired in.
    console.log("Add habit", { name, emoji });
  }

  return (
    <main className="min-h-screen text-stone-700">
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-stone-800">
          🌸 My Habits
        </h1>
        <p className="mt-4 text-sm text-stone-500">
          Build tiny habits, one day at a time
        </p>

        <EmptyHabitsState />
        <AddHabitDialog onAdd={handleAddHabit} />
      </section>
    </main>
  );
}
