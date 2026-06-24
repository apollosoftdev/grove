"use client";


import { createProduct, type ProductFormState } from "@/actions/products";
import { useActionState } from "react";

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  console.log("qqqqqq");
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {pending ? "Please wait…" : label}
      
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
};

export default function createProductPage() {

  const [state, formAction, pending] = useActionState(createProduct, initialState);

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create products
        </h1>
      </div>

      {/* <div className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <ProductCreateForm />
      </div> */}
      <form action={formAction} className="flex flex-col gap-4" noValidate>

      <div>
        <label htmlFor="product_name" className={labelClass}>
          Name
        </label>
        <input
          id="product_name"
          name="name"
          type="text"
          autoComplete="name"
          required
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
      <div>
        <label htmlFor="product_createdAt" className={labelClass}>
          Date
        </label>
        <input
          id="product_createdAt"
          name="createdAt"
          type="date"
          autoComplete="createdAt"
          required
          className={fieldClass}
        />
        <FieldError messages={state.fieldErrors?.createdAt} />
      </div>
      <SubmitButton pending={pending} label="Create Products" />
    </form>
    </>
  );
}
