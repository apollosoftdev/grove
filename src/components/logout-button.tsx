import { logoutAction } from "@/actions/auth";
import { LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <div className="flex gap-5">
        <div>
          <Link
            href="/purchase"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <ShoppingCart className="h-6 w-6 mb-0 text-[#22C55E]" />
          </Link>          
        </div>
        <div>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md border border-[#22C55E] px-3 py-1.5 text-sm font-medium text-[#22C55E] transition duration-300 hover:-translate-y-1 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <LogOut className="mr-2 inline-block h-4 w-4"/>
            Sign out
          </button>
        </div>
      </div>
    </form>
  );
}
