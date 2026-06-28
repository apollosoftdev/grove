"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(userId: string, productId: string, quantity: number = 1){

    let cart = await prisma.carts.findUnique({
        where: { userId }
    })

    if(!cart) {
        cart = await prisma.carts.create({
            data: { userId }
        })
    }

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId
            }
        }
    })

    if(existingItem) {

        await prisma.cartItem.update({
            where: { id: existingItem.id},
            data: { quantity: existingItem.quantity + quantity}
        })

    } else {

        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity
            }
        })
    }

    revalidatePath("/cart")
}