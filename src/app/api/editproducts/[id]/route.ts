import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET( request: NextRequest, {params}: { params: Promise<{ id: string }>}){
    try{
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const products = await prisma.product.findFirst({
            where:
            {
                id
            },
            select: {
                name: true,
                property: true,
                utility: true,
                price: true,
            }
        });

        return NextResponse.json(products, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}
