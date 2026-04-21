"use client"
import { createProduct } from "@/action/product";
import {
  ProductFormData,
  ProductFormDataInput,
  ProductFormDataOutput,
  ProductSchema,
} from "@/lib/validation/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories } from "@prisma/client";
import clsx from "clsx";
import { CameraIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateProduct({categories}: {categories: Categories[]}){
    const router = useRouter();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<ProductFormDataInput, any, ProductFormDataOutput>({
      resolver: zodResolver(ProductSchema),
    });
    const sellingPrice = watch("selling_price") || 0

    async function onSubmit(data: ProductFormData) {
        const result = await createProduct(data);
        if(result.success){
            router.push('/main/produk')
        }
    }
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1 px-6 space-y-8 mt-4">
            {/* Foto Produk */}
            <section className="space-y-4">
              <label className="font-bold text-primary tracking-tight">
                Foto Produk
              </label>
              <div className="aspect-[4/3] w-full rounded-lg bg-surface-container-highest overflow-hidden border-2 border-dashed border-outline-variant flex flex-col items-center justify-center space-y-2 hover:bg-surface-container transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-lg">
                  <CameraIcon />
                </div>
                <p className="text-sm font-medium text-on-surface-variant">
                  Klik untuk unggah foto
                </p>
                <p className="text-[10px] text-outline uppercase tracking-widest">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </section>

            {/* Detail Artisan */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-primary text-xl">
                  Detail Artisan
                </h2>
                <div className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase tracking-wider">
                  Draft
                </div>
              </div>

              <div className="space-y-5">
                {/* Nama Produk */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                    Nama Produk
                  </label>
                  <input
                    {...register("name")}
                    className={clsx(
                      "w-full bg-surface-container-lowest border-none rounded-DEFAULT px-4 py-4 text-on-surface placeholder:text-outline/50 focus:ring-2 shadow-sm font-medium",
                      errors.name
                        ? "ring-2 ring-error"
                        : "focus:ring-primary-container"
                    )}
                    placeholder="e.g. Earl Grey Lemon Loaf"
                    type="text"
                  />
                  {errors.name && (
                    <p className="text-xs text-error px-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Kategori & Satuan */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Kategori */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Kategori
                    </label>
                    <div className="relative">
                      <select
                        {...register("category_id")}
                        className={clsx(
                          "w-full appearance-none bg-surface-container-lowest border-none rounded-DEFAULT pl-4 pr-10 py-4 text-on-surface font-medium shadow-sm focus:ring-2",
                          errors.category_id
                            ? "ring-2 ring-error"
                            : "focus:ring-primary-container"
                        )}
                      >
                        <option value="">Pilih...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-4 h-4" />
                    </div>
                    {errors.category_id && (
                      <p className="text-xs text-error px-1">
                        {errors.category_id.message}
                      </p>
                    )}
                  </div>

                  {/* Satuan */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">
                      Satuan Jual
                    </label>
                    <input
                      {...register("unit")}
                      className={clsx(
                        "w-full bg-surface-container-lowest border-none rounded-DEFAULT px-4 py-4 text-on-surface placeholder:text-outline/50 focus:ring-2 shadow-sm font-medium",
                        errors.unit
                          ? "ring-2 ring-error"
                          : "focus:ring-primary-container"
                      )}
                      placeholder="Box"
                      type="text"
                    />
                    {errors.unit && (
                      <p className="text-xs text-error px-1">
                        {errors.unit.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Harga & Margin */}
            <section className="bg-surface-container-low rounded-lg p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Harga Jual Per Unit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">
                    Rp
                  </span>
                  <input
                    {...register("selling_price")}
                    className={clsx(
                      "w-full bg-surface-container-lowest border-none rounded-DEFAULT pl-12 pr-4 py-5 text-2xl font-bold text-on-surface placeholder:text-outline-variant focus:ring-2 shadow-sm",
                      errors.selling_price
                        ? "ring-2 ring-error"
                        : "focus:ring-primary-container"
                    )}
                    placeholder="0"
                    type="number"
                  />
                </div>
                {errors.selling_price && (
                  <p className="text-xs text-error px-1">
                    {errors.selling_price.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 bg-primary p-4 rounded-DEFAULT flex flex-col justify-between text-on-primary">
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">
                    Estimated Margin
                  </span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-2xl font-extrabold">65</span>
                    <span className="text-sm font-bold opacity-80">%</span>
                  </div>
                </div>
                <div className="col-span-2 bg-tertiary-fixed p-4 rounded-DEFAULT flex flex-col justify-between">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-tertiary-fixed opacity-70">
                    Status
                  </span>
                  <span className="text-sm font-bold text-on-tertiary-fixed mt-2">
                    HEALTHY
                  </span>
                </div>
              </div>
            </section>

            {/* Submit */}
            <section className="pt-4 pb-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-5 rounded-full shadow-lg transition-all flex items-center justify-center gap-3",
                  isSubmitting
                    ? "opacity-60 scale-[0.98]"
                    : "active:scale-[0.98]"
                )}
              >
                <span className="material-symbols-outlined">save</span>
                {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
              </button>
            </section>
          </div>
        </form>
      </>
    );
}