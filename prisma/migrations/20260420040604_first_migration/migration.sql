-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "selling_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit_buy" TEXT NOT NULL,
    "unit_use" TEXT NOT NULL,
    "conversion_factor" DOUBLE PRECISION NOT NULL,
    "current_stock" DOUBLE PRECISION NOT NULL,
    "average_cost" DOUBLE PRECISION NOT NULL,
    "min_stock_alert" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RawMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialPurchases" (
    "id" SERIAL NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "qty_bought" DOUBLE PRECISION NOT NULL,
    "price_per_unit" DOUBLE PRECISION NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialPurchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockAdjustments" (
    "id" SERIAL NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "qty_change" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "StockAdjustments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "version_name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeItems" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "qty_needed" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "RecipeItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "po_number" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItems" (
    "id" SERIAL NOT NULL,
    "po_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "hpp_per_unit" DOUBLE PRECISION NOT NULL,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "total_hpp" DOUBLE PRECISION NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseOrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderOverrides" (
    "id" SERIAL NOT NULL,
    "po_item_id" INTEGER NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "qty_used" DOUBLE PRECISION NOT NULL,
    "cost_at_time" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseOrderOverrides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Overheads" (
    "id" SERIAL NOT NULL,
    "po_item_id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Overheads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionBatches" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "qty_produced" INTEGER NOT NULL,
    "hpp_per_unit" DOUBLE PRECISION NOT NULL,
    "total_hpp" DOUBLE PRECISION NOT NULL,
    "qty_remaining" INTEGER NOT NULL,
    "production_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductionBatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchOverheads" (
    "id" SERIAL NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "BatchOverheads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "po_item_id" INTEGER NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "qty_sold" INTEGER NOT NULL,
    "selling_price" DOUBLE PRECISION NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL,
    "total_hpp" DOUBLE PRECISION NOT NULL,
    "gross_profit" DOUBLE PRECISION NOT NULL,
    "margin_pct" DOUBLE PRECISION NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesReturns" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "qty_returned" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "stock_action" TEXT NOT NULL,
    "refund_amount" DOUBLE PRECISION NOT NULL,
    "hpp_reversed" DOUBLE PRECISION NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "SalesReturns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RawMaterials_name_key" ON "RawMaterials"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialPurchases" ADD CONSTRAINT "MaterialPurchases_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "RawMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockAdjustments" ADD CONSTRAINT "StockAdjustments_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "RawMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeItems" ADD CONSTRAINT "RecipeItems_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeItems" ADD CONSTRAINT "RecipeItems_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "RawMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItems" ADD CONSTRAINT "PurchaseOrderItems_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItems" ADD CONSTRAINT "PurchaseOrderItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItems" ADD CONSTRAINT "PurchaseOrderItems_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderOverrides" ADD CONSTRAINT "PurchaseOrderOverrides_po_item_id_fkey" FOREIGN KEY ("po_item_id") REFERENCES "PurchaseOrderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderOverrides" ADD CONSTRAINT "PurchaseOrderOverrides_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "RawMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Overheads" ADD CONSTRAINT "Overheads_po_item_id_fkey" FOREIGN KEY ("po_item_id") REFERENCES "PurchaseOrderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionBatches" ADD CONSTRAINT "ProductionBatches_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionBatches" ADD CONSTRAINT "ProductionBatches_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchOverheads" ADD CONSTRAINT "BatchOverheads_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "ProductionBatches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_po_item_id_fkey" FOREIGN KEY ("po_item_id") REFERENCES "PurchaseOrderItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "ProductionBatches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesReturns" ADD CONSTRAINT "SalesReturns_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
