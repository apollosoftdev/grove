import { logoutAction } from "@/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-2 rounded-md border border-[#22C55E] px-3 py-1.5 text-sm font-medium text-[#22C55E] transition duration-300 hover:-translate-y-1 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
      >
        <LogOut className="mr-2 inline-block h-4 w-4"/>
        Sign out
      </button>
    </form>
  );
}
