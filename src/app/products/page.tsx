
import { prisma } from "@/lib/prisma";
import UserProductsPage from "@/components/products/user-products";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default async function user_products(){

  const products_list = await prisma.product.findMany({select: {
    id: true, 
    name: true,
    property: true,
    // image: true,
    utility: true,
    price: true,
  }});

  const isAdmin = false;
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex w-full max-w-6xl flex-1 flex-col justify-center md:flex-row gap-25 mx-auto">
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="space-y-6">
            <UserProductsPage products={products_list || []} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
    
  );
}
