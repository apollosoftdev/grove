"use server";

import { z } from "zod";


import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export type ProductFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const newProducts = {
    name: formData.get("name"),
    property: formData.get("property"),
    utility: formData.get("utility"),
    price: Number(formData.get("price")),
    image: formData.get("image"),
    createdAt: new Date(formData.get("createdAt") as string),
  };
  if (!newProducts) {
    return { fieldErrors: z.flattenError(newProducts).fieldErrors };
  }

  // const existing = await prisma.product.findFirst({ where: { name } });

  // if (existing) {
  //   return { error: "A product with this name already exists." };
  // }
  
  try {
      console.log('333');
      console.log(newProducts);
      await prisma.product.create({
        data: {
          name: String(newProducts.name || ''),
          property: String(newProducts.property || ''),
          utility: String(newProducts.utility || ''),
          price: Number(newProducts.price || 0),
          image: String(newProducts.image || ''),
          createdAt: newProducts.createdAt || new Date(),
        },
      });
    console.log('444');
    revalidatePath("/"); 
    return { success: true };

    } catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      console.log(error);
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
    // Unreachable: signIn redirects on success.
    return {}
}