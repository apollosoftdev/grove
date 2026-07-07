import { RegisterForm } from "@/components/auth-form";
import { UserRoundCog } from "lucide-react";

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          <UserRoundCog className="mr-2 inline-block h-7 w-7" />
          Create your account
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Get started in seconds
        </p>
      </div>
      <div>
      <div className="rounded-xl border w-3xl border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <RegisterForm />
      </div>
      </div>
    </div>
  );
}
