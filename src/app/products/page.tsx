
import { prisma } from "@/lib/prisma";
import UserProductsPage from "@/components/products/user-products";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { requireUser } from "@/lib/guards";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default async function user_products(){

  const products_list = await prisma.product.findMany({select: {
    id: true, 
    name: true,
    property: true,
    utility: true,
    price: true,
  }});
  const session = await requireUser();
  const isAdmin = session.user.role === "ADMIN";

  
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex w-full max-w-6xl flex-1 flex-col md:flex-row gap-25 mx-auto">
        <aside className="border-b border-black/10 md:w-56 md:shrink-0 md:border-b-0 md:border-r dark:border-white/10">
          <DashboardSidebar isAdmin={isAdmin} />
        </aside>
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
