"use server";

import { z } from "zod";


import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { id } from "zod/locales";

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
  };
  if (!newProducts) {
    return { fieldErrors: z.flattenError(newProducts).fieldErrors };
  }
  
  try {

      await prisma.product.create({
        data: {
          name: String(newProducts.name),
          property: String(newProducts.property),
          utility: String(newProducts.utility || ''),
          price: Number(newProducts.price),
           images: {
              create: [
                { url: String(newProducts.image || "") }
              ]
            },
        },
      });

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
}


export async function editProduct(
  _prevState: ProductFormState,
  formData: FormData
):Promise<ProductFormState> {
  
  const updateProducts = {
    name: formData.get("name"),
    property: formData.get("property"),
    utility: formData.get("utility"),
    price: Number(formData.get("price")),
    image: formData.get("image"),
  };
  const id = formData.get("id") as string;
  try {
      await prisma.product.update({
        where: { id },
        data: {
          name: String(updateProducts.name),
          property: String(updateProducts.property),
          utility: String(updateProducts.utility || ''),
          price: Number(updateProducts.price),
        },
      });

    revalidatePath("/"); 
    revalidatePath("/admin/products"); 
    return { success: true };

    } catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      console.log(error);
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
}


export async function deleteProduct(
  _prevState: ProductFormState,
  formData: FormData
):Promise<ProductFormState> {
  const id = formData.get("id") as string;
  try {
    await prisma.product.delete({where: { id }});

    revalidatePath("/"); 
    revalidatePath("/admin/products"); 
    return { success: true };

    } catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      console.log(error);
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
}

export async function getFavouriteProduct(
  _prevState: ProductFormState,
  formData: FormData
):Promise<ProductFormState> {

  const favouriteProductId = formData.get("id") as string;
  try{
    await prisma.favouriteProducts.findUnique({
      where: { id : favouriteProductId 
      }});
    revalidatePath("/"); 
    revalidatePath("/admin/products"); 
    return { success: true };

    }
    catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      console.log(error);
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
}
