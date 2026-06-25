"use client"

import { deleteProduct, editProduct, type ProductFormState } from "@/actions/products";
import { useActionState } from "react";
import { use } from 'react';
import ImageUpload from "@/components/uploadfile";

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {pending ? "Please wait" : label}
    </button>
  );
}

function FieldError({ messages }: { messages?: string []}) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{messages[0]}</p>;
}

const fieldClass =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/15 dark:bg-white/5 dark:text-gray-100 dark:focus:border-white/30 dark:focus:ring-white/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";

const initialState : ProductFormState= {
    success: false
};

type EditProductPageProps = {
  product: {
    product: {
      id: string
      name: string
      property: string
      utility: string
      price: number
      image: string
    }
  }
}

export default function editProductPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } =use(params);
  const [state, formAction, pending] = useActionState(editProduct, initialState);
  const [deleteState, deleteAction, deletePending] = useActionState(deleteProduct, initialState);

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Edit products
        </h1>
      </div>
      <div className="space-y-6 flex justify-center flex-col items-center">
          <form action={formAction} className="flex flex-col gap-4" noValidate>
          <input type="hidden" name="id" value={id} />
          <article
            className="w-[250px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col"
          >
            <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
              <img
                alt=""
                className="object-cover bg-green-100"
                sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
              />
              <ImageUpload />
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
              <div>
                <label htmlFor="product_name" className={labelClass}>
                  Name
                </label>
                <input
                  id="product_name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass}
                />
                <FieldError messages={state.fieldErrors?.name} />
              </div>

              <div>
                <label htmlFor="product_property" className={labelClass}>
                  property
                </label>
                <input
                  id="product_property"
                  name="property"
                  type="text"
                  autoComplete="property"
                  required
                  className={fieldClass}
                />
                <FieldError messages={state.fieldErrors?.property} />
              </div>

              <div>
                <label htmlFor="product_utility" className={labelClass}>
                  Utility
                </label>
                <input
                  id="product_utility"
                  name="utility"
                  type="text"
                  autoComplete="utility"
                  required
                  className={fieldClass}
                />
                <FieldError messages={state.fieldErrors?.utility} />
              </div>

            <div>
                <label htmlFor="product_price" className={labelClass}>
                  Price
                </label>
                <input
                  id="product_price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  required
                  className={fieldClass}
                />
                <FieldError messages={state.fieldErrors?.price} />
              </div>
              <SubmitButton pending={pending} label="Change Products" />
            </div>
          </article>  
        </form>
        <form action={deleteAction} className="flex flex-col gap-4" noValidate>
          <input type="hidden" name="id" value={id} />
          <SubmitButton pending={deletePending} label="Delete Product" />
        </form>
      </div>
    </>
  );
}
