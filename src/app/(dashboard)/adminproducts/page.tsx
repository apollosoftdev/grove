"use client";
// import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProduct, type ProductFormState } from "@/actions/products";
import { NotebookPen, Trash2 } from "lucide-react";                              
import { ProductListImage } from "@/components/products/productlistimage";
import { useEffect, useState, useActionState,startTransition } from "react";

type Products = {
    id:string,
    name: string,
    property: string,
    utility: string,
    price: number,
    createdAt:Date,
}

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
      {pending ? "Please wait...." : label}
    </button>
  );
}

export default function ProductsListPage() {

  const [deleteState, deleteAction, deletePending] = useActionState(deleteProduct, initialState);

  const [products, setProducts] = useState<Products[]>([]);;

  useEffect(()=>{
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        setProducts(data.products);
      }
      catch (error) {
        console.log("Error fetchingproducts:", error);
      }
    }
    fetchProducts();
    },[])
  
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products list
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {products.length} registered {products.length === 1 ? "product" : "products"}
        </p>
        </div>

      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3 font-medium text-center">No</th>
                <th className="px-4 py-3 font-medium text-center">Image</th>
                <th className="px-4 py-3 font-medium text-center">Name</th>
                <th className="px-4 py-3 font-medium text-center">Property</th>
                <th className="px-4 py-3 font-medium text-center">Utility</th>
                <th className="px-4 py-3 font-medium text-center">Price</th>
                <th className="px-4 py-3 font-medium text-center">Created At</th>
                <th className="px-4 py-3 font-medium text-center">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-100 ">
                  <td className="px-4 py-3 text-black dark:text-gray-100">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {/* <ProductListImage fileId={product.id} /> */}
                    {/* {product.image ?
                      <img className="size-6" src={product.image} /> :
                      <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200 text-lg">
                        {product.name[0]}
                      </span>
                    } */}
                  </td>
                  <td className="px-4 py-3 text-black dark:text-gray-100">
                    {product.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {product.property ?? "-"}
                  </td>
                  <td className="px-4 py-3 w-[500px] overflow-hiddne">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {product.utility ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {product.price ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                   <td className="px-2 py-1 text-gray-500 dark:text-gray-400">
                    <Link
                      href={`/adminproducts/edit/${product.id}`}
                      className="flex gap-2 bg-gray-900 px-2 py-1 text-sm font-semibold text-white transition hover:bg-gray-700 rounded-md hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      <div>
                        <NotebookPen className="w-4 h-4"/>
                      </div>
                      <div>
                        Edit
                      </div>
                    </Link>
                    <form onSubmit={handleDeleteSubmit} className="flex flex-col mt-1" noValidate>
                      <input type="hidden" name="id" value={product.id} />
                      <SubmitButton pending={deletePending} label="Delete" />
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
