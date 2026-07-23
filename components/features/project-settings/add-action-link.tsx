import { type ButtonHTMLAttributes } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddActionLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function AddActionLink({ label, className, type = "button", ...props }: AddActionLinkProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex shrink-0 items-center justify-end gap-1 whitespace-nowrap text-sm font-medium text-primary transition-colors hover:text-primary/80",
        className,
      )}
      {...props}
    >
      <Plus className="size-4 shrink-0" aria-hidden />
      {label}
    </button>
  );
}
