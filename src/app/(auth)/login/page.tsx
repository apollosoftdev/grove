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
    <>
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account
        </p>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <LoginForm callbackUrl={callbackUrl} initialError={initialError} />
      </div>
    </>
  );
}
