import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] active:translate-y-0 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE7B5F]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#EE7B5F] text-white shadow-lg shadow-[#EE7B5F]/30 hover:bg-[#e56f53] motion-safe:hover:shadow-xl motion-safe:hover:shadow-[#EE7B5F]/40",
  secondary: "bg-stone-200 text-stone-800 hover:bg-stone-300 motion-safe:hover:shadow-md",
  ghost: "bg-transparent text-stone-700 hover:bg-stone-100"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "rounded-2xl px-6 py-3 text-xl",
  lg: "rounded-3xl px-12 py-5 text-xl"
};

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
