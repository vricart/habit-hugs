"use client";

import { motion } from "framer-motion";

import type { Habit } from "@/types/habit";

type HabitTileProps = {
  habit: Habit;
  streak: number;
  onClick: () => void;
};

export function HabitTile({ habit, streak, onClick }: HabitTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 text-left shadow-md ring-1 ring-stone-200 transition-colors"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-3xl">
        {habit.emoji}
      </span>

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <span className="w-full truncate text-base leading-tight font-bold text-stone-800">
          {habit.name}
        </span>
        {streak > 0 && (
          <span className="mt-0.5 text-xs font-semibold text-[#EE7B5F]">
            🔥 {streak} day{streak !== 1 ? "s" : ""} streak
          </span>
        )}
      </div>

      <span className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-500">
        {habit.completedDates.length} day{habit.completedDates.length !== 1 ? "s" : ""}
      </span>
    </motion.button>
  );
}
