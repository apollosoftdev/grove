import { LogoutButton } from "@/components/logout-button";

import { Logo } from "./logo";

type DashboardHeaderUser = {
  name?: string | null;
  email?: string | null;
  role: string;
};

export function DashboardHeader({ user }: { user: DashboardHeaderUser }) {
  const displayName = user.name ?? user.email ?? "Account";

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Logo href="/dashboard" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user.role}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
