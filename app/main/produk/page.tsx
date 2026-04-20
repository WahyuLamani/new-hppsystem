import MainHeader from "@/components/utils/MainHeader";
import SidebarMenu from "@/components/utils/SidebarMenu";

export default function ProductPage() {
  return (
    <>
      <MainHeader>
        <div className="flex items-center gap-4">
          <SidebarMenu/>
          <h1 className="text-[#442a22] dark:text-[#ece0dc] text-2xl font-bold tracking-tight">
            Master Produk
          </h1>
        </div>
      </MainHeader>
    </>
  );
}
