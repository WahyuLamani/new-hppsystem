import CreateRecipe from "@/components/main/form/CreateRecipe";
import SubHeader from "@/components/utils/SubHeader";
import { prisma } from "@/lib/prisma";
import { Categories, Products } from "@prisma/client";

export default async function AddRecipe() {
  const products: (Products & { category: Categories })[] =
    await prisma.products.findMany({
      include: { category: true },
    });
  return (
    <>
      <SubHeader>
        <h1 className="font-semibold text-lg text-[#442a22] dark:text-[#ece0dc]">
          Buat Resep Baru
        </h1>
      </SubHeader>
      <CreateRecipe products={products} />
    </>
  );
}
