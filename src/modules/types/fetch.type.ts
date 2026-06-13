export type TProductMenu = {
  id: number;
  price: number;
  waiting: number;
  available: boolean;
  meta_title: string;
  meta_description: string;
  name: string;
  description: string;
  src: string;
  snap: string;
  tapsi: string;
};

export type TProductsMenu = TProductMenu[];

export type TIdProductMenu = TProductMenu & { product_id: string };

export type TIdProductsMenu = TIdProductMenu[];

export type TCategoryMenu = {
  category: string;
  icon: string;
  products: TProductsMenu;
};

export type TCategoriesMenu = TCategoryMenu[];

export type TIdCategoryMenu = {
  category_product_id: string;
  category: string;
  icon: string;
  products: TIdProductMenu[];
};

export type TIdCategoriesMenu = TIdCategoryMenu[];

export type TIdProductSearchMenu = TIdProductMenu & {
  rank: number;
  category: string;
};

export type TIdProductsSearchMenu = TIdProductSearchMenu[];

export type TIdFactorPresentOrder = {
  factor_present_order_id: string;
  count: number;
  products: TIdProductMenu;
};

export type TIdPresentOrderTable = {
  present_order_table_id: string;
  table: number;
  busy: boolean;
  accept: boolean;
  factorPresentOrderTable: TIdFactorPresentOrder[];
};

export type TIdPresentOrdersTable = TIdPresentOrderTable[];

export type TEconomicPackage = {
  src: string;
  title: string;
  start_hours: string;
  end_hours: string;
  start_day: string;
  end_day: string;
  price: number;
  is_active: boolean;
};

export type TContentEconomicPackage = {
  economic_package_id: string;
  product_id: string;
};
