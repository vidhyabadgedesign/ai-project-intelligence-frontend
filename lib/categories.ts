export type IncidentCategory =
  | "Communication"
  | "Delivery Delays"
  | "Cross team dependency"
  | "Technical Debt"
  | "Scope Change"
  | "Sprint Spillover"
  | "Blockers";

// Shared "Incidents by category" icon set — appears on both Dashboard project
// cards and Project Details. Technical Debt and Scope Change intentionally
// share one icon (arrow-trend-down), matching the Figma file.
export const CATEGORY_ICON: Record<IncidentCategory, string> = {
  Communication: "/icons/category-communication.svg",
  "Delivery Delays": "/icons/category-delivery-delays.svg",
  "Cross team dependency": "/icons/category-cross-team.svg",
  "Technical Debt": "/icons/category-technical-debt.svg",
  "Scope Change": "/icons/category-technical-debt.svg",
  "Sprint Spillover": "/icons/category-sprint-spillover.svg",
  Blockers: "/icons/category-blockers.svg",
};
