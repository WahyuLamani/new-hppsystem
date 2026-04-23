"use client";
import { formatRupiah } from "@/lib/helper";
import { RawMaterials } from "@prisma/client";
import { CircleDollarSign } from "lucide-react";

export default function RawMaterialCards({
  rawMaterials,
}: {
  rawMaterials: RawMaterials[];
}) {
  return (
    <>
      {rawMaterials.map((rawMaterial) => {
        return (
          <RawmaterialCard key={rawMaterial.id} rawMaterial={rawMaterial} />
        );
      })}
    </>
  );
}

export function RawmaterialCard({
  rawMaterial,
}: {
  rawMaterial: RawMaterials;
}) {
  return (
    <div className="bg-surface-container-highest p-5 rounded-DEFAULT shadow-none transition-all active:scale-[0.98]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-primary">{rawMaterial.name}</h3>

          {rawMaterial.current_stock >= rawMaterial.min_stock_alert ? (
            <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
              Stok Tersedia
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-surface-tint text-on-secondary font-bold text-[10px] uppercase">
              Stok menipis
            </span>
          )}
        </div>
        <div className="text-right">
          <div className="font-bold text-xl text-on-surface">
            {rawMaterial.current_stock}
            <span className="text-xs font-normal text-on-surface-variant">
              /{rawMaterial.unit_use}
            </span>
          </div>
          <p className="text-[10px] text-on-surface-variant uppercase mt-1">
            Stok Saat Ini
          </p>
        </div>
      </div>
      <div className="bg-surface-container-low/50 rounded-lg p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-lg">
            <CircleDollarSign />
          </span>
          <span className="text-sm font-medium text-on-surface-variant">
            Avg. Cost
          </span>
        </div>
        <div className="font-semibold text-primary">
          {formatRupiah(rawMaterial.average_cost)}
          <span className="text-xs font-normal">/{rawMaterial.unit_use}</span>
        </div>
      </div>
    </div>
  );
}
