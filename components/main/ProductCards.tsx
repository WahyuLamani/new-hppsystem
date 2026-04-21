"usa client";
import { Categories, Products } from "@prisma/client";

export default function ProductCards({
  products,
}: {
  products: (Products & { category: Categories })[];
}) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export function ProductCard({
  product,
}: {
  product: Products & { category: Categories };
}) {
  return (
    <div className="bg-surface-container-highest rounded-lg overflow-hidden flex flex-col editorial-shadow transition-transform hover:scale-[1.02] active:scale-95">
      <div className="h-40 w-full relative">
        <img
          className="w-full h-full object-cover"
          data-alt="rustic stack of almond brownies with flaked sea salt and sliced almonds on a wooden board textured studio setting"
          src={product.image_url ?? "/no_img.webp"}
        />
      </div>
      <div className="p-5 flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-primary-container opacity-60 uppercase tracking-widest mb-1">
            {product.category.name}
          </p>
          <h3 className="text-lg font-bold text-on-surface leading-tight">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-primary">
            Rp {product.selling_price}
          </p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
            / {product.unit}
          </p>
        </div>
      </div>
    </div>
  );
}
