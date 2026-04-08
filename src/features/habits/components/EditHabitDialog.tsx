"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EMOJI_OPTIONS } from "../lib/constants";
import type { Habit } from "@/types/habit";

type EditHabitDialogProps = {
  habit: Habit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string, emoji: string) => void;
};

export function EditHabitDialog({ habit, open, onOpenChange, onSave }: EditHabitDialogProps) {
  const [name, setName] = useState(habit.name);
  const [emoji, setEmoji] = useState(habit.emoji);

  useEffect(() => {
    if (open) {
      setName(habit.name);
      setEmoji(habit.emoji);
    }
  }, [open, habit.name, habit.emoji]);

  function handleSubmit() {
    if (!name.trim()) return;
    onSave(name.trim(), emoji);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit habit ✏️</DialogTitle>
          <DialogDescription className="sr-only">
            Update the name or icon for this habit.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <Input
            placeholder="Habit name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Pick an icon</p>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEmoji(option)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all ${
                    emoji === option
                      ? "scale-110 bg-primary/20 ring-2 ring-primary"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="h-12 w-full rounded-xl text-base font-semibold">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
