"use client";

import { createCommets, type ProductFormState } from "@/actions/products";
import { useActionState, useEffect, useState } from "react";
import { Send, StarCheck, MailCheck, PencilLine } from "lucide-react";

import { use } from 'react';

const initialState : ProductFormState= {
    success: false
};

type Product = {
  id:string;
  content:string;
    rating: number;
  }

const ratingChoice = {
  id: "1",
  question: " Rating ",
  options: [
    { id: "1", value: "1" },
    { id: "2", value: "2" },
    { id: "3", value: "3" },
    { id: "4", value: "4" },
    { id: "5", value: "5" },
  ],
};

export default function editProductPage({ params }: { params: Promise<{ id: string }> }) {


    const { id } =use(params);
    const [state, formAction, pending] = useActionState(createCommets, initialState);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      async function fetchProducts() {
        try {
          const res = await fetch(`/api/getcomments/${id}`);
          const data = await res.json();
          setProducts(data);
        }
        catch (error) {
          console.log("Error fetchingproducts:", error);
        }
        finally{
          setLoading(false);
        }
      }
      fetchProducts();
      },[])

      const [submitted, setSubmitted] = useState(false);
      const [selection, setSelection] = useState("");

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selection) {
          setSubmitted(true);
        }
      };

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
                <div className="border  space-y-3 sapce-x-3 overflow-x-auto border-ink rounded-lg w-[600px] h-[500px] text-wrap">
                  {products.map((product, index)=>(
                    <div key={product.id ?? index} className="p-2">
                      <PencilLine/>
                      <div className="border border-ink rounded-lg mt-1 overflow-x-auto max-w-[500px]  break-words">
                          {product.content}
                          <div className="flex justify-end mb-1 mr-2">
                            <MailCheck/>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form action={formAction} className="flex flex-col justify-center gap-4">
                    <input type="hidden" name="productId" value={id} />
                    {/* <input type="hidden" name="userId" value={id} /> */}
                    <input type="hidden" name="rating" value={Number(selection)} />
                    <textarea name="comment" className="border border-ink rounded-lg my-5 w-[600px] h-[100px]" required/>
                    <button disabled={pending} type="submit" className="flex justify-end ml-[400px] rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                        {pending ? "please wait ... " : "" }
                        <Send className="w-4 h-4 mt-1 mr-2"/>
                        Send
                    </button>
                </form> 
              </div>
              <div className="ml-30 space-x-3">
                <div>
                  <h1 className="flex text-xl font-semibold text-gray-900 dark:text-white mt-5">
                    <StarCheck className="w-5 h-5 mt-1"/>
                    {ratingChoice.question}
                  </h1>
                </div>
                <div className="space-y-5 mt-10">
                  {ratingChoice.options.map((option) => {
                    const isChecked = selection === option.value;
                    return (
                      <label
                        key={option.id}
                        htmlFor={option.id}
                        className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer font-medium transition-all duration-200 ${
                          isChecked
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                        } ${submitted ? "cursor-not-allowed opacity-80" : ""}`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            id={option.id}
                            name={ratingChoice.id}
                            value={option.value}
                            checked={isChecked}
                            onChange={(e) => setSelection(e.target.value)}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{option.value}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
    </>
  );
}
