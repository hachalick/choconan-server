export type TDetailOrder = {
  count: number;
  product_id: string;
};

export type TDetailOrders = Array<TDetailOrder>;

export type TOrderTable = {
  table: number;
  busy: boolean;
  accept: boolean;
  listOrder: TDetailOrders;
};
