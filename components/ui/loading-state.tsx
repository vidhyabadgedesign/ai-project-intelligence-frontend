import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = "Loading…", className }: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn("flex flex-col items-center justify-center gap-2 py-10 text-text-secondary", className)}
    >
      <Loader2 className="size-5 animate-spin text-primary" aria-hidden />
      <span className="text-xs">{label}</span>
    </div>
  );
}
