import CreateRecipe from "@/components/main/form/CreateRecipe";
import SubHeader from "@/components/utils/SubHeader";

export default function AddRecipe() {
  return (
    <>
      <SubHeader>
        <h1 className="font-semibold text-lg text-[#442a22] dark:text-[#ece0dc]">
          Buat Resep Baru
        </h1>
      </SubHeader>
      <CreateRecipe />
    </>
  );
}
