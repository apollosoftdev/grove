import Link from "next/link";

import { auth } from "@/auth";
import { LogoutButton } from "@/components/logout-button";

import { Logo } from "./logo";

// Public site header used on marketing/landing pages. Adapts to auth state.
export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="flex items-center gap-3 text-sm">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
