import { NextResponse ,NextRequest} from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET( request: NextRequest, {params}: { params: Promise<{ id: string }> }) {

    
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const comments = await prisma.comment.findMany({
            where: {
                productId: id
            },
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