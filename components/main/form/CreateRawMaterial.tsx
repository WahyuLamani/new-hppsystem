"use client";

import { createRawMaterial } from "@/action/rawMaterial";
import {
  RawMaterialFormData,
  RawMaterialFormDataInput,
  RawMaterialFormDataOutput,
  RawMaterialSchema,
} from "@/lib/validation/rawMaterial";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Info, RefreshCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateRawMaterial() {
  const router = useRouter();
  const [unitBuy, setUnitBuy] = useState<string | null>(null);
  const [unitUse, setUnitUse] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RawMaterialFormDataInput, any, RawMaterialFormDataOutput>({
    resolver: zodResolver(RawMaterialSchema),
  });

  const onSubmit = async (data: RawMaterialFormData) => {
    const result = await createRawMaterial(data);
    if (result.success) {
      toast.success("Bahan berhasil ditambahkan", {
        description: "Data bahan baku tersimpan.",
      });
      router.push("/main/bahan");
    } else {
      toast.error("Gagal menyimpan bahan", {
        description: result.message ?? "Terjadi kesalahan, coba lagi.",
        action: {
          label: "Retry",
          onClick: () => onSubmit(data),
        },
      });
    }
  };
  return (
    <>
      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto space-y-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="py-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary tracking-tight">
                Informasi Dasar
              </h2>
            </div>
            <div className="space-y-4">
              <div className="group">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1.5 ml-1">
                  Nama Bahan
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-surface-container-low border-none focus:outline-none rounded-DEFAULT px-4 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Contoh: Tepung Almond Premium"
                  type="text"
                />
                {errors.name && (
                  <p className="text-xs text-error px-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          <section className="py-3 space-y-3">
            <h2 className="text-lg font-bold text-primary tracking-tight">
              Konversi Satuan
            </h2>
            <div className="bg-surface-container-highest p-5 rounded-DEFAULT space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Unit Pembelian
                  </label>
                  <div className="bg-surface-container-lowest rounded-DEFAULT px-3 py-3 flex items-center justify-between">
                    <input
                      {...register("unit_buy")}
                      type="text"
                      className="text-left w-full uppercase on-surface-variant bg-transparent focus:outline-none p-0 text-primary font-bold"
                      placeholder="Kilogram"
                      onChange={(e) => setUnitBuy(e.target.value)}
                    />
                    {errors.unit_buy && (
                      <p className="text-xs text-error px-1">
                        {errors.unit_buy.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                    Unit Pemakaian
                  </label>
                  <div className="bg-surface-container-lowest border-2 border-primary/10 rounded-DEFAULT px-3 py-3 flex items-center justify-between">
                    <input
                      {...register("unit_use")}
                      type="text"
                      className="text-left w-full uppercase on-surface-variant bg-transparent focus:outline-none p-0 text-primary font-bold"
                      placeholder="Gram"
                      onChange={(e) => setUnitUse(e.target.value)}
                    />
                    {errors.unit_use && (
                      <p className="text-xs text-error px-1">
                        {errors.unit_use.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Visual Conversion Display */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-outline-variant opacity-20" />
                <div className="bg-surface-container-highest px-4 z-10">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
                    <RefreshCcw className="material-symbols-outlined text-sm" />
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-DEFAULT flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-primary">1</span>
                  <span className="text-xs font-bold text-outline uppercase tracking-tight">
                    {unitBuy}
                  </span>
                </div>
                <span className="text-primary font-bold">=</span>
                <div className="flex items-center gap-2">
                  <input
                    {...register("conversion_factor")}
                    className="w-20 text-right bg-transparent border-none p-0 font-extrabold text-xl text-tertiary-container focus:ring-0 focus:outline-none"
                    type="number"
                    placeholder="1000"
                  />
                  <span className="text-xs font-bold text-outline uppercase tracking-tight">
                    {unitUse}
                  </span>
                </div>
                {errors.conversion_factor && (
                  <p className="text-xs text-error px-1">
                    {errors.conversion_factor.message}
                  </p>
                )}
              </div>
            </div>
          </section>
          <section className="py-3 space-y-3">
            <h2 className="text-lg font-bold text-primary tracking-tight">
              Inventori
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-DEFAULT">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">
                  Stok Awal
                </label>
                <div className="flex items-end gap-2">
                  <input
                    {...register("initial_stock")}
                    className="bg-transparent border-none p-0 font-bold text-2xl w-full focus:ring-0 focus:outline-none"
                    placeholder="0"
                    type="number"
                  />
                  <span className="text-[10px] uppercase font-extrabold text-outline-variant mb-1">
                    {unitBuy}
                  </span>
                </div>
                {errors.initial_stock && (
                  <p className="text-xs text-error px-1">
                    {errors.initial_stock.message}
                  </p>
                )}
              </div>
              <div className="bg-surface-container-low p-4 rounded-DEFAULT border-b-4 border-error/20">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-outline mb-2">
                  Minimum Stok
                </label>
                <div className="flex items-end gap-2">
                  <input
                    {...register("min_stock_alert")}
                    className="bg-transparent border-none p-0 font-bold text-2xl w-full focus:ring-0 focus:outline-none"
                    placeholder="5"
                    type="number"
                  />
                  <span className="text-[10px] uppercase font-extrabold text-outline-variant mb-1">
                    {unitBuy}
                  </span>
                </div>
                {errors.min_stock_alert && (
                  <p className="text-xs text-error px-1">
                    {errors.min_stock_alert.message}
                  </p>
                )}
              </div>
            </div>
            <div className="group">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-outline mb-1.5 ml-1">
                {`Harga Awal Pembelian (total pembelian stok (${unitBuy}))`}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  Rp
                </span>

                <input
                  {...register("initial_price")}
                  className={clsx(
                    "w-full bg-surface-container-low border-none focus:outline-none rounded-DEFAULT pl-11 pr-4 py-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 transition-all",
                    errors.initial_price && "ring-2 ring-error"
                  )}
                  placeholder="30000"
                  type="number"
                />
              </div>

              {errors.initial_price && (
                <p className="text-xs text-error px-1">
                  {errors.initial_price.message}
                </p>
              )}
            </div>
            <p className="text-[11px] text-on-surface-variant italic px-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">
                <Info />
              </span>
              Sistem akan memberikan notifikasi jika stok di bawah batas
              minimum.
            </p>
          </section>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={clsx(
                "w-full bg-primary hover:bg-primary-container text-on-primary py-5 rounded-full font-bold text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3",
                isSubmitting
                  ? "opacity-60 scale-[0.98]"
                  : "active:scale-[0.98] "
              )}
            >
              <span className="material-symbols-outlined">
                <Save />
              </span>
              {isSubmitting ? "Menyimpan..." : "Simpan Bahan Baku"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
