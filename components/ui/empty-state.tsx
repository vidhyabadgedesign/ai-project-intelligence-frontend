import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-6 py-10 text-center",
        className,
      )}
    >
      {icon && <div className="mb-2 text-icon">{icon}</div>}
      <p className="font-medium text-sm text-text-secondary">{title}</p>
      {description && <p className="max-w-sm text-xs text-text-disabled">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
