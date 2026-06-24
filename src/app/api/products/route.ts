import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                property: true,
                image: true,
                utility: true,
                price: true,
                rating: true,
                comment: true,
            }
        });
        return NextResponse.json({ products });
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}

export async function POST(request: Request){
    try{
        const products = await request.json();
        const { name, property, image, utility, price, createdAt }  = products;
        if(!name || !property || !image || !utility || !price || !createdAt){
            return NextResponse.json({ error: "Missing required fields" }, {status: 400});
        }

        const newProduct = await prisma.product.create({
            data: {
            name: String(products.name),
            property: String(products.property),
            utility: String(products.utility),
            price: products.price,
            image: String(products.image),
            createdAt: String(products.createdAt),
            },
        });
        return NextResponse.json({ newProduct }, { status: 201});
    } catch(error) {
        return NextResponse.json({ error: "Failed to create product" }, {status: 500});
    }
}