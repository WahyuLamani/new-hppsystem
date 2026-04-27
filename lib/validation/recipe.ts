import z from "zod";

export const rawDataRecipeSchema = z.object({
  product_id: z.coerce.number(),
  version_name: z.string(),
  is_default: z.boolean(),
  recipe_items: z.array(
    z.object({
      qty_needed: z.coerce.number().gt(0, "Qty harus lebih dari 0"),
      raw_material_id: z.coerce.number(),
      raw_material_name: z.string(),
      unit: z.string(),
      raw_material_cost_ave: z.coerce.number(),
      raw_material_cost_use: z.coerce.number(),
    })
  ).min(1, "Harus ada minimal 1 bahan baku"),
  current_recipe_default_id: z.union([z.coerce.number(), z.null()]).optional(),
});

export type rawDataRecipe = z.infer<typeof rawDataRecipeSchema>;
