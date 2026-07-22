import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-24 w-full min-w-30 rounded-sm border border-border-input bg-surface px-3 py-2 text-sm text-text-primary-alt placeholder:text-text-disabled",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-disabled",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
