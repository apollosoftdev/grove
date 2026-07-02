
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { NotebookPen } from "lucide-react";

// async function searchProducts(query:string){
//   if(!query || query.trim() === ""){
//     return []
//   }

//   try{
//     const products = await prisma.product.findMany({
//       where:{
//         OR: [
//           { name: { contains: query, mode: 'insensitive' } },
//           { property: { contains: query, mode: 'insensitive' } },
//           { utility: { contains: query, mode: 'insensitive' } }
//         ]
//       }
//     });
//     return products
//   }
//   catch(error){
//     console.log("error!", error);
//     return [];
//   }
// }

export default async function ProductsListPage() {
  await requireAdmin();

  // const searchQuery= "";

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // const fileteredProducts = await searchProducts(searchQuery);

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
        {/* <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => searchProducts(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
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
                <tr key={product.id} className="hover:bg-gray-200 ">
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
                    {product.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {product.property ?? "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {product.utility ?? "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-gray-200">
                      {product.price ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {product.createdAt.toLocaleDateString()}
                  </td>
                   <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    <Link
                      href={`/adminproducts/edit/${product.id}`}
                      className="font-medium text-gray-700 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                    >
                      <NotebookPen className="w-4 h-4"/>
                      Edit
                    </Link>
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
