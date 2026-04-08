"use client";

import { useState } from "react";

import { todayStr, yesterdayOf } from "@/features/habits/lib/date";
import type { Habit } from "@/types/habit";

function buildHabit(name: string, emoji: string): Habit {
  return {
    id: crypto.randomUUID(),
    name,
    emoji,
    completedDates: []
  };
}

function calcStreak(habit: Habit) {
  if (habit.completedDates.length === 0) return 0;

  const dateSet = new Set(habit.completedDates);
  let streak = 0;
  let date = todayStr();

  while (dateSet.has(date)) {
    streak += 1;
    date = yesterdayOf(date);
  }

  return streak;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string, emoji: string) {
    setHabits((current) => [buildHabit(name, emoji), ...current]);
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  function toggleDate(id: string, date: string = todayStr()) {
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

  return { habits, addHabit, deleteHabit, toggleDate, getStreak: calcStreak };
}
