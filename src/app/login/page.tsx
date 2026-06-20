import Link from "next/link";

import { LoginForm } from "@/components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;
  const initialError = error
    ? "Could not sign you in. Please check your credentials."
    : undefined;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            grove
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <LoginForm callbackUrl={callbackUrl} initialError={initialError} />
        </div>
      </div>
    </main>
  );
}
