"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const EMOJI_OPTIONS = [
  "🏃",
  "📖",
  "💧",
  "🥗",
  "🧘",
  "💪",
  "🎨",
  "🎵",
  "💤",
  "🧹",
  "💊",
  "🚭"
];

type AddHabitDialogProps = {
  onAdd: (name: string, emoji: string) => void;
};

export function AddHabitDialog({ onAdd }: AddHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🏃");

  function handleSubmit() {
    if (!name.trim()) return;
    onAdd(name.trim(), emoji);
    setName("");
    setEmoji("🏃");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="default" className="mt-20 rounded-2xl gap-2">
            <Plus className="h-5 w-5" />
            New Habit
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new habit ✨</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <Input
            placeholder="e.g. Keto diet, Read 30 min..."
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
            Add Habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
