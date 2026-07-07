"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { requireUser } from "@/lib/guards";

import { prisma } from "@/lib/prisma";
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
          //  images: {
          //     create: [
          //       { url: String(newProducts.image || "") }
          //     ]
          //   },
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
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
}

export async function deleteCartItem(
  _prevState: ProductFormState,
  formData: FormData
):Promise<ProductFormState> {
  const id = formData.get("id") as string;

  try {
    await prisma.cartItem.delete({where: { id }});

    revalidatePath("/"); 
    revalidatePath("/admin/products"); 
    return { success: true };

    } catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      if (error) {
        return { error: "Invalid email or password." };
      }
      throw error;
    }
}

export async function createCommets(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {

  const session = await requireUser();
  const userId = session.user.id;

  const newProducts = {
    comment: formData.get("comment"),
    rating: formData.get("rating"),
    productId: formData.get("productId"),
    commentId: formData.get("commentId"),
  };

  if (!newProducts) {
    return { fieldErrors: z.flattenError(newProducts).fieldErrors };
  }

  const commentId = newProducts.commentId === null ? 0 : Number(newProducts.commentId);
  const ratingNumber = newProducts.rating === null ? 0 : Number(newProducts.rating);
  const commentText = typeof newProducts.comment === 'string' ? newProducts.comment : '';
  const productId = typeof newProducts.productId === 'string' ? newProducts.productId : '';

  try {

      await prisma.comment.create({
        data: {
          content: commentText,
          rating: ratingNumber,
          product: {
          connect: { id: productId }
          },
          user: {
            connect: { id: userId }
          },
          commentId: Number(commentId) + 1,
        },
      });

    revalidatePath("/"); 
    return { success: true };

    } catch (error) {
      // A successful sign-in throws a NEXT_REDIRECT error which must bubble up.
      console.log(error);
      if (error) {
        return { error: "Failed" };
      }
      throw error;
    }
}

export interface SearchState {
  results: Array<{ 
    id:string; 
    name: string; 
    property: string; 
    utility: string | null; 
    price: number;    
  }>;
  currentPage: number;
  totalPages: number;
  error?: string;
}

const ITEMS_PER_PAGE = 10;

export async function searchProducts( _prevState: SearchState, formData: FormData ) : Promise<SearchState>{

  const query = (formData.get("search") as string)?.trim() || "";
  const pageInput = formData.get("page") as string;
  const page = pageInput ? parseInt(pageInput, 5) : 1 ;

  try{
    const totalItems = await prisma.product.count({
      where: {
        name: {
          contains: query,
          // mode: 'insensitive',  
        },
      },
    });
    
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

    const currentPage = Math.min(Math.max(1, page), totalPages);

    const data = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          // mode: 'insensitive',  
        },
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take:ITEMS_PER_PAGE
    });

    return { results: data, currentPage, totalPages };
  }

  catch (error){
     console.error("Prisma Search Error Details:", error); 
    
    return { ..._prevState, error: "Something went wrong with the database search."}
  }
}
