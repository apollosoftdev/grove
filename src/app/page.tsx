import Link from "next/link";
import { auth } from "@/auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getTopProducts } from "@/actions/topreview";

export default async function HomePage() {
  const session = await auth();
  const result = await getTopProducts();

  if ("error" in result || !result.topProducts) {
    return <p>Unable to load products</p>;
  }

  const products = Array.isArray(result.topProducts)
    ? result.topProducts
    : [result.topProducts];

  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl text-center">
          <div className="grid grid-cols-3 space-y-5 gap-10">
          {products.map((product) =>
            <article
                key={product.id}
                className="w-[200px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
              >
                <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                  {/* <img
                    src={product.image?? ""}
                    alt=""
                    className="object-cover bg-green-100"
                    sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
                  /> */}  
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                  <div>
                    <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                      ${product.price}
                    </p>
                    <p className="pl-5 text-md text-neutral-500">
                    · {product.property}
                    </p>
                  </div>
                  <h3 className="pt-1 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                    {product.name}
                  </h3>
                  <div className="pt-1 pl-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      {product.utility}
                    </span>
                  </div>
                  <div className="flex justify-end items-center gap-3">
                  </div>
                </div>
              </article>  
          )}
        </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            grove
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            A Next.js starter with authentication and role-based authorization,
            powered by Auth.js, Prisma, and MySQL.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md border border-black/10 px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
