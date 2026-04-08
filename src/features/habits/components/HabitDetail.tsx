"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { todayStr } from "@/features/habits/lib/date";
import { pluralize } from "@/lib/utils";
import type { Habit } from "@/types/habit";
import { EditHabitDialog } from "./EditHabitDialog";
import { HabitCalendar } from "./HabitCalendar";

type HabitDetailProps = {
  habit: Habit;
  streak: number;
  onMarkDone: (date: string) => void;
  onEdit: (name: string, emoji: string) => void;
  onDelete: () => void;
  onBack: () => void;
};

export function HabitDetail({ habit, streak, onMarkDone, onEdit, onDelete, onBack }: HabitDetailProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr());
  const doneSelectedDate = selectedDate ? habit.completedDates.includes(selectedDate) : false;

  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 pt-4"
    >
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditOpen(true)}
            className="rounded-xl"
          >
            <Pencil className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="rounded-xl text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="text-6xl">{habit.emoji}</div>
      <h2 className="text-2xl font-extrabold text-foreground">{habit.name}</h2>

      {streak > 0 && <p className="text-lg font-semibold text-primary">🔥 {streak} day streak!</p>}

      <p className="text-sm text-muted-foreground">
        {pluralize(habit.completedDates.length, "day")} completed
      </p>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="w-full max-w-[23rem] self-center"
      >
        <Button
          onClick={() => {
            if (!selectedDate) return;
            onMarkDone(selectedDate);
          }}
          size="lg"
          className={`h-16 w-full rounded-2xl text-lg font-bold ${
            doneSelectedDate ? "bg-success text-success-foreground hover:bg-success/90" : ""
          }`}
        >
          {doneSelectedDate ? "↩ Mark as not done" : "Mark as done"}
        </Button>
      </motion.div>

      <div className="w-full max-w-[23rem] self-center">
        <HabitCalendar
          habit={habit}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>

      <EditHabitDialog
        habit={habit}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={onEdit}
      />
    </motion.div>
  );
}
