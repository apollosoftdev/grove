'use client';
import Link from "next/link";

import { useActionState } from "react";
import { addToCart } from "@/actions/cart";
import { type ActionState } from "@/actions/cart";
// 1. Define the shape of a single product
type Product = {
  id: string;
  name: string;
  property: string;
  utility: string | null;
  price: number;
};

// 2. Define the props object structure
interface ProductListProps {
  products: Product[];
}

const initialstate: ActionState = {
  success: false,
  message: ""
}

const addToCartAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  console.log("aaa");
  const result = await addToCart(prevState, formData);
  return result ?? prevState;
};

export default function UserProductsPage({ products }: ProductListProps) {

  const [state, formAction, ispending] = useActionState(addToCartAction, initialstate);

  return (
    <div className="space-y-3">
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
        <div className="overflow-x-auto grid grid-cols-3 space-y-5 gap-10">
          {products.map((product) => (
            <article
                key={product.id}
                className="w-[250px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
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
                    <Link
                      href={`products/comment/${product.id}`}
                      className="flex h-12 w-25 shrink-0 bg-[#163d2a] items-center justify-center rounded-lg border border-neutral-200 text-white transition hover:border-green-200 hover:bg-green-600"
                      aria-label="Save to favorites"
                    >
                      comment
                    </Link>
                    <form action={formAction} >
                      <input type="hidden" name="productId" value={product.id}/>
                      <button
                      type="submit"
                      disabled={ispending}
                      className="flex h-12 w-25 shrink-0 bg-[#163d2a] items-center justify-center rounded-lg border border-neutral-200 text-white transition hover:border-green-200 hover:bg-green-600"
                      aria-label="Save to favorites"
                      >
                        {ispending ? "Please wait…" : ""}
                      +favourite
                      </button>
                    </form>
                  </div>
                </div>
              </article>  
          ))}
        </div>
      </div>
    </div>
  );
}
