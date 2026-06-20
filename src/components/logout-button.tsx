import { logoutAction } from "@/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-black/5 dark:border-white/15 dark:text-gray-300 dark:hover:bg-white/5"
      >
        Sign out
      </button>
    </form>
  );
}
