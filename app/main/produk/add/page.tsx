import CreateProduct from "@/components/main/form/CreateProduct";
import SubHeader from "@/components/utils/SubHeader";
import { prisma } from "@/lib/prisma";
import { Categories } from "@prisma/client";


export default async function AddProduct() {
    const categories : Categories[] = await prisma.categories.findMany();
    return (
        <>
        <SubHeader>
            <h1 className="font-semibold text-lg text-[#442a22] dark:text-[#ece0dc]">
                Tambah Produk
            </h1>
        </SubHeader>
        <CreateProduct categories={categories}/>
        </>
    )
}