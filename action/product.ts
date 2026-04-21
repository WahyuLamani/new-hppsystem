"use server"
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validation/product";

export async function createProduct(data: unknown){
    const parsed = ProductSchema.safeParse(data);
    if(!parsed.success){
        return { success: false, errors: parsed.error.flatten().fieldErrors }
    }

    await prisma.products.create({data: parsed.data})
    return {success: true, message:"Produk berhasil ditambahkan"}
}