import type { IncidentCategory } from "@/lib/categories";
import type { Severity } from "@/lib/severity";

export type SourceKey = "slack" | "jira" | "email" | "teams" | "calls";

export interface SourceBreakdown {
  critical: number;
  medium: number;
  low: number;
}

export interface CategoryCount {
  category: IncidentCategory;
  count: number;
}

export interface DashboardProject {
  id: string;
  name: string;
  /** Project-level severity shown as a Badge — resolved through lib/severity.ts. */
  severity: Severity;
  description: string;
  sources: Record<SourceKey, SourceBreakdown>;
  actionPoints: string[];
  categories: CategoryCount[];
}

export interface DashboardData {
  briefingDate: string;
  totalProjects: number;
  criticalProjectCount: number;
  mediumRiskCount: number;
  totalIncidents: number;
  narrative: {
    highlightProjectName: string;
  };
  projects: DashboardProject[];
}

export interface ProjectIncidentCounts {
  total: number;
  critical: number;
  medium: number;
  low: number;
}

export interface ProjectListItem {
  id: string;
  name: string;
  description: string;
  manager: string;
  incidents: ProjectIncidentCounts;
  /** Projects list only ever shows these three tiers (no "high"). */
  severity: "critical" | "medium" | "low";
  lastSynced: string;
}
