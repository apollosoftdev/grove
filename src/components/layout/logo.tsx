import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
    >
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900"
      >
        g
      </span>
      grove
    </Link>
  );
}
