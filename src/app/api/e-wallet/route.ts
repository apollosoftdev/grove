import { NextResponse ,NextRequest} from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){

    try{
        const products = await request.json();
        const { name, amount, createdAt,Id }  = products;
        if(!name || !amount || !createdAt || !Id){
            return NextResponse.json({ error: "Missing required fields" }, {status: 400});
        }
                
        const balance = await prisma.wallet.update({
            where: {
                userId: products.id,
            },
            data: {
                balance: {
                    decrement: Number(products.totalPrice),
                },

            },
        });

        const purchaseHistory = await prisma.transactionhistory.create({
            data: {
            productname: String(products.name),
            amount: Number(products.amount),
            createdAt: String(products.createdAt),
            wallet: {
                connect: {
                    userId: products.id,
                },
                },
            },
        });
        return NextResponse.json({ purchaseHistory }, { status: 201});
    } catch(error) {
        return NextResponse.json({ error: "Failed to create purchaseHistory" }, {status: 500});
    }
}