import { type InputHTMLAttributes, forwardRef } from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Search = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, placeholder = "Search", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-icon"
        />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full min-w-30 rounded-sm border border-border-input bg-surface pl-9 pr-3 text-sm text-text-primary-alt placeholder:text-text-disabled",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Search.displayName = "Search";
