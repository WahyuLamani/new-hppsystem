import ProductCards from "@/components/main/ProductCards";
import ProductHighlight from "@/components/main/ProductHighlight";
import AddLink from "@/components/utils/AddLink";
import MainHeader from "@/components/utils/MainHeader";
import SearchInput from "@/components/utils/Search";
import { prisma } from "@/lib/prisma";
import { Categories, Products } from "@prisma/client";

export default async function ProductPage({ searchParams }: PageProps) {
  const query = searchParams.query ?? "";

  const products: (Products & { category: Categories })[] =
    await prisma.products.findMany({
      where: query
        ? {
            // filter hanya kalau query tidak kosong
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { category: { name: { contains: query, mode: "insensitive" } } },
            ],
          }
        : undefined, // kalau kosong, tampil semua (default)
      include: { category: true },
      orderBy: { id: "desc" },
    });
  return (
    <>
      <MainHeader>
        <h1 className="text-[#442a22] dark:text-[#ece0dc] text-2xl font-bold tracking-tight">
          Master Produk
        </h1>
      </MainHeader>
      <div className="px-6 mt-6">
        <SearchInput placeholder="Cari Produk ...." />
      </div>
      <ProductHighlight />
      <div className="px-6 mt-10 mb-4 flex justify-between items-end">
        <h2 className="text-xl font-bold text-primary">Katalog Produk</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">
          Urutkan: Terbaru
        </span>
      </div>
      <div className="px-6 space-y-6">
        <ProductCards products={products} />
      </div>
      <AddLink href="/main/produk/add" />
    </>
  );
}
