import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
    try{
        console.log("11111");
        const comments = await prisma.comment.findMany({
            select: {
                id: true,
                content: true,
                rating: true,
            }
        });
        
        return NextResponse.json(comments, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error }, {status: 500});
    }
}