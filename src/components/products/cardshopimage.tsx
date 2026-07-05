import { useState, useEffect } from 'react';

interface ProductCardProps {
  fileId: string;
}

export function ProductCard({ fileId }: ProductCardProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() =>{
        async function handleFetchFile(fileId: string){
            console.log(fileId);
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
    <div className="relative min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
        <img
        src={imageUrl || "/fallback-placeholder.png"} // Added a default fallback placeholder
        alt=""
        className="object-cover bg-green-100"
        sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
        />
    </div>
  );
}