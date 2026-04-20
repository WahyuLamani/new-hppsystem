export default function ProductCards() {
  return (
    <>
     <ProductCard/>
     <ProductCard/>
    </>
  );
}

export function ProductCard() {
  return (
    <div className="bg-surface-container-highest rounded-lg overflow-hidden flex flex-col editorial-shadow transition-transform hover:scale-[1.02] active:scale-95">
      <div className="h-40 w-full relative">
        <img
          className="w-full h-full object-cover"
          data-alt="rustic stack of almond brownies with flaked sea salt and sliced almonds on a wooden board textured studio setting"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQUKfJMBTON_fQDohNHWakxtuUCcSAvVRe4CKwkcHXvxTVxM4skzvrYHB3UiGSYHBBpNLaf5TvqYrRohqdDS2OfZ9YW2trNzxJqBIM9ci-Krh7VP_-WFKpE-isk9Kxq6W3r9MAPBuWIDNrw-u4yTf1QZhcfV4RxdcmLeM6rjQy2giyfYPlCNv2byumVgh5843sLcfB4QxjQqcCWGqHIFZxDEWdQLV6VnNrYS7kbLqwCXclD-mucJ9gCfCmHOUUIiP7PEVTZztIuVR"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-secondary-container text-on-secondary-fixed-variant text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            PO (Pre-Order)
          </span>
        </div>
      </div>
      <div className="p-5 flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-primary-container opacity-60 uppercase tracking-widest mb-1">
            Cemilan
          </p>
          <h3 className="text-lg font-bold text-on-surface leading-tight">
            Brownies Almond
          </h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-primary">Rp 125.000</p>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
            / box
          </p>
        </div>
      </div>
    </div>
  );
}
