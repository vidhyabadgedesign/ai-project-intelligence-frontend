import { type InputHTMLAttributes, forwardRef } from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Search = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, placeholder = "Search", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-3 -translate-y-1/2 text-icon-secondary"
        />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn(
            "flex h-9 w-full min-w-30 rounded-sm border border-[#e5e7eb] bg-surface pl-8 pr-3 text-[13px] text-text-primary-alt placeholder:font-medium placeholder:text-text-secondary",
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
