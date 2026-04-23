import RawMaterialCards from "@/components/main/RawMaterialCards";
import AddLink from "@/components/utils/AddLink";
import MainHeader from "@/components/utils/MainHeader";
import SearchInput from "@/components/utils/Search";
import { prisma } from "@/lib/prisma";
import { RawMaterials } from "@prisma/client";
export default async function BahanPage() {
  const rawMaterials: RawMaterials[] = await prisma.rawMaterials.findMany();
  return (
    <>
      <MainHeader>
        <h1 className="text-[#442a22] dark:text-[#ece0dc] text-2xl font-bold tracking-tight">
          Master Bahan Baku
        </h1>
      </MainHeader>
      <div className="px-6 mt-6">
        <SearchInput />
      </div>
      <div className="px-6 space-y-6 flex flex-col mt-8">
        {/* konten */}
        <RawMaterialCards rawMaterials={rawMaterials} />
      </div>
      <AddLink href="/main/bahan/add" />
    </>
  );
}