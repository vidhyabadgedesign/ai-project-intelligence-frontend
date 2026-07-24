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

const PAGE_BUTTON_CLASS =
  "flex size-6 items-center justify-center font-poppins-sans text-xs font-medium transition-colors";

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;

  const visiblePages = getVisiblePages(page, pageCount);
  const showLeadingEllipsis = visiblePages[0]! > 2;
  const showTrailingEllipsis = visiblePages[visiblePages.length - 1]! < pageCount - 1;
  const showFirstPage = visiblePages[0]! > 1;
  const showLastPage = visiblePages[visiblePages.length - 1]! < pageCount;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-0.5", className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-6 items-center justify-center rounded-sm text-icon transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      {showFirstPage && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          className={cn(PAGE_BUTTON_CLASS, "rounded-sm text-[#666666] hover:bg-surface-muted")}
        >
          1
        </button>
      )}

      {showLeadingEllipsis && (
        <span className={cn(PAGE_BUTTON_CLASS, "text-[#666666]")} aria-hidden>
          …
        </span>
      )}

      {visiblePages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPageChange(p)}
          className={cn(
            PAGE_BUTTON_CLASS,
            p === page
              ? "rounded-full bg-secondary text-white"
              : "rounded-sm text-[#666666] hover:bg-surface-muted",
          )}
        >
          {p}
        </button>
      ))}

      {showTrailingEllipsis && (
        <span className={cn(PAGE_BUTTON_CLASS, "text-[#666666]")} aria-hidden>
          …
        </span>
      )}

      {showLastPage && (
        <button
          type="button"
          onClick={() => onPageChange(pageCount)}
          className={cn(PAGE_BUTTON_CLASS, "rounded-sm text-[#666666] hover:bg-surface-muted")}
        >
          {pageCount}
        </button>
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="flex size-6 items-center justify-center rounded-sm text-icon transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}
