import Link from "next/link";
import { auth } from "@/auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getTopProducts } from "@/actions/topreview";
import Recommend from "@/components/products/recommend";

export default async function HomePage() {
  // const session = await auth();
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

      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl text-center pb-2">
          <div className="bg-gray-600 flex gap-4 rounded-xl">
            <div className="w-[600px]">
              <p className="text-xl px-3 mt-10 text-[#c6f24e]">
                GreenHouse-Grown Shipped in 48H
              </p>
              <p className="text-4xl px-3 mt-10 font-bold tracking-tight text-ink sm:text-5xl">
                Products here make your life better
              </p>
              <p className="text-lg px-5 mt-10 text-gray-900">
                We match every plant to your lifestyle, your home, and your space. Our team of experts will help you find the perfect products for your needs.
              </p>
              <div className="flex justify-center py-3">
                <Link
                href="/purchase"
                className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Find my matches
              </Link>
              </div>
            </div>
            <div>
            </div>
          </div>
          <Recommend />
          <div className="grid grid-cols-3 space-y-5 mt-5 gap-10">
          {products.map((product) =>
            <article
                key={product.id}
                className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
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
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
