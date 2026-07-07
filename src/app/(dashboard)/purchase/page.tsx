import { prisma } from "@/lib/prisma";
import PurchaseProductList from "@/components/purchase-productlist";
import { requireUser } from "@/lib/guards";
import { redirect } from "next/navigation";

export default async function PurchaseProductListPage() {

  const session = await requireUser();
  const userId = session.user.id;
  
  // Fetch data safely on the server side
  const carts = await prisma.cartItem.findMany({
    include: { 
      product: true 
    }
  });

  return <PurchaseProductList carts={carts} userId={userId}/>;
}