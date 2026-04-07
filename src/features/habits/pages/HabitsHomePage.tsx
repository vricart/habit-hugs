"use client";

import { motion } from "framer-motion";

import { EmptyHabitsState } from "@/features/habits/components/EmptyHabitsState";
import { AddHabitDialog } from "@/features/habits/components/AddHabitDialog";
import { HabitTile } from "@/features/habits/components/HabitTile";
import { useHabits } from "@/features/habits/hooks/useHabits";

export function HabitsHomePage() {
  const { habits, addHabit, getStreak } = useHabits();

  return (
    <main className="min-h-screen text-stone-700">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight text-stone-800">
          🌸 My Habits
        </h1>
        <p className="mt-4 text-sm text-stone-500">
          Build tiny habits, one day at a time
        </p>

        {habits.length === 0 ? (
          <EmptyHabitsState />
        ) : (
          <div className="mt-8 flex w-full flex-col gap-3">
            {habits.map((habit) => (
              <HabitTile
                key={habit.id}
                habit={habit}
                streak={getStreak(habit)}
                onClick={() => {}}
              />
            ))}
          </div>
        )}

        <AddHabitDialog onAdd={addHabit} />
      </motion.section>
    </main>
  );
}
