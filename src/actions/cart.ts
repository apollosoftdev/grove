"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/guards";

export type ActionState = {
    success?: boolean
    message?: string
    fieldErrors?: Record<string, string[] | undefined>;
}

export async function addToCart(
    _prevState: ActionState,
    formData: FormData
): Promise<{ success: boolean, message: string; } | undefined> {
    try {
        const session = await requireUser();
        const userId = session.user.id;

        if (!userId) {
            return { success: false, message: "User not found!" }
        }

        const productId = formData.get('productId') as string;

        let carts = await prisma.carts.findFirst({
            where: {
                userId: userId
            }
        })

        if (!carts) {
            carts = await prisma.carts.create({
                data: { userId, productId }
            })
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: carts.id,
                    productId
                }
            }
        })

        if (existingItem) {

            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + 1 }
            })

        } else {

            await prisma.cartItem.create({
                data: {
                    cartId: carts.id,
                    productId,
                    quantity: 1
                }
            })
        }

        revalidatePath("/cart")
    }
    catch (error) {
        console.log(error);
        return { success: false, message: "database error." }
    }

}