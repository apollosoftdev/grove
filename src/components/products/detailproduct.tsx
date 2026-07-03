"use client";
import { useActionState, useState } from "react";
import { addToCart } from "@/actions/cart";
import { type ActionState } from "@/actions/cart";
import { ToastContainer, toast } from "react-toastify"; 
import { HeartPlus } from "lucide-react";

type Product = {
  id: string;
  name: string;
  property: string;
  utility: string | null;
  price: number;
};

const initialstate: ActionState = {
  success: false,
  message: ""
}

const addToCartAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const result = await addToCart(prevState, formData);
  return result ?? prevState;
};

export default function DetailProduct( { detail }: { detail: Product }){

    const [state, formAction, ispending] = useActionState(addToCartAction, initialstate);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        toast.success(`Purchase successful! Total: ${detail.price}`);
    
        fetch("/api/e-wallet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: detail.name,
              price: detail.price,
              amount: 1,
              createdAt: new Date().toISOString(),
              id: detail.id
            })
          }); 
      
        };


    return (
        <div className="flex gap-5 bg-white rounded-2xl shadow-md">
            <div className="relative w-[400px] min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                {/* <img
                src={product.image?? ""}
                alt=""
                className="object-cover bg-green-100"
                sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
                /> */}
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6 h-[500px]">
                <div>
                </div>
                <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-ink">
                    {detail.name}
                </h3>
                <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                    ${detail.price}
                </p>
                <p className="pl-5 text-md text-neutral-500">
                     {detail.property}
                </p>
                <div className="pl-5 gap-x-4 gap-y-2 text-sm text-neutral-600 w-[350px] overflow-x-auto border-gray-700">
                <span className="inline-flex items-center gap-1 ">
                    {detail.utility}
                </span>
                </div>
                <div >
                    <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-ink">
                        Related Production 
                    </h3>
                </div>
                <div className="bg-gray-100 h-[150px]">
                    
                </div>
                <div className="flex justify-around">
                    <div>
                    <form action={formAction} >
                      <input type="hidden" name="productId" value={detail.id}/>
                      <button
                      type="submit"
                      disabled={ispending}
                      className="flex ml-15 items-center rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        <HeartPlus className="w-4 h-4 mr-1" />
                        favourite
                      </button>
                    </form>
                    </div>
                    <div>
                    <form onSubmit={handleSubmit}>
                        <button
                        type="submit"
                        className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white">
                            Buy Now
                        </button>
                    </form>
                    </div>
                    <ToastContainer position="top-right"  />
                </div>
            </div>
        </div>
    )
}