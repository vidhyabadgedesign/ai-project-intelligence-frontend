export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "/icons/nav-dashboard.svg" },
  { label: "Projects", href: "/projects", icon: "/icons/nav-projects.svg" },
  { label: "Users", href: "/users", icon: "/icons/nav-users.svg" },
];

// Mock signed-in user — there is no auth in this build, so this stands in for
// whatever a real session would provide.
export const CURRENT_USER = {
  name: "Dev Chen",
  role: "Super Admin",
};
