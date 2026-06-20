"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNav } from "@/lib/navigation";

export function DashboardSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const items = dashboardNav.filter((item) => !item.adminOnly || isAdmin);

  return (
    <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition",
              isActive
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
