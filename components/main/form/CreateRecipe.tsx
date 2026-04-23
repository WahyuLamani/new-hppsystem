"use client";
import IngredientSearch from "@/components/utils/IngredientSearch";
import SelectProductParent from "@/components/utils/SelectProductParent";
import { CircleCheck, ReceiptText, WandSparkles } from "lucide-react";
import { useState } from "react";
const INGREDIENTS = [
  { id: 1, name: "French Butter", unit: "grams", pricePerKg: 320000 },
  { id: 2, name: "Bread Flour", unit: "grams", pricePerKg: 15000 },
  // ...
];
export default function CreateRecipe() {
  const handleIngredientsChange = (selected: any[]) => {
    console.log("Selected ingredients:", selected);
    // simpan ke state parent, kirim ke API, dst.
  };
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  return (
    <>
      <SelectProductParent
        value={selectedProduct}
        onChange={setSelectedProduct}
      />
      <div className="flex-1 px-6 pb-40">
        <section className="space-y-6 my-10">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative">
              <label className="block font-bold text-primary text-sm uppercase tracking-wider mb-2">
                Version Name
              </label>
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-DEFAULT py-4 px-5 font-medium placeholder:text-outline-variant/60"
                placeholder="e.g. Festive Gold V.2"
                type="text"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-DEFAULT">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  <CircleCheck />
                </span>
                <span className="font-bold text-on-surface text-sm">
                  Set as Default Recipe
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={true}
                  className="sr-only peer"
                  type="checkbox"
                  value=""
                />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-primary text-lg">
              Ingredients (BoM)
            </h2>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
              Live COGS
            </span>
          </div>
          {/* Add Ingredient Search */}
          <IngredientSearch
            ingredients={INGREDIENTS}
            onChange={handleIngredientsChange}
          />
        </section>
        <section className="space-y-4 mt-6">
          <div className="bg-[#442a22] text-[#fff9ec] rounded-lg p-6 flex flex-col gap-1 shadow-xl">
            <div className="flex justify-between items-center opacity-80 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest">
                Total Production COGS
              </span>
              <span className="material-symbols-outlined text-sm">
                <ReceiptText />
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight">
                Rp 159.000
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-tighter bg-tertiary-container px-2 py-1 rounded text-on-tertiary-container">
                Current Batch
              </span>
            </div>
          </div>
          <button className="w-full bg-gradient-to-br from-[#442a22] to-[#5d4037] text-[#fff9ec] py-5 rounded-full font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span>Save Recipe</span>
            <span className="material-symbols-outlined">
              <WandSparkles />
            </span>
          </button>
        </section>
      </div>
    </>
  );
}
