"use client";

import { createCommets, type ProductFormState } from "@/actions/products";
import { useActionState } from "react";

import { use } from 'react';

const initialState : ProductFormState= {
    success: false
};

export default function editProductPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } =use(params);
    const [state, formAction, pending] = useActionState(createCommets, initialState);
    return (
    <>
        <div className="flex min-h-screen flex-col">
          <main className="flex  justify-center w-full max-w-6xl flex-1 flex-col md:flex-row gap-25 mx-auto">
            <div className="mt-5 flex gap-3">
              <div className="space-y-3 w-[500px]">
                <div className="mb-8 text-center">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white mt-5">
                    Review of product.
                    </h1>
                </div>
                <div className="border border-ink rounded-lg w-[600px] h-[500px]">

                </div>
                <form action={formAction} className="flex flex-col justify-center gap-4">
                    <input type="hidden" name="productId" value={id} />
                    <textarea name="comment" className="border border-ink rounded-lg my-5 w-[600px] h-[100px]" />
                    <button type="submit" className="flex h-12 w-25 shrink-0 bg-[#163d2a] items-center justify-center rounded-lg border border-neutral-200 text-white transition hover:border-green-200 hover:bg-green-600" aria-label="Save to favorites">
                        {pending ? "please wait ... " : "" }
                        send
                    </button>

                </form>
            </div>
            </div>
          </main>
        </div>
    </>
  );
}
