import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-stone-200 bg-white px-4 text-base text-stone-700 shadow-sm outline-none transition focus:border-[#EE7B5F] focus:ring-2 focus:ring-[#EE7B5F]/30 h-12",
        className
      )}
      {...props}
    />
  );
}
