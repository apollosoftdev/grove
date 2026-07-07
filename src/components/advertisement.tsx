
import { Truck, ShieldCog, HandFist, Leaf } from "lucide-react";

export function Advertisement(){
    return(
        <div className="flex">
            <div className="flex gap-10">
                <div className="text-md px-3 my-1 text-white flex gap-2">
                    <Truck className="w-5 h-5" />
                    Free Shipping over $50
                </div>
                <div className="text-md px-3 my-1 text-white flex gap-2">
                    <ShieldCog className="w-5 h-5" />
                    30-day plant guarantee
                </div>
                <div className="text-md px-3 my-1 text-white flex gap-2">
                    <HandFist className="w-5 h-5" />
                    Real grower support
                </div>
                <div className="text-md px-3 my-1 text-white flex gap-2">
                    <Leaf className="w-5 h-5" />
                    Carbon-neutral delivery
                </div>
            </div>
        </div>
    );
}