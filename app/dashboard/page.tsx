import { Bell, Search, Settings } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="flex-1 ml-72 relative">
      <header className="sticky top-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(25,28,30,0.06)] flex justify-between items-center px-8 h-20">
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <Search className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"/>
            <input
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 ring-primary/20"
              placeholder="Cari margin atau bahan baku..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors">
            <Bell className="material-symbols-outlined" />
          </button>
          <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors">
            <Settings className="material-symbols-outlined" />
          </button>
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden ml-2 border-2 border-primary-fixed">
            <img
              alt="CFO Profile Avatar"
              className="h-full w-full object-cover"
              data-alt="close-up portrait of professional male executive with confident expression and soft studio lighting background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTZiCHsDJ68cwgr5M7668i6BbqyLsjHB1H3d-BepKCkuzG169dud8o3QyaytOzx9-3H_msjnICzyWvN9vad5tfFQsVBQ4i42se81G82QMERf0MxoNt-WMui43pDNpL-nPSgkdNjZclOsbvFUGlDw2hb5C-wZ2fMDUmXW5yMF7kQTtVNfvfkVjyFVJYlRSEK9SrQ82VaVA9EiTdRqLeWwpQ1TV2uNNxIWeNkTTPdclToDuSM-9_QmWO3hgET-3ouMsaKTmjf_vsKAQ6"
            />
          </div>
        </div>
      </header>
    </main>
  );
}
