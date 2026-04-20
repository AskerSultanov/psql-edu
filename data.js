var sku = {
  sku_id: 1,
  sku_name: "asker",
  price: 10,
  discount: 15.4,
  discounted_price: 3,
  club_discounted_price: 3,
  last_fetch: new Date().getTime(),
  last_cost_price: 56.23,
  disabled: true,
  deleted: false,
};

var skuMetrics = {
  sku_id: 1,
  sku_name: "asker",
  year: 2025,
  qty: 1,
  net_profit: 45,
  margin: 3,
  fines: 0,
  tax: 1.2,
  retail_amount: 45,
  return_amount: 2,
  storage_cost: 5.5,
  delivery_cost: 4.4,
  taxable_amount: 44,
};

export { sku, skuMetrics };
