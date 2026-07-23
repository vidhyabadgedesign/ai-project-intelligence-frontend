import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Overrides the outer scrollable area's own styling (e.g. background) without touching its layout/padding. */
  mainClassName?: string;
}

/**
 * Scrollable page content area used by every Super Admin page below the
 * Header: 24px padding, content capped at 1147px and centered. Extracted
 * from Dashboard/Projects, which had this wrapper duplicated verbatim.
 */
export function PageContainer({ children, className, mainClassName }: PageContainerProps) {
  return (
    <main className={cn("flex-1 overflow-y-auto p-6", mainClassName)}>
      <div className={cn("mx-auto flex max-w-[1147px] flex-col gap-6", className)}>{children}</div>
    </main>
  );
}
