"use client";
import { useState, useRef, useEffect } from "react";
import { CakeSlice, ChevronDown, Search, Check } from "lucide-react";
type Product = {
  id: number;
  name: string;
  category: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Cake Coklat Valrhona", category: "Signature Collection" },
  { id: 2, name: "Pain au Chocolat", category: "Pastry • Laminasi" },
  { id: 3, name: "Sourdough Artisan", category: "Bread • High Hydration" },
  { id: 4, name: "Croissant Classic", category: "Pastry • 27 Layer" },
  { id: 5, name: "Tart Citrus Yuzu", category: "Patisserie • Seasonal" },
];

type Props = {
  value: Product | null;
  onChange: (product: Product) => void;
};

export default function SelectProductParent({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  // Tutup saat klik luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (product: Product) => {
    onChange(product);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <section ref={containerRef} className="relative flex-1 px-6">
      <label className="block font-bold text-primary text-sm uppercase tracking-wider mt-7 mb-3 p-1">
        Product Parent
      </label>

      {/* Trigger */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        className={`bg-surface-container-low p-4 rounded-DEFAULT flex items-center justify-between cursor-pointer transition-colors
          ${
            isOpen
              ? "bg-surface-container-highest ring-1 ring-primary"
              : "hover:bg-surface-container-highest"
          }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <CakeSlice className="text-on-primary-container w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-on-surface">
              {value ? value.name : "Pilih produk..."}
            </p>
            <p className="text-xs text-on-surface-variant font-medium">
              {value ? value.category : "Belum ada yang dipilih"}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`text-outline w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      <div
        className={`absolute left-6 right-6 z-50 mt-1 bg-surface-container-low rounded-DEFAULT border border-outline-variant overflow-hidden
          transition-all duration-300 origin-top
          ${
            isOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
      >
        {/* Search */}
        <div className="p-3 border-b border-outline-variant">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-surface-container-highest text-on-surface placeholder:text-outline
                text-sm pl-9 pr-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Options */}
        <ul className="max-h-56 overflow-y-auto">
          {filtered.length === 0 ? (
            <li className="py-6 text-center text-xs text-on-surface-variant">
              Produk tidak ditemukan
            </li>
          ) : (
            filtered.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                  ${
                    value?.id === product.id
                      ? "bg-primary/10"
                      : "hover:bg-surface-container-highest"
                  }`}
              >
                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                  <CakeSlice className="w-4 h-4 text-on-primary-container" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-on-surface truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {product.category}
                  </p>
                </div>
                {value?.id === product.id && (
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
