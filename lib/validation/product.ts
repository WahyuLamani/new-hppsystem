import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Nama Produk Wajib Di isi"),
  category_id: z.coerce.number().min(1, "Pilih kategori"),
  unit: z.string().min(1, "Satuan wajib diisi"),
  selling_price: z.coerce.number().min(1, "Harga wajib diisi"),
  image_url: z.string().optional(),
});
export type ProductFormData = z.infer<typeof ProductSchema>;
export type ProductFormDataInput = z.input<typeof ProductSchema>;
export type ProductFormDataOutput = z.output<typeof ProductSchema>;