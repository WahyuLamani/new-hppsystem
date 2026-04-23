type CreateUserInput = {
  name: string;
  email: string;
};

type CreateCategoryInput = {
  name: string;
};

type CreateProductInput = {
  category_id: number;
  name: string;
  unit: string;
  selling_price: number;
  image_url?: string;
};

type CreateRawMaterialInput = {
  name: string;
  unit_buy: string;
  unit_use: string;
  conversion_factor: number;
  current_stock: number;
  average_cost: number;
  min_stock_alert: number;
};

type CreateMaterialPurchaseInput = {
  raw_material_id: number;
  qty_bought: number;
  price_per_unit: number;
  total_cost: number;
  purchase_date: Date;
};

type CreateStockAdjustmentInput = {
  raw_material_id: number;
  qty_change: number;
  reason: string;
};

type CreateRecipeInput = {
  product_id: number;
  version_name: string;
  is_default?: boolean;
};

type CreateRecipeItemInput = {
  recipe_id: number;
  raw_material_id: number;
  qty_needed: number;
  unit: string;
};

type CreatePurchaseOrderInput = {
  po_number: string;
  customer_name: string;
  order_date: Date;
  due_date: Date;
  status: string;
};

type CreatePurchaseOrderItemInput = {
  po_id: number;
  product_id: number;
  recipe_id: number;
  qty: number;
  hpp_per_unit: number;
  selling_price: number;
  total_hpp: number;
  total_revenue: number;
};

type CreatePurchaseOrderOverrideInput = {
  po_item_id: number;
  raw_material_id: number;
  qty_used: number;
  cost_at_time: number;
};

type CreateOverheadInput = {
  po_item_id: number;
  label: string;
  amount: number;
  category: string;
};

type CreateProductionBatchInput = {
  product_id: number;
  recipe_id: number;
  qty_produced: number;
  hpp_per_unit: number;
  total_hpp: number;
  qty_remaining: number;
  production_date: Date;
};

type CreateBatchOverheadInput = {
  batch_id: number;
  label: string;
  amount: number;
  category: string;
};

type CreateTransactionInput = {
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

type CreateSalesReturnInput = {
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
