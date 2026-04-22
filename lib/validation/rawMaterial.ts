import z from "zod";

export const RawMaterialSchema = z.object({
  name: z.string().min(1, "Nama Bahan Wajib Di isi"),
  unit_buy: z.string().min(1, "Satuan Beli Wajib Di isi"),
  unit_use: z.string().min(1, "Satuan Pemakaian Wajib Di isi"),
  conversion_factor: z.coerce.number().min(1, "Faktor Konversi Wajib Di isi"),
  initial_stock: z.coerce.number().min(1, "Stok Awal Wajib Di isi"), // user input dalam unit_buy
  initial_price: z.coerce.number().min(1, "Harga Awal Wajib Di isi"), // user input harga per unit_buy
  min_stock_alert: z.coerce.number().min(1, "Stok Minimum Wajib Di isi"), // user input dalam unit_buy,
});

export type RawMaterialFormData = z.infer<typeof RawMaterialSchema>;
export type RawMaterialFormDataInput = z.input<typeof RawMaterialSchema>;
export type RawMaterialFormDataOutput = z.output<typeof RawMaterialSchema>;
