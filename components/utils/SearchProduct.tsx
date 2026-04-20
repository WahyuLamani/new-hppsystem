import { Search } from "lucide-react";

export default function SearchProduct() {
  return (
    <>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="material-symbols-outlined text-on-surface-variant opacity-60" />
        </div>
        <input
          className="w-full bg-surface-container-low border-none rounded-full py-4 pl-12 pr-6 text-on-surfac font-medium placeholder:opacity-50 transition-all"
          placeholder="Cari produk..."
          type="text"
        />
      </div>
    </>
  );
}
