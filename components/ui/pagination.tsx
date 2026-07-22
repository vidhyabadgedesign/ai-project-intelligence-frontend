import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getVisiblePages(page: number, pageCount: number): number[] {
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pageCount, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-8 items-center justify-center rounded-xs text-icon transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      {getVisiblePages(page, pageCount).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={cn(
            "flex size-8 items-center justify-center rounded-xs text-sm transition-colors",
            p === page
              ? "bg-primary text-white"
              : "text-text-primary-alt hover:bg-surface-muted",
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="flex size-8 items-center justify-center rounded-xs text-icon transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}
