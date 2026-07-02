"use client";

type Product = {
  id: string;
  name: string;
  property: string;
  utility: string | null;
  price: number;
};

export default function DetailProduct( { detail }: { detail: Product }){

    return (
        <div className="flex gap-5 bg-gray-900 rounded-2xl shadow-md">
            <div className="relative w-[250px] min-w-0 max-lg:w-[40%] max-lg:max-w-[11.5rem] max-lg:shrink-0 max-lg:aspect-[7/11] max-lg:overflow-hidden lg:max-w-none lg:aspect-[16/11]">
                {/* <img
                src={product.image?? ""}
                alt=""
                className="object-cover bg-green-100"
                sizes="(max-width: 1023px) 40vw, (max-width: 1280px) 50vw, 33vw"
                /> */}
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 lg:p-6 h-[500px]">
                <div>
                <p className="pl-5 font-spartan text-2xl font-bold text-blue-600">
                    ${detail.price}
                </p>
                <p className="pl-5 text-md text-neutral-500">
                · {detail.property}
                </p>
                </div>
                <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-white">
                    {detail.name}
                </h3>
                <div className="pl-5 gap-x-4 gap-y-2 text-sm text-neutral-600 w-[200px] overflow-x-auto border-gray-700">
                <span className="inline-flex items-center gap-1 ">
                    {detail.utility}
                </span>
                </div>
                <div >
                    <h3 className="pl-5 truncate text-2xl font-bold leading-snug text-white">
                        {detail.name}
                    </h3>
                </div>
            </div>
        </div>
    )
}