"use server";
import { prisma } from "@/lib/prisma";
import { rawDataRecipe, rawDataRecipeSchema } from "@/lib/validation/recipe";
import { Recipes } from "@prisma/client";

export const recipeIsDefault = async (id: number): Promise<Recipes | null> =>
  await prisma.recipes.findFirst({
    where: {
      product_id: id,
      is_default: true,
    },
  });

export async function createRecipe(data: unknown) {
  const parsed = rawDataRecipeSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }
  const payload = await buildRecipePayload(parsed.data);
  await prisma.$transaction(async (tx) => {
    if (payload.is_default) {
      await tx.recipes.updateMany({
        where: { product_id: payload.product_id },
        data: { is_default: false },
      });
    }

    await tx.recipes.create({ data: payload });
  });
  return { success: true, message: "Resep berhasil ditambahkan" };
}

export async function buildRecipePayload(data: rawDataRecipe) {
  const { product_id, version_name, is_default, recipe_items } = data;

  return {
    product_id,
    version_name,
    is_default,
    recipe_items: {
      create: recipe_items.map(({ raw_material_id, qty_needed, unit }) => ({
        raw_material_id,
        qty_needed,
        unit,
      })),
    },
  };
}
