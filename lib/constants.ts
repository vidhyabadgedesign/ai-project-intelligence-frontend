export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// Sidebar nav items — matches the latest-generation Figma sidebar (Dashboard,
// Projects). Users is out of scope for the Super Admin module build.
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/icons/nav-dashboard.svg" },
  { label: "Projects", href: "/projects", icon: "/icons/nav-projects.svg" },
];

// Mock signed-in user — there is no auth in this build, so this stands in for
// whatever a real session would provide.
export const CURRENT_USER = {
  name: "Dev Chen",
  role: "Super Admin",
};
