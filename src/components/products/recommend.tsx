'use client';

import { ChartLine } from "lucide-react";

export default function Recommend() {

  return (
        <div className="mt-10 overflow-x-auto grid grid-cols-3 gap-10">
            <article
                className="mx-1 w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col border border-black/10 shadow-sm"
                >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                    <div>
                        <h3 className="pt-1 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                            Product Purchased
                        </h3>
                        <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                            765                            
                        </p>
                        <div className="pl-5 text-md text-neutral-200 flex justify-center items-center gap-2">
                            <ChartLine className="mr-2 line-block h-4 w-4" />
                            + 2.6 % last week
                        </div>
                    </div>
                </div>
            </article>
            <article
                className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col border border-black/10 shadow-sm"
                >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                    <div>
                        <h3 className="pt-1 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                            Total balance
                        </h3>
                        <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                            19,830                           
                        </p>
                        <div className="pl-5 text-md text-neutral-500 flex justify-center items-center gap-2">
                            <ChartLine className="mr-2 line-block h-4 w-4" />
                            - 0.6 %last week
                        </div>
                    </div>
                </div>
            </article>  
            <article
                className="w-[300px] flex flex-row items-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md lg:flex-col border border-black/10 shadow-sm"
                >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6">
                    <div>
                        <h3 className="pt-1 pl-5 truncate text-2xl font-bold leading-snug text-onyx">
                            Sales profit
                        </h3>
                        <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                            4,765                            
                        </p>
                        <div className="pl-5 text-md text-neutral-500 flex justify-center items-center gap-2">
                            <ChartLine className="mr-2 line-block h-4 w-4" />
                            + 0.6 %last week
                        </div>
                    </div>
                </div>
            </article>    
        </div>
  );
}
