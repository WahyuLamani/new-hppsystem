"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function RecipeCards() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id: any) => setOpenId(openId === id ? null : id);

  return (
    <div className="flex flex-col gap-3">
      <RecipeCard id={1} isOpen={openId === 1} onToggle={toggle} />
      <RecipeCard id={2} isOpen={openId === 2} onToggle={toggle} />
      <RecipeCard id={3} isOpen={openId === 3} onToggle={toggle} />
    </div>
  );
}

export function RecipeCard({
  id,
  isOpen,
  onToggle,
}: {
  id: any;
  isOpen: any;
  onToggle: any;
}) {
  return (
    <div className="bg-surface-container-highest/50 rounded-lg overflow-hidden">
      {/* Header — diklik untuk toggle */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer"
        onClick={() => onToggle(id)}
      >
        <div className="w-16 h-16 rounded-DEFAULT overflow-hidden bg-outline-variant/20 flex-shrink-0">
          <img
            alt="Croissant"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/..."
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-on-surface">Pain au Chocolat</h3>
          <p className="text-xs text-on-surface-variant">
            Laminasi 3-Fold • Elle & Vire
          </p>
        </div>
        {/* Chevron yang rotate saat open */}
        <span
          className={`material-symbols-outlined text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown />
        </span>
      </div>

      {/* Breakdown — accordion body */}
      <div
        className={`grid transition-all duration-400 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-outline-variant/10 p-5">
            <RecipeBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecipeBreakdown() {
  return (
    <>
      <div className="bg-surface-container-highest rounded-lg overflow-hidden flex flex-col">
        <div className="p-5 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-on-surface">
                Cake Coklat Valrhona
              </h3>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-0.5 rounded-full text-[9px] font-bold uppercase">
                Default
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Version: Festive Gold V.2
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">Rp142.500</p>
            <p className="text-[10px] text-outline font-bold">COGS / Unit</p>
          </div>
        </div>
        {/* Recipe Breakdown */}
        <div className="mx-5 mb-5 p-4 bg-surface-container-lowest rounded-DEFAULT space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">Valrhona 70% Dark</span>
            <span className="font-bold text-on-surface">500g</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">
              French Butter (Elle & Vire)
            </span>
            <span className="font-bold text-on-surface">250g</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-on-surface-variant">
              Organic Cage-Free Eggs
            </span>
            <span className="font-bold text-on-surface">6 pcs</span>
          </div>
          <div className="pt-2 mt-2 border-t border-outline-variant/10 flex justify-between items-center">
            <span className="text-[10px] font-bold text-tertiary uppercase">
              Margin Profit
            </span>
            <span className="text-sm font-bold text-tertiary">68%</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex-1 bg-surface-container-low p-5 rounded-lg border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-on-surface leading-tight">
              Sourdough Artisan
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold text-primary">Rp18.200</p>
              <p className="text-[10px] text-outline font-bold">Base Cost</p>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              High hydration (80%) using organic rye flour starter.
            </p>
          </div>
        </div>
        <div className="w-32 bg-secondary-container p-5 rounded-lg flex flex-col justify-between">
          <span className="material-symbols-outlined text-on-secondary-fixed-variant">
            history
          </span>
          <div>
            <p className="text-2xl font-bold text-on-secondary-fixed-variant">
              3
            </p>
            <p className="text-[10px] font-bold text-on-secondary-fixed-variant uppercase leading-none">
              Varian Resep
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
