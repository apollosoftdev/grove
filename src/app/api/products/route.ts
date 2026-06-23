import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return NextResponse.json({ products });
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}