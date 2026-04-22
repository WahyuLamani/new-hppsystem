import CreateRawMaterial from "@/components/main/form/CreateRawMaterial";
import SubHeader from "@/components/utils/SubHeader";

export default function AddRawMaterial() {
  return (
    <>
      <SubHeader>
        <h1 className="font-semibold text-lg text-[#442a22] dark:text-[#ece0dc]">
          Tambah Bahan Baku
        </h1>
      </SubHeader>
      <CreateRawMaterial/>
    </>
  );
}
