import { X } from "lucide-react";

interface ChipProps {
  label: string;
  onRemove?: () => void;
}

export function Chip({ label, onRemove }: ChipProps) {
  return (
    <span className="inline-flex h-[30px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-pill bg-chip-bg px-3">
      <span className="text-[13px] font-medium text-black">{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="text-icon transition-colors hover:text-text-primary"
        >
          <X className="size-[15px]" aria-hidden />
        </button>
      )}
    </span>
  );
}
