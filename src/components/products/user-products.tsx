'use client';
import Link from "next/link";

import { useActionState, useState } from "react";
import { addToCart } from "@/actions/cart";
import { type ActionState } from "@/actions/cart";
import DetailProduct from "@/components/products/detailproduct";
import { Pin } from "lucide-react";

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

const initialDetailState : Product={
    id: "",
    name: "",
    property: "",
    utility: null,
    price: 0
}
const addToCartAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const result = await addToCart(prevState, formData);
  return result ?? prevState;
};

export default function UserProductsPage({ products }: ProductListProps) {

  const [state, formAction, ispending] = useActionState(addToCartAction, initialstate);
  const [detail, setDetail] = useState<Product>(initialDetailState);

  const handleSelectProduct = (product: Product) => {
    setDetail({
      id: product.id,
      name: product.name,
      property: product.property,
      utility: product.utility,
      price: product.price,
    });
  };

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
      <div className="mt-8 z-50"> 
        {detail.utility ? ( 
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setDetail(initialDetailState)}>
            <div className="relative z-50 w-full max-w-[900px] max-h-[600px]" onClick={(e) => e.stopPropagation()}>
              <DetailProduct detail={detail} /> 
            </div>
          </div>
        ) : null} 
      </div>
      <div className="rounded-xl bg-white shadow-sm dark:bg-white/5">
        <div className="grid lg:grid-cols-5 space-y-5 gap-10 md:grid-cols-3">
          {products.map((product) => (
              <article
                key={product.id}
                className="w-[250px] flex flex-row items-stretch overflow-hidden border border-black/10 rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-3 hover:shadow-md lg:flex-col"
              >
                <button type="button" onClick={() => handleSelectProduct(product)} key={product.id}>
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
                      ·{product.property}
                    </p>
                  </div>
                  <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                      {product.name}
                  </h3>
                  <div className="pl-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600 h-[50px] overflow-hidden">
                    <span className="inline-flex items-center gap-1">
                      {product.utility}
                    </span>
                  </div>
                </div>
                </button>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                  <div className="flex justify-center items-center gap-3">
                    <Link
                      href={`products/comment/${product.id}`}
                      className="flex items-center rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                    >
                      comment
                    </Link>
                    <form action={formAction} >
                      <input type="hidden" name="productId" value={product.id}/>
                      <button
                      type="submit"
                      disabled={ispending}
                      className="flex items-center rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
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
