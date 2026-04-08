"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { EmptyHabitsState } from "@/features/habits/components/EmptyHabitsState";
import { AddHabitDialog } from "@/features/habits/components/AddHabitDialog";
import { HabitDetail } from "@/features/habits/components/HabitDetail";
import { HabitTile } from "@/features/habits/components/HabitTile";
import { useHabits } from "@/features/habits/hooks/useHabits";

export function HabitsHomePage() {
  const { habits, addHabit, deleteHabit, toggleDate, getStreak } = useHabits();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedHabit = habits.find((habit) => habit.id === selectedId);

  return (
    <main className="min-h-screen text-foreground">
      <AnimatePresence mode="wait">
        {selectedHabit ? (
          <HabitDetail
            key="detail"
            habit={selectedHabit}
            streak={getStreak(selectedHabit)}
            onMarkDone={(date) => toggleDate(selectedHabit.id, date)}
            onDelete={() => {
              deleteHabit(selectedHabit.id);
              setSelectedId(null);
            }}
            onBack={() => setSelectedId(null)}
          />
        ) : (
          <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              🌸 My Habits
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
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
                    onClick={() => setSelectedId(habit.id)}
                  />
                ))}
              </div>
            )}

            <AddHabitDialog onAdd={addHabit} />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
