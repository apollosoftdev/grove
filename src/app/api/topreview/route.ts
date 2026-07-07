import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{

        const comments = await prisma.comment.findMany({
            select: {
                id: true,
                content: true,
                rating: true,
                productId: true,
            }
        });
        const productId = await prisma.product.findMany({
            select: {
                id: true,
            }
        })
        
        const result = productId.map((product) => {
            const productComments = comments.filter(
                (comment) => comment.productId === product.id
            );

            const sum = productComments.reduce(
                (total, comment) => total + (comment.rating ?? 0),0
            );

            const averageRating =
            productComments.length > 0 ? sum / productComments.length : 0;

            return {
                productId: product.id,
                averageRating,
                commentCount: productComments.length,
            };                                                            
        })
        
        const sortedProducts = result.sort((a,b) => a.averageRating - b.averageRating).slice(0,5);
        const topProductIds = sortedProducts.map((p) => p.productId);
        const topProducts = await prisma.product.findFirst({
            where: {
                id: {
                    in: topProductIds
                },
            },
            select: {
                id: true,
                name: true,
                property: true,
                image: true,
                utility: true,
                price: true,
            }
        })

        return NextResponse.json(topProducts, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}