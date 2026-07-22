import { type ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";

export interface AppShellProps {
  children: ReactNode;
}

/**
 * Outer frame for the Super Admin module: fixed Sidebar + a scrollable main
 * column. Each page renders its own <Header> or <Breadcrumb> at the top of
 * that column, since the topbar title/actions differ per page (plain title
 * on Dashboard/Projects, back-chevron + title on Project Details/Settings).
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-surface-muted">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
