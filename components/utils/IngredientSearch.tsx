"use client";
import React, { useState } from "react";
import { Search, Plus, Trash2, Fish } from "lucide-react";
import { RawMaterials } from "@prisma/client";
import {
  formatRupiah,
} from "@/lib/helper";

// --- Component ---
export default function IngredientSearch({
  rawMaterials,
  selectedRawMaterials,
  onChange,
}: {
  rawMaterials: RawMaterials[];
  selectedRawMaterials: RawMaterialItemSelected[];
  onChange: React.Dispatch<React.SetStateAction<RawMaterialItemSelected[]>>;
}) {
  const [query, setQuery] = useState("");

  const rawMaterialFiltered = query.trim()
    ? rawMaterials.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const isSelected = (id: number) =>
    selectedRawMaterials.some((s) => s.raw_material_id === id);

  const handleAdd = (ingredient: RawMaterials) => {
    const newData: RawMaterialItemSelected = {
      raw_material_id: ingredient.id,
      qty_needed: 0,
      raw_material_name: ingredient.name,
      raw_material_cost_ave: ingredient.average_cost,
      raw_material_cost_use: 0,
      unit: ingredient.unit_use,
    };
    const next = [...selectedRawMaterials, newData];
    onChange(next);
    setQuery("");
  };

  const handleRemove = (id: number) => {
    const next = selectedRawMaterials.filter((s) => s.raw_material_id !== id);
    onChange(next);
  };

  const handleQtyChange = (id: number, val: string) => {
    const value = Math.max(0, Number(val) || 0);
    onChange((prev) =>
      prev.map((s) =>
        s.raw_material_id === id
          ? {
              ...s,
              qty_needed: value,
              raw_material_cost_use: value * s.raw_material_cost_ave,
            }
          : s
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
        <input
          className="w-full bg-surface-container-high border-none rounded-full py-4 pl-12 pr-4 text-sm font-semibold placeholder:text-outline italic"
          placeholder="Add Raw Material..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Dropdown Hasil Search */}
      {rawMaterialFiltered.length > 0 && (
        <div className="bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant">
          {rawMaterialFiltered.map((ing) => (
            <div
              key={ing.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-surface-container-highest transition-colors border-b border-outline-variant last:border-b-0"
            >
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  {ing.name}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {formatRupiah(ing.average_cost)} / {ing.unit_use}
                </p>
              </div>

              {isSelected(ing.id) ? (
                <span className="text-xs font-bold text-primary opacity-60 px-3 py-1 rounded-full border border-primary/30">
                  ✓ Added
                </span>
              ) : (
                <button
                  onClick={() => handleAdd(ing)}
                  className="flex items-center gap-1 bg-primary text-surface text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3 h-3" />
                  Tambah
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Selected Ingredients List */}
      <div className="space-y-4">
        {selectedRawMaterials.map((ingredient) => (
          <div
            key={ingredient.raw_material_id}
            className="bg-surface-container-highest/50 p-5 rounded-lg flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="bg-primary text-surface p-2 rounded-lg h-fit">
                  <span className="text-sm font-bold">
                    <Fish />
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">
                    {ingredient.raw_material_name}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Avg: {formatRupiah(ingredient.raw_material_cost_ave)} /{" "}
                    {ingredient.unit}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(ingredient.raw_material_id)}
                className="text-error opacity-40 hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-DEFAULT">
              <div className="flex items-center gap-2">
                <input
                  className="w-16 bg-transparent border-none p-0 text-lg font-bold text-primary focus:ring-0"
                  type="number"
                  value={ingredient.qty_needed}
                  onChange={(e) =>
                    handleQtyChange(ingredient.raw_material_id, e.target.value)
                  }
                />
                <span className="text-xs font-bold uppercase text-outline">
                  {ingredient.unit}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-outline-variant uppercase">
                  Subtotal
                </p>
                <p className="font-bold text-primary">
                  {formatRupiah(ingredient.raw_material_cost_use)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
