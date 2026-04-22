export type CreateUserInput = {
  name: string;
  email: string;
};

export type CreateCategoryInput = {
  name: string;
};

export type CreateProductInput = {
  category_id: number;
  name: string;
  unit: string;
  selling_price: number;
  image_url?: string;
};

export type CreateRawMaterialInput = {
  name: string;
  unit_buy: string;
  unit_use: string;
  conversion_factor: number;
  current_stock: number;
  average_cost: number;
  min_stock_alert: number;
};

export type CreateMaterialPurchaseInput = {
  raw_material_id: number;
  qty_bought: number;
  price_per_unit: number;
  total_cost: number;
  purchase_date: Date;
};

export type CreateStockAdjustmentInput = {
  raw_material_id: number;
  qty_change: number;
  reason: string;
};

export type CreateRecipeInput = {
  product_id: number;
  version_name: string;
  is_default?: boolean;
};

export type CreateRecipeItemInput = {
  recipe_id: number;
  raw_material_id: number;
  qty_needed: number;
  unit: string;
};

export type CreatePurchaseOrderInput = {
  po_number: string;
  customer_name: string;
  order_date: Date;
  due_date: Date;
  status: string;
};

export type CreatePurchaseOrderItemInput = {
  po_id: number;
  product_id: number;
  recipe_id: number;
  qty: number;
  hpp_per_unit: number;
  selling_price: number;
  total_hpp: number;
  total_revenue: number;
};

export type CreatePurchaseOrderOverrideInput = {
  po_item_id: number;
  raw_material_id: number;
  qty_used: number;
  cost_at_time: number;
};

export type CreateOverheadInput = {
  po_item_id: number;
  label: string;
  amount: number;
  category: string;
};

export type CreateProductionBatchInput = {
  product_id: number;
  recipe_id: number;
  qty_produced: number;
  hpp_per_unit: number;
  total_hpp: number;
  qty_remaining: number;
  production_date: Date;
};

export type CreateBatchOverheadInput = {
  batch_id: number;
  label: string;
  amount: number;
  category: string;
};

export type CreateTransactionInput = {
  po_item_id: number;
  batch_id: number;
  type: string;
  status: string;
  qty_sold: number;
  selling_price: number;
  total_revenue: number;
  total_hpp: number;
  gross_profit: number;
  margin_pct: number;
  transaction_date: Date;
};

export type CreateSalesReturnInput = {
  transaction_id: number;
  qty_returned: number;
  reason: string;
  stock_action: string;
  refund_amount: number;
  hpp_reversed: number;
  return_date: Date;
  notes: string;
};

interface PageProps {
  searchParams: {
    query?: string;
  };
}

interface SearchProps {
  placeholder?: string;
  paramKey?: string; // key di URL, default "query"
}
