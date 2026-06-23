"use client";

import Link from "next/link";
import { ProductCreateAction, type ProductFormState } from "@/actions/products";
import { useActionState } from "react";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{messages[0]}</p>;
}

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
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

const fieldClass =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 dark:border-white/15 dark:bg-white/5 dark:text-gray-100 dark:focus:border-white/30 dark:focus:ring-white/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300";


const initialState : ProductFormState= {};

export function ProductCreateForm() {
  const [state, formAction, pending] = useActionState(ProductCreateAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
        <FieldError messages={state.fieldErrors?.name} />
      </div>

      <div>
        <label htmlFor="property" className={labelClass}>
          property
        </label>
        <input
          id="property"
          name="property"
          type="property"
          autoComplete="property"
          required
          className={fieldClass}
        />
        <FieldError messages={state.fieldErrors?.email} />
      </div>

      <div>
        <label htmlFor="utiliry" className={labelClass}>
          utiliry
        </label>
        <input
          id="utiliry"
          name="utiliry"
          type="utiliry"
          autoComplete="utiliry"
          required
          className={fieldClass}
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

    <div>
        <label htmlFor="price" className={labelClass}>
          price
        </label>
        <input
          id="price"
          name="price"
          type="price"
          autoComplete="price"
          required
          className={fieldClass}
        />
        <FieldError messages={state.fieldErrors?.password} />
      </div>

      <SubmitButton pending={pending} label="Create account" />

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/dashboard" className="font-medium text-gray-900 underline dark:text-white">
          create
        </Link>
      </p>
    </form>
  );
}