import Link from "next/link";

import { auth } from "@/auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            grove
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A Next.js starter with authentication and role-based authorization,
            powered by Auth.js, Prisma, and MySQL.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md border border-black/10 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
