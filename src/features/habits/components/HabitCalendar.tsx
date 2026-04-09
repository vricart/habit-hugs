"use client";

import { Calendar } from "@/components/ui/calendar";
import { fromLocalDateString, toLocalDateString } from "@/features/habits/lib/date";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types/habit";

type HabitCalendarProps = {
  habit: Habit;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

export function HabitCalendar({ habit, selectedDate, onSelectDate }: HabitCalendarProps) {
  const completedDates = habit.completedDates.map(fromLocalDateString);

  return (
    <div className="w-full rounded-3xl bg-card p-4 shadow-md ring-1 ring-border">
      <Calendar
        mode="single"
        selected={selectedDate ? fromLocalDateString(selectedDate) : undefined}
        onSelect={(day) => {
          if (!day) {
            onSelectDate(null);
            return;
          }
          const dateStr = toLocalDateString(day);
          onSelectDate(dateStr === selectedDate ? null : dateStr);
        }}
        className="pointer-events-auto p-0"
        modifiers={{ done: completedDates }}
        modifiersClassNames={{
          done: "[&>button]:rounded-full [&>button]:!bg-accent-foreground [&>button]:!text-white [&>button:hover]:!bg-accent-foreground/90"
        }}
      />
    </div>
  );
}
