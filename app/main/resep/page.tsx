import RecipeCards from "@/components/main/RecipeCards";
import AddLink from "@/components/utils/AddLink";
import CategoryFilter from "@/components/utils/CategoryFilter";
import MainHeader from "@/components/utils/MainHeader";
import SearchInput from "@/components/utils/Search";

export default function RecipePage() {
  return (
    <>
      <MainHeader>
        <h1 className="text-[#442a22] dark:text-[#ece0dc] text-2xl font-bold tracking-tight">
          Master Resep
        </h1>
      </MainHeader>
      <div className="px-6 mt-6">
        <SearchInput />
      </div>
      <div className="px-6 pt-4 space-y-6">
        <CategoryFilter />
        <div className="space-y-4">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-lg font-bold text-primary">Katalog Produk</h2>
            <span className="text-[10px] text-outline font-bold uppercase tracking-tighter">
              4 Resep Aktif
            </span>
          </div>
          <RecipeCards />
        </div>
      </div>
      <AddLink href="/main/resep/add" />
    </>
  );
}
