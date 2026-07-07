import Link from "next/link";
import { auth } from "@/auth";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getTopProducts } from "@/actions/topreview";
import Recommend from "@/components/products/recommend";
import { Advertisement } from "@/components/advertisement";
import { ProductCard } from "@/components/products/cardshop-image";

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
    <div className="flex min-h-screen flex-col bg-[#f6faf5]">
      <SiteHeader />
      <div className="flex items-center justify-center">
        <div className="w-full pb-2">
          <div className="bg-[#1f5236] flex gap-4">
            <div className="flex justify-center">
            <div className="w-1/2">
              <p className="text-xl px-3 mt-20 text-[#c6f24e]">
                GreenHouse-Grown Shipped in 48H
              </p>
              <p className="text-7xl px-3 mt-10 font-bold tracking-tight text-white">
                Plants that actually <span className="text-[#c6f24e]">survive</span> our apartment
              </p>
              <p className="text-lg px-5 mt-10 text-gray-400">
                We match every plant to your lifestyle, your home, and your space. Our team of experts will help you find the perfect products for your needs.
              </p>
              <div className="flex justify-evenly py-3 my-5">
                <Link
                href="/products"
                className="flex items-center gap-2 border border-[#c6f24e] rounded-md bg-[#c6f24e] px-4 py-2 font-semibold text-[#1f5236] transition duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl"
              >
                CardShop 
              </Link>
                <Link
                href="/purchase"
                className="flex items-center gap-2 border border-[#c6f24e] rounded-md bg-[#1f5236] px-4 py-2 font-semibold text-white transition  duration-300 shadow-md hover:-translate-y-1 hover:shadow-xl"
              >
                Find my matches
              </Link>
              </div>
            </div>
            </div>
            <div>
            </div>
          </div>  
          <div className="flex justify-center bg-[#2f7d4f]">
            <div className="max-w-6xl ">
              <Advertisement />
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="max-w-6xl">
              <Recommend />
            </div>
          </div>
          <div className="flex justify-center">
          <div className="grid grid-cols-3 space-y-5 mt-5 gap-10 max-w-6xl">
          {products.map((product) =>
            <article
                key={product.id}
                className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
              >
                <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                  {/* <ProductCard fileId={product.id} />  */}
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
      </div>

      <SiteFooter />
    </div>
  );
}
