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

export interface SourceStat {
  total: number;
  critical: number;
  medium: number;
  low: number;
}

/**
 * Figma's incident rows pair a literal label with a literal color that don't
 * always agree with lib/severity.ts's canonical tier (e.g. some "Low" rows
 * render in the Critical color, some "Critical" rows render in the Low
 * color). Both are stored explicitly so the UI reproduces each row exactly
 * as designed rather than "correcting" it — see IncidentSeverityBadge.
 */
export interface Incident {
  id: string;
  title: string;
  description: string;
  severityLabel: "Critical" | "Medium" | "Low";
  severityStyle: "critical" | "high" | "low";
  sources: SourceKey[];
  evidenceCount: number;
  detected: string;
}

export interface EvidenceItem {
  title: string;
  description: string;
  channel: string;
  timestamp: string;
  quote: string;
}

export interface IncidentEvidence {
  slack: EvidenceItem[];
  jira: EvidenceItem[];
  email: EvidenceItem[];
}

export interface ProjectDetailsSummary {
  date: string;
  narrative: string;
  sourceStats: Partial<Record<SourceKey, SourceStat>>;
  actionPoints: string[];
  categories: CategoryCount[];
}

export interface ProjectDetailsData {
  id: string;
  name: string;
  severity: Severity;
  lastSyncedLabel: string;
  summary: ProjectDetailsSummary;
  incidents: Incident[];
  evidence: Record<string, IncidentEvidence>;
}

export interface TeamMember {
  name: string;
  email: string;
}

export interface TerminologyEntry {
  abbreviation: string;
  meaning: string;
}

export interface SlackSettings {
  connected: boolean;
  channels: string[];
  channelOptions: string[];
}

export interface JiraSettings {
  connected: boolean;
  apiToken: string;
}

export interface TeamsSettings {
  connected: boolean;
  teams: string[];
  teamOptions: string[];
}

export interface CallsSettings {
  connected: boolean;
}

export interface EmailSettings {
  connected: boolean;
}

export interface ProjectSettingsData {
  id: string;
  projectName: string;
  projectManager: string;
  managerOptions: string[];
  teamMembers: TeamMember[];
  teamMemberOptions: string[];
  terminology: TerminologyEntry[];
  clientEmails: string[];
  slack: SlackSettings;
  jira: JiraSettings;
  teams: TeamsSettings;
  calls: CallsSettings;
  email: EmailSettings;
}

export interface CreateProjectOptions {
  managerOptions: string[];
  teamMemberOptions: string[];
}

export type UserRole = "Manager" | "Employee" | "Admin";
export type UserStatus = "Active" | "Inactive";

export interface UserProjectEmail {
  project: string;
  email: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  projectEmails: UserProjectEmail[];
  status: UserStatus;
  lastActive: string;
}
