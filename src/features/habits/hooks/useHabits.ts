"use client";

import { useMemo, useState } from "react";

import type { Habit } from "@/types/habit";

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayIsoDate(date: string) {
  const current = new Date(`${date}T00:00:00`);
  current.setDate(current.getDate() - 1);
  return current.toISOString().slice(0, 10);
}

function buildHabit(name: string, emoji: string): Habit {
  return {
    id: crypto.randomUUID(),
    name,
    emoji,
    completedDates: []
  };
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string, emoji: string) {
    setHabits((current) => [buildHabit(name, emoji), ...current]);
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  function toggleDate(id: string, date: string = getTodayIsoDate()) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit;

        const hasDate = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: hasDate
            ? habit.completedDates.filter((value) => value !== date)
            : [...habit.completedDates, date]
        };
      })
    );
  }

  function markDateDone(id: string, date: string = getTodayIsoDate()) {
    setHabits((current) =>
      current.map((habit) => {
        if (habit.id !== id) return habit;
        const hasDate = habit.completedDates.includes(date);
        return {
          ...habit,
          completedDates: hasDate
            ? habit.completedDates.filter((value) => value !== date)
            : [...habit.completedDates, date]
        };
      })
    );
  }

  const getStreak = useMemo(
    () => (habit: Habit) => {
      if (habit.completedDates.length === 0) return 0;

      const dateSet = new Set(habit.completedDates);
      let streak = 0;
      let date = getTodayIsoDate();

      while (dateSet.has(date)) {
        streak += 1;
        date = getYesterdayIsoDate(date);
      }

      return streak;
    },
    []
  );

  return { habits, addHabit, deleteHabit, toggleDate, markDateDone, getStreak };
}
