"use client";

import { motion } from "framer-motion";

import { pluralize } from "@/lib/utils";
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
      className="relative flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-md ring-1 ring-border transition-colors"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-3xl">
        {habit.emoji}
      </span>

      <div className="flex min-w-0 flex-1 flex-col items-start">
        <span className="w-full truncate text-base leading-tight font-bold text-card-foreground">
          {habit.name}
        </span>
        {streak > 0 && (
          <span className="mt-0.5 text-xs font-semibold text-primary">
            🔥 {pluralize(streak, "day")} streak
          </span>
        )}
      </div>

      <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
        {pluralize(habit.completedDates.length, "day")}
      </span>
    </motion.button>
  );
}
