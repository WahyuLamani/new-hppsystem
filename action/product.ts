"use server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { ProductSchema } from "@/lib/validation/product";

export async function createProduct(formData: FormData) {
  const file = formData.get("image") as File | null;

  let image_url: string | undefined;
  if (file && file.size > 0) {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("product_photo")
      .upload(fileName, file, { contentType: file.type, upsert: false });
    if (error)
      return { success: false, message: { image_url: [error.message] } };
    const { data: publicUrl } = supabase.storage
      .from("product_photo")
      .getPublicUrl(fileName);
    image_url = publicUrl.publicUrl;
  }
  const raw = {
    name: formData.get("name"),
    category_id: formData.get("category_id"),
    unit: formData.get("unit"),
    selling_price: formData.get("selling_price"),
    image_url,
  };
  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success)
    return { success: false, errors: parsed.error.flatten().fieldErrors };

  await prisma.products.create({ data: parsed.data });
  return { success: true, message: "Produk berhasil ditambahkan" };
}
