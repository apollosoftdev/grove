"use client";
import { useState, useEffect } from 'react';

interface ProductCardProps {
  fileId: string;
}

export function ProductListImage({ fileId }: ProductCardProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() =>{
        async function handleFetchFile(fileId: string){
            try{
                const res = await fetch(`/api/upload/${fileId}`);
                const data = await res.json();
                if (data.url) {
                    setImageUrl(data.url);
                }
            }
            catch(error)
            {
                console.log("error occured.")
            }
        };
        if(fileId){
            handleFetchFile(fileId);
        }
    }, [fileId])

  return (
    <div className="relative w-[75px] h-auto overflow-hidden">
        <img
        src={imageUrl || "/fallback-placeholder.png"} // Added a default fallback placeholder
        alt=""
        className="object-cover w-full h-full bg-green-100"
        />
    </div>
  );
}