import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/guards";
import UserProductPage from "@/components/products/user-products";
import { Product } from "@/generated/prisma/client";

interface Products {
  id: string,
  name: string,
  property: string,
  image: string,
  utility: string,
  price: number,
  rating: string,
  comment: string,
}

export default async function productlist({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {

  const session = await requireUser();
  const { error } = await searchParams;
  const isAdmin = session.user.role === "ADMIN";

  const products_list = await prisma.product.findMany({select: {

    id: true, 
    name: true,
    property: true,
    image: true,
    utility: true,
    price: true,
  }});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Overview
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Welcome back, {session.user.name ?? session.user.email}.
        </p>
      </div>

      {error === "forbidden" && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          You don&apos;t have permission to access that page.
        </div>
      )}

      <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Your account
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Name</dt>
            <dd className="text-sm text-gray-900 dark:text-gray-100">
              {session.user.name ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="text-sm text-gray-900 dark:text-gray-100">
              {session.user.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-gray-500 dark:text-gray-400">Role</dt>
            <dd>
              <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                {session.user.role}
              </span>
            </dd>
          </div>
        </dl>
      </section>
      {!isAdmin && (
        <UserProductPage products={products_list || []} />
      )
      }
      {isAdmin && (
        <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            You have administrator access.
          </p>
          <Link
            href="/admin/products"
            className="mt-4 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Open admin panel
          </Link>
        </section>
      )}
    </div>
  );
}
