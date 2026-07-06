"use client"; // Required to trigger client-side events and toast alerts

import { useState, useActionState, startTransition } from "react";
import { ToastContainer, toast } from "react-toastify"; // Add toast
import "react-toastify/dist/ReactToastify.css"; // Ensure CSS is imported
import { ProductListImage } from "./products/productlistimage";
import { Trash2 } from "lucide-react";
import { deleteCartItem, type ProductFormState } from "@/actions/products";

type CartItem = {
  id: string;
  quantity?:number;
  product: {
    name?: string;
    property?: string;
    utility?: string | null;
    price?: number;
  };
};

const initialState : ProductFormState= {
    success: false
};

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex  gap-2 rounded-md bg-gray-900 px-2 py-1 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      <Trash2 className="w-4 h-4"/>
      {pending ? "" : label}
    </button>
  );
}

export default function PurchaseProductList({
  carts = [],
  userId, 
}: {
  carts?: CartItem[];
  userId: string ;
}) {
  const [deleteState, deleteAction, deletePending] = useActionState(deleteCartItem, initialState);

  const totalPrice = carts.reduce((sum, item) => {
    return sum + (item.product.price ?? 0);
  }, 0);

  const Id= userId; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(`Purchase successful! Total: ${totalPrice}`);

    fetch("/api/e-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: carts.map(item => item.product.name).join(", "),
          price: totalPrice,
          amount: 1,
          createdAt: new Date().toISOString(),
          id: Id
        })
      });
    };

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Stop immediate execution
      
      const confirmed = window.confirm("Are you sure you want to delete this product?");
      if (!confirmed) return; // Halt if they click cancel
  
      // Construct FormData and manually trigger the useActionState action
      const formData = new FormData(e.currentTarget);
      startTransition(() => {
        deleteAction(formData);
      });
    };

  return (
    <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        The products you select.
      </h2>
      <div className="relative left-[80%]">
        <form onSubmit={handleSubmit}>
          <button
          type="submit"
          className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white">
            Purchase
          </button> 
        </form>
      </div> 
        <table className="w-full text-left text-sm mt-2">
        <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            <tr>
            <th className="px-4 py-3 font-medium">No</th>
            <th className="px-4 py-3 font-medium">Image</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Property</th>
            <th className="px-4 py-3 font-medium">Utility</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Quantity</th>
            <th className="px-4 py-3 font-medium">edit</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {carts.length === 0
            ? (<tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                    No products
                </td>
                </tr>)
            : carts.map((item,index) => (
            <tr key={item.id}>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                    {index + 1}
                </span>
                </td>
                <td className="px-4 py-3">
                  {/* <ProductListImage fileId={item.id} /> */}
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                  {item.product.name ?? "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {item.product.property ?? "-"}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                    {item.product.utility ?? "-"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                    {item.product.price ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                    {item.quantity ?? 0}
                  </span>
                </td>
                <td>
                  <form onSubmit={handleDeleteSubmit} className="flex flex-col mt-1" noValidate>
                    <input type="hidden" name="id" value={item.id} />
                    <SubmitButton pending={deletePending} label="Cancel" />
                  </form>
                </td>
            </tr>            
            ))}
          </tbody>
          </table>
          <ToastContainer position="top-right"  />
      </section>
          
  );
}
