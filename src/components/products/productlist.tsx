'use client';

// 1. Define the shape of a single product
type Product = {
  id: string;
  name: string;
  property: string;
  image: string | null;
  utility: string | null;
  price: number;
};

// 2. Define the props object structure
interface ProductListProps {
  products: Product[];
}

export default function UserProductPage({ products }: ProductListProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products list
        </h1>
        {products &&
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {products.length} registered {products.length === 1 ? "product" : "products"}
          </p>
        }
      </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto grid grid-cols-3">
          {products.map((product) => (
            <article
                key={product.id}
                className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
              >
                <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                  <img
                    src={product.image?? ""}
                    alt=""
                    className="object-cover bg-green-100"
                    sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <span
                    className="absolute bottom-3 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-wide lg:bottom-auto lg:left-auto lg:right-3 lg:top-3 lg:max-w-none lg:rounded-full lg:px-3 lg:py-1 lg:text-[10px]"
                  >

                  </span>
                </div>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                  <div>
                    <p className="pt-3 pl-5 font-spartan text-2xl font-bold text-blue-600">
                      ${product.price}
                    </p>
                    <p className="pt-3 pl-5 text-md text-neutral-500">
                    · {product.property}
                    </p>
                  </div>
                  <h3 className="pt-3 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                    {product.name}
                  </h3>
                  <div className="pt-3 pl-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      {product.utility}
                    </span>
                  </div>
                  <div className="flex justify-end items-center gap-3">
                    <button
                      type="button"
                      className="flex h-12 w-25 shrink-0 bg-[#163d2a] items-center justify-center rounded-lg border border-neutral-200 text-white transition hover:border-green-200 hover:bg-green-600"
                      aria-label="Save to favorites"
                    >
                      +favourite
                    </button>
                  </div>
                </div>
              </article>  
          ))}
        </div>
      </div>
    </div>
  );
}
