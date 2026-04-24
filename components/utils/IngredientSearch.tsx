"use client";
import { useState } from "react";
import { Search, Plus, Trash2, Fish } from "lucide-react";

// --- Types ---
export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  pricePerKg: number;
}

export interface SelectedIngredient {
  ingredient: Ingredient;
  qty: number;
}

interface IngredientSearchProps {
  ingredients: Ingredient[]; // semua data dari parent
  onChange: (selected: SelectedIngredient[]) => void; // callback ke parent
}

// --- Utils ---
function calcSubtotal(ingredient: Ingredient, qty: number) {
  return Math.round((ingredient.pricePerKg / 1000) * qty);
}

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// --- Component ---
export default function IngredientSearch({
  ingredients,
  onChange,
}: IngredientSearchProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SelectedIngredient[]>([]);

  const filtered = query.trim()
    ? ingredients.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const isSelected = (id: number) =>
    selected.some((s) => s.ingredient.id === id);

  const handleAdd = (ingredient: Ingredient) => {
    const next = [...selected, { ingredient, qty: 100 }];
    setSelected(next);
    onChange(next);
    setQuery("");
  };

  const handleRemove = (id: number) => {
    const next = selected.filter((s) => s.ingredient.id !== id);
    setSelected(next);
    onChange(next);
  };

  const handleQtyChange = (id: number, val: string) => {
    const next = selected.map((s) =>
      s.ingredient.id === id ? { ...s, qty: Math.max(0, Number(val)) } : s
    );
    setSelected(next);
    onChange(next);
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
      {filtered.length > 0 && (
        <div className="bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant">
          {filtered.map((ing) => (
            <div
              key={ing.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-surface-container-highest transition-colors border-b border-outline-variant last:border-b-0"
            >
              <div>
                <p className="text-sm font-semibold text-on-surface">
                  {ing.name}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {formatRupiah(ing.pricePerKg)} / kg
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
        {selected.map(({ ingredient, qty }) => (
          <div
            key={ingredient.id}
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
                    {ingredient.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Avg: {formatRupiah(ingredient.pricePerKg)} / kg
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(ingredient.id)}
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
                  value={qty}
                  onChange={(e) =>
                    handleQtyChange(ingredient.id, e.target.value)
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
                  {formatRupiah(calcSubtotal(ingredient, qty))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
