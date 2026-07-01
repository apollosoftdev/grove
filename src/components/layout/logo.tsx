import Link from "next/link";
import { Sprout } from "lucide-react";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
    >
      <div>
         <Sprout className="h-6 w-6 mb-0" />
          <span
            aria-hidden
            className="inline-flex mt-0 h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-gray-900"
          >
            g
          </span>
      </div>
      <div className="font-bold text-gray-900 dark:text-white text-2xl">
        grove
      </div>
    </Link>
  );  
}
  