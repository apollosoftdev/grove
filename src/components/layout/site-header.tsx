import Link from "next/link";

import { auth } from "@/auth";
import { LogoutButton } from "@/components/logout-button";
import { UserRoundCog, UserKey, Broccoli, ScrollText } from "lucide-react";

import { Logo } from "./logo";

// Public site header used on marketing/landing pages. Adapts to auth state.
export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/50">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="flex items-center gap-3 text-sm">

          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="font-medium text-[#22C55E] transition hover:text-green-400 dark:text-gray-300 dark:hover:text-white"
              >
                <div className="flex items-center gap-2">
                <ScrollText className="mr-2 inline-block h-4 w-4" />
                Dashboard
                </div>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/products"
                className="flex items-center gap-2 rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-white transition hover:bg-[#5BE49B] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <Broccoli className="mr-2 inline-block h-4 w-4" />
                Products
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-white transition hover:bg-[#5BE49B] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <UserKey className="mr-2 inline-block h-4 w-4" />
                LogIn
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-white transition hover:bg-[#5BE49B] dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <UserRoundCog className="mr-2 inline-block h-4 w-4" />
                SingUp
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
