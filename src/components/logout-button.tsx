import { logoutAction } from "@/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-black/5 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
      >
        <LogOut className="mr-2 inline-block h-4 w-4"/>
        Sign out
      </button>
    </form>
  );
}
