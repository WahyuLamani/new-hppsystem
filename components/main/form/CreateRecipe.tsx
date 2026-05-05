"use client";
import { createRecipe, recipeIsDefault } from "@/action/recipe";
import AlertDialog from "@/components/utils/AlertDialog";
import IngredientSearch from "@/components/utils/IngredientSearch";
import SelectProductParent from "@/components/utils/SelectProductParent";
import { calculateSubtotal, formatRupiah } from "@/lib/helper";
import { Categories, Products, RawMaterials, Recipes } from "@prisma/client";
import clsx from "clsx";
import { CircleCheck, ReceiptText, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateRecipe({
  products,
  rawMaterials,
}: {
  products: (Products & { category: Categories })[];
  rawMaterials: RawMaterials[];
}) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<
    (Products & { category: Categories }) | null
  >(null);
  const [selectedRawMaterials, setSelectedRawMaterials] = useState<
    RawMaterialItemSelected[]
  >([]);
  const [recipeDefault, setRecipeDefault] = useState<Recipes | null>(null);
  const [isDefaultRecipe, setIsDefaultRecipe] = useState(true);
  const [recipeName, setRecipeName] = useState<string>();
  const [openModal, setOpenModal] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const modalConfirm = () => {
    setIsDefaultRecipe(true);
    setOpenModal(false);
  };
  const modalCancel = () => {
    setIsDefaultRecipe(false);
    setOpenModal(false);
  };

  const handleDefaultChange = () => {
    if (isDefaultRecipe) {
      if (recipeDefault === null) return;
      else setIsDefaultRecipe(false);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (!selectedProduct) return;
    setSelectedRawMaterials([]);
    recipeIsDefault(selectedProduct.id).then((res) => {
      setRecipeDefault(res);
    });
  }, [selectedProduct]);

  useEffect(() => {
    recipeDefault === null
      ? setIsDefaultRecipe(true)
      : setIsDefaultRecipe(false);
  }, [recipeDefault]);

  async function onSubmitRecipe() {
    if (selectedProduct === null) return;
    const recipe = {
      product_id: selectedProduct.id,
      version_name: recipeName,
      is_default: isDefaultRecipe,
      recipe_items: selectedRawMaterials,
      current_recipe_default_id: recipeDefault?.id,
    };
    const result = await createRecipe(recipe);
    if (result.success) {
      toast.success(result.message);
      router.push("/main/resep");
      setSelectedProduct(null);
      setSelectedRawMaterials([]);
      setRecipeName("");
    } else {
      toast.error(result.errors, {
        action: {
          label: "Retry",
          onClick: () => onSubmitRecipe(),
        },
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRecipe)}>
        <SelectProductParent
          products={products}
          value={selectedProduct}
          onChange={setSelectedProduct}
        />
        <div className="flex-1 px-6 pb-40">
          <section className="space-y-6 my-10">
            <div className="grid grid-cols-1 gap-6">
              <div className="relative">
                <label className="block font-bold text-primary text-sm uppercase tracking-wider mb-2">
                  Version Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary rounded-DEFAULT py-4 px-5 font-medium placeholder:text-outline-variant/60"
                  placeholder="e.g. Festive Gold V.2"
                  type="text"
                  value={recipeName || ""}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-DEFAULT">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    <CircleCheck />
                  </span>
                  <span className="font-bold text-on-surface text-sm">
                    Set as Default Recipe
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    checked={isDefaultRecipe}
                    onChange={() => handleDefaultChange()}
                  />
                  <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>
          <AlertDialog
            open={openModal}
            title="Simpan Perubahan?"
            message={`Sudah ada Default resep dengan nama ${recipeDefault?.version_name}, yakin ingin mengubahnya?`}
            onConfirm={() => modalConfirm()}
            onCancel={() => modalCancel()}
          />
          {selectedProduct !== null ? (
            <>
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-primary text-lg">
                    Ingredients (BoM)
                  </h2>
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
                    Live COGS
                  </span>
                </div>
                {/* Add Ingredient Search */}
                <IngredientSearch
                  rawMaterials={rawMaterials}
                  selectedRawMaterials={selectedRawMaterials}
                  onChange={setSelectedRawMaterials}
                />
              </section>
              <section className="space-y-4 mt-6">
                <div className="bg-[#442a22] text-[#fff9ec] rounded-lg p-6 flex flex-col gap-1 shadow-xl">
                  <div className="flex justify-between items-center opacity-80 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Total Production COGS
                    </span>
                    <span className="material-symbols-outlined text-sm">
                      <ReceiptText />
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      {formatRupiah(calculateSubtotal(selectedRawMaterials))}
                    </h2>
                    <span className="text-[10px] uppercase font-bold tracking-tighter bg-tertiary-container px-2 py-1 rounded text-on-tertiary-container">
                      Current Batch
                    </span>
                  </div>
                </div>
                <button
                  className={clsx(
                    "w-full bg-gradient-to-br from-[#442a22] to-[#5d4037] text-[#fff9ec] py-5 rounded-full font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2",
                    isSubmitting
                      ? "opacity-60 scale-[0.98]"
                      : "active:scale-[0.98] "
                  )}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    <>
                      <span>Save Recipe</span>
                      <WandSparkles className="material-symbols-outlined" />
                    </>
                  ) : (
                    "Menyimpan..."
                  )}
                </button>
              </section>
            </>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}
