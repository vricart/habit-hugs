import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] active:translate-y-0 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 motion-safe:hover:shadow-xl motion-safe:hover:shadow-primary/40",
        primary:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 motion-safe:hover:shadow-xl motion-safe:hover:shadow-primary/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 motion-safe:hover:shadow-md",
        ghost: "bg-transparent text-foreground hover:bg-accent/50",
        outline: "border border-border bg-card text-foreground hover:bg-accent/40"
      },
      size: {
        default: "rounded-2xl px-6 py-3 text-xl",
        lg: "rounded-3xl px-12 py-5 text-xl",
        icon: "h-10 w-10 rounded-xl p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
