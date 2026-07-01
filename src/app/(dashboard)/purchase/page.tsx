
import { prisma } from "@/lib/prisma";
import { ToastContainer } from "react-toastify";

type CartItem = {
  id: string
  product: {
    name?: string
    property?: string
    utility?: string |null
    price?: number
  }
}

export default async function purchaseproductlist({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {

  const carts: CartItem[]  = await prisma.cartItem.findMany({
    include: { product: true}
  })
  const totalPrice = carts.reduce((sum, item) => {
    return sum + (item.product.price ?? 0);
  }, 0);

  async function clickPayment(formData: FormData) {
    "use server";
    console.log("Total:", totalPrice);
  }

  return (
    <section className="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        user
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        You have user access.
        </p>
        <table className="w-full text-left text-sm">
        <thead className="border-b border-black/10 bg-black/[0.02] text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            <tr>
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Image</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Property</th>
            <th className="px-4 py-3 font-medium">Utility</th>
            <th className="px-4 py-3 font-medium">Price</th>
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
                {/* {product.image ?
                    <img className="size-6" src={product.image} /> :
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200 text-lg">
                    {product.name[0]}
                    </span>
                } */}
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
            </tr>            
            ))}
          </tbody>
          </table>
          <div className="flex justify-end">
            <form action={clickPayment}>
              <button
              type="submit"
              className="flex h-12 w-25 shrink-0 bg-[#163d2a] items-center justify-center rounded-lg border border-neutral-200 text-white transition hover:border-green-200 hover:bg-green-600" aria-label="Save to favorites">
                Purchase
              </button>
            </form>
          </div> 
          <ToastContainer position="top-right"  />
      </section>
          
  );
}
