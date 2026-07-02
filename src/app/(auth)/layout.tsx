import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { SiteFooter } from "@/components/layout/site-footer";
import { Undo2 } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <div className="flex items-center">
              <Undo2 className="mr-2 inline-block h-4 w-4" />
              Back home
            </div>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}
