import { cn } from "@/lib/utils";
import type { Incident } from "@/lib/types";

const STYLE_CLASSNAME: Record<Incident["severityStyle"], string> = {
  critical: "bg-critical-bg text-critical",
  high: "bg-high-bg text-high",
  low: "bg-low-bg text-low",
};

interface IncidentSeverityBadgeProps {
  incident: Pick<Incident, "severityLabel" | "severityStyle">;
  className?: string;
}

/**
 * Reproduces each incident row's literal Figma label + color pairing exactly
 * as designed. Several rows pair a label with a different tier's color (e.g.
 * "Low" rendered in the Critical color, "Critical" rendered in the Low
 * color) — the same kind of label/color mismatch already preserved for the
 * Projects list's Medium badge, kept here rather than "corrected".
 */
export function IncidentSeverityBadge({ incident, className }: IncidentSeverityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-pill px-2 py-1.5 text-[13px] font-sans leading-4",
        STYLE_CLASSNAME[incident.severityStyle],
        className,
      )}
    >
      {incident.severityLabel}
    </span>
  );
}
