import Link from "next/link";
import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import SalesBarChart from "@/components/admin/barchart";
import SignalLineChart from "@/components/admin/signalchart";
import Circlechart from "@/components/admin/circlechart";
import ConcentricChart from "@/components/admin/concentricchart";
import { getTopProducts } from "@/actions/topreview";
import { ProductCard } from "@/components/products/cardshopimage";
import Recommend from "@/components/products/recommend";

type CartItem = {
  id: string
  product: {
    name?: string
    property?: string
    utility?: string |null
    price?: number
  }
}

export default async function productlist({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {

  const session = await requireUser();
  const { error } = await searchParams;
  const isAdmin = session.user.role === "ADMIN";

  const result = await getTopProducts();
  const products = Array.isArray(result.topProducts)
  ? result.topProducts
  : [result.topProducts];

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
      {!isAdmin&& (
        <>
        <div className="flex justify-center ">
          <div className="max-w-6xl">
            <Recommend />
          </div>
        </div>
        <div className="flex text-[neutral-500] text-[25px]">
          <p>Supported Products. These are highly demanded products in young people.</p>
        </div>
        <div className="flex justify-center">
        <div className="grid grid-cols-3 space-y-5 mt-5 gap-10 max-w-6xl">
        {products.map((product) =>
          <article
              key={product?.id}
              className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
            >
              <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                <ProductCard fileId={product?.id} /> 
              </div>
              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                <div>
                  <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                    ${product?.price}
                  </p>
                  <p className="pl-5 text-md text-neutral-500">
                    · {product?.property}
                  </p>
                </div>
                <h3 className="pt-1 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                  {product?.name}
                </h3>
                <div className="pt-1 pl-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    {product?.utility}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-3">
                </div>
              </div>
            </article>  
        )}
        </div>
        </div>
        </>
      )}
      {isAdmin && (
        <>
        <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            You have administrator access.
          </p>
          <div className="flex justify-between">
          <Link
            href="/adminproducts/create"
            className="mt-4 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Create Products
          </Link>
          </div>
        </section>
        <SalesBarChart />
        <SignalLineChart />
        <div className="flex">
        <Circlechart />
        <ConcentricChart />
        </div>
        </>
      )}
    </div>
  );
}
