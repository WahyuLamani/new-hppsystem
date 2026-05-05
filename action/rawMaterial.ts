"use server";
import { prisma } from "@/lib/prisma";
import { RawMaterialSchema } from "@/lib/validation/rawMaterial";

export async function createRawMaterial(data: unknown) {
  const parsed = RawMaterialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      errors: JSON.stringify(parsed.error.flatten().fieldErrors),
    };
  }

  const payload: CreateRawMaterialInput = {
    name: parsed.data.name,
    unit_buy: parsed.data.unit_buy,
    unit_use: parsed.data.unit_use,
    average_cost:
      parsed.data.initial_price /
      (parsed.data.initial_stock * parsed.data.conversion_factor),
    conversion_factor: parsed.data.conversion_factor,
    current_stock: parsed.data.initial_stock * parsed.data.conversion_factor,
    min_stock_alert:
      parsed.data.min_stock_alert * parsed.data.conversion_factor,
  };
  await prisma.rawMaterials.create({ data: payload });
  return { success: true, message: "Bahan baku berhasil ditambahkan" };
}
