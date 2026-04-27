export function formatRupiah(value: number | string) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(value))
  }

  export function calculateSubtotal(items: RawMaterialItemSelected[]): number {
    return items.reduce((total, item) => {
      return total + item.raw_material_cost_use;
    }, 0);
  }
