import { Sparkles } from "lucide-react";

export default function ProductHighlight() {
  return (
    <div className="px-6 mt-8 grid grid-cols-2 gap-4">
      <div className="bg-surface-container-highest p-5 rounded-lg flex flex-col justify-between aspect-square">
        <div className="flex justify-between items-start">
          <span className="material-symbols-outlined text-primary">
            <Sparkles />
          </span>
          <span className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
            Top Seller
          </span>
        </div>
        <div>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">
            Paling Laris
          </p>
          <h3 className="font-bold text-lg leading-tight text-primary">
            {"cs"}
          </h3>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-primary p-5 rounded-lg text-on-primary flex-1 flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Total Produk
          </span>
          <span className="text-3xl font-extrabold tracking-tighter">
            {"cs"}
          </span>
        </div>
        <div className="bg-tertiary-fixed p-5 rounded-lg text-on-tertiary-fixed flex-1 flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            Aktif PO
          </span>
          <span className="text-3xl font-extrabold tracking-tighter">
            {"cs"}
          </span>
        </div>
      </div>
    </div>
  );
}
