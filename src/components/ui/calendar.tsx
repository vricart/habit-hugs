"use client";

import type * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col",
        month: "w-full space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "block w-full px-12 text-center text-sm font-semibold text-foreground",
        nav: "absolute inset-x-1 top-1 flex items-center justify-between",
        button_previous: cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7 rounded-md p-0 text-muted-foreground"),
        button_next: cn(buttonVariants({ variant: "outline", size: "icon" }), "h-7 w-7 rounded-md p-0 text-muted-foreground"),
        table: "w-full border-collapse",
        weekdays: "flex w-full justify-between",
        weekday: "w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground",
        week: "mt-2 flex w-full justify-between",
        // day is the wrapper cell; day_button is the actual <button> inside it
        day: "flex h-9 w-9 items-center justify-center",
        day_button: "h-full w-full rounded-xl font-normal text-foreground transition-colors hover:bg-secondary focus-visible:outline-none",
        // modifier classes on the wrapper use [&>button]: to style the inner button
        selected: "[&>button]:bg-accent/50 [&>button:hover]:bg-accent/65",
        today: "[&>button]:border [&>button]:border-border",
        outside: "[&>button]:opacity-50",
        ...classNames
      }}
      {...props}
    />
  );
}
