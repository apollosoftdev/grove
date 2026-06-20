import Link from "next/link";

import { RegisterForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            grove
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Get started in seconds
          </p>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
