
import { prisma } from "@/lib/prisma";
import UserProductsPage from "@/components/products/user-products";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PublicSidebar } from "@/components/layout/public-sidebar";

export default async function user_products(){

  const products_list = await prisma.product.findMany({select: {
    id: true, 
    name: true,
    property: true,
    // image: true,
    utility: true,
    price: true,
  }});

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-8xl flex-1 flex-col md:flex-row">
      <aside className="border-b border-black/10 md:w-56 md:shrink-0 md:border-b-0 md:border-r dark:border-white/10">
            <PublicSidebar />
          </aside>
        <div className="flex-1 px-6 py-8">
            <UserProductsPage products={products_list || []} />
        </div>
      </div>
      <SiteFooter />
    </div>
    
  );
}
