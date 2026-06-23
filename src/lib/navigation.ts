export type NavItem = {
  label: string;
  href: string;
  // When true, the item is only shown to users with the ADMIN role.
  adminOnly?: boolean;
};

// Single source of truth for the authenticated dashboard navigation.
export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Admin", href: "/admin", adminOnly: true },
  { label: "Products", href: "/products"},
];
