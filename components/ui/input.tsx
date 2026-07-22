import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full min-w-30 rounded-sm border border-border-input bg-surface px-3 text-sm text-text-primary-alt placeholder:text-text-disabled",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-disabled",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
