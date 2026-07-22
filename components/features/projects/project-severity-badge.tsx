import { Badge } from "@/components/ui/badge";
import type { ProjectListItem } from "@/lib/types";

interface ProjectSeverityBadgeProps {
  severity: ProjectListItem["severity"];
}

/**
 * The Projects list only ever shows Critical/Medium/Low (no "high" tier), and
 * its "Medium" is colored with the same #FF6500 used by the shared severity
 * system's "high" tier, not the shared "medium" tier's amber. Handled here
 * with an explicit override rather than in lib/severity.ts, since that file
 * is shared with Dashboard and changing it would change Dashboard's badges.
 */
export function ProjectSeverityBadge({ severity }: ProjectSeverityBadgeProps) {
  if (severity === "medium") {
    return <Badge className="bg-high-bg text-high">Medium</Badge>;
  }
  return <Badge severity={severity} />;
}
