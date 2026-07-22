export type Severity = "critical" | "high" | "medium" | "low";

interface SeverityConfig {
  label: string;
  textClassName: string;
  bgClassName: string;
}

/**
 * Single source of truth for severity color/label across the app.
 *
 * The Figma file names two different color variables ("High" #FF6500 and
 * "Medium" #EEB300) but reuses the "High" variable's color on every badge
 * labeled "Medium". Resolved here by variable identity, not by the mislabeled
 * badge: the High variable maps to the High tier, the Medium variable maps to
 * the Medium tier, so every severity gets its own distinct color.
 */
export const SEVERITY_CONFIG: Record<Severity, SeverityConfig> = {
  critical: {
    label: "Critical",
    textClassName: "text-critical",
    bgClassName: "bg-critical-bg",
  },
  high: {
    label: "High",
    textClassName: "text-high",
    bgClassName: "bg-high-bg",
  },
  medium: {
    label: "Medium",
    textClassName: "text-medium",
    bgClassName: "bg-medium-bg",
  },
  low: {
    label: "Low",
    textClassName: "text-low",
    bgClassName: "bg-low-bg",
  },
};

export const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low"];
