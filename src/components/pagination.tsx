"use client";
import { useState } from "react";

export default function Pagination( { onChange }: { onChange: (page: number) => void } ){

    const  [page, setPage] = useState<number>(1);
    const pageNumber : number[] = [
        1,2,3,4,5
    ];

    return(
        <div className="w-full relative flex gap-1">
            {pageNumber.map((number) => (
                <div key={number}>
                    <button 
                        className="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-200 p-2 rounded-lg max-w-[250px] hover:border-green-500 text-[15px] cursor-pointer transition-all duration-200 outline-non"
                        onClick={() => { setPage(number); onChange(number);}}
                        aria-haspopup="listbox"
                        type="button"
                        >
                        {number}
                    </button>
                </div>
            ))
            }
        </div>

    );
}