
import { z } from "zod";


import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function ProductCreateAction(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    property: formData.get("property"),
    utility: formData.get("utility"),
    price: formData.get("price"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { name, property, utility, price, image } = parsed.data;

  const existing = await prisma.product.findFirst({ where: { name } });

  if (existing) {
    return { error: "A product with this name already exists." };
  }

  await prisma.product.create({ data: { 
    name: parsed.data.name, 
    property: parsed.data.property, 
    utility: parsed.data.utility, 
    price: parsed.data.price, 
    image: parsed.data.image 
} });

  return {};
}