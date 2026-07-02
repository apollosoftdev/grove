export type NavItem = {
  label: string;
  href: string;
  // When true, the item is only shown to users with the ADMIN role.
  adminOnly?: boolean;
};

// Single source of truth for the authenticated dashboard navigation.
export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "User management", href: "/admin", adminOnly: true },
  { label: "Product Lists", href: "/adminproducts", adminOnly: true },
  { label: "Products-Card Shop", href: "/products"},
  { label: "Purchase", href: "/purchase"},
];
