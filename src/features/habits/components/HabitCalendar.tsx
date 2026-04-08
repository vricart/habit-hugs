"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types/habit";

type HabitCalendarProps = {
  habit: Habit;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
};

export function HabitCalendar({
  habit,
  selectedDate,
  onSelectDate
}: HabitCalendarProps) {
  const completedDates = habit.completedDates.map((date) => new Date(`${date}T00:00:00`));

  function toLocalDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function fromLocalDateString(date: string) {
    return new Date(`${date}T00:00:00`);
  }

  return (
    <div className="mx-auto w-fit rounded-3xl bg-card p-4 shadow-md ring-1 ring-border">
      <Calendar
        mode="single"
        selected={selectedDate ? fromLocalDateString(selectedDate) : undefined}
        onSelect={(day) => {
          if (!day) {
            onSelectDate(null);
            return;
          }
          const dateStr = toLocalDateString(day);
          if (dateStr === selectedDate) {
            onSelectDate(null);
            return;
          }
          onSelectDate(dateStr);
        }}
        className={cn("pointer-events-auto mx-auto p-3")}
        modifiers={{
          done: completedDates
        }}
        modifiersClassNames={{
          done: "rounded-full !bg-accent-foreground !text-white hover:!bg-accent-foreground/90"
        }}
      />
    </div>
  );
}
