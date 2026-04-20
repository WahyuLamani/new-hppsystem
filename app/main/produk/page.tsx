import ProductCards from "@/components/main/ProductCards";
import ProductHighlight from "@/components/main/ProductHighlight";
import BottomMenu from "@/components/utils/BottomMenu";
import MainHeader from "@/components/utils/MainHeader";
import SearchProduct from "@/components/utils/SearchProduct";
import SidebarMenu from "@/components/utils/SidebarMenu";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  return (
    <>
      <MainHeader>
        <div className="flex items-center gap-4">
          <SidebarMenu />
          <h1 className="text-[#442a22] dark:text-[#ece0dc] text-2xl font-bold tracking-tight">
            Master Produk
          </h1>
        </div>
      </MainHeader>
      <div className="px-6 mt-6">
        <SearchProduct />
      </div>
      <ProductHighlight />
      <div className="px-6 mt-10 mb-4 flex justify-between items-end">
        <h2 className="text-xl font-bold text-primary">Katalog Produk</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">
          Urutkan: Terbaru
        </span>
      </div>
      <div className="px-6 space-y-6">
        <ProductCards />
      </div>
      <Link
        href="/product/add"
        className="fixed bottom-28 right-1/2 translate-x-[180px] w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform z-[60]"
      >
        <span className="material-symbols-outlined text-3xl">
          <Plus />
        </span>
      </Link>

      <BottomMenu />
    </>
  );
}
